import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 12,
    color: '#777',
    top: 0,
    position: 'absolute',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
    top: 0,
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
    bottom: 0,
  },
  buttonTouchable: {
    padding: 12,
    bottom: 0,
    position: 'absolute',
  },
  cameraContainer: {
    // height: Dimensions.get('window').height * 0.6,
  },
});

function ScanScreen(props) {
  const onSuccess = e => {
    props.onSuccess(e);
  };

  return (
    <QRCodeScanner
      onRead={onSuccess}
      topContent={
        <Text style={styles.centerText}>
          <Text style={styles.textBold}>Aponte a câmera para o código QR</Text>
        </Text>
      }
      cameraStyle={styles.cameraContainer}
      bottomContent={
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={styles.buttonTouchable}>
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
      }
    />
  );
}
export default ScanScreen;
