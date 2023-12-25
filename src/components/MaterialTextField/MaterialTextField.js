import React from 'react';
import {styles} from './styles';
import {TextField} from 'react-native-material-textfield';
import {colors} from '../../theme/colors';

export default function MaterialTextField(props) {
  return (
    <TextField style={styles.root} tintColor={colors.primary.main} {...props} />
  );
}
