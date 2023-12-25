import {Button, Icon, Text} from 'native-base';
import React from 'react';
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import {colors} from '../../theme/colors';

export default function OneTapLogin(props) {
  const {username, onLogin, onLeave} = props;
  return (
    <View style={styles.loginContainer}>
      <Button style={styles.oneTapLoginBtn} onPress={onLogin}>
        <Icon
          type="FontAwesome"
          name="user-circle-o"
          style={styles.iconStyle}
        />
        <Text numberOfLines={1} style={styles.buttonText}>
          Entrar como <Text style={styles.usernameText}>{username}</Text>
        </Text>
      </Button>
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={{flex: 0.5}}>
          {/* <Text style={{ fontSize: 12 }}>Sair de todas as contas</Text> */}
        </TouchableOpacity>
        <TouchableOpacity
          style={{flex: 0.5, alignItems: 'flex-end'}}
          onPress={onLeave}>
          <Text style={{fontSize: 12}}>Sair e entrar com outra conta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
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
    paddingBottom: 20,
  },
  bottomContainer: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  oneTapLoginBtn: {
    backgroundColor: colors.primary.main,
    alignSelf: 'center',
    width: '100%',
    borderRadius: 10,
    height: 80,
    flexDirection: 'row', // Ensure flex direction is row
    alignItems: 'center', // Vertically center contents
    paddingHorizontal: 10, // Add some padding
  },
  iconStyle: {
    fontSize: 40,
    marginRight: 10, // Add space between icon and text
  },
  buttonText: {
    flex: 1, // Allow text to take up remaining space
    textAlign: 'center', // Center the text
  },
  usernameText: {
    fontWeight: 'bold',
    color: 'white',
    flexShrink: 1, // Allow text to shrink if needed
  },
});
