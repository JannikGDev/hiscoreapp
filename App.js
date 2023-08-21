
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
import DebugScreen from './screens/DebugScreen.js';
import QuestListScreen from './screens/QuestListScreen.js'
import { UserContext } from './shared/Contexts.js';
import { IsLoggedIn } from './shared/GlobalStorage.js';
import SplashScreen from './screens/SplashScreen.js';
import PasswordResetScreen from './screens/PasswordResetScreen.js';
import {GetQuests, GetUserData} from './shared/HiscoreAPI.js'
import { QRScannerScreen } from './screens/QRScannerScreen.js';
import QRCodeGeneratorScreen from './screens/QRCodeGenerator.js';
import Spacer from './shared/Spacer.js';
import GameListScreen from './screens/GameListScreen.js';
import HighscoreSubmitScreen from './screens/HighscoreSubmitScreen.js';
import HighscoreListScreen from './screens/HighscoreListScreen.js';
import { HighscoreScreen } from './screens/HighscoreScreen.js';
import { Logs } from 'expo'
import QuestDetailScreen from './screens/QuestDetailScreen.js';
import { REPETITION_DAILY } from './shared/Constants.js';

Logs.enableExpoCliLogging()
const Stack = createNativeStackNavigator();

export default function App() {

  const [userState, setUserState] = React.useState(null);
  const [game, setGame] = React.useState(null);

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

          if(!isAdmin) {
            let questResult = await GetQuests();
            if(questResult.success) {
              let quests = questResult.response;
              newUserState.openQuests = quests.filter((quest) => !quest.done && quest.repetition == REPETITION_DAILY && quest.requirementsFulfilled && !quest.hidden).length;
            } 
            else
              newUserState.openQuests = 0;
          }
          else {
            newUserState.openQuests = 0;
          }

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
        QuestDetail: 'questdetail',
        Login: 'login',
        Register: 'register',
        PasswordReset: 'pwreset',
        QRCodeGenerator: 'qrgen',
        GameList: 'games',
        HighscoreSubmit: 'highscoreSubmit',
        HighscoreList: 'highscorelist',
        Highscore: 'highscore'
      },
    };
  

    const linking = {
      prefixes: [''],
      config: linkConfig,
    };

  return (
      <View style={{width: '100%', height: '100%', backgroundColor: defaultStyles.container.backgroundColor}}>
        <UserContext.Provider  value={{userState, setUserState}}>
          <NavigationContainer linking={linking}> 
            <Stack.Navigator screenOptions={{
                headerStyle: defaultStyles.navigationHeader.headerStyle,
                headerTintColor: defaultStyles.navigationHeader.headerTintColor,
                headerTitleStyle: defaultStyles.navigationHeader.headerTitleStyle,
                headerShown: false,
                contentStyle:{
                  backgroundColor:'#040205'
                }
              }}>

               {// Load Mode
              (userState == null) && (<>
                <Stack.Screen name="Splashscreen"component={SplashScreen} options={{title: ''}}/>
                </>)}
              
              {// Login Mode
              (userState != null && !userState.loggedIn) && (<>
               <Stack.Screen name="Login" component={LoginScreen} />
               <Stack.Screen name="Register" component={RegisterScreen} options={{title: ''}}/>
               <Stack.Screen name="PasswordReset" component={PasswordResetScreen} options={{title: ''}}/>
              </>)}

              {// UserMode Mode
              (userState != null && userState.loggedIn && !userState.isAdmin) && (<>
                <Stack.Screen name="Home" component={HomeScreen} options={{title: ''}}/>
                <Stack.Screen name="Profile" component={ProfileScreen} options={{title: ''}}/>
                <Stack.Screen name="QRScanner" component={QRScannerScreen} options={{title: ''}}/>
                <Stack.Screen name="QuestList" component={QuestListScreen} options={{title: ''}}/>
                <Stack.Screen name="QuestDetail" component={QuestDetailScreen} options={{title: ''}}/>
                <Stack.Screen name="GameList" component={GameListScreen} options={{title: ''}}/>
                <Stack.Screen name="HighscoreList" component={HighscoreListScreen} options={{title: ''}}/>
                <Stack.Screen name="HighscoreSubmit" component={HighscoreSubmitScreen} options={{title: ''}}/> 
              </>)}

              {// Admin Mode
              (userState != null && userState.loggedIn && userState.isAdmin) && (<>
              <Stack.Screen name="Home" component={HomeScreen} options={{title: ''}}/>
              <Stack.Screen name="QuestList" component={QuestListScreen} options={{title: ''}}/>
              <Stack.Screen name="QuestDetail" component={QuestDetailScreen} options={{title: ''}}/>
              <Stack.Screen name="GameList" component={GameListScreen} options={{title: ''}}/>
              <Stack.Screen name="QRCodeGenerator" component={QRCodeGeneratorScreen}  options={{title: ''}}/>
              <Stack.Screen name="HighscoreList" component={HighscoreListScreen} options={{title: ''}}/>
              </>)}


              { //Public Screens
                 <Stack.Screen name="HighscoreScreen"component={HighscoreScreen} options={{title: ''}}/>
              }
            </Stack.Navigator>
          </NavigationContainer>
        </UserContext.Provider>
      </View>
  );
}
