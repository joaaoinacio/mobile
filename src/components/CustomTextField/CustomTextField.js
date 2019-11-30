import React from 'react';
import {Item, Input} from 'native-base';
import { styles } from './styles';


export default function CustomTextField(props) {
    return (
      <Item style={styles.root}>
        <Input {...props}/>
      </Item>
    );
  
}
