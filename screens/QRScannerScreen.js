import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Pressable, ActivityIndicator } from 'react-native';
import MessageBox from '../shared/MessageBox'
import { BarCodeScanner } from 'expo-barcode-scanner';
import styles from '../styles/defaultStyle';
import {ScanCode} from '../shared/HiscoreAPI.js'
import { Camera } from 'expo-camera';


export const QRScannerScreen = ({navigation, route}) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const getBarCodeScannerPermissions = async () => {
    let response = await Camera.requestCameraPermissionsAsync();
    
    setHasPermission(response.status === 'granted');
    if(!hasPermission) {
      console.log(response);
    }
  };
  useEffect(() => {
    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setLoading(true);
    setScanned(true);

    let result = await ScanCode(data);

    if(result.statusCode == 401) {
      setMessage(`Der Code wurde bereits verwendet und ist nicht mehr gültig.`);
      setShowMessage(true);
      setLoading(false);
      return;
    }
    if(result.statusCode == 404) {
      setMessage(`Der QR Code ist kein gültiger HI-SCORE Code.`);
      setShowMessage(true);
      setLoading(false);
      return;
    }
    if(result.statusCode == 409) {
      setMessage(`Der Quest dieses QR Codes ist nicht aktiv.`);
      setShowMessage(true);
      setLoading(false);
      return;
    }
    if(result.statusCode == 400) {
      setMessage(`Du kannst diese Quest nicht nochmal absolvieren.`);
      setShowMessage(true);
      setLoading(false);
      return;
    }

    setMessage(`Du hast die Quest ${result.response.name} absolviert! Du hast ${result.response.experience} EXP bekommen!`);
    setShowMessage(true);
    setLoading(false);
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

      {loading && <ActivityIndicator style={styles.loader} />}

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
