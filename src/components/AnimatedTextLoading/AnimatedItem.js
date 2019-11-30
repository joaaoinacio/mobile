import React from 'react';
import { Button, Text, Icon, Spinner } from 'native-base';
import { styles } from './styles';
import { Animated, View } from 'react-native';


export default function AnimatedItem({
    opacity,
    text,
    index,
    length
}){
    const [fade] = React.useState(new Animated.Value(0))

    console.log(opacity, text)
    
    React.useEffect(() => {
        Animated.timing(
            fade,
          {
            toValue: index === length -1 ? 1 :
                    index === length -2 ? 0.5 :
                    index === length -3 ? 0.2 : 0,
            duration: 500,
            useNativeDriver: true
          }
        ).start(() => {
        });
      })

      console.log(index, length);

      
      
 
    return (
        <Animated.View style={{opacity: fade}}>
            <Button transparent light style={styles.buttonText}>
                <Icon name='ios-checkmark-circle-outline' type='Ionicons'/>
                <Text style={styles.textButton}>{text}</Text>
            </Button>
        </Animated.View>
    );
  
}