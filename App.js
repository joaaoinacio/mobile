import React from 'react';
import Setup from './src/boot/setup';
import SplashScreen from 'react-native-splash-screen';

console.disableYellowBox = true;

export default class App extends React.Component {
  async componentDidMount() {
    SplashScreen.hide();
  }
  render() {
    return <Setup />;
  }
}
