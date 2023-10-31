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
    const {game, categoryId} = route.params;

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
        if(score == 0 || isNaN(score) || !Number.isInteger(score)) {
            setShowMessage(true);
            setMessage("Der eingegebene Score ist nicht gültig. Bitte gebe eine ganze positive Zahl ein.");
            return;
        }

        setLoading(true);
        let response =  await UploadHighscore(game.id, categoryId, image, score);
        
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


<Image 
            source={require('../assets/header-bg.png')} 
            resizeMode="contain"
            style={[{height: 100, width: '100%'}]}/>

        <Text style={[styles.text, styles.textBig, styles.headerText]}>Neue Score</Text>
        <Text style={[styles.textLight, styles.textBig]}>{game.name}</Text>


        <Spacer bottom={48} />  
        <Text style={styles.text}>
            Schritt 1:{"\n"}
            Trage hier deinen erreichten Highscore im Spiel {game.name} ein.</Text>

            <SafeAreaView style = {{marginTop: 16,flexDirection: 'row'}}>
            <TextInput
                style={[styles.textInput, {width: '100%'}]}
                onChangeText={text =>   {
                    let number = parseInt(text);
                    if(!isNaN(number)) {
                        setScore(number);
                    }
                    else if(text.length == 0) {
                        setScore(0);
                    }
                }}
                placeholder="Score"
                value={score == 0 ? "" : score}
                keyboardType='decimal'
                textContentType='none'
            />
        </SafeAreaView>

        <Spacer bottom={48} />    

            <Text style={styles.text}>Schritt 2:{"\n"}
            Mach ein Beweisfoto, auf dem der Highscore und dein Username groß und klar leserlich sind und lade es über den Button hoch:</Text>
        


        
        {!showCam &&
        <>
        <Spacer top={32}/>
        <View style={[{flexDirection: 'row', flex: 0.2}]}>  

            <SafeAreaView>
                <Button
                style={[{width: '60%'}]}
                title="Foto aus Galerie wählen"
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