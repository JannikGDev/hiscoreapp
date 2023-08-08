import { StyleSheet, Text, View, Image, Button, Pressable } from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import styles from '../styles/defaultStyle';
import Spacer from '../shared/Spacer'
import { LogOut, IsLoggedIn } from '../shared/GlobalStorage.js';
import { UserContext, GameContext } from '../shared/Contexts';
import {Login, GetGames, GetImage} from '../shared/HiscoreAPI';
import { NavButton } from '../shared/Controls';
import { SafeAreaView } from 'react-native-safe-area-context';


export const PanelList = ({panelItems}) => {

    let rowCount = Math.ceil((panelItems.length/3));
    let rows = [...Array(rowCount).keys()]
    return (
    <SafeAreaView style={styles.panelContainer}>
        {
           rows.map(rowNum => 
            <View style={styles.panelRow}>
                {panelItems.length > rowNum*3 &&
                <Pressable style={styles.panel} onPress={panelItems[rowNum*3].onPress}>
                    <Image source={panelItems[rowNum*3].imageSrc} style={styles.panelImage}>
    
                    </Image>
                </Pressable>
                }
                {panelItems.length > rowNum*3 + 1 &&
                <Pressable style={styles.panel} onPress={panelItems[rowNum*3+1].onPress}>
                    <Image source={panelItems[rowNum*3+1].imageSrc} style={styles.panelImage}>
    
                    </Image>
                </Pressable>
                }
                {panelItems.length > rowNum*3 + 2 &&
                <Pressable style={styles.panel} onPress={panelItems[rowNum*3+2].onPress}>
                    <Image source={panelItems[rowNum*3+2].imageSrc}  style={styles.panelImage}>
    
                    </Image>
                </Pressable>
                }
                
            </View>
            )
        }
       
    </SafeAreaView>)
    
}