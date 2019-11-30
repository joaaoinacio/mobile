import { Text } from 'native-base';
import React from 'react';
import { View, Switch } from 'react-native';
import { colors } from '../theme/colors';

export default function CustomSwitch({
    value,
    onValueChange,
    title
}) {
    return (     
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <Switch
                onValueChange = {onValueChange}
                value = {value}
                trackColor={{
                  true: colors.primary.main,
                  false: colors.cinza.light
                }}
                thumbColor = {
                    value ? colors.primary.dark
                  : colors.gray.superLight
                }
              />
              <Text onPress={onValueChange} style={{marginRight: 10}}>{title}</Text>
        </View> 
    );
}