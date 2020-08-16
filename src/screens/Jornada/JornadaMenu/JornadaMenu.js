import { Container, Text, Content, Button, Toast} from 'native-base';
import React from 'react';
import CustomHeader from '../../../components/CustomHeader';
import { styles, images } from './styles';
import JornadaController from '../../../controllers/JornadaController';
import { connect } from 'react-redux';
import {TouchableOpacity, View, Image, FlatList, BackHandler } from 'react-native';
import {isEmpty} from 'lodash';
import ConnectionController from '../../../controllers/ConnectionController';


function MenuItem({
  descricao,
  id,
  icone,
  navigation
}){
  return(
    <TouchableOpacity activeOpacity={0.7} style={styles.card} onPress={() => navigation.navigate('JornadaLancamento', {descricao: descricao, id: id})}>
      <Image source={{uri: icone}} style={styles.image} resizeMode="contain"/>
      <Text style={styles.text}>
        {descricao}
      </Text>
    </TouchableOpacity>
  )
}

function MenuItemMore({
  descricao,
  icone,
  navigation
}){
  return(
    <TouchableOpacity activeOpacity={0.7} style={styles.card} onPress={() => navigation.navigate('JornadaMenuMore')}>
      <Image source={icone} style={styles.image}/>
      <Text style={styles.text}>
        {descricao}
      </Text>
    </TouchableOpacity>
  )
}


function JornadaMenu(props) {

    React.useEffect(() => {
      BackHandler.addEventListener('hardwareBackPress', backPress);
      props.navigation.addListener("didBlur", () => {
        BackHandler.removeEventListener('hardwareBackPress', backPress);      
      });
      props.navigation.addListener("didFocus", () => {     
        BackHandler.addEventListener('hardwareBackPress', backPress);
      });   
      JornadaController.index()
      checkConnetion()  
    }, []);

    const renderItem = ({item, index}) => {
      if(index > 5) return null
      if(index === 5)
        return(
          <View style={styles.column}>
            <MenuItemMore descricao="OUTROS" icone={images.outros_icon} navigation={props.navigation}/>
          </View>
        )
      return(
        <View style={styles.column}>
          <MenuItem {...item} navigation={props.navigation}/>
        </View>
      ) 
    }

    async function checkConnetion(){
      try{
        const is_connected = await ConnectionController.isConnected()
        if(!is_connected){
          Toast.show({
            text: 'Você esta usando o APP sem conexão com a internet.',
            type: 'warning',
            buttonText: 'ok'
          })
        }
      }
      catch(err){
        console.log(err)
      }
    } 


    const backPress = () => {
      BackHandler.exitApp()
      return true;
    }

    const keyExtractor = (item) =>  'jornada_menu_item' + item.id;

    console.log(props.jornada)

    return (
      <Container>
        <CustomHeader title="JORNADA" navigation={props}/>
        <FlatList
          style={styles.root}
          data={!isEmpty(props.jornada) && !isEmpty(props.jornada.menu) ? props.jornada.menu : []}
          keyExtractor={keyExtractor}
          numColumns={2}
          renderItem={renderItem} 
        />
      </Container>
    );
  
}

const mapStateToProps = store => ({
  jornada: store.jornada.jornada
});  


export default connect(mapStateToProps)(JornadaMenu);

