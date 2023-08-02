import styles from '../styles/defaultStyle';
import React, {useState, useEffect, useRef, useContext } from 'react';
import { StyleSheet, Text, View, Image, Button, FlatList, StatusBar, SafeAreaView, TouchableOpacity, Pressable } from 'react-native';
import {GetHighscores, GetUserData} from '../shared/HiscoreAPI.js';
import Moment from 'moment';
import { NavButton } from '../shared/Controls';
import Spacer from '../shared/Spacer';

const HighscoreListScreen = ({navigation, route}) => {

    const { game } = route.params;

    const [initiated, setInitiated] = useState(false);
    const [highscores, setHighscores] = useState([]);
    const [userHighscore, setUserHighscore] = useState(null);

    Moment.locale('de');

    useEffect( () => {
        const fetchHighscores = async () => {
            let result = await GetHighscores(game.id);
            console.log(result);
            if(!result.success) {
                return;
            }
                
            let highscoreList = result.response;
            setHighscores(highscoreList);

            let userDataResult = await GetUserData();
            if(!userDataResult.success){
                return;
            }
               
            let userData = userDataResult.response;
            highscoreList.forEach(h => {
                if(h.userName.toLowerCase() === userData.userName.toLowerCase()) {
                    setUserHighscore(h);
                }
            });

            setInitiated(true);
        }

        fetchHighscores()
        .catch(console.error);
    }, []);



    return (
    <View style={styles.pageContainer}>
        <Text style={styles.pageTitle}>{game.name}</Text>
        <Text style={styles.pageTitle}>Highscores</Text>
        
        <NavButton text={"Highscore eintragen"} navigation={navigation} navTarget={'HighscoreSubmit'} style={{marginTop: 32}} params={route.params} />
        
        {initiated && <>
           
            {userHighscore && <>
            <Spacer top={32} />
            <Text style={styles.pageTitle}>Dein Highscore</Text>
            <SafeAreaView style={[{ width: '100%'}]}>
                <HighscoreItem highscore={userHighscore} />
            </SafeAreaView>
            </>}
            <Spacer top={32} />
            <Text style={styles.pageTitle}>Top 10</Text>
            <SafeAreaView style={[styles.listContainer,{width: '100%', margin: 16}]}>
                <FlatList
                    data={highscores}
                    renderItem={(entry) => <HighscoreItem highscore={entry.item}/>}
                    keyExtractor={highscore => highscore.id}
                />
            </SafeAreaView>
            
        
        </>}
    </View>);
};


const HighscoreItem = ({highscore, titleOverwrite}) => 
{
    let date = Moment(highscore.submissionTime).format('DD.MM.YYYY')
    return  (
        <View style={[styles.listItem, {padding: 0}]}>
            <View style={[styles.listItem, {flexDirection: 'column'}]}>
                <View style={{flexDirection: 'row', flex: 2}}>
                    <View style={{flexDirection: 'column', flex: 2, alignItems: 'flex-start'}}>
                        {titleOverwrite && <Text style={[styles.text, styles.textBold, {flex: 1}]}>{titleOverwrite}</Text>}
                        {!titleOverwrite && <Text style={[styles.text, styles.textBold, {flex: 1}]}>Spieler: {highscore.userName}</Text>}
                        <Text style={[styles.text, styles.textBold, {flex: 1}]}>Score: {highscore.score}</Text>
                        <Text style={[styles.text, styles.textBold, {flex: 1}]}>Eingetragen am: {date}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

export default HighscoreListScreen;