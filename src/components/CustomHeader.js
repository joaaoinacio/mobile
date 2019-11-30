import { Body, Button, Header, Icon, Left, Right, Title } from 'native-base';
import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { colors } from '../theme/colors';

export default function CustomHeader({
    navigation,
    title,
    icon,
    back
}) {
    return (     
        <Header androidStatusBarColor={colors.primary.main} iosBarStyle={Platform.OS === 'ios' ? "dark-content" : "light-content"}>
            <StatusBar backgroundColor={colors.primary.main} barStyle={Platform.OS === 'ios' ? "dark-content" : "light-content"} />
            <Left style={{flex: 0.2}}>
                {
                    back ?
                    <Button transparent onPress={()=> navigation.navigation.goBack()}>
                        <Icon name='arrow-bold-left' type="Entypo" style={{color: 'white'}}/>
                    </Button>
                    :
                    <Button transparent onPress={()=> navigation.navigation.openDrawer()}>
                        <Icon name='menu' style={{color: 'white'}}/>
                    </Button>
                }
            </Left>
            <Body style={{flex: 0.6, alignItems: 'center', justifyContent: 'center'}}>
                <Title style={{color: 'white'}}>{title}</Title>
            </Body>
            <Right style={{flex: 0.2}}>
                {back ? 
                    <Button transparent onPress={()=> navigation.navigation.openDrawer()}>
                        <Icon name='menu' style={{color: 'white'}}/>
                    </Button>
                : icon}
            </Right>
        </Header> 
    );
}