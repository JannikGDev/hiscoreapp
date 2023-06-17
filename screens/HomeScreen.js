import { StyleSheet, Text, View, Image, Button } from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import styles from '../styles/defaultStyle';
import Spacer from '../shared/Spacer'
import { LogOut, IsLoggedIn } from '../shared/GlobalStorage.js';
import { UserContext, GameContext } from '../shared/Contexts';
import { GetUserData } from '../shared/CompanionAPI';
import { NavButton } from '../shared/Controls';


const HomeScreen = ({navigation}) => {

    const deDateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [lastVisit, setLastVisit] = useState(new Date());

    const {userState, setUserState} = useContext(UserContext);

    let userMode = !userState.isAdmin;
    let adminMode = userState.isAdmin;

    return (
        <View style={styles.pageContainer}>

        <Image source={require('../assets/hi-score_logo.png')}
        style={[styles.logo,{width: 400, height: 200}]}/>

        {adminMode && (<Text style={styles.pageTitle}>Admin Mode</Text>)}

        <Spacer bottom={24} />

        {userMode && <NavButton text={"Profil"} navigation={navigation} navTarget={'Profile'}/>}

        {userMode && <NavButton text={"QR Code Scannen"} navigation={navigation} navTarget={'QRScanner'}/>}

        <NavButton text={"Quests"} navigation={navigation} navTarget={'QuestList'}/>

        <NavButton text={"Games"} navigation={navigation} navTarget={'GameList'}/>

        {adminMode && <NavButton text={"QR Code erzeugen"} navigation={navigation} navTarget={'QRCodeGenerator'}/>}

        <Spacer bottom={48} />
        <View style = {styles.navButton}>
            <Button
            title="Logout"
            color={styles.button.color}
            onPress={async () =>{
                await LogOut();
                let newState = {...userState};
                newState.loggedIn = await IsLoggedIn();
                setUserState(newState);
            }}
            />
        </View>
      </View>
    );
  };

  export default HomeScreen;