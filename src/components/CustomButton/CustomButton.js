import React from 'react';
import { Text, Button } from 'native-base';
import { styles } from './styles';

export default ({
    text,
    type,
    ...props
}) => {
    if(type === 'cancel')
        return(
            <Button style={styles.cancelButton} {...props}>
                <Text>{text}</Text>
            </Button>
        )
    return (
        <Button style={styles.root} {...props}>
            <Text>{text}</Text>
        </Button>
    );
  
}