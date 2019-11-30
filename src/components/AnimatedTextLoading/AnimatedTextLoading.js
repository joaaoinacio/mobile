import React from 'react';
import { Button, Text, Icon, Spinner } from 'native-base';
import { styles } from './styles';
import { Animated, View, FlatList } from 'react-native';
import AnimatedItem from './AnimatedItem';


export default function AnimatedTextLoading(props){

    console.log(props.data)

    return (
        <View style={styles.root}>
            <View style={styles.container}>
                {
                    props.data ? props.data.map((item, index) => (
                        <AnimatedItem 
                            text={item} 
                            length={props.data.length}
                            index={index}                             
                            key={'animated_text_item_' + index}
                        />
                    )):null}
                <Spinner color="white"/>
            </View>
            
        </View>
    );
  
}