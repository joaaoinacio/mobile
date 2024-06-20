// import {Text, View, Grid, Col, Icon, Row} from 'native-base';
// import React from 'react';
// import {TouchableOpacity} from 'react-native';
// import Collapsible from 'react-native-collapsible';
// import {styles} from './styles';
// import CustomDatePicker from '../../../components/CustomDatePicker';
// import moment from 'moment';

// function CollapseContainer({startDate, endDate, onDateChange}) {
//   return (
//     <View style={styles.collapseContainer}>
//       <CustomDatePicker
//         maximumDate={moment(endDate, 'DD/MM/YYYY').subtract(1, 'days').toDate()}
//         date={startDate}
//         placeholder="Data Ínicio"
//         label="Data Ínicio"
//         onDateChange={newDate => onDateChange(newDate, 'startDate')}
//       />
//       <CustomDatePicker
//         minimumDate={moment(startDate, 'DD/MM/YYYY').add(1, 'days').toDate()}
//         date={endDate}
//         placeholder="Data Fim"
//         label="Data Fim"
//         onDateChange={newDate => onDateChange(newDate, 'endDate')}
//       />
//     </View>
//   );
// }

// const LancamentoFilter = ({isCollapsed, onCollapse, period, onChange}) => {
//   return (
//     <View>
//       <TouchableOpacity
//         style={styles.filterContainer}
//         onPress={onCollapse}
//         activeOpacity={0.7}>
//         <Grid style={styles.filterHeader}>
//           <Col style={{width: '90%'}}>
//             <Text style={styles.filterMainText}>Período</Text>
//             <Text style={styles.filterSmallText}>
//               De: {moment(period.startDate).format('DD/MM/YYYY')} Até{' '}
//               {moment(period.endDate).format('DD/MM/YYYY')}
//             </Text>
//           </Col>
//           <Col>
//             <Icon
//               type="Entypo"
//               name="dots-three-vertical"
//               style={styles.filterMenuIcon}
//             />
//           </Col>
//         </Grid>
//       </TouchableOpacity>
//       <Collapsible collapsed={isCollapsed}>
//         <CollapseContainer
//           startDate={period.startDate}
//           endDate={period.endDate}
//           onDateChange={onChange}
//         />
//       </Collapsible>
//     </View>
//   );
// };

// export default LancamentoFilter;

import { Text, View, Grid, Col, Icon } from 'native-base';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { styles } from './styles';
import CustomDatePicker from '../../../components/CustomDatePicker';
import moment from 'moment';

function CollapseContainer({ startDate, endDate, onDateChange }) {
  console.log('CollapseContainer initial startDate:', startDate);
  console.log('CollapseContainer initial endDate:', endDate);

  const maxDate = moment(endDate, 'DD/MM/YYYY').subtract(1, 'days').toDate();
  const minDate = moment(startDate, 'DD/MM/YYYY').add(1, 'days').toDate();

  console.log('CollapseContainer maxDate for startDate picker:', maxDate);
  console.log('CollapseContainer minDate for endDate picker:', minDate);

  return (
    <View style={styles.collapseContainer}>
      <CustomDatePicker
        maximumDate={maxDate}
        date={startDate}
        placeholder="Data Ínicio"
        label="Data Ínicio"
        onDateChange={newDate => {
          console.log('New startDate selected:', newDate);
          onDateChange(newDate, 'startDate');
        }}
      />
      <CustomDatePicker
        minimumDate={minDate}
        date={endDate}
        placeholder="Data Fim"
        label="Data Fim"
        onDateChange={newDate => {
          console.log('New endDate selected:', newDate);
          onDateChange(newDate, 'endDate');
        }}
      />
    </View>
  );
}

const LancamentoFilter = ({ isCollapsed, onCollapse, period, onChange }) => {
  console.log('LancamentoFilter initial period:', period);

  const formattedStartDate = moment(period.startDate).format('DD/MM/YYYY');
  const formattedEndDate = moment(period.endDate).format('DD/MM/YYYY');

  console.log('LancamentoFilter formatted startDate:', formattedStartDate);
  console.log('LancamentoFilter formatted endDate:', formattedEndDate);

  return (
    <View>
      <TouchableOpacity
        style={styles.filterContainer}
        onPress={onCollapse}
        activeOpacity={0.7}
      >
        <Grid style={styles.filterHeader}>
          <Col style={{ width: '90%' }}>
            <Text style={styles.filterMainText}>Período</Text>
            <Text style={styles.filterSmallText}>
              De: {formattedStartDate} Até {formattedEndDate}
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
      <Collapsible
        collapsed={isCollapsed}
        useNativeDriver={false} // Adicione esta linha
      >
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
