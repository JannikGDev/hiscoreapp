import styles from '../styles/defaultStyle';
import React, {useState, useEffect, useRef, useContext } from 'react';
import { StyleSheet, Text, View, Image, Button, FlatList, StatusBar, SafeAreaView, TouchableOpacity, Pressable, ImageBackground  } from 'react-native';


export const NavButton = ({text, navigation, navTarget, style, params, numberIndicator, disable}) => {
    return (
        <HSButton
        onPress={() =>navigation.navigate(navTarget, params)}
        text={text}
        style={style}
        numberIndicator={numberIndicator}
        disable={disable}
        >

        </HSButton>
    );

};

export const HSButton = ({text, style, onPress, numberIndicator, disable}) => {

    let disabled = disable === true;
    let bgImageStyle = disabled ? styles.hsButtonDisabled : styles.hsButtonEnabled;

    return (
        <Pressable 
            style={[style,styles.hsButton,styles.button,bgImageStyle]}          
            color={styles.button.color}
            onPress={ disabled ?  () => {} : onPress }
            >
                <Text style={[{width: '100%', height: '100%'}, styles.text, styles.textBig]}>
                {text}
                </Text>
            {!disabled && numberIndicator &&
            <ImageBackground style={styles.buttonIndicator} source={require('../assets/buttonIndicator.png')} resizeMode="contain">
                <Text style={styles.buttonIndicatorText}>{numberIndicator}</Text>
            </ImageBackground>
            }
        </Pressable>
    );

};


