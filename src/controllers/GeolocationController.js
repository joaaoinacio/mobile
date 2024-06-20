// import Geolocation from '@react-native-community/geolocation';
// import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
// import {setGeolocation} from '../store/actions';
// import {Store} from '../store';
// import {Platform} from 'react-native';

// class GeolocationControllerClass {
//   watchId = null;

//   constructor() {
//     if (GeolocationControllerClass.instance) {
//       return GeolocationControllerClass.instance;
//     }
//     GeolocationControllerClass.instance = this;
//     this.setConfig();
//     return this;
//   }

//   async index() {
//     this.watchPosition();
//     Geolocation.getCurrentPosition(
//       position => {
//         Store.dispatch(
//           setGeolocation({
//             coords: position && position.coords,
//           }),
//         );
//         console.log(position);
//       },
//       error => {
//         console.log('geolocation error', error);
//       },
//       this.getConfig(),
//     );
//   }

//   async enableGPS() {
//     if (Platform.OS === 'ios') {
//       return Promise.resolve(true);
//     }

//     try {
//       const data =
//         await RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
//           interval: 10000,
//           fastInterval: 5000,
//         });

//       return data;
//     } catch (err) {
//       console.log(err);
//       throw err;
//     }
//   }

//   watchPosition() {
//     if (this.watchId) {
//       Geolocation.clearWatch(this.watchId);
//     }

//     this.watchId = Geolocation.watchPosition(
//       position => {
//         console.log(position);
//         Store.dispatch(
//           setGeolocation({
//             coords: position && position.coords,
//           }),
//         );
//       },
//       error => {
//         console.log('geolocation error', error);
//       },
//       this.getConfig(),
//     );
//   }

//   setConfig() {
//     Geolocation.setRNConfiguration({
//       skipPermissionRequests: true,
//     });
//   }

//   getConfig() {
//     return {
//       enableHighAccuracy: true,
//       timeout: 20000,
//       maximumAge: 0,
//     };
//   }
// }

// const GeolocationController = new GeolocationControllerClass();

// import {createDrawerNavigator} from '@react-navigation/drawer';
// import {NavigationContainer} from '@react-navigation/native';
// import React from 'react';
// import {Provider} from 'react-redux';

// import AuthController from './controllers/AuthController';
// import {navigationRef} from './NavigationService';

// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import Config from './screens/Config';
// import Home from './screens/Home';
// import JornadaLancamento from './screens/Jornada/JornadaLancamento';
// import JornadaMenu from './screens/Jornada/JornadaMenu';
// import JornadaMenuMore from './screens/Jornada/JornadaMenuMore';
// import Login from './screens/Login';
// import LancamentosScreen from './screens/Relatorios/Lancamentos'; // Renomeado para evitar conflito
// import SideBar from './screens/Sidebar';
// import {Store} from './store';
// import {Root, StyleProvider} from 'native-base';
// import getTheme from './theme/components';
// import variables from './theme/variables/commonColor';
// import SplashScreen from 'react-native-splash-screen';

// const Drawer = createDrawerNavigator();
// const Stack = createNativeStackNavigator();

// function JornadaStack() {
//   return (
//     <Stack.Navigator
//       initialRouteName="JornadaMenu"
//       screenOptions={{headerShown: false}}>
//       <Stack.Screen name="JornadaMenu" component={JornadaMenu} />
//       <Stack.Screen name="JornadaMenuMore" component={JornadaMenuMore} />
//       <Stack.Screen name="JornadaLancamento" component={JornadaLancamento} />
//     </Stack.Navigator>
//   );
// }

// function RelatoriosStack() {
//   return (
//     <Stack.Navigator
//       initialRouteName="LancamentosScreen" // Nome único
//       screenOptions={{headerShown: false}}>
//       <Stack.Screen name="LancamentosScreen" component={LancamentosScreen} /> 
//     </Stack.Navigator>
//   );
// }

// function ConfigStack() {
//   return (
//     <Stack.Navigator
//       initialRouteName="Config"
//       screenOptions={{headerShown: false}}>
//       <Stack.Screen name="Config" component={Config} />
//     </Stack.Navigator>
//   );
// }

// export default class App extends React.PureComponent {
//   constructor(props) {
//     super(props);
//     this.state = {user: ''};
//   }

//   componentDidMount() {
//     SplashScreen.hide();
//     AuthController.getUser().then(res => this.setState({user: res}));
//   }

//   render() {
//     return (
//       <Provider store={Store}>
//         <Root>
//           <StyleProvider style={getTheme(variables)}>
//             <NavigationContainer ref={navigationRef}>
//               <Drawer.Navigator
//                 initialRouteName="Home"
//                 screenOptions={{
//                   headerShown: false,
//                   unmountOnBlur: true,
//                 }}
//                 drawerContent={props => <SideBar {...props} />}>
//                 <Drawer.Screen name="Home" component={Home} />
//                 <Drawer.Screen name="Jornada" component={JornadaStack} />
//                 <Drawer.Screen name="Relatorios" component={RelatoriosStack} /> // Nome único
//                 <Drawer.Screen name="Config" component={ConfigStack} />
//                 <Drawer.Screen
//                   name="Login"
//                   component={Login}
//                   options={{
//                     gestureHandlerProps: {
//                       enabled: false,
//                     },
//                   }}
//                 />
//               </Drawer.Navigator>
//             </NavigationContainer>
//           </StyleProvider>
//         </Root>
//       </Provider>
//     );
//   }
// }


import Geolocation from '@react-native-community/geolocation';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler'; // Adicione esta linha
import {setGeolocation} from '../store/actions';
import {Store} from '../store';
import {Platform} from 'react-native';

class GeolocationControllerClass {
  watchId = null;

  constructor() {
    if (GeolocationControllerClass.instance) {
      return GeolocationControllerClass.instance;
    }
    GeolocationControllerClass.instance = this;
    this.setConfig();
    return this;
  }

  async index() {
    this.watchPosition();
    Geolocation.getCurrentPosition(
      position => {
        Store.dispatch(
          setGeolocation({
            coords: position && position.coords,
          }),
        );
        console.log(position);
      },
      error => {
        console.log('geolocation error', error);
      },
      this.getConfig(),
    );
  }

  async enableGPS() {
    console.log('GeolocationController.enableGPS start');
    if (Platform.OS === 'ios') {
      return Promise.resolve(true);
    }

    console.log(RNAndroidLocationEnabler); // Logue o objeto para verificar se a função está disponível

    try {
      const data = await RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
        interval: 10000,
        fastInterval: 5000,
      });
      console.log('GPS enabled successfully', data);
      return data;
    } catch (err) {
      console.log('Error enabling GPS:', err);
      throw err;
    }
  }

  watchPosition() {
    if (this.watchId) {
      Geolocation.clearWatch(this.watchId);
    }

    this.watchId = Geolocation.watchPosition(
      position => {
        console.log(position);
        Store.dispatch(
          setGeolocation({
            coords: position && position.coords,
          }),
        );
      },
      error => {
        console.log('geolocation error', error);
      },
      this.getConfig(),
    );
  }

  setConfig() {
    console.log('GeolocationController.setConfig start');
    Geolocation.setRNConfiguration({
      skipPermissionRequests: true,
    });
    console.log('Configuration set');
  }

  getConfig() {
    return {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 0,
    };
  }
}

const GeolocationController = new GeolocationControllerClass();

export default GeolocationController;
