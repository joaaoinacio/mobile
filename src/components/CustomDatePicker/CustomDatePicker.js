import React from 'react';
import { styles } from './styles';
import DatePicker from 'react-native-datepicker'
import {Icon, Item, Label} from 'native-base';
import {View} from 'react-native';
import moment from 'moment';

const CustomDatePicker = ({
    onDateChange,
    date,
    placeholder,
    label,
    ...restProps
}) => (
        <View style={styles.root}>
            <Item style={styles.datePicker} stackedLabel>
                <Label>{label}</Label>
                <DatePicker                                
                    locale={"pt-br"}
                    style={{width: '100%'}}            
                    confirmBtnText="Confirmar"
                    format="DD/MM/YYYY"
                    cancelBtnText="Cancelar"   
                    placeholder={placeholder}                       
                    placeHolderTextStyle={{ color: "#757575" }}
                    onDateChange={(newDate) => onDateChange(moment(newDate, 'DD/MM/YYYY'))}
                    date={date}
                    customStyles={styles.customStyles}
                    iconComponent={
                        <Icon 
                            name='calendar' 
                            type="FontAwesome" 
                            style={styles.dateIcon}
                        />
                    }
                    {...restProps}                                                          
                />
            </Item>
        </View>
        

) 


export default CustomDatePicker