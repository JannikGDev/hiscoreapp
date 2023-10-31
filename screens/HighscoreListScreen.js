import styles from '../styles/defaultStyle';
import React, {useState, useEffect, useRef, useContext } from 'react';
import { StyleSheet, Text, View, Image, Button, FlatList, StatusBar, SafeAreaView, TouchableOpacity, Pressable } from 'react-native';
import {GetHighscores, GetHighscoresTopTen, GetUserData, GetImage, GetHighscoresTopTenThisMonth} from '../shared/HiscoreAPI.js';
import Moment from 'moment';
import { NavButton } from '../shared/Controls';
import Spacer from '../shared/Spacer';
import { GUID_EMPTY } from '../shared/Constants';
import { ScreenWrapper } from '../shared/Controls';

const HighscoreListScreen = ({navigation, route}) => {

    const { game } = route.params;
    const [initiated, setInitiated] = useState(false);
    const [categories, setCategories] = useState([]);
    const [gameImage, setGameImage] = useState("");
    //console.log(game);

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
                if(!result.success) {
                    return;
                }

                let resultMonth = await GetHighscoresTopTenThisMonth(game.id, hsCategory.id);
                if(!resultMonth.success) {
                    return;
                }    


                let highscoreList = result.response;
                let highscoreListMonthly = resultMonth.response;
                let category = {
                    ...hsCategory,
                    highscores: highscoreList,
                    highscoresMonthly: highscoreListMonthly,
                    userHighscore: null,
                };

                let userDataResult = await GetUserData();
                if(!userDataResult.success){
                    return;
                }
                
                let userData = userDataResult.response;
                let userHighscoreResult = await GetHighscores(game.id, hsCategory.id, userData.id);
                //console.log(userHighscoreResult);
                if(!userHighscoreResult.success) {
                    return;
                }
                if(userHighscoreResult.response.length > 0)
                    category.userHighscore = userHighscoreResult.response[0];


                categories.push(category);
            }
            setCategories(categories);
            setInitiated(true);
        }

        fetchHighscores()
        .catch(console.error);
    }, []);



    return (
    <ScreenWrapper>
        {gameImage != "" && 
            <View style={{maxHeight: '40%', width: '50vw', height: '50vw'}}>
            <Image 
                source={gameImage}
                style={{width: '100%', height: '100%'}}
                resizeMode='contain'
            />
            </View>
        }

            <Image 
            source={require('../assets/header-bg.png')} 
            resizeMode="contain"
            style={[{height: 100, width: '100%'}]}/>

        <Text style={[styles.text, styles.textBig, styles.headerText]}>Highscores</Text>
        <Text style={[styles.textLight, styles.textBigger]}>{game.name}</Text>

        
        
        
        {initiated && <>

            {categories.length == 0 && 
            <Text style={styles.text}> Keine Kategorie registriert</Text>
            }

            {categories.map((category) => 

            <View style={{width: '100%', paddingHorizontal: '10%'}}>
               {/* <Text style={[styles.text, styles.textBig]}>Kategorie: {category.categoryName}</Text>*/}

                <Spacer bottom={36} />  




        {/*         { category.userHighscore && 
                    <View>
                        <Text style={styles.pageTitle}>Deine Highscore</Text>
                        <SafeAreaView style={[{ width: '100%'}]}>
                        <HighscoreItem highscore={category.userHighscore} />
                        </SafeAreaView>
                    </View>
                }

            <Spacer bottom={36} />  */}

            <NavButton text={"Neue Highscore einreichen"} 
                            navigation={navigation} 
                            navTarget={'HighscoreSubmit'} 
                            style={styles.hsButton} 
                            params={{...route.params, categoryId: category.id}} />

<Spacer bottom={36} /> 
<Spacer bottom={36} /> 

            <Image 
            source={require('../assets/header-bg.png')} 
            resizeMode="contain"
            style={[{height: 100, width: '100%'}]}/>
            
            <Text style={[styles.pageTitle, styles.headerText]}>Top 10 All-Time</Text>
            <View style={[styles.listContainer,{width: '100%'}]}>
                <FlatList
                    data={category.highscores}
                    renderItem={(entry) => <HighscoreItem highscore={entry.item} entry={entry}/>}
                    keyExtractor={highscore => highscore.id}
                />
            </View>
            
            <Spacer bottom={36} /> 
         {/*     <Image 
            source={require('../assets/header-bg.png')} 
            resizeMode="contain"
            style={[{height: 100, width: '100%'}]}/>

          <Text style={[styles.pageTitle, styles.headerText]}>Top 10 (30 Tage)</Text>
            <View style={[styles.listContainer,{width: '100%'}]}>
                <FlatList
                    data={category.highscoresMonthly}
                    renderItem={(entry) => <HighscoreItem highscore={entry.item} entry={entry}/>}
                    keyExtractor={highscore => highscore.id}
                />
            </View>*/}

            </View>
            
            )}
        </>}
    </ScreenWrapper>);
};


const HighscoreItem = ({highscore, titleOverwrite, entry}) => 
{
    let date = Moment(highscore.submissionTime).format('DD.MM.YYYY')
    return  (
        <View style={[styles.listItem, {padding: 0}]}>
            <View style={[styles.listItem, {flexDirection: 'column'}]}>
                <View style={{flexDirection: 'row', flex: 2}}>
                    {entry && <Text style={[styles.text, styles.textBold, {marginRight: 6}]}>{entry.index+1}.</Text>}
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