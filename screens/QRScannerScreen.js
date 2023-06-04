import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Pressable } from 'react-native';
import MessageBox from '../shared/MessageBox'
import { BarCodeScanner } from 'expo-barcode-scanner';
import styles from '../styles/defaultStyle';
import {ScanCode} from '../shared/CompanionAPI.js'
import { Camera } from 'expo-camera';


export const QRScannerScreen = ({navigation, route}) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");

  const getBarCodeScannerPermissions = async () => {
    await Camera.requestCameraPermissionsAsync();
    let response = await BarCodeScanner.requestPermissionsAsync();
    console.log(response);
    setHasPermission(response.status === 'granted');
  };
  useEffect(() => {
    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);

    let result = await ScanCode(data);

    console.log(result);

    if(result.statusCode == 401) {
      setMessage(`Der Code wurde bereits verwendet und ist nicht mehr gültig.`);
      setShowMessage(true);
      return;
    }
    if(result.statusCode == 404) {
      setMessage(`Der QR Code ist kein gültiger HI-SCORE Code.`);
      setShowMessage(true);
      return;
    }
    if(result.statusCode == 409) {
      setMessage(`Der Quest dieses QR Codes ist nicht aktiv.`);
      setShowMessage(true);
      return;
    }
    if(result.statusCode == 400) {
      setMessage(`Du kannst diese Quest nicht nochmal absolvieren.`);
      setShowMessage(true);
      return;
    }

    setMessage(`Du hast die Quest ${result.response.name} absolviert! Du hast ${result.response.experience} EXP bekommen!`);
    setShowMessage(true);
  };

  if (hasPermission === null || hasPermission === false) {
    return <View style={styles.pageContainer}>
      <Text style={styles.pageTitle}>QR Code Scanner</Text>
      <Pressable onPress={async () => {
       
        await getBarCodeScannerPermissions();
      }}>
      <Text style={[styles.text,{flex: 1, textAlignVertical: 'center'}]}>
        Berechtigung zur Nutzung der Kamera freigeben
      </Text>
      </Pressable>
      </View>;
  }

  return (
    <View style={styles.pageContainer}>
      <Text style={styles.pageTitle}>QR Code Scanner</Text>
      
      <MessageBox 
            text={message}
            show={showMessage}
            onClose={() => {
                setShowMessage(false);
                navigation.goBack();
            }}
        />

      <Camera
        style={[StyleSheet.absoluteFillObject, {marginTop: 96, marginLeft: 16, marginRight: 16, marginBottom: 16}]}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        barCodeScannerSettings={{
          barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
        }}
      />
      {scanned && <Button title={'Tippen um nochmal zu scannen'} onPress={() => setScanned(false)} />}
    </View>
  );
}
