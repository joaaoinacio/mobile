import React from 'react';
import { View } from 'react-native';
import ModalComponent from "react-native-modal";
import { styles } from './styles';
import SucessModal from './SucessModal';
import ErrorModal from './ErrorModal';


export default function Modal({
    isVisible,
    onClose,
    content,
    type,
    text
}) {
    if(type === "sucess"    && isVisible) return <SucessModal isVisible={isVisible} onClose={onClose} content={content} text={text}/>
    if(type === "error"     && isVisible) return <ErrorModal isVisible={isVisible} onClose={onClose} content={content} text={text}/>
    else if(isVisible)
        return (
            <View style={{ flex: 1 }}>
                <ModalComponent isVisible={isVisible} onBackdropPress={onClose}>
                    <View style={styles.container}>
                        {content}
                    </View>
                </ModalComponent>
            </View>
        );
    return null
  
}
