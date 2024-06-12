import { isEmpty } from 'lodash';
import moment from 'moment';
import { Container, Icon, Text, View } from 'native-base';
import React from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import CustomHeader from '../../../components/CustomHeader';
import InlineLoader from '../../../components/InlineLoader';
import LancamentosJornadaController from '../../../controllers/LancamentosJornadaController';
import { colors } from '../../../theme/colors';
import LancamentoFilter from './LancamentoFilter';
import LancamentoItem from './LancamentoItem';
import { styles } from './styles';

function Lancamentos(props) {
  const [collapse, onCollapse] = React.useState(true);
  const [loader, setLoader] = React.useState(false);

  const [period, onPeriodChange] = React.useState({
    startDate: moment().subtract(30, 'days'),
    endDate: moment().add(2, 'days'),
  });

  React.useEffect(() => {
    boot();
  }, []);

  async function boot() {
    try {
      await sync();
      await getLancamentos();
    }
    catch (err) {
      console.log(err)
    }
  }

  async function sync() {
    try {
      setLoader(true);
      const LancamentosJornadaCont = new LancamentosJornadaController();
      await LancamentosJornadaCont.syncNews();
    }
    catch (err) {
      console.log(err)
    }
    finally {
      setLoader(false);
    }
  }

  React.useEffect(() => {
    getLancamentos();
  }, [period.endDate, period.startDate]);

  async function getLancamentos() {
    try {
      setLoader(true);
      const LancamentosJornadaCont = new LancamentosJornadaController();
      const res = await LancamentosJornadaCont.index({
        startDate: period.startDate.format('yyyy-MM-DD'),
        endDate: period.endDate.format('yyyy-MM-DD'),
      });

    }
    catch (err) {
      console.log(err)
    }
    finally {
      setLoader(false);
    }
  }

  function onFilterChange(value, name) {
    onPeriodChange({
      ...period,
      [name]: moment(value),
    });
  }

  const renderItem = ({ item, index }) => (
    <LancamentoItem item={item} index={index} lancamentos={props.lancamentos} />
  );
  
  const keyExtractor = (item, index) => 'jornada_lancamento_item_' + index + item.data;

  const emptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text>Sem lançamentos para esse período.</Text>
      <Icon
        type="FontAwesome"
        name="ellipsis-h"
        style={{ color: colors.secondary.main }}
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
            onPress={boot}
            style={{ color: 'white' }}
          />
        }
      />
      <FlatList
        ListHeaderComponent={
          <LancamentoFilter
            isCollapsed={collapse}
            onCollapse={() => onCollapse(!collapse)}
            onChange={onFilterChange}
            period={period}
          />
        }
        data={!isEmpty(props.lancamentos) && !isEmpty(props.lancamentos.list) ? props.lancamentos.list : []}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListEmptyComponent={!loader ? emptyComponent : null}
        ListFooterComponent={loader ? <InlineLoader isVisible={loader} /> : null}
      />
    </Container>
  );
}

const mapStateToProps = store => ({
  lancamentos: store.lancamentos.lancamentos,
});

export default connect(mapStateToProps)(Lancamentos);
