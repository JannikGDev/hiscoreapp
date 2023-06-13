import { StyleSheet, Text, View, Image, Button } from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import styles from '../styles/defaultStyle';
import Spacer from '../shared/Spacer'
import { LogOut, IsLoggedIn } from '../shared/GlobalStorage.js';
import { UserContext } from '../shared/Contexts';
import { GetUserData } from '../shared/CompanionAPI';



const HomeScreen = ({navigation}) => {

    const deDateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [lastVisit, setLastVisit] = useState(new Date());

    const {userState, setUserState} = useContext(UserContext);

    return (
        <View style={styles.pageContainer}>

        <Image source={require('../assets/hi-score_logo.png')}
        style={[styles.logo,{width: 400, height: 200}]}/>

        {userState.isAdmin ? (<Text style={styles.pageTitle}>Admin Mode</Text>) : (<></>)}

        <Spacer bottom={24} />
        
        { //User Mode
        (!userState.isAdmin) ? 
            (<>
             <View style = {{width: '50%'}}>
            <Button
            title="Profil"
            color={styles.button.color}
            onPress={() =>
                navigation.navigate('Profile')
            }
            />
        </View>
        <Spacer bottom={12} />
        <View style = {{width: '50%'}}>
            <Button
            title="QR Code Scannen"
            color={styles.button.color}
            onPress={() =>
                navigation.navigate('QRScanner')
            }
            />
        </View>
        <Spacer bottom={12} />
        <View style = {{width: '50%'}}>
            <Button
            title="Quests"
            color={styles.button.color}
            onPress={() =>
                navigation.navigate('QuestList')
            }
            />
        </View>
        <Spacer bottom={12} />
        <View style = {{width: '50%'}}>
            <Button
            title="Games"
            color={styles.button.color}
            onPress={() =>
                navigation.navigate('GameList')
            }
            />
        </View>
        
        </> )
            : 
            (<>
            <View style = {{width: '50%'}}>
            <Button
            title="Generate QR Code"
            color={styles.button.color}
            onPress={() =>
                navigation.navigate('QRCodeGenerator')
            }
            />
        </View>
        <Spacer bottom={12} />
        <View style = {{width: '50%'}}>
            <Button
            title="Quests"
            color={styles.button.color}
            onPress={() =>
                navigation.navigate('QuestList')
            }
            />
        </View>
        <Spacer bottom={12} />
        <View style = {{width: '50%'}}>
            <Button
            title="Games"
            color={styles.button.color}
            onPress={() =>
                navigation.navigate('GameList')
            }
            />
        </View>
            </>)    
        }   
  
        <Spacer bottom={48} />
        <View style = {{width: '50%'}}>
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