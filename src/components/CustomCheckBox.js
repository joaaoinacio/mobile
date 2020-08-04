import CheckBox from '@react-native-community/checkbox';
import { Body, ListItem, Text } from 'native-base';
import React from 'react';
import { colors } from '../theme/colors';

export default function CustomCheckBox(props) {
    const {
        checked,
        onValueChange,
        label
    } = props;

    return (
        <ListItem>
            <CheckBox
                disabled={false}
                value={checked}
                onValueChange={(checked) => onValueChange(checked)}
                tintColors={{
                    true: colors.primary.main
                }}
            />
            <Body>
                <Text onPress={() => onValueChange(!checked)}>{label ? label : ''}</Text>
            </Body>
        </ListItem>
    )
}