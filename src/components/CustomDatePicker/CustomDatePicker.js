import React, {useState} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Icon, Item, Label} from 'native-base';
import moment from 'moment';
import {styles} from './styles';

const CustomDatePicker = ({onDateChange, date, label, ...restProps}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    hideDatePicker();
    onDateChange(moment(date));
  };

  return (
    <View style={styles.root}>
      <Item style={styles.datePicker} stackedLabel>
        {label && <Label>{label}</Label>}
        <TouchableOpacity onPress={showDatePicker} style={styles.dateInput}>
          <Icon name="calendar" type="FontAwesome" style={styles.dateIcon} />
          <Text style={styles.dateText}>
            {date ? moment(date).format('DD/MM/YYYY') : 'Select date'}
          </Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          {...restProps}
        />
      </Item>
    </View>
  );
};

export default CustomDatePicker;
