import { Spinner, View } from 'native-base';
import React from 'react';
import { colors } from '../../theme/colors';
import { styles } from './styles';


export default function InlineLoader({
    isVisible,
    dense
}) {
    if(!isVisible) return null
    return (
      <View style={dense ? styles.denseRoot : styles.root}>
        <Spinner color={dense ? 'white' : colors.primary.main}/>
      </View>
    );
  
}
