import React from 'react';
import {Text, Button} from 'native-base';
import {styles} from './styles';
import withPreventDoubleClick from '../../validation/withPreventDoubleClick';

export default ({text, type, ...props}) => {
  const NewButton = withPreventDoubleClick(Button);
  if (type === 'cancel') {
    return (
      <NewButton style={styles.cancelButton} {...props}>
        <Text>{text}</Text>
      </NewButton>
    );
  }
  return (
    <NewButton style={styles.root} {...props}>
      <Text>{text}</Text>
    </NewButton>
  );
};
