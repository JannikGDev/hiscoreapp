import React, {useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Image, Button, FlatList, StatusBar, SafeAreaView, Pressable, ActivityIndicator } from 'react-native';
import {useWindowDimensions} from 'react-native';
import styles from '../styles/defaultStyle';
import Spacer from '../shared/Spacer'
import {GetGames, GetImage} from '../shared/HiscoreAPI.js'
import {GetQuestRewardMultiplier, GetQuestRewardExp, GetRepetitionString} from '../shared/Utility.js'
import { PanelList } from '../shared/Components';
import { GUID_EMPTY } from '../shared/Constants';
import { ScrollView } from 'react-native-gesture-handler';

const GameListScreen = ({navigation, route}) => {
    const [initiated, setInitiated] = useState(false);
    const [gameItems, setGameItems] = useState([]);

    const {screenHeight, screenWidth, scale, fontScale} = useWindowDimensions();



    useEffect( () => {
        // declare the data fetching function
        const fetchData = async () => {
            let result = await GetGames();
            if(!result.success) {
                console.log(result);
                return;
            }
                
            let gameList = result.response;
            setGameItems(gameList);

            for(let i = 0; i < gameList.length; i++) {
                let game = gameList[i];
                if(game.imageId != null && game.imageId != GUID_EMPTY) {
                    let imageResponse = await GetImage(game.imageId);
                    game.imageSrc = imageResponse.response.byte64;
                }
            }


            setInitiated(true);
        }

        fetchData()
        .catch(console.error);
    }, []);


    let panelItems = gameItems.map(game => {return { 
        imageSrc: game.imageSrc, 
        title: game.name, 
        onPress: () => navigation.navigate('HighscoreList', {game: game})
    }});

    if(initiated === false) {
        return (<View style={styles.pageContainer}>
                    <Text style={styles.pageTitle}>Highscores</Text>
                <ActivityIndicator style={styles.loader}/>
            </View>)
    }
    else{
    return (

    <ScrollView style={[styles.listContainer,{paddingTop: 32, height: screenHeight}]}>

        <Text style={styles.pageTitle}>Highscores</Text>

        <PanelList panelItems={panelItems}>

        </PanelList>
    </ScrollView> 
    )}
};




export default GameListScreen;