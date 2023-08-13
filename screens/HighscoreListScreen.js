import styles from '../styles/defaultStyle';
import React, {useState, useEffect, useRef, useContext } from 'react';
import { StyleSheet, Text, View, Image, Button, FlatList, StatusBar, SafeAreaView, TouchableOpacity, Pressable } from 'react-native';
import {GetHighscores, GetHighscoresTopTen, GetUserData, GetImage} from '../shared/HiscoreAPI.js';
import Moment from 'moment';
import { NavButton } from '../shared/Controls';
import Spacer from '../shared/Spacer';
import { GUID_EMPTY } from '../shared/Constants';

const HighscoreListScreen = ({navigation, route}) => {

    const { game } = route.params;
    const [initiated, setInitiated] = useState(false);
    const [categories, setCategories] = useState([]);
    const [gameImage, setGameImage] = useState("");
    console.log(game);

    Moment.locale('de');

    useEffect( () => {
        const fetchHighscores = async () => {
            if(game.imageId != null && game.imageId != GUID_EMPTY) {
                let response = await GetImage(game.imageId);
                setGameImage(response.response.byte64);
            }
                

            let hsCategories = game.highscoreCategories;
            let categories = [];
            for(let i = 0; i < hsCategories.length; i++) {
                let hsCategory = hsCategories[i];

                let result = await GetHighscoresTopTen(game.id, hsCategory.id);
                console.log(result);
                if(!result.success) {
                    return;
                }
                    
                let highscoreList = result.response;
                let category = {
                    ...hsCategory,
                    highscores: highscoreList,
                    userHighscore: null,
                };


                console.log(category);

                let userDataResult = await GetUserData();
                if(!userDataResult.success){
                    return;
                }
                
                let userData = userDataResult.response;
                let userHighscoreResult = await GetHighscores(game.id, hsCategory.id, userData.id);
                console.log(userHighscoreResult);
                if(!userHighscoreResult.success) {
                    return;
                }
                if(userHighscoreResult.response.length > 0)
                    category.userHighscore = userHighscoreResult.response[0];


                categories.push(category);

                console.log(category);
            }
            setCategories(categories);
            setInitiated(true);
        }

        fetchHighscores()
        .catch(console.error);
    }, []);



    return (
    <View style={styles.pageContainer}>
        {gameImage != "" && 
        <View style={{maxHeight: '40%', width: '100%', height: '100%'}}>
        <Image source={gameImage} style={styles.panelImage}>
        </Image>
        </View>
        }
        <Text style={styles.pageTitle}>{game.name}</Text>
        <Text style={styles.pageTitle}>Highscores</Text>
        
        
        
        {initiated && <>
            {categories.map((category) => 

            <View style={{width: '100%', paddingHorizontal: '10%'}}>
                <Text style={styles.pageTitle}>Kategorie: {category.categoryName}</Text>
                <NavButton text={"Neuen Highscore eintragen"} navigation={navigation} navTarget={'HighscoreSubmit'} style={{width: '30%', marginLeft: 16, }} params={{...route.params, categoryId: category.id}} />
                { category.userHighscore && 
                    <View>
                        <Text style={styles.pageTitle}>Dein Highscore</Text>
                        <SafeAreaView style={[{ width: '100%'}]}>
                        <HighscoreItem highscore={category.userHighscore} />
                        </SafeAreaView>
                    </View>
                }
                <Text style={styles.pageTitle}>Top 10</Text>
                <View style={[styles.listContainer,{width: '100%'}]}>
                    <FlatList
                        data={category.highscores}
                        renderItem={(entry) => <HighscoreItem highscore={entry.item}/>}
                        keyExtractor={highscore => highscore.id}
                    />
                </View>
            </View>
            
            )}



            {/*false && <>
            <Spacer top={32} />
            <Text style={styles.pageTitle}>Dein Highscore</Text>
            <SafeAreaView style={[{ width: '100%'}]}>
                <HighscoreItem highscore={null} />
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
            </SafeAreaView>*/}
            
        
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
                        {highscore.verified != true && <Text style={[styles.text, styles.textBold, {flex: 1}]}>{highscore.verified == null ? "Wartet auf Verifikation" : "Abgelehnt"}</Text>}
                    </View>
                </View>
            </View>
        </View>
    );
}

export default HighscoreListScreen;