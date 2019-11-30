import { Spinner, Text, View } from 'native-base';
import React from 'react';
import ModalComponent from "react-native-modal";
import { colors } from '../theme/colors';
import {StatusBar, Platform} from 'react-native';

const frasesArray = [
    "Carregando aguarde...", "Isso pode demorar um pouco..."
]

export default ({
    isVisible
}) => {

    const [message, setMessage] = React.useState(frasesArray[0])
    let intervalID = 0;

    React.useEffect(() => {
        intervalID = setInterval(()=>{
            setMessage(frasesArray[Math.round(Math.random())])
        }, 4000)
    }, []);
  
    if(isVisible)
        return (
            <View style={{ flex: 1 }}>
                <StatusBar backgroundColor={colors.gray.dark} barStyle={Platform.OS === 'ios' ? "dark-content" : "light-content"} />
                <ModalComponent 
                    isVisible={isVisible}
                    backdropColor={colors.gray.dark} 
                    backdropOpacity={0.9}
                    animationIn='fadeIn' 
                    animationOut='fadeOut'
                >
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <Spinner color={colors.primary.main}/>
                        <Text style={{color: 'white'}}>{message}</Text>
                    </View>
                </ModalComponent>
            </View>
        );
    return null;        
}
