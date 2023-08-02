import React, {useState, useEffect, useRef, useContext } from 'react';
import { StyleSheet, Text, View, Image, Button, FlatList, StatusBar, SafeAreaView, TouchableOpacity, Pressable, TextInput, ActivityIndicator } from 'react-native';
import styles from '../styles/defaultStyle';
import Spacer from '../shared/Spacer'
import * as ImagePicker from 'expo-image-picker';
import MessageBox from '../shared/MessageBox'
import { Camera, CameraType } from 'expo-camera';
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';
import { UploadHighscore } from '../shared/HiscoreAPI';


const HighscoreSubmitScreen = ({navigation, route}) => {

    const [image, setImage] = useState(null);
    const [showCam, setShowCam] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState("");
    const [score, setScore] = useState(0);
    const [loading, setLoading] = useState(false);
    const {game} = route.params;

    let camera;
    const pickImage = async () => {

        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          allowsMultipleSelection: false,
          quality: 1,
        });

        if (result.canceled || !result.assets || !result.assets[0]) {
            return;
        }

        setLoading(true);

        let pickedImage = result.assets[0];



        let longSide = Math.max(pickedImage.width, pickedImage.height)

        let scale = 1080/longSide;

        let manipResult = await manipulateAsync(
            pickedImage.uri,
            [{ resize: {width: pickedImage.width*scale, height: pickedImage.height*scale} }]
          );

        setImage(manipResult.uri);
        setLoading(false);
      };

    const TakePicture = async () => {
        if(camera == null)
            return;

        let response = await camera.takePictureAsync();
        setLoading(true);

        let longSide = Math.max(response.width, response.height)

        let scale = 1080/longSide;

        let manipResult = await manipulateAsync(
            response.uri,
            [{ resize: {width: response.width*scale, height: response.height*scale} }]
          );

        setImage(manipResult.uri);
        setShowCam(false);
        setLoading(false);
    };

    const SendHighscore = async () => {
        setLoading(true);
        let response =  await UploadHighscore(game.id, image, score);
        
        if(response.success) {
        setShowMessage(true);
        setMessage("Der Highscore wurde erfolgreich hochgeladen");
        }
        else {
        setShowMessage(true);
        setMessage(response.message);
        }
        setLoading(false);
    };

    
    return (
    <View style={styles.pageContainer}>

        {loading && <ActivityIndicator style={styles.loader}/>}

        <MessageBox 
            text={message}
            show={showMessage}
            onClose={() => {
                setShowMessage(false);    
                navigation.navigate('GameList', route.params)
            }}
        />

        <Text style={styles.pageTitle}>
            {game.name}: Highscore eintragen
        </Text>

        <Text style={styles.text}>
            Trage hier deinen erreichen Highscore im Spiel {game.name} ein. Mach ein Beweisfoto, auf dem der Highscore und dein Username groß und klar leserlich sind und lade es hier hoch.
        </Text>

        <SafeAreaView style = {{marginTop: 16,flexDirection: 'row', flex: 0.2}}>
            <TextInput
                style={[styles.textInput, {width: '60%'}]}
                onChangeText={setScore}
                placeholder="Score"
                value={score}
                keyboardType='numeric'
                textContentType='none'
            />
        </SafeAreaView>
        
        {!showCam &&
        <>
        <Spacer top={32}/>
        <View style={[{flexDirection: 'row', flex: 0.2}]}>  

            <SafeAreaView>
                <Button
                style={[{width: '60%'}]}
                title="Foto aus Gallerie wählen"
                color={styles.button.color}
                onPress={pickImage}
                />
            </SafeAreaView>
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
    </View>
    );
};

export default HighscoreSubmitScreen;