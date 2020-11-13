import {Container} from 'native-base';
import React from 'react';

import AuthController from '../../controllers/AuthController';
import {styles} from './styles';
import AnimatedTextLoading from '../../components/AnimatedTextLoading';
import {colors} from '../../theme/colors';
import {Platform, StatusBar} from 'react-native';
import BootController from '../../controllers/BootController';

import {setBootList} from '../../store/actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ErrorHandle from '../../controllers/ErrorHandle';

function Home(props) {
  const [token, hasToken] = React.useState(false);

  React.useEffect(() => {
    AuthController.isLogged()
      .then(res => {
        if (!res) {
          return;
        }
        hasToken(true);
        BootController.index()
          .then(res => {
            props.navigation.navigate('Jornada');
          })
          .catch(err => {
            ErrorHandle.store(err);
            props.navigation.navigate('Jornada');
          });
      })
      .catch(err => {});
  }, []);

  if (!token) {
    return null;
  }
  return (
    <Container style={styles.root}>
      <StatusBar
        backgroundColor={colors.primary.main}
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
      />
      {/* <CustomHeader title="" navigation={props}/> */}
      <AnimatedTextLoading
        data={props.bootList ? props.bootList.list : ['Carregando Aguarde...']}
      />
    </Container>
  );
}

const mapStateToProps = store => ({
  bootList: store.bootList.bootList,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({setBootList}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
