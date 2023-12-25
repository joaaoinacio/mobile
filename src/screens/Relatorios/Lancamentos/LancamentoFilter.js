import {Text, View, Grid, Col, Icon, Row} from 'native-base';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {styles} from './styles';
import CustomDatePicker from '../../../components/CustomDatePicker';
import moment from 'moment';

function CollapseContainer({startDate, endDate, onDateChange}) {
  return (
    <View style={styles.collapseContainer}>
      <CustomDatePicker
        maximumDate={moment(endDate, 'DD/MM/YYYY').subtract(1, 'days').toDate()}
        date={startDate}
        placeholder="Data Ínicio"
        label="Data Ínicio"
        onDateChange={newDate => onDateChange(newDate, 'startDate')}
      />
      <CustomDatePicker
        minimumDate={moment(startDate, 'DD/MM/YYYY').add(1, 'days').toDate()}
        date={endDate}
        placeholder="Data Fim"
        label="Data Fim"
        onDateChange={newDate => onDateChange(newDate, 'endDate')}
      />
    </View>
  );
}

const LancamentoFilter = ({isCollapsed, onCollapse, period, onChange}) => {
  return (
    <View>
      <TouchableOpacity
        style={styles.filterContainer}
        onPress={onCollapse}
        activeOpacity={0.7}>
        <Grid style={styles.filterHeader}>
          <Col style={{width: '90%'}}>
            <Text style={styles.filterMainText}>Período</Text>
            <Text style={styles.filterSmallText}>
              De: {moment(period.startDate).format('DD/MM/YYYY')} Até{' '}
              {moment(period.endDate).format('DD/MM/YYYY')}
            </Text>
          </Col>
          <Col>
            <Icon
              type="Entypo"
              name="dots-three-vertical"
              style={styles.filterMenuIcon}
            />
          </Col>
        </Grid>
      </TouchableOpacity>
      <Collapsible collapsed={isCollapsed}>
        <CollapseContainer
          startDate={period.startDate}
          endDate={period.endDate}
          onDateChange={onChange}
        />
      </Collapsible>
    </View>
  );
};

export default LancamentoFilter;
