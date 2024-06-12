import { isEmpty } from 'lodash';
import { Container, Text } from 'native-base';
import React from 'react';
import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import CustomHeader from '../../../components/CustomHeader';
import { styles } from './styles';

function MenuItem({
  descricao,
  icone,
  navigation,
  id
}) {
  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.card} onPress={() => navigation.navigate('JornadaLancamento', { descricao: descricao, id: id })}>
      <Image source={{ uri: icone }} style={styles.image} />
      <Text style={styles.textMore}>
        {descricao}
      </Text>
    </TouchableOpacity>
  )
}

function JornadaMenuMore(props) {
  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.row}>
        <MenuItem {...item} navigation={props.navigation} />
      </View>
    )
  }

  const keyExtractor = (item) => 'jornada_menu_item' + item.id;

  return (
    <Container>
      <CustomHeader title="OUTROS EVENTOS" navigation={props} back />
      <FlatList
        style={styles.root}
        data={!isEmpty(props.jornada) && !isEmpty(props.jornada.menu) && props.jornada.menu.length >= 6 ? props.jornada.menu.slice(5, props.jornada.menu.length) : []}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 10 }}  // Adicione o estilo de padding diretamente aqui
      />
    </Container>
  );
}

const mapStateToProps = store => ({
  jornada: store.jornada.jornada
});

export default connect(mapStateToProps)(JornadaMenuMore);
