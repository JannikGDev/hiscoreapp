import React, {useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Button, FlatList, StatusBar, SafeAreaView } from 'react-native';
import styles from '../styles/defaultStyle';
import Spacer from '../shared/Spacer'
import {GetGames} from '../shared/CompanionAPI.js'
import {GetQuestRewardMultiplier, GetQuestRewardExp, GetRepetitionString} from '../shared/Utility.js'

const HighscoreSubmitScreen = ({navigation, route}) => {

    return (
        <View styles={styles.pageContainer}>
        <Text styles={styles.pageTitle}>
            Highscore eintragen
        </Text>
    </View>
    );
};

export default HighscoreSubmitScreen;