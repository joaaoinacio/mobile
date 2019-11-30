import { Container, Text, Content, Button, View} from 'native-base';
import React from 'react';
import AuthController from '../../controllers/AuthController';
import Modal from '../../components/Modal';
import CustomTextField from '../../components/CustomTextField';
import { styles } from './styles';


function ModalContent({
    recovery_email,
    onChange
}){
    return(
        <View style={styles.recoveryModalContainer}>
            <CustomTextField
                placeholder='E-mail'              
                value={recovery_email}
                autoCapitalize = 'none'
                onChangeText={onChange}   
            />
            <Button style={styles.recoveryButton}>
                <Text>
                    Recuperar senha
                </Text>
            </Button>
        </View>

    )  
}


export default function PasswordRecovery ({
    open,
    onClose
}) {
    const [values, onChange] = React.useState({
        recovery_email: null
    })
    
    return (
        <Modal
            content={
                <ModalContent
                    value={values.recovery_email}
                    onChange={(recovery_email) => onChange({...values, recovery_email})}
                />
            }
            isVisible={open}
            onClose={onClose}
        />
    );
  
}