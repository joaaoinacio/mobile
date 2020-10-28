import {isEmpty, isNull, isUndefined} from 'lodash';
import {
  Button,
  Container,
  Content,
  Form,
  Icon,
  Input,
  Item,
  Text,
  Toast,
  Grid,
  ListItem,
  Body,
} from 'native-base';
import React, {Component} from 'react';
import {
  BackHandler,
  Dimensions,
  Image,
  ImageBackground,
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import Loader from '../../components/Loader';
import AuthController from '../../controllers/AuthController';
import {colors} from '../../theme/colors';
import PasswordRecovery from './PasswordRecovery';
import {images} from './styles';
import CheckBox from '@react-native-community/checkbox';
import CustomCheckBox from '../../components/CustomCheckBox';
import AsyncStorage from '@react-native-community/async-storage';
import SecuryStorageController from '../../controllers/SecuryStorageController';
import OneTapLogin from './OneTapLogin';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loader: false,
      remember: false,
      passwordRecoveryModal: false,
      oneTapLogin: false,
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentWillMount() {
    const {navigation} = this.props;
    this.getStoreCredential();
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
    this.focusListener = navigation.addListener('didBlur', () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        this.handleBackButtonClick,
      );
    });
    this.focusListener = navigation.addListener('didFocus', () => {
      BackHandler.addEventListener(
        'hardwareBackPress',
        this.handleBackButtonClick,
      );
      this.setState({
        username: '',
        password: '',
      });
    });
  }

  async getStoreCredential() {
    try {
      const value = await AsyncStorage.getItem('remember_credentials');
      if (value !== null && value != 'false') {
        const credentials = await SecuryStorageController.get();

        console.log(credentials);
        this.setState({
          ...credentials,
          remember: true,
          oneTapLogin: credentials.password ? true : false,
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async settStoreCredential(value) {
    try {
      await AsyncStorage.setItem('remember_credentials', value);
      return Promise.resolve('done');
    } catch (err) {
      console.log(err);
      return Promise.resolve(err);
    }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
    this.focusListener.remove();
  }

  handleBackButtonClick() {
    BackHandler.exitApp();
    return true;
  }

  validations = () => {
    if (isEmpty(this.state.username) || isEmpty(this.state.password)) {
      Toast.show({
        text: 'Usário e senha não podem ser vazios!',
        type: 'warning',
        duration: 3000,
      });
      return false;
    }
    return true;
  };

  goHome = () => {
    this.props.navigation.navigate('Home', {updade: true});
  };

  hasFields = field => {
    return isNull(field) || isUndefined(field) || isEmpty(field);
  };

  login() {
    if (!this.validations()) {
      return;
    }
    this.setState({loader: true});

    AuthController.index({
      username: this.state.username,
      password: this.state.password,
    })
      .then(res => {
        this.settStoreCredential(this.state.remember ? 'true' : 'false').then(
          () => {
            this.setState({loader: false});
            this.props.navigation.navigate('Home');
          },
        );
      })
      .catch(err => {
        console.log(err);
        this.setState({loader: false});
      });
  }

  oneTapAuthLogin = async () => {
    try {
      this.setState({loader: true});
      await AuthController.oneTapLogin();
      this.setState({loader: false});
      this.props.navigation.navigate('Home');
    } catch (err) {
      this.setState({loader: false});
      Toast.show({
        text:
          'Algo deu errado, aperte em entrar com outra conta e redigite seu usuário e senha.',
        type: 'warning',
      });
    } finally {
      this.setState({loader: false});
    }
  };

  anotherAccount = async () => {
    try {
      await SecuryStorageController.reset();
      await AuthController.cleanUserData();
      this.setState({
        oneTapLogin: false,
        password: '',
      });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <Container style={styles.container}>
        <StatusBar
          backgroundColor={colors.primary.main}
          barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
        />
        <Loader isVisible={this.state.loader} />
        <ImageBackground
          source={images.background}
          style={{width: '100%', height: '100%'}}>
          <View style={{width: '100%', height: '100%'}}>
            <Content
              contentContainerStyle={{
                flex: 1,
                alignItens: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
              }}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Image
                  source={require('../../images/logo_transporter.png')}
                  style={{
                    width: Dimensions.get('window').width * 0.6,
                    height: Dimensions.get('window').width * 0.5,
                    resizeMode: 'contain',
                  }}
                />
              </View>

              {this.state.oneTapLogin ? (
                <OneTapLogin
                  onLeave={this.anotherAccount}
                  username={this.state.username}
                  password={this.state.password}
                  onLogin={this.oneTapAuthLogin}
                />
              ) : (
                <View style={styles.loginContainer}>
                  <Form>
                    <Item style={styles.Item}>
                      <Icon
                        style={styles.icon}
                        type="FontAwesome"
                        name="user"
                      />
                      <Input
                        style={styles.input}
                        placeholder="Usuário"
                        value={this.state.username}
                        autoCapitalize="none"
                        onChangeText={username => {
                          this.setState({username});
                        }}
                      />
                    </Item>
                    <Item style={{...styles.Item, marginTop: 10}}>
                      <Icon
                        style={styles.icon}
                        type="FontAwesome"
                        name="lock"
                      />
                      <Input
                        style={styles.input}
                        placeholder="Senha"
                        value={this.state.password}
                        secureTextEntry={true}
                        onChangeText={password => {
                          this.setState({password});
                        }}
                      />
                    </Item>
                    <CustomCheckBox
                      label="Lembre-se"
                      checked={this.state.remember}
                      onValueChange={remember => {
                        this.setState({remember: remember});
                      }}
                    />
                    {/* <View style={{display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', marginTop: 10}}>
                    <Text onPress={()=> this.setState({passwordRecoveryModal: true})}>Esqueci minha senha</Text>
                  </View> */}
                    <Item style={styles.ItemButton}>
                      <Button
                        style={styles.button}
                        onPress={() => {
                          this.login();
                        }}>
                        <Text style={styles.buttonText}>ENTRAR</Text>
                      </Button>
                    </Item>
                  </Form>
                </View>
              )}
            </Content>
          </View>
        </ImageBackground>
        <PasswordRecovery
          open={this.state.passwordRecoveryModal}
          onClose={() => this.setState({passwordRecoveryModal: false})}
        />
      </Container>
    );
  }
}

export default Login;

const styles = StyleSheet.create({
  loginContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 7,
    margin: Dimensions.get('window').width * 0.08,
    paddingRight: 14,
    paddingTop: 15,
    paddingBottom: 20,
  },
  button: {
    borderRadius: 7,
    marginTop: 20,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  icon: {
    color: colors.primary.main,
  },
  text: {
    color: '#757575',
    fontSize: 12,
  },
  ItemButton: {
    borderColor: 'transparent',
    marginTop: 0,
  },
  Item: {
    borderBottomColor: colors.primary.main,
  },
});
