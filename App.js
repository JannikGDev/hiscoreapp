
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import defaultStyles from './styles/defaultStyle.js';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen.js'
import ProfileScreen from './screens/ProfileScreen.js'
import RegisterScreen from './screens/RegisterScreen.js'
import LoginScreen from './screens/LoginScreen.js';
import QuestListScreen from './screens/QuestListScreen.js'
import { UserContext } from './shared/Contexts.js';
import { IsLoggedIn } from './shared/GlobalStorage.js';
import SplashScreen from './screens/SplashScreen.js';
import PasswordResetScreen from './screens/PasswordResetScreen.js';
import {GetUserData} from './shared/CompanionAPI.js'
import { QRScannerScreen } from './screens/QRScannerScreen.js';
import QRCodeGeneratorScreen from './screens/QRCodeGenerator.js';
import Spacer from './shared/Spacer.js';
import GameListScreen from './screens/GameListScreen.js';
import HighscoreSubmitScreen from './screens/HighscoreSubmitScreen.js';

const Stack = createNativeStackNavigator();

export default function App() {

  const [userState, setUserState] = React.useState(null);

    //Check if logged in
    React.useEffect(() => {
         async function checkLogin() {
          let loggedIn = await IsLoggedIn();
          let isAdmin = false;

          if(loggedIn) {
            let result = await GetUserData();
            loggedIn = loggedIn && result.success;
            isAdmin = result.response.isAdmin;
          }
         
          let newUserState = {...userState};
          newUserState.loggedIn = loggedIn;
          newUserState.isAdmin = isAdmin;
          setUserState(newUserState);
         }
         checkLogin();
    }, []);

    const linkConfig = {
      screens: {
        Home: 'home',
        Profile: 'usr',
        QRScanner: 'scan',
        QuestList: 'quests',
        Login: 'login',
        Register: 'register',
        PasswordReset: 'pwreset',
        QRCodeGenerator: 'qrgen',
        GameList: 'games',
        HighscoreSubmit: 'highscoreSubmit'
      },
    };
  

    const linking = {
      prefixes: [''],
      config: linkConfig,
    };

  return (
      <View style={{flex: 1, backgroundColor: defaultStyles.container.backgroundColor}}>
        <UserContext.Provider  value={{userState, setUserState}}>
          <NavigationContainer linking={linking}> 
            <Stack.Navigator screenOptions={{
                headerStyle: defaultStyles.navigationHeader.headerStyle,
                headerTintColor: defaultStyles.navigationHeader.headerTintColor,
                headerTitleStyle: defaultStyles.navigationHeader.headerTitleStyle
              }}>

               {// Load Mode
              (userState == null) ? (<>
                <Stack.Screen name="Splashscreen"component={SplashScreen} options={{title: 'Splash'}}/>
                </>) : <></>}
              
              {// Login Mode
              (userState != null && !userState.loggedIn) ? (<>
               <Stack.Screen name="Login" component={LoginScreen} />
               <Stack.Screen name="Register" component={RegisterScreen} options={{title: 'Registrieren'}}/>
               <Stack.Screen name="PasswordReset" component={PasswordResetScreen} options={{title: 'Passwort zurücksetzen'}}/>
              </>) : <></>}

              {// UserMode Mode
              (userState != null && userState.loggedIn && !userState.isAdmin) ? (<>
                <Stack.Screen name="Home"component={HomeScreen} options={{title: 'Home'}}/>
                <Stack.Screen name="Profile" component={ProfileScreen} options={{title: 'Profil'}}/>
                <Stack.Screen name="QRScanner" component={QRScannerScreen} options={{title: 'QR Code Scannen'}}/>
                <Stack.Screen name="QuestList" component={QuestListScreen} options={{title: 'Quests'}}/>
                {/*<Stack.Screen name="GameList" component={GameListScreen} options={{title: 'Games'}}/>*/}
                {/*<Stack.Screen name="HighscoreSubmit" component={HighscoreSubmitScreen} options={{title: 'Highscore eintragen'}}/> */}
              </>) : <></>}

              {// Admin Mode
              (userState != null && userState.loggedIn && userState.isAdmin) ? (<>
              <Stack.Screen name="Home"component={HomeScreen} options={{title: 'Home'}}/>
              <Stack.Screen name="QuestList" component={QuestListScreen} options={{title: 'Quests'}}/>
              {/*<Stack.Screen name="GameList" component={GameListScreen} options={{title: 'Games'}}/>*/}
              <Stack.Screen name="QRCodeGenerator" component={QRCodeGeneratorScreen} />
               {/*<Stack.Screen name="HighscoreSubmit" component={HighscoreSubmitScreen} options={{title: 'Highscore eintragen'}}/>*/}
              </>) : <></>}



            </Stack.Navigator>
          </NavigationContainer>
        </UserContext.Provider>
      </View>
  );
}
