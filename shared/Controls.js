import styles from '../styles/defaultStyle';
import React, {useState, useEffect, useRef, useContext } from 'react';
import { StyleSheet, Text, View, Image, Button, FlatList, StatusBar, SafeAreaView, TouchableOpacity, Pressable } from 'react-native';


export const NavButton = ({text, navigation, navTarget, style, params}) => {
    return (
        <View style={[style,styles.navButton]}>
            <Button
            title={text}
            color={styles.button.color}
            onPress={() =>
                navigation.navigate(navTarget, params)
            }
            />
        </View>
    );

};


