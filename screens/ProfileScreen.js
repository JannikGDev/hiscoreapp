import React, {useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Button, Pressable, ImageBackground } from 'react-native';
import styles from '../styles/defaultStyle';
import Spacer from '../shared/Spacer'
import {GetUserData, ChangeAvatar} from '../shared/CompanionAPI.js'
import Avatars from '../shared/Avatars';
import { SafeAreaView } from 'react-native-safe-area-context';



const ProfileScreen = ({navigation, route}) => {

    const deDateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    const [initiated, setInitiated] = useState(false);
    const [userName, setUserName] = useState("");
    const [level, setLevel] = useState(0);
    const [currentExp, setCurrentExp] = useState(0);
    const [nextLevelExp, setNextLevelExp] = useState(0);
    const [dayExp, setDayExp] = useState(0);
    const [multiplier, setMultiplier] = useState(1.0);
    const [avatarNum, setAvatarNum] = useState(10);
    const [editMode, setEditMode] = useState(false);

    
    useEffect( () => {
        // declare the data fetching function
        const fetchData = async () => {
            let result = await GetUserData();
            if(!result.success) {
                //console.log(result);
                return;
            }
            
            let userData = result.response;
            setUserName(userData.userName);
            setLevel(userData.level);
            setCurrentExp(userData.experience);
            setNextLevelExp(userData.nextLevelExperience);
            setDayExp(userData.rawExperienceToday);
            setMultiplier(userData.dayMultiplier);
            if(!editMode) {
                let avatar = userData.avatarNumber;
                if(avatar < 1)
                    avatar = 1;
                if(avatar > 80)
                    avatar = 80;
                setAvatarNum(avatar);
            }
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
        <View style={styles.pageContainer}>
            <Spacer bottom={24} />
            
            <Pressable style={{flex: 0.1, width: '40%', justifyContent: 'flex-end', flexDirection: 'row'}}
            onPress={async () => {
                if(editMode) {
                    await ChangeAvatar(avatarNum);
                }
                setEditMode(!editMode);
            }}>
                <Image style={[styles.inlineIcon,{flex: 0.2}]} source={editMode ? require('../assets/save.png') : require('../assets/edit.png')} />
            </Pressable>

            <Image source={Avatars[avatarNum]}
                style={{width: '50%', flex: 0.5}} 
                resizeMode='contain'
            ></Image>
            {editMode ? ( <View style={[styles.container,{flexDirection: 'row', flex: 0.1, justifyContent: 'center'}]}>
                <Pressable style={{height: '100%', flex: 0.3}}
                    onPress={async () => {
                    setAvatarNum((avatarNum%80)+1)
                }}> 
                    <Image style={[styles.inlineIcon,{ height: '100%'}]} source={require('../assets/arrow-right.png')} />
                </Pressable>

                <Pressable style={{height: '100%', flex: 0.3}}
                    onPress={async () => {
                    setAvatarNum((avatarNum == 1 ? 80 : avatarNum-1));
                }}>
                    <Image style={[styles.inlineIcon,{ height: '100%'}]}  source={require('../assets/arrow-left.png')}/>
                </Pressable>
            </View>) : (<></>) }
        
            <Spacer bottom={32}/> 

            <Text style={[styles.text, styles.textBig]}>
                {userName}
            </Text>
            <Text style={[styles.textDark, styles.textBigger]}>
                Level {level}
            </Text>

            <Spacer bottom={24} />
            <View style={[styles.container, {width: '60%'}]}>
            <ExpView exp={currentExp} expNextLevel={nextLevelExp} multiplier={multiplier} dayExp={dayExp}/>
            </View>
        </View>
        )
    }
};



const ExpView = ({exp, expNextLevel, multiplier, dayExp, preDayExp}) => {
    return (
        <View style={[styles.container, {flexDirection: 'column', alignItems: 'flex-start'}]}>

            <Text style={styles.text}>EXP (gestern): {(exp - (dayExp*multiplier)).toFixed(0)}</Text>
            <Text style={styles.text}>EXP (heute): {dayExp} x {multiplier.toFixed(1)} = {(multiplier*dayExp).toFixed(0)}</Text>
            <Text style={styles.text}>EXP gesamt: {(multiplier*dayExp).toFixed(0)} + {(exp - multiplier*dayExp).toFixed(0)} = {exp.toFixed(0)}</Text>

            <Text style={styles.text}>Heute gesammelte EXP: {dayExp.toFixed(0)}</Text>
            <Text style={styles.text}>Multiplikator: x{multiplier.toFixed(1)}</Text>

            <Text style={styles.text}>Nächstes Level ab: {expNextLevel.toFixed(0)}</Text>
        </View>
    )
};





const TrophyView = props => {
    return (
        <View style={styles.container}>
            <Text style={[styles.text, styles.textBigger, {alignSelf: 'flex-start', paddingLeft: 10, paddingBottom: 24}]}>
                Trophäen
            </Text>
            <View style={{flexDirection: 'row'}}>
                <TrophyCount image={require('../assets/trophy_gold.png')} count={props.goldCount}/>
                <TrophyCount image={require('../assets/trophy_silver.png')} count={props.silverCount}/>
                <TrophyCount image={require('../assets/trophy_bronze.png')} count={props.bronzeCount}/>
                <TrophyCount image={require('../assets/ribbon_red.png')} count={props.awardCount}/>
            </View>
        </View>
    );
};

const TrophyCount = props => {
    return(
        <View style={styles.container}>
        <Image source={props.image}
            style={{height: 100, width: 100}}
            resizeMode='contain'
        />
        <Text style={styles.text}>
            {props.count}
        </Text>
        </View>
    )
};




export default ProfileScreen