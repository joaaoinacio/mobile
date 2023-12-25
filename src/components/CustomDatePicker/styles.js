import {colors} from '../../theme/colors';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  root: {
    width: '100%',
  },
  datePicker: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: colors.gray.light,
  },
  dateIcon: {
    color: '#616161',
    fontSize: 13,
    height: 15,
    marginBottom: 2,
  },
  dateText: {
    fontSize: 15,
    color: '#616161',
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    width: '100%',
    marginBottom: 10,
    height: 30,
  },
});
