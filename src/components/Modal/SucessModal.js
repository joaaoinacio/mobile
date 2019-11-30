import React from 'react';
import { View } from 'react-native';
import {Text, Icon} from 'native-base';
import ModalComponent from "react-native-modal";
import { styles } from './styles';
import { colors } from '../../theme/colors';

var timeId;

export default function SucessModal({
    isVisible,
    onClose,
    content,
    text
}) {

    React.useEffect(() => {
        timeId = setTimeout(() =>{ 
            closeModal() 
        }, 2000);
    }, []);

    const closeModal = () => {
        clearTimeout(timeId)
        if(onClose) onClose()
    }

    function DefaultModalContent(){
        return(
            <View style={styles.sucessContainer}>
                <Icon 
                    name="check-circle" 
                    type="MaterialIcons" 
                    style={styles.sucessIcon} 
                    onPress={closeModal}
                />
                <Text style={styles.sucessText}>{text ? text : 'Salvo com sucesso!'}</Text>
            </View>
        )
    }
    
    return (
        <View style={{ flex: 1 }}>
            <ModalComponent 
                isVisible={isVisible}
                backdropColor={colors.primary.main} 
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
