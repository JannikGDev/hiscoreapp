import React, {useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Button, FlatList, StatusBar, SafeAreaView } from 'react-native';
import styles from '../styles/defaultStyle';
import Spacer from '../shared/Spacer'
import {GetQuests} from '../shared/CompanionAPI.js'
import {GetQuestRewardMultiplier, GetQuestRewardExp, GetRepetitionString} from '../shared/Utility.js'

const QuestListScreen = ({navigation, route}) => {
    const [initiated, setInitiated] = useState(false);
    const [questItems, setQuestItems] = useState([]);

    useEffect( () => {
        // declare the data fetching function
        const fetchData = async () => {
            let result = await GetQuests();
            if(!result.success) {
                //console.log(result);
                return;
            }
                
            let questList = result.response;
            setQuestItems(questList);
            setInitiated(true);
        }

        fetchData()
        .catch(console.error);
    }, []);

    if(initiated === false) {
        return (<View style={styles.pageContainer}></View>)
    }
    else{
    return (
        <View style={[styles.listContainer,{paddingTop: 32}]}>
        <SafeAreaView style={[styles.listContainer]}>
        <Text style={styles.pageTitle}>Quests</Text>
            <FlatList
                data={questItems}
                renderItem={(entry) => <QuestListItem entry={entry} />}
                keyExtractor={quest => quest.id}
            />
        </SafeAreaView>
        </View>
        )
    }
};

export const QuestListItem = ({entry}) => 
{
    let quest = entry.item;

    return  (
        <View style={[styles.listItem, {flexDirection: 'column'}, quest.done ? styles.questItemDone : styles.questItemOpen]}>
            

            <View style={{flexDirection: 'row', flex: 2}}>
                <Image
                style={[styles.inlineIcon,{ width: 32, height: 'auto', flex: 0.5, marginRight: 16}]} 
                source={quest.done ? require('../assets/quest-completed.png') : require('../assets/quest-open.png')}
                />
                <View style={{flexDirection: 'column', flex: 2}}>
                    <Text style={[styles.text, styles.textBold, {flex: 1}]}>{quest.name}</Text>
                    <Text style={[styles.text, styles.textItalic, {flex: 1}]}>{GetRepetitionString(quest.repetition)}</Text>
                    <Text style={[styles.text, {flex: 1}]}>{GetQuestRewardExp(quest)}{GetQuestRewardMultiplier(quest)}</Text>
                    <Text style={[styles.text, {flex: 0.5}]}> {quest.done ? "Erledigt!" : "Offen"} </Text>
                </View>
             </View>
        </View>
      );
}


  export default QuestListScreen;