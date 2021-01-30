import { Root } from 'native-base';
import React from 'react';
import {
  createAppContainer,
  createDrawerNavigator,
  createStackNavigator,
} from 'react-navigation';
import { Provider } from 'react-redux';
import AuthController from './controllers/AuthController';
import NavigationService from './NavigationService';
import Login from './screens/Login';
import SideBar from './screens/Sidebar';
import { Store } from './store';
import Home from './screens/Home';
import JornadaMenu from './screens/Jornada/JornadaMenu';
import JornadaMenuMore from './screens/Jornada/JornadaMenuMore';
import JornadaLancamento from './screens/Jornada/JornadaLancamento';
import Lancamentos from './screens/Relatorios/Lancamentos';
import Config from './screens/Config';

const JornadaStack = createStackNavigator(
  {
    JornadaMenu: {
      screen: JornadaMenu,
    },
    JornadaMenuMore: {
      screen: JornadaMenuMore,
    },
    JornadaLancamento: {
      screen: JornadaLancamento,
    },
  },
  {
    initialRouteName: 'JornadaMenu',
    headerMode: 'none',
  },
);

const RelatoriosStack = createStackNavigator(
  {
    Lancamentos: {
      screen: Lancamentos,
    },
  },
  {
    initialRouteName: 'Lancamentos',
    headerMode: 'none',
  },
);

const ConfigStack = createStackNavigator(
  {
    Config: {
      screen: Config,
    },
  },
  {
    initialRouteName: 'Config',
    headerMode: 'none',
  },
);

const AppNavigator = createDrawerNavigator(
  {
    // Stack: { screen: Stack},
    Home: {
      screen: Home,
    },
    Jornada: {
      screen: JornadaStack,
    },
    Lancamentos: {
      screen: Lancamentos,
    },
    Config: {
      screen: ConfigStack,
    },
    Login: {
      screen: Login,
      navigationOptions: {
        drawerLockMode: 'locked-closed',
      },
    },
  },
  {
    initialRouteName: 'Home',
    unmountInactiveRoutes: true,
    contentComponent: props => <SideBar {...props} />,
  },
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
    };
  }

  componentDidMount() {
    AuthController.getUser().then(res => this.setState({ user: res }));
  }

  render() {
    return (
      <Provider store={Store}>
        <Root>
          <AppContainer
            ref={navigatorRef => {
              NavigationService.setTopLevelNavigator(navigatorRef);
            }}
            screenProps={{ user: this.state.user }}
          />
        </Root>
      </Provider>
    );
  }
}
