import {Spinner} from 'native-base';
import React from 'react';
import {View} from 'react-native';
import AnimatedItem from './AnimatedItem';
import {styles} from './styles';

export default function AnimatedTextLoading(props) {
  return (
    <View style={styles.root}>
      <View style={styles.container}>
        {props.data
          ? props.data.map((item, index) => (
              <AnimatedItem
                text={item}
                length={props.data.length}
                index={index}
                key={'animated_text_item_' + index}
              />
            ))
          : null}
        <Spinner color="white" />
      </View>
    </View>
  );
}
