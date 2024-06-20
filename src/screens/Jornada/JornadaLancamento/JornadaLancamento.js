// import moment from 'moment';
// import {Col, Container, Content, Grid, Text} from 'native-base';
// import React from 'react';
// import {View} from 'react-native';
// import {connect} from 'react-redux';
// import CustomButton from '../../../components/CustomButton';
// import CustomCard from '../../../components/CustomCard';
// import CustomHeader from '../../../components/CustomHeader';
// import Loader from '../../../components/Loader';
// import MaterialTextField from '../../../components/MaterialTextField';
// import Modal from '../../../components/Modal';
// import GeolocationController from '../../../controllers/GeolocationController';
// import LancamentosJornadaController from '../../../controllers/LancamentosJornadaController';
// import ScanScreen from '../../../components/QrCode';
// import {styles} from './styles';
// import {Toast} from 'native-base';
// import {useRoute} from '@react-navigation/native';

// function CardContent({motorista, veiculo, data, hora}) {
//   return (
//     <View>
//       <Text>Motorista: {motorista}</Text>
//       <Text>Veículo: {veiculo}</Text>
//       <Text>{'\n'}</Text>
//       <Text>Data: {data}</Text>
//       <Text>Hora Início: {hora}</Text>
//     </View>
//   );
// }

// function JornadaLancamento(props) {
//   const route = useRoute();
//   const params = route.params;

//   const [values, onChange] = React.useState({
//     obs: '',
//     data: moment().format('DD/MM/YYYY'),
//     hora: moment().format('HH:mm'),
//     full_date: moment().utc(true),
//   });

//   const [savedModal, onChangeSavedModal] = React.useState(false);
//   const [errorModal, onChangeErrorModal] = React.useState(false);
//   const [disableButton, setDisableButton] = React.useState(false);
//   const [exigeQr, setExigeQr] = React.useState(false);
//   const [veiculoQr, setVeiculoQr] = React.useState(undefined);
//   const [loader, setLoader] = React.useState(false);

//   const onTextFieldChange = (value, name) => {
//     onChange({
//       ...values,
//       [name]: value,
//     });
//   };

//   React.useEffect(() => {
//     GeolocationController.index();
//     let index = props.jornadaTipos?.findIndex(
//       obj => obj.descricao == params?.descricao,
//     );
//     setExigeQr(props.jornadaTipos?.[index]?.exigeqrcode);

//     async function fetchMyAPI() {
//       const LancamentosJornadaCont = new LancamentosJornadaController();
//       const res = await LancamentosJornadaCont.index({
//         startDate: formatDate(new Date()),
//         endDate: formatDate(new Date()),
//       });
//     }

//     fetchMyAPI();
//   }, []);

//   function formatDate(date) {
//     var d = new Date(date),
//       month = '' + (d.getMonth() + 1),
//       day = '' + d.getDate(),
//       year = d.getFullYear();

//     if (month.length < 2) month = '0' + month;
//     if (day.length < 2) day = '0' + day;

//     return [year, month, day].join('-');
//   }

//   async function storeLancamento() {
//     try {
//       setDisableButton(true);
//       setLoader(true);
//       let data = {
//         latitude:
//           props.geolocation &&
//           props.geolocation.coords &&
//           props.geolocation.coords.latitude
//             ? props.geolocation.coords.latitude
//             : 0,
//         longitude:
//           props.geolocation &&
//           props.geolocation.coords &&
//           props.geolocation.coords.longitude
//             ? props.geolocation.coords.longitude
//             : 0,
//         data: values.full_date,
//         user_id: props.user && props.user.user && props.user.user.id,
//         empresa_id:
//           props.user &&
//           props.user.user &&
//           props.user.user.empresa &&
//           props.user.user.empresa.id,
//         user_nome: props.user && props.user.user && props.user.user.name,
//         veiculo_nome: veiculoQr
//           ? veiculoQr.placa
//           : props.user &&
//             props.user.user &&
//             props.user.user.veiculo &&
//             props.user.user.veiculo.veiculo &&
//             props.user.user.veiculo.veiculo.placa
//           ? props.user.user.veiculo.veiculo.placa
//           : 'Sem Placa',
//         veiculo_id: veiculoQr
//           ? veiculoQr.id
//           : props.user &&
//             props.user.user &&
//             props.user.user.veiculo &&
//             props.user.user.veiculo.id,
//         obs: values.obs,
//         status: 3,
//         tipo_id: params && params.id,
//         descricao: params && params.descricao,
//         new: true,
//       };
//       const LJornadaController = new LancamentosJornadaController();
//       await LJornadaController.store({data});
//       if (veiculoQr) await LJornadaController.setVeiculo({veiculo: veiculoQr});
//       onChangeSavedModal(true);
//     } catch (err) {
//       console.log('erro aqui', err);
//       onChangeErrorModal(true);
//       setLoader(false);
//     } finally {
//       setLoader(false);
//     }
//   }

//   function onCloseSaveModal() {
//     onChangeSavedModal(false);
//     props.navigation.goBack();
//   }

//   function onCloseErrorModal() {
//     onChangeErrorModal(false);
//     props.navigation.goBack();
//   }

//   const validaQR = async e => {
//     let i = props.veiculos?.findIndex(obj => e.data == obj.qrcode);
//     if (i > -1) {
//       setVeiculoQr(props.veiculos[i]);
//     } else
//       Toast.show({
//         text: 'Nenhum veículo cadastro para este código QR!',
//         type: 'error',
//         duration: 5000,
//         buttonText: 'Ok',
//       });
//   };

//   React.useEffect(() => {
//     if (veiculoQr) setExigeQr(false);
//   }, [veiculoQr]);

//   return (
//     <Container>
//       {exigeQr ? (
//         <ScanScreen onSuccess={validaQR} navigation={props.navigation} />
//       ) : (
//         <>
//           <CustomHeader
//             title={params && params.descricao}
//             navigation={props}
//             back
//           />
//           <Content contentContainerStyle={styles.content}>
//             {console.log('VEICULO QR ===>', veiculoQr)}
//             {console.log('PROPS USER ==>', props.user.user.veiculo)}
//             <CustomCard
//               title={'Evento: ' + (params ? params.descricao : '')}
//               content={
//                 <CardContent
//                   motorista={
//                     props.user && props.user.user && props.user.user.name
//                   }
//                   veiculo={
//                     veiculoQr
//                       ? veiculoQr.placa
//                       : props.user &&
//                         props.user.user &&
//                         props.user.user.veiculo &&
//                         props.user.user.veiculo.veiculo &&
//                         props.user.user.veiculo.veiculo.placa
//                       ? props.user.user.veiculo.veiculo.placa
//                       : 'Sem Placa'
//                   }
//                   data={values.data}
//                   hora={values.hora}
//                 />
//               }
//             />

//             <MaterialTextField
//               label="Observação"
//               value={values.obs}
//               inputContainerPadding={30}
//               multiline
//               placeholder="Digite aqui..."
//               onChangeText={value => onTextFieldChange(value, 'obs')}
//             />

//             <Grid style={{marginTop: 20}}>
//               <Col style={{paddingRight: 5}}>
//                 <CustomButton
//                   text="Cancelar"
//                   type="cancel"
//                   onPress={() => props.navigation.goBack()}
//                 />
//               </Col>
//               <Col style={{paddingLeft: 5}}>
//                 <CustomButton
//                   text="Salvar"
//                   onPress={storeLancamento}
//                   disabled={disableButton}
//                 />
//               </Col>
//             </Grid>
//             <Modal
//               isVisible={savedModal}
//               onClose={onCloseSaveModal}
//               text="Lançamento realizado com sucesso!"
//               type={'sucess'}
//             />
//             <Modal
//               isVisible={errorModal}
//               onClose={onCloseErrorModal}
//               text="O lançamento não pode ser realizado..."
//               type={'error'}
//             />
//             <Loader isVisible={loader} />
//           </Content>
//         </>
//       )}
//     </Container>
//   );
// }

// const mapStateToProps = store => ({
//   user: store.user.user,
//   geolocation: store.geolocation.geolocation,
//   jornadaTipos:
//     store.jornadaTipos &&
//     store.jornadaTipos.jornadaTipos &&
//     store.jornadaTipos.jornadaTipos.jornadaTipos,
//   veiculos:
//     store.veiculos &&
//     store.veiculos.veiculos &&
//     store.veiculos.veiculos.veiculos,
// });

// export default connect(mapStateToProps)(JornadaLancamento);

// ---------------------------------------------------------------------------

import moment from 'moment';
import {Col, Container, Content, Grid, Text} from 'native-base';
import React from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import CustomButton from '../../../components/CustomButton';
import CustomCard from '../../../components/CustomCard';
import CustomHeader from '../../../components/CustomHeader';
import Loader from '../../../components/Loader';
import MaterialTextField from '../../../components/MaterialTextField';
import Modal from '../../../components/Modal';
import GeolocationController from '../../../controllers/GeolocationController';
import LancamentosJornadaController from '../../../controllers/LancamentosJornadaController';
import ScanScreen from '../../../components/QrCode';
import {styles} from './styles';
import {Toast} from 'native-base';
import {useRoute} from '@react-navigation/native';
import Reactotron from 'reactotron-react-native';

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
  const route = useRoute();
  const params = route.params;

  const [values, onChange] = React.useState({
    obs: '',
    data: moment().format('DD/MM/YYYY'),
    hora: moment().format('HH:mm'),
    full_date: moment().utc(true),
  });

  Reactotron.log('Valor do values.full_date inicial: ', values.full_date);

  const [savedModal, onChangeSavedModal] = React.useState(false);
  const [errorModal, onChangeErrorModal] = React.useState(false);
  const [disableButton, setDisableButton] = React.useState(false);
  const [exigeQr, setExigeQr] = React.useState(false);
  const [veiculoQr, setVeiculoQr] = React.useState(undefined);
  const [loader, setLoader] = React.useState(false);

  const onTextFieldChange = (value, name) => {
    onChange({
      ...values,
      [name]: value,
    });
  };

  React.useEffect(() => {
    GeolocationController.index();
    let index = props.jornadaTipos?.findIndex(
      obj => obj.descricao == params?.descricao,
    );
    setExigeQr(props.jornadaTipos?.[index]?.exigeqrcode);

    async function fetchMyAPI() {
      const LancamentosJornadaCont = new LancamentosJornadaController();
      const res = await LancamentosJornadaCont.index({
        startDate: formatDate(new Date()),
        endDate: formatDate(new Date()),
      });
    }

    fetchMyAPI();
  }, []);

  function formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  async function storeLancamento() {
    try {
      setDisableButton(true);
      setLoader(true);
      Reactotron.log('Valores na hora do lançamento: ', values.full_date); // Log da hora no momento do lançamento
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
        veiculo_nome: veiculoQr
          ? veiculoQr.placa
          : props.user &&
            props.user.user &&
            props.user.user.veiculo &&
            props.user.user.veiculo.veiculo &&
            props.user.user.veiculo.veiculo.placa
          ? props.user.user.veiculo.veiculo.placa
          : 'Sem Placa',
        veiculo_id: veiculoQr
          ? veiculoQr.id
          : props.user &&
            props.user.user &&
            props.user.user.veiculo &&
            props.user.user.veiculo.id,
        obs: values.obs,
        status: 3,
        tipo_id: params && params.id,
        descricao: params && params.descricao,
        new: true,
      };

      Reactotron.log('Valor do values.full_date segundo valor: ', values.full_date);

      const LJornadaController = new LancamentosJornadaController();
      await LJornadaController.store({data});
      if (veiculoQr) await LJornadaController.setVeiculo({veiculo: veiculoQr});
      onChangeSavedModal(true);
    } catch (err) {
      console.log('erro aqui', err);
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
    props.navigation.goBack();
  }

  const validaQR = async e => {
    let i = props.veiculos?.findIndex(obj => e.data == obj.qrcode);
    if (i > -1) {
      setVeiculoQr(props.veiculos[i]);
    } else
      Toast.show({
        text: 'Nenhum veículo cadastro para este código QR!',
        type: 'error',
        duration: 5000,
        buttonText: 'Ok',
      });
  };

  React.useEffect(() => {
    if (veiculoQr) setExigeQr(false);
  }, [veiculoQr]);

  Reactotron.log('Valor do values.full_date no fim do codigo: ', values.full_date);

  return (
    <Container>
      {exigeQr ? (
        <ScanScreen onSuccess={validaQR} navigation={props.navigation} />
      ) : (
        <>
          <CustomHeader
            title={params && params.descricao}
            navigation={props}
            back
          />
          <Content contentContainerStyle={styles.content}>
            {console.log('VEICULO QR ===>', veiculoQr)}
            {console.log('PROPS USER ==>', props.user.user.veiculo)}
            <CustomCard
              title={'Evento: ' + (params ? params.descricao : '')}
              content={
                <CardContent
                  motorista={
                    props.user && props.user.user && props.user.user.name
                  }
                  veiculo={
                    veiculoQr
                      ? veiculoQr.placa
                      : props.user &&
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
                <CustomButton
                  text="Salvar"
                  onPress={storeLancamento}
                  disabled={disableButton}
                />
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
        </>
      )}
    </Container>
  );
}

const mapStateToProps = store => ({
  user: store.user.user,
  geolocation: store.geolocation.geolocation,
  jornadaTipos:
    store.jornadaTipos &&
    store.jornadaTipos.jornadaTipos &&
    store.jornadaTipos.jornadaTipos.jornadaTipos,
  veiculos:
    store.veiculos &&
    store.veiculos.veiculos &&
    store.veiculos.veiculos.veiculos,
});

export default connect(mapStateToProps)(JornadaLancamento);


