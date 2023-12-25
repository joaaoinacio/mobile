import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {isEmpty} from 'lodash';
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
} from 'native-base';
import React, {useCallback} from 'react';
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
import CustomCheckBox from '../../components/CustomCheckBox';
import Loader from '../../components/Loader';
import AuthController from '../../controllers/AuthController';
import SecuryStorageController from '../../controllers/SecuryStorageController';
import {colors} from '../../theme/colors';
import OneTapLogin from './OneTapLogin';
import PasswordRecovery from './PasswordRecovery';
import {images} from './styles';

function Login() {
  const [state, setState] = React.useState({
    username: '',
    password: '',
    loader: false,
    remember: false,
    passwordRecoveryModal: false,
    oneTapLogin: false,
  });
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      function handleBackButtonClick() {
        BackHandler.exitApp();
        return true;
      }

      getStoreCredential();
      BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);

      return () => {
        BackHandler.removeEventListener(
          'hardwareBackPress',
          handleBackButtonClick,
        );

        setState(prevState => ({...prevState, username: '', password: ''}));
      };
    }, []),
  );

  async function getStoreCredential() {
    try {
      const value = await AsyncStorage.getItem('remember_credentials');
      if (value !== null && value !== 'false') {
        const credentials = await SecuryStorageController.get();
        setState(prevState => ({
          ...prevState,
          ...credentials,
          remember: true,
          oneTapLogin: credentials.password ? true : false,
        }));
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function settStoreCredential(value) {
    try {
      await AsyncStorage.setItem('remember_credentials', value);
      return Promise.resolve('done');
    } catch (err) {
      console.log(err);
      return Promise.resolve(err);
    }
  }

  const validations = () => {
    if (isEmpty(state.username) || isEmpty(state.password)) {
      Toast.show({
        text: 'Usário e senha não podem ser vazios!',
        type: 'warning',
        duration: 3000,
      });
      return false;
    }
    return true;
  };

  const goHome = () => {
    navigation.navigate('Home', {updade: true});
  };

  function login() {
    if (!validations()) {
      return;
    }
    setState(prevState => ({...prevState, loader: true}));

    AuthController.index({
      username: state.username,
      password: state.password,
    })
      .then(res => {
        settStoreCredential(state.remember ? 'true' : 'false').then(() => {
          setState(prevState => ({...prevState, loader: false}));
          navigation.navigate('Home');
        });
      })
      .catch(err => {
        console.log(err);
        setState(prevState => ({...prevState, loader: false}));
      });
  }

  const oneTapAuthLogin = async () => {
    try {
      setState(prevState => ({...prevState, loader: true}));
      await AuthController.oneTapLogin();
      setState(prevState => ({...prevState, loader: false}));
      navigation.navigate('Home');
    } catch (err) {
      setState(prevState => ({...prevState, loader: false}));
      Toast.show({
        text: 'Algo deu errado, aperte em entrar com outra conta e redigite seu usuário e senha.',
        type: 'warning',
      });
    } finally {
      setState(prevState => ({...prevState, loader: false}));
    }
  };

  const anotherAccount = async () => {
    try {
      await SecuryStorageController.reset();
      await AuthController.cleanUserData();
      setState(prevState => ({...prevState, oneTapLogin: false, password: ''}));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container style={styles.container}>
      <StatusBar
        backgroundColor={colors.primary.main}
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
      />
      <Loader isVisible={state.loader} />
      <ImageBackground
        source={images.background}
        style={{width: '100%', height: '100%'}}>
        <View style={{width: '100%', height: '100%'}}>
          <Content
            contentContainerStyle={{
              flex: 1,
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

            {state.oneTapLogin ? (
              <OneTapLogin
                onLeave={anotherAccount}
                username={state.username}
                password={state.password}
                onLogin={oneTapAuthLogin}
              />
            ) : (
              <View style={styles.loginContainer}>
                <Form>
                  <Item style={styles.Item}>
                    <Icon style={styles.icon} type="FontAwesome" name="user" />
                    <Input
                      style={styles.input}
                      placeholder="Usuário"
                      value={state.username}
                      autoCapitalize="none"
                      onChangeText={username => {
                        setState(prevState => ({...prevState, username}));
                      }}
                    />
                  </Item>
                  <Item style={{...styles.Item, marginTop: 10}}>
                    <Icon style={styles.icon} type="FontAwesome" name="lock" />
                    <Input
                      style={styles.input}
                      placeholder="Senha"
                      value={state.password}
                      secureTextEntry={true}
                      onChangeText={password => {
                        setState(prevState => ({...prevState, password}));
                      }}
                    />
                  </Item>
                  <CustomCheckBox
                    label="Lembre-se"
                    checked={state.remember}
                    onValueChange={remember => {
                      setState(prevState => ({
                        ...prevState,
                        remember: remember,
                      }));
                    }}
                  />
                  <Item style={styles.ItemButton}>
                    <Button
                      style={styles.button}
                      onPress={() => {
                        login();
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
        open={state.passwordRecoveryModal}
        onClose={() =>
          setState(prevState => ({...prevState, passwordRecoveryModal: false}))
        }
      />
    </Container>
  );
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
