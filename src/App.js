/* eslint-disable react/no-unstable-nested-components */
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {Provider} from 'react-redux';

import AuthController from './controllers/AuthController';
import {navigationRef} from './NavigationService';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Config from './screens/Config';
import Home from './screens/Home';
import JornadaLancamento from './screens/Jornada/JornadaLancamento';
import JornadaMenu from './screens/Jornada/JornadaMenu';
import JornadaMenuMore from './screens/Jornada/JornadaMenuMore';
import Login from './screens/Login';
import Lancamentos from './screens/Relatorios/Lancamentos';
import SideBar from './screens/Sidebar';
import {Store} from './store';
import {Root, StyleProvider} from 'native-base';
import getTheme from './theme/components';
import variables from './theme/variables/commonColor';
import SplashScreen from 'react-native-splash-screen';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function JornadaStack() {
  return (
    <Stack.Navigator
      initialRouteName="JornadaMenu"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="JornadaMenu" component={JornadaMenu} />
      <Stack.Screen name="JornadaMenuMore" component={JornadaMenuMore} />
      <Stack.Screen name="JornadaLancamento" component={JornadaLancamento} />
    </Stack.Navigator>
  );
}

function RelatoriosStack() {
  return (
    <Stack.Navigator
      initialRouteName="Lancamentos"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Lancamentos" component={Lancamentos} />
    </Stack.Navigator>
  );
}

function ConfigStack() {
  return (
    <Stack.Navigator
      initialRouteName="Config"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Config" component={Config} />
    </Stack.Navigator>
  );
}

export default class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {user: ''};
  }

  componentDidMount() {
    SplashScreen.hide();
    AuthController.getUser().then(res => this.setState({user: res}));
  }

  render() {
    return (
      <Provider store={Store}>
        <Root>
          <StyleProvider style={getTheme(variables)}>
            <NavigationContainer ref={navigationRef}>
              <Drawer.Navigator
                initialRouteName="Home"
                screenOptions={{
                  headerShown: false,
                  unmountOnBlur: true,
                }}
                drawerContent={props => <SideBar {...props} />}>
                <Drawer.Screen name="Home" component={Home} />
                <Drawer.Screen name="Jornada" component={JornadaStack} />
                <Drawer.Screen name="Lancamentos" component={RelatoriosStack} />
                <Drawer.Screen name="Config" component={ConfigStack} />
                <Drawer.Screen
                  name="Login"
                  component={Login}
                  options={{
                    gestureHandlerProps: {
                      enabled: false,
                    },
                  }}
                />
              </Drawer.Navigator>
            </NavigationContainer>
          </StyleProvider>
        </Root>
      </Provider>
    );
  }
}
