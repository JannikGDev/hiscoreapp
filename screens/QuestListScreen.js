import React, {useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Button, FlatList, StatusBar, SafeAreaView, Pressable } from 'react-native';
import styles from '../styles/defaultStyle';
import Spacer from '../shared/Spacer'
import {GetQuests} from '../shared/HiscoreAPI.js'
import {GetQuestRewardMultiplier, GetQuestRewardExp, GetRepetitionString} from '../shared/Utility.js'
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { REPETITION_DAILY } from '../shared/Constants';
import { ScreenWrapper } from '../shared/Controls';

const Tab = createMaterialTopTabNavigator();

const QuestListScreen = ({navigation, route}) => {
    const [initiated, setInitiated] = useState(false);
    const [questItems, setQuestItems] = useState([]);
    const [activeQuestItems, setActiveQuestItems] = useState([]);
    const [doneQuestItems, setDoneQuestItems] = useState([]);

    useEffect( () => {
        // declare the data fetching function
        const fetchData = async () => {
            let result = await GetQuests();
            if(!result.success) {
                //console.log(result);
                return;
            }
                
            let questList = result.response;
            //console.log(questList);
            setQuestItems(questList);
            
            let activeQuests = [];
            let doneQuests = [];

            questList.forEach(quest => {
                if(!quest.requirementsFulfilled || quest.Hidden) {

                }
                else if(quest.done) {
                    doneQuests.push(quest);
                }
                else {
                    activeQuests.push(quest);
                }
            });

            setActiveQuestItems(activeQuests);
            setDoneQuestItems(doneQuests);
            setInitiated(true);
        }

        fetchData()
        .catch(console.error);
    }, []);

    if(initiated === false) {
        return (<ScreenWrapper></ScreenWrapper>)
    }
    else{    
        
        return (
            <NavigationContainer independent={true} style={{height: '100vh', width: '100%'}}>
            <Tab.Navigator
              screenOptions={{
                tabBarLabelStyle: { fontSize: 12, fontWeight: 'bold', color: '#F9FDFC' },
                tabBarItemStyle: { },
                tabBarStyle: { backgroundColor: '#0c1725' },
              }}>
              <Tab.Screen name={"Offene Quests ("+activeQuestItems.length+")"} component={QuestList} initialParams={{ questItems: activeQuestItems, navigation: navigation }}/>
              <Tab.Screen name="Abgeschlossene Quests" component={QuestList} initialParams={{ questItems: doneQuestItems, navigation: navigation  }}/>
            </Tab.Navigator>
          </NavigationContainer>
        )
    }
};


const QuestList = ({route}) => {

    let questItems = route.params.questItems;
    let navigation = route.params.navigation;

    return (
        <View style={[styles.listContainer,{paddingTop: 32},{height: '100vh'}]}>
        <SafeAreaView style={[styles.listContainer]}>

            <FlatList
                data={questItems}
                renderItem={(entry) => <QuestListItem entry={entry} navigation={navigation}/>}
                keyExtractor={entry => entry.id}
            />
        </SafeAreaView>
        </View>
    )

};


export const QuestListItem = ({entry, navigation}) => 
{

    let quest = entry.item;

    return  (
        <View style={[styles.listItem, {flexDirection: 'column'}, quest.done ? styles.questItemDone : styles.questItemOpen]}>
            

            <Pressable style={{flexDirection: 'row', flex: 2}}
            onPress={() =>navigation.navigate("QuestDetail", {quest: quest})}
            >
                <Image
                style={[styles.inlineIcon,{ width: 32, height: 'auto', flex: 0.5, marginRight: 16}]} 
                source={quest.done ? require('../assets/green-checkmark.webp') : require('../assets/exclamation-icon.png')}
                />
                <View style={{flexDirection: 'column', flex: 2}}>
                    <Text style={[styles.text, styles.textBold, {flex: 1}]}>{quest.name}</Text>
                    <Text style={[styles.text, styles.textItalic, {flex: 1}]}>{GetRepetitionString(quest.repetition)}</Text>
                    <Text style={[styles.text, {flex: 1}]}>{GetQuestRewardExp(quest)}{GetQuestRewardMultiplier(quest)}</Text>
                    <Text style={[styles.text, {flex: 0.5}]}> {quest.done ? "Erledigt!" : "Offen"} </Text>
                    
                </View>
            </Pressable>
        </View>
      );
}


  export default QuestListScreen;