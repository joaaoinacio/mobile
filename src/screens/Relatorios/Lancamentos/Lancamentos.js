import {Container, Text, Icon, View} from 'native-base';
import React from 'react';
import CustomHeader from '../../../components/CustomHeader';
import {styles, images} from './styles';
import {connect} from 'react-redux';
import {FlatList, ScrollView} from 'react-native';
import {isEmpty, isUndefined} from 'lodash';
import JornadaController from '../../../controllers/JornadaController';
import moment from 'moment';
import LancamentoItem from './LancamentoItem';
import LancamentoFilter from './LancamentoFilter';
import {colors} from '../../../theme/colors';
import InlineLoader from '../../../components/InlineLoader';

function Lancamentos(props) {
  const [collapse, onCollapse] = React.useState(true);
  const [loader, setLoader] = React.useState(true);

  const [period, onPeriodChange] = React.useState({
    startDate: moment().subtract(30, 'days'),
    endDate: moment().add(2, 'days'),
  });

  React.useEffect(() => {
    getLancamentos(period.startDate, period.endDate);
  }, [period.endDate, period.startDate]);

  function getLancamentos(startDate, endDate) {
    setLoader(true);
    setTimeout(() => {
      if (moment().diff(moment(startDate), 'days') >= 59) {
        console.log('teste');
        JornadaController.getLancamentosAPI(
          moment().diff(moment(startDate), 'days'),
        )
          .then(() => {
            setLoader(false);
          })
          .catch(err => {
            setLoader(false);
            console.log(err);
          });
      } else {
        JornadaController.getLancamentos(
          'data > ' +
            moment(startDate).format('YYYY-MM-DD@HH:mm:ss') +
            ' AND ' +
            'data < ' +
            moment(endDate).format('YYYY-MM-DD@HH:mm:ss'),
        )
          .then(() => {
            setLoader(false);
          })
          .catch(() => {
            setLoader(false);
          });
      }
    }, 500);
  }

  async function syncWithApi(startDate, endDate) {
    try {
      setLoader(true);
      await JornadaController.syncLancamentosEnviar();
      await JornadaController.syncLancamentosApi();
      await JornadaController.getLancamentos(
        'data > ' +
          moment(startDate).format('YYYY-MM-DD@HH:mm:ss') +
          ' AND ' +
          'data < ' +
          moment(endDate).format('YYYY-MM-DD@HH:mm:ss'),
      );
      setLoader(false);
    } catch (err) {
      setLoader(false);
      console.log(err);
    }
  }

  function onFilterChange(value, name) {
    setLoader(true);
    onPeriodChange({
      ...period,
      [name]: moment(value),
    });
    if (name === 'startDate') {
      getLancamentos(moment(value), period.endDate);
    } else {
      getLancamentos(period.startDate, moment(value));
    }
    setLoader(false);
  }

  const renderItem = ({item, index}) => (
    <LancamentoItem item={item} index={index} lancamentos={props.lancamentos} />
  );
  const keyExtractor = (item, index) =>
    'jornada_lancamento_item' + index + item.data;
  const emptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text>Sem lançamentos para esse período.</Text>
      <Icon
        type="FontAwesome"
        name="ellipsis-h"
        style={{color: colors.secondary.main}}
      />
    </View>
  );

  return (
    <Container>
      <CustomHeader
        title="LANÇAMENTOS"
        navigation={props}
        icon={
          <Icon
            type="MaterialIcons"
            name="sync"
            onPress={() => syncWithApi(period.startDate, period.endDate)}
            style={{
              color: 'white',
            }}
          />
        }
      />
      <ScrollView stickyHeaderIndices={[0]}>
        <LancamentoFilter
          isCollapsed={collapse}
          onCollapse={() => onCollapse(!collapse)}
          onChange={onFilterChange}
          period={period}
        />
        {loader &&
        !isEmpty(props.lancamentos) &&
        !isEmpty(props.lancamentos.list) &&
        props.lancamentos.list.length > 7 ? (
          <InlineLoader isVisible={loader} dense />
        ) : null}
        <FlatList
          data={
            !isEmpty(props.lancamentos) && !isEmpty(props.lancamentos.list)
              ? props.lancamentos.list
              : []
          }
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          ListEmptyComponent={!loader ? emptyComponent : null}
        />
        {loader ? <InlineLoader isVisible={loader} /> : null}
      </ScrollView>
    </Container>
  );
}

const mapStateToProps = store => ({
  lancamentos: store.lancamentos.lancamentos,
});

export default connect(mapStateToProps)(Lancamentos);
