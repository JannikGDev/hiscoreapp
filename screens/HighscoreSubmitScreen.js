import React, {useState, useEffect, useRef, useContext } from 'react';
import { StyleSheet, Text, View, Image, Button, FlatList, StatusBar, SafeAreaView, TouchableOpacity, Pressable } from 'react-native';
import styles from '../styles/defaultStyle';
import Spacer from '../shared/Spacer'
import * as ImagePicker from 'expo-image-picker';
import MessageBox from '../shared/MessageBox'
import { Camera, CameraType } from 'expo-camera';
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';
import { UploadHighscore } from '../shared/CompanionAPI';


const HighscoreSubmitScreen = ({navigation, route}) => {

    const [image, setImage] = useState(null);
    const [showCam, setShowCam] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState("");
    const { game } = route.params;

    let camera;



    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
      };

    const OpenCamera = async () => {
        let response = await Camera.requestCameraPermissionsAsync();

        if(response && response.status === 'granted') {
            setShowCam(true);
        }
    };

    const TakePicture = async () => {
        if(camera == null)
            return;

        let response = await camera.takePictureAsync()

        let longSide = Math.max(response.width, response.height)

        let scale = 1080/longSide;

        let manipResult = await manipulateAsync(
            response.uri,
            [{ resize: {width: response.width*scale, height: response.height*scale} }]
          );

        setImage(manipResult.uri);
        setShowCam(false);
    };

    const SendHighscore = async () => {
       let response =  await UploadHighscore(game.id, image, 1000);
        
       if(response.success) {
        setShowMessage(true);
        setMessage("Der Highscore wurde erfolgreich hochgeladen");
       }
       else {
        setShowMessage(true);
        setMessage(response.message);
       }
    };

    
    return (
    <View style={styles.pageContainer}>

        <MessageBox 
            text={message}
            show={showMessage}
            onClose={() => {
                setShowMessage(false);    
            }}
        />

        <Text style={styles.pageTitle}>
            {game.name}: Highscore eintragen
        </Text>

        <Text style={styles.text}>
            Nimm ein Foto auf um deinen Highscore festzuhalten. Mach ein Foto, auf dem der Highscore und dein Username groß und klar leserlich sind.
        </Text>


        
        {!showCam &&
        <>
        <Spacer top={32}/>
        <View style={[{flexDirection: 'row', width: '80%', flex: 0.2}]}>  
            <View style = {{width: '50%'}}>
            <Button
            title="Foto aufnehmen"
            color={styles.button.color}
            onPress={OpenCamera}
            />
            </View>

            <Spacer left={32} />

            <View style = {{width: '50%'}}>
                <Button
                title="Foto aus Gallerie wählen"
                color={styles.button.color}
                onPress={pickImage}
                />
            </View>
        </View>
        </>
        }

        {(!showCam && image) && 
        <>
        <View style = {{width: '40%'}}>
        <Button
        title="Highscore hochladen"
        color={styles.button.color}
        onPress={SendHighscore}
        />
        </View>
        <View style ={{ flex: 1, width: '80%', justifyContent: 'center'}}>
        <Image source={{ uri: image }} 
        resizeMethod='scale' 
        resizeMode='contain' 
        style={{ flex: 1, margin: 16}} />
        </View>
        </>
        }

        {showCam && 
            <Camera 
            style={[{marginTop: 16, marginLeft: 16, marginRight: 16, marginBottom: 16, alignItems: 'center', flex: 1, width:'80%'}]}
            ref={cam => camera = cam}
            pictureSize=''
            onPictureTak
            >
            <TouchableOpacity style={{backgroundColor: styles.button.color, display: 'inline-block', padding: 6, marginTop: 16}} onPress={TakePicture}>
                <Text style={[styles.text,styles.textBold]}>Foto aufnehmen</Text>
                    </TouchableOpacity>
            </Camera>
        }
    </View>
    );
};

export default HighscoreSubmitScreen;