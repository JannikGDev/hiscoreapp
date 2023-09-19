import React, {useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Button, FlatList, StatusBar, SafeAreaView } from 'react-native';
import styles from '../styles/defaultStyle';
import Spacer from '../shared/Spacer'
import {GetQuests} from '../shared/HiscoreAPI.js'
import {GetQuestRewardMultiplier, GetQuestRewardExp, GetRepetitionString} from '../shared/Utility.js'
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { REPETITION_DAILY } from '../shared/Constants';
import { NavButton } from '../shared/Controls';



const QuestDetailScreen = ({route, navigation}) => {

    let quest = route.params.quest;
    //console.log(quest);

    return(
        <View style={styles.pageContainer}>

            <Image 
            source={require('../assets/header-bg.png')} 
            resizeMode="contain"
            style={[{height: 100, width: '100%'}]}/>

            <Text style={[styles.text, styles.textBig, styles.headerText, styles.pageTitle]}>Quest{"\n"}</Text>
            <Text style={[styles.textLight, styles.textBigger, {textAlign: 'center', paddingLeft:20, paddingRight:20}]}>{quest.name}</Text>

            <Text style={[styles.text, styles.textBold]}>{"\n"}Status: {quest.requirementsFulfilled ? (quest.done ? "Erledigt!" : "Offen") : "Nicht freigeschaltet"}</Text>
            <Text style={[styles.text]}>{GetRepetitionString(quest.repetition)} wiederholbar</Text>



            <Image 
            source={require('../assets/header-bg-2.png')} 
            resizeMode="contain"
            style={[{height: 100, width: '100%', top:-50}]}/>     


{/* {quest.requirements.length > 0 &&
                <View style={{flexDirection: 'column', width: '100%', marginBottom: '2vh'}}>
                    <Text style={styles.text}>Voraussetzung:</Text>                    
                    {quest.requirements.map((req) => <Text style={styles.text}>{req.description}</Text> )}
                </View>
            }*/}

            {quest.tasks.length > 0 &&
                <View style={{flexDirection: 'column', width: '100%', marginTop: '2vh', marginBottom: '2vh'}}>
                    <Text style={[styles.text, styles.textBig, styles.textBold]}>Aufgaben</Text>
                    
                

                    {quest.tasks.map((task) => 
                            <Text style={styles.text}>{task.description}</Text>
                    )}
                </View>
            }

            {quest.rewards.length > 0 &&
                <View style={{flexDirection: 'column', width: '100%', marginTop: '2vh', marginBottom: '2vh'}}>
                    <Text style={[styles.text, styles.textBig, styles.textBold]}>Belohnungen</Text>
                
                    {quest.rewards.map((reward) => 
                            <Text style={styles.text}>{reward.description}</Text>
                    )}
                </View>
            }

<Spacer bottom={36} />            



            {quest.tasks.some((t) => t.taskType == "QRCode") &&
                <NavButton text={"QR-Code scannen"} navigation={navigation} style={[styles.widthHalf]}  navTarget={'QRScanner'}/>
            }

            {quest.tasks.some((t) => t.taskType == "Highscore") &&
                <NavButton text={"Highscore hochladen"} navigation={navigation} style={[styles.widthHalf]}  navTarget={'GameList'}/>
            }



           
        </View>
    )


}





export default QuestDetailScreen;

