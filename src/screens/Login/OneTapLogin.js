import { Button, Icon, Text } from 'native-base';
import React from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import { colors } from '../../theme/colors';


export default function OneTapLogin(props) {
    const {
        username,
        onLogin,
        onLeave
    } = props;
    return (
        <View style={styles.loginContainer}>
            <Button style={styles.oneTapLoginBtn} onPress={onLogin}>
                <Icon type="FontAwesome" name="user-circle-o" style={{ fontSize: 40 }} />
                <Text>Entrar como <Text style={{ fontWeight: 'bold', color: 'white' }}>{username}</Text></Text>
            </Button>
            <View style={styles.bottomContainer}>
                <TouchableOpacity style={{ flex: 0.5 }}>
                    {/* <Text style={{ fontSize: 12 }}>Sair de todas as contas</Text> */}
                </TouchableOpacity>
                <TouchableOpacity style={{ flex: 0.5, alignItems: 'flex-end' }} onPress={onLeave}>
                    <Text style={{ fontSize: 12 }}>Sair e entrar com outra conta</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    loginContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: 7,
        margin: Dimensions.get('window').width * 0.08,
        padding: 10,
        paddingTop: 15,
        paddingBottom: 20
    },
    oneTapLoginBtn: {
        backgroundColor: colors.primary.main,
        alignSelf: 'center',
        width: '100%',
        borderRadius: 10,
        height: 80
    },
    bottomContainer: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    }
});
