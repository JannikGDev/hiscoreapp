import React, {useState, useEffect } from 'react';
import {Pressable, StyleSheet, Text, View, Image, Button, FlatList, StatusBar, SafeAreaView } from 'react-native';
import styles from '../styles/defaultStyle';
import Spacer from '../shared/Spacer'
import {GetQuests, GenerateQRCode} from '../shared/CompanionAPI.js'
import {GetQuestRewardMultiplier, GetQuestRewardExp, GetRepetitionString} from '../shared/Utility.js'




const QRCodeGeneratorScreen = ({navigation, route}) => {

    const [initiated, setInitiated] = useState(false);
    const [questItems, setQuestItems] = useState([]);

    const [image, setImage] = useState("");

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
    else if(image.length > 0)
        return (<View style={styles.pageContainer}>
            <Image
            style={{
                width: 300,
                height: 300,
                resizeMode: 'contain',
                flex: 1,
            }}
            source={{
                uri: image,
            }}
            />
              <Button
            title="Back"
            color={styles.button.color}
            onPress={() =>setImage("")}
            />
        </View>)
    else
    {
    return (
        <View style={[styles.listContainer,{paddingTop: 32}]}>
        <SafeAreaView style={[styles.listContainer]}>
        <Text style={styles.pageTitle}>Generate QR Code</Text>
            <FlatList
                data={questItems}
                renderItem={(entry) => <QuestListItem entry={entry} setImage={setImage} />}
                keyExtractor={quest => quest.id}
            />
        </SafeAreaView>
        </View>
        )
    }
};

export const QuestListItem = ({entry, setImage}) => 
{
    let quest = entry.item;

    return  (
    <Pressable onPress={async () => {
        
        let result = await GenerateQRCode(quest.id);
        setImage(result.image);

      }}>
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
        </Pressable>
      );
}













export default QRCodeGeneratorScreen;