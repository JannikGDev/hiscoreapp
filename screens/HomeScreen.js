import { StyleSheet, Text, View, Image, Button } from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import styles from '../styles/defaultStyle';
import Spacer from '../shared/Spacer'
import { LogOut, IsLoggedIn } from '../shared/GlobalStorage.js';
import { UserContext, GameContext } from '../shared/Contexts';
import { GetUserData } from '../shared/HiscoreAPI';
import { HSButton, NavButton } from '../shared/Controls';


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

        {userMode && <NavButton text={"Profil"} navigation={navigation} style={[styles.widthHalf]} navTarget={'Profile'}/>}

        <NavButton text={"Quests"} navigation={navigation} navTarget={'QuestList'} style={[styles.widthHalf]}  numberIndicator={userState.openQuests == 0 ? null : userState.openQuests}/>

        <Spacer bottom={64} />

        {userMode && <NavButton text={"QR Code Scannen"} navigation={navigation} style={[styles.widthHalf]}  navTarget={'QRScanner'}/>}

        <NavButton text={"Game Highscores"} navigation={navigation} style={[styles.widthHalf]}  navTarget={'GameList'}/>

        {adminMode && <NavButton text={"QR Code erzeugen"} navigation={navigation} style={[styles.widthHalf]}  navTarget={'QRCodeGenerator'}/>}

        <Spacer bottom={48} />
        <HSButton text="Logout" 
          style={[styles.widthHalf]} 
          onPress={async () =>{
              await LogOut();
              let newState = {...userState};
              newState.loggedIn = await IsLoggedIn();
              setUserState(newState);
          }}
        />
      </View>
    );
  };

  export default HomeScreen;