import React, {useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Button, FlatList, StatusBar, SafeAreaView } from 'react-native';
import styles from '../styles/defaultStyle';
import Spacer from '../shared/Spacer'
import {GetQuests} from '../shared/HiscoreAPI.js'
import {GetQuestRewardMultiplier, GetQuestRewardExp, GetRepetitionString} from '../shared/Utility.js'
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { REPETITION_DAILY } from '../shared/Constants';



const QuestDetailScreen = ({route, navigation}) => {

    let quest = route.params.quest;



    console.log(quest);

    return(
        <View style={styles.pageContainer}>
            <Text style={styles.pageTitle}>Quest: {quest.name}</Text>
            <Text style={styles.text}>Status: {quest.requirementsFulfilled ? (quest.done ? "Erledigt!" : "Offen") : "Nicht freigeschaltet"}</Text>
            <Text style={[styles.text]}>Wiederholung: {GetRepetitionString(quest.repetition)}</Text>

            <View style={{flexDirection: 'column', width: '100%'}}>
                <Text style={[styles.text, styles.textBig]}>Aufgaben</Text>
                
                {quest.tasks.length == 0 &&
                    <Text style={styles.text}>-</Text>
                }

                {quest.tasks.map((task) => 
                        <Text style={styles.text}>{task.description}</Text>
                )}
            </View>
            
            <View style={{flexDirection: 'column', width: '100%'}}>
                <Text style={[styles.text, styles.textBig]}>Belohnungen</Text>
                
                {quest.rewards.length == 0 &&
                    <Text style={styles.text}></Text>
                }

                {quest.rewards.map((reward) => 
                        <Text style={styles.text}>{reward.description}</Text>
                )}
            </View>

            <View style={{flexDirection: 'column', width: '100%'}}>
                <Text style={[styles.text, styles.textBig]}>Vorraussetzungen</Text>

                {quest.requirements.length == 0 &&
                    <Text style={styles.text}></Text>
                }

                {quest.requirements.map((req) => 
                        <Text style={styles.text}>{req.description}</Text>
                )}
            </View>
        </View>
    )


}





export default QuestDetailScreen;

