import React from 'react';
import { View, StatusBar, Platform } from 'react-native';
import {Text, Icon} from 'native-base';
import ModalComponent from "react-native-modal";
import { styles } from './styles';
import { colors } from '../../theme/colors';
import useInterval from '../../functions/useInterval';

var timeId;

export default function ErrorModal({
    isVisible,
    onClose,
    content,
    text
}) {

    const [timer, setTimer] = React.useState(10)
    
    React.useEffect(() => {
        timeId = setTimeout(() =>{ 
            closeModal() 
        }, 11000);
    }, []);

    useInterval(() => {
        setTimer(timer - 1)
    }, 1000);

    const closeModal = () => {
        clearTimeout(timeId)
        if(onClose) onClose()
    }

    function DefaultModalContent(){
        return(
            <View style={styles.sucessContainer}>
                <Icon 
                    name="emoticon-sad" 
                    type="MaterialCommunityIcons" 
                    style={styles.sucessIcon} 
                    onPress={closeModal}
                />
                <Text style={styles.sucessText}>{text ? text : 'Algo deu errado...'}</Text>
                <Text style={styles.sucessText}>{'Saindo em ' + timer}</Text>
                <Text style={styles.sucessText}>{'\n'}</Text>
                <Text style={styles.sucessText}>{'Ou clique na tela para retornar'}</Text>
            </View>
        )
    }
    
    return (
        <View style={{ flex: 1 }}>
            <StatusBar backgroundColor={colors.red.main} barStyle={Platform.OS === 'ios' ? "dark-content" : "light-content"} />
            <ModalComponent 
                isVisible={isVisible}
                backdropColor={colors.red.main} 
                onBackdropPress={closeModal} 
                backdropOpacity={0.9}
                animationIn='fadeIn' 
                animationOut='fadeOut'
            >
                <View style={{flex: 1}}>
                    {content ? content : <DefaultModalContent/>}
                </View>
            </ModalComponent>
        </View>
    );
  
}
