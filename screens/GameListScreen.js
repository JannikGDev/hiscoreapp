import React, {useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Image, Button, FlatList, StatusBar, SafeAreaView, Pressable } from 'react-native';
import styles from '../styles/defaultStyle';
import Spacer from '../shared/Spacer'
import {GetGames} from '../shared/HiscoreAPI.js'
import {GetQuestRewardMultiplier, GetQuestRewardExp, GetRepetitionString} from '../shared/Utility.js'

const GameListScreen = ({navigation, route}) => {
    const [initiated, setInitiated] = useState(false);
    const [gameItems, setGameItems] = useState([]);

    const GameListItem = ({entry, navigation}) => 
    {
        let game = entry.item;

        return  (
            <Pressable style={[styles.listItem, {padding: 0}]}
            onPress={() => {
                navigation.navigate('HighscoreList', {game: game});
            }}>
            <View style={[styles.listItem, {flexDirection: 'column'}]}>
                <View style={{flexDirection: 'row', flex: 2}}>
                    <View style={{flexDirection: 'column', flex: 2}}>
                        <Text style={[styles.text, styles.textBold, {flex: 1}]}>{game.name}</Text>
                    </View>
                </View>
            </View>
            </Pressable>
        );
    }


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
            setInitiated(true);
        }

        fetchData()
        .catch(console.error);
    }, []);

    if(initiated === false) {
        return (<View style={styles.pageContainer}>
            <Text>Loading</Text>

        </View>)
    }
    else{
    return (
        <View style={[styles.listContainer,{paddingTop: 32}]}>
        <SafeAreaView style={[styles.listContainer]}>
        <Text style={styles.pageTitle}>Games</Text>
            <FlatList
                data={gameItems}
                renderItem={(entry) => <GameListItem entry={entry} navigation={navigation} />}
                keyExtractor={game => game.id}
            />
        </SafeAreaView>
        </View>
        )
    }
};




export default GameListScreen;