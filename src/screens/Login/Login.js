import { isEmpty, isNull, isUndefined } from 'lodash';
import { Button, Container, Content, Form, Icon, Input, Item, Text, Toast, Grid } from 'native-base';
import React, { Component } from 'react';
import { BackHandler, Dimensions, Image, ImageBackground, Platform, StatusBar, StyleSheet, View } from 'react-native';
import Loader from '../../components/Loader';
import AuthController from '../../controllers/AuthController';
import { colors } from '../../theme/colors';
import PasswordRecovery from './PasswordRecovery';
import {images} from './styles';




class Login extends Component {
  constructor(props){
    super(props);  
    this.state = {
      username: '',
      password: '',
      loader: false,
      passwordRecoveryModal: false 
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
}


componentWillMount() {
  const { navigation } = this.props;
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    this.focusListener = navigation.addListener("didBlur", () => {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);      
    });
    this.focusListener = navigation.addListener("didFocus", () => {     
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
      this.setState({
        username: '',
        password: '',
      })      
    });   
}

componentWillUnmount() {
  BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  this.focusListener.remove();
}

handleBackButtonClick() {
  BackHandler.exitApp()
  return true;
}

validations = () => {
  if(isEmpty(this.state.username) || isEmpty(this.state.password))
  {
    Toast.show({
      text: 'Usário e senha não podem ser vazios!',
      type: 'warning',
      duration: 3000
    })
    return false 
  }
  return true
  
}


goHome = () => {
  this.props.navigation.navigate('Home', {updade: true})
}


hasFields = (field) => {
  return isNull(field) || isUndefined(field) || isEmpty(field)
};

login () {
  if(!this.validations()){
    return
  }
  this.setState({loader: true})
  
  AuthController.index({
    username: this.state.username,
    password: this.state.password
  }).then((res) => {
    this.setState({loader: false})
    this.props.navigation.navigate('Home')
  })
  .catch(err => {
    console.log(err)
    this.setState({loader: false})
  })
};

  render() {
    return (
      <Container style={styles.container}> 
        <StatusBar backgroundColor={colors.primary.main} barStyle={Platform.OS === 'ios' ? "dark-content" : "light-content"} />       
        <Loader isVisible={this.state.loader}/>
        <ImageBackground source={images.background} style={{width: '100%', height: '100%'}}>
          <View  style={{width: '100%', height: '100%'}}>
          <Content  
            contentContainerStyle={{
              flex: 1, 
              alignItens: 'center', 
              justifyContent: 'center',
              flexDirection: 'column'
            }}>
            <View style={{ justifyContent: 'center', alignItems: 'center'}}>
              <Image 
                source={require('../../images/logo_transporter.png')} 
                style={{
                  width:  Dimensions.get('window').width*0.6, 
                  height: Dimensions.get('window').width*0.5,
                  resizeMode: 'contain'
                }}
              />
            </View>
              
              <View style={styles.loginContainer}>
                  <Form>
                  <Item style={ styles.Item }>
                    <Icon style={styles.icon} type='FontAwesome' name='user' />
                    <Input
                      style={styles.input}
                      placeholder='Usuário'              
                      value={this.state.username}
                      autoCapitalize = 'none'
                      onChangeText={username => {                  
                        this.setState({ username })
                      }}
                    />
                  </Item>
                  <Item style={{...styles.Item, marginTop: 10}}>
                    <Icon style={styles.icon} type='FontAwesome' name='lock' />
                    <Input
                      style={styles.input}
                      placeholder='Senha'                
                      value={this.state.password}
                      secureTextEntry={true}                    
                      onChangeText={password => {                    
                        this.setState({ password})
                      }}
                    />                  
                  </Item>
                  <View style={{display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', marginTop: 10}}>
                    <Text onPress={()=> this.setState({passwordRecoveryModal: true})}>Esqueci minha senha</Text>
                  </View>
                  <Item style={ styles.ItemButton }>
                    <Button style={styles.button} onPress={() => { this.login() }}>
                      <Text style={styles.buttonText}>ENTRAR</Text>
                    </Button>
                  </Item>             
                </Form>
              </View>
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
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      borderRadius: 7, 
      margin: Dimensions.get('window').width*0.08 ,
      paddingRight: 14,
      paddingTop: 15,
      paddingBottom: 20
    },
    button: {     
      borderRadius:7,
      marginTop: 20,
      textAlign: 'center',
      justifyContent: 'center', 
      alignItems: 'center',
      width: '100%'
    },
    icon: {
      color: colors.primary.main,      
    },
    text: {
      color: '#757575',
      fontSize: 12    
    },
    ItemButton: {
       borderColor: 'transparent',
       marginTop: 10, 
    },
    Item: {
      borderBottomColor: colors.primary.main
    }
});

