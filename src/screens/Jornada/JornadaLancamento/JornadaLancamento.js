import {isEmpty} from 'lodash';
import {Container, Text, Content, Grid, Col} from 'native-base';
import React from 'react';
import {FlatList, Image, TouchableOpacity, View} from 'react-native';
import CustomHeader from '../../../components/CustomHeader';
import {styles} from './styles';
import CustomCard from '../../../components/CustomCard';
import MaterialTextField from '../../../components/MaterialTextField';
import CustomButton from '../../../components/CustomButton';
import {connect} from 'react-redux';
import moment from 'moment';
import GeolocationController from '../../../controllers/GeolocationController';
import Modal from '../../../components/Modal';
import JornadaController from '../../../controllers/JornadaController';
import Loader from '../../../components/Loader';

function CardContent({motorista, veiculo, data, hora}) {
  return (
    <View>
      <Text>Motorista: {motorista}</Text>
      <Text>Veículo: {veiculo}</Text>
      <Text>{'\n'}</Text>
      <Text>Data: {data}</Text>
      <Text>Hora Início: {hora}</Text>
    </View>
  );
}

function JornadaLancamento(props) {
  const [values, onChange] = React.useState({
    obs: '',
    data: moment().format('DD/MM/YYYY'),
    hora: moment().format('HH:mm'),
    full_date: new Date(),
  });

  const [savedModal, onChangeSavedModal] = React.useState(false);
  const [errorModal, onChangeErrorModal] = React.useState(false);
  const [loader, setLoader] = React.useState(false);

  const onTextFieldChange = (value, name) => {
    onChange({
      ...values,
      [name]: value,
    });
  };

  React.useEffect(() => {
    GeolocationController.index();
  }, []);

  async function storeLancamento() {
    try {
      setLoader(true);
      let data = {
        latitude:
          props.geolocation &&
          props.geolocation.coords &&
          props.geolocation.coords.latitude
            ? props.geolocation.coords.latitude
            : 0,
        longitude:
          props.geolocation &&
          props.geolocation.coords &&
          props.geolocation.coords.longitude
            ? props.geolocation.coords.longitude
            : 0,
        data: values.full_date,
        user_id: props.user && props.user.user && props.user.user.id,
        empresa_id:
          props.user &&
          props.user.user &&
          props.user.user.empresa &&
          props.user.user.empresa.id,
        user_nome: props.user && props.user.user && props.user.user.name,
        veiculo_nome:
          props.user &&
          props.user.user &&
          props.user.user.veiculo &&
          props.user.user.veiculo.veiculo &&
          props.user.user.veiculo.veiculo.placa
            ? props.user.user.veiculo.veiculo.placa
            : 'Sem Placa',
        veiculo_id:
          props.user &&
          props.user.user &&
          props.user.user.veiculo &&
          props.user.user.veiculo.id,
        obs: values.obs,
        status: 3,
        tipo_id:
          props.navigation.state.params && props.navigation.state.params.id,
        descricao:
          props.navigation.state.params &&
          props.navigation.state.params.descricao,
      };

      await JornadaController.store(data);
      onChangeSavedModal(true);
    } catch (err) {
      onChangeErrorModal(true);
      setLoader(false);
    } finally {
      setLoader(false);
    }
  }

  function onCloseSaveModal() {
    onChangeSavedModal(false);
    props.navigation.goBack();
  }

  function onCloseErrorModal() {
    onChangeErrorModal(false);
  }

  return (
    <Container>
      <CustomHeader
        title={
          props.navigation.state.params &&
          props.navigation.state.params.descricao
        }
        navigation={props}
        back
      />
      <Content contentContainerStyle={styles.content}>
        <CustomCard
          title={
            'Evento: ' +
            (props.navigation.state.params
              ? props.navigation.state.params.descricao
              : '')
          }
          content={
            <CardContent
              motorista={props.user && props.user.user && props.user.user.name}
              veiculo={
                props.user &&
                props.user.user &&
                props.user.user.veiculo &&
                props.user.user.veiculo.veiculo &&
                props.user.user.veiculo.veiculo.placa
                  ? props.user.user.veiculo.veiculo.placa
                  : 'Sem Placa'
              }
              data={values.data}
              hora={values.hora}
            />
          }
        />

        <MaterialTextField
          label="Observação"
          value={values.obs}
          inputContainerPadding={30}
          multiline
          placeholder="Digite aqui..."
          onChangeText={value => onTextFieldChange(value, 'obs')}
        />

        <Grid style={{marginTop: 20}}>
          <Col style={{paddingRight: 5}}>
            <CustomButton
              text="Cancelar"
              type="cancel"
              onPress={() => props.navigation.goBack()}
            />
          </Col>
          <Col style={{paddingLeft: 5}}>
            <CustomButton text="Salvar" onPress={storeLancamento} />
          </Col>
        </Grid>
        <Modal
          isVisible={savedModal}
          onClose={onCloseSaveModal}
          text="Lançamento realizado com sucesso!"
          type={'sucess'}
        />
        <Modal
          isVisible={errorModal}
          onClose={onCloseErrorModal}
          text="O lançamento não pode ser realizado..."
          type={'error'}
        />
        <Loader isVisible={loader} />
      </Content>
    </Container>
  );
}

const mapStateToProps = store => ({
  user: store.user.user,
  geolocation: store.geolocation.geolocation,
});

export default connect(
  mapStateToProps,
  null,
)(JornadaLancamento);
