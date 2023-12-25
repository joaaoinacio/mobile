import React from 'react';
import {Animated} from 'react-native';
import {Button, Icon, Text} from 'native-base';

const styles = {
  textButton: {
    color: '#fff',
  },
};

export default function AnimatedItem({text, index, length}) {
  const fade = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    const toValue =
      index === length - 1
        ? 1
        : index === length - 2
        ? 0.5
        : index === length - 3
        ? 0.2
        : 0;

    Animated.timing(fade, {
      toValue,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fade, index, length]);

  return (
    <Animated.View style={{opacity: fade}}>
      <Button transparent light>
        <Icon name="checkcircleo" type="AntDesign" />
        <Text style={styles.textButton}>{text}</Text>
      </Button>
    </Animated.View>
  );
}
