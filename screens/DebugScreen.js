import { StyleSheet, Text, View, Image, Button, Pressable } from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import styles from '../styles/defaultStyle';
import Spacer from '../shared/Spacer'
import { LogOut, IsLoggedIn } from '../shared/GlobalStorage.js';
import { UserContext, GameContext } from '../shared/Contexts';
import {Login, GetGames, GetImage} from '../shared/HiscoreAPI';
import { NavButton } from '../shared/Controls';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PanelList } from '../shared/Components';
import { GUID_EMPTY } from '../shared/Constants';



const DebugScreen = ({navigation}) => {


    const [images, setImages] = useState([]);

    let panelItems = images.map(image => {return { 
        imageSrc: image, 
        title: 'Title', 
        onPress: () => alert('Panel pressed')
    }});

    return (
    <View style={styles.pageContainer}>
        <Text style={styles.pageTitle}>Debug</Text>
        
        <Pressable 
            style={[styles.button,{width: 250, height: 50, backgroundColor: 'red'}]}
            onPress={async () =>{
                
                let loginResponse = await Login("olko","password");
                
                let gamesResponse = await GetGames();
                
                if(!gamesResponse.success) {
                    alert("ERROR:" + JSON.stringify(gamesResponse));
                    return;
                }
                    
                let games = gamesResponse.response;
                let gameImages = [];
                
                for(let i = 0; i < games.length; i++) {
                    let game = games[i];
                    if(game.imageId != null && game.imageId != GUID_EMPTY) {
                        let imageResponse = await GetImage(game.imageId);
                        
                        gameImages.push(imageResponse.response.byte64);
                    }
                }

                setImages(gameImages);
            }}
        >
             <Text style={[styles.text, styles.textBigger]}>Test</Text>
        </Pressable>
           
            <PanelList panelItems={panelItems}>

            </PanelList>
            

    </View>
    );
  };

  export default DebugScreen;