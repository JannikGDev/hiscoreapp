import { StyleSheet, Text, View, Image, Button, TextInput, SafeAreaView } from 'react-native';
import React, {useState, useContext} from 'react';
import styles from '../styles/defaultStyle';
import Spacer from '../shared/Spacer'
import MessageBox from '../shared/MessageBox'
import { Login, GetUserData } from '../shared/HiscoreAPI'
import { UserContext } from '../shared/Contexts';
import { IsLoggedIn } from '../shared/GlobalStorage.js'
import { NavButton, HSButton } from '../shared/Controls';




const LoginScreen = ({navigation, route}) => {

    const {userState, setUserState} = useContext(UserContext);

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState("");

    const [loginComplete, setLoginComplete] = useState(false);


    const validLogin = userName.length > 0 && password.length > 0;

    return (
        <View style={styles.pageContainer}> 


        <Image 
            source={require('../assets/hi-score_logo.png')} 
            resizeMode="contain"
            style={[{height: 100, width: '100%'}]}/>

<Spacer bottom={12} />

        <Image 
            source={require('../assets/header-bg.png')} 
            resizeMode="contain"
            style={[{height: 100, width: '100%'}]}/>

            <Text style={[styles.text, styles.textBig, styles.headerText, styles.pageTitle]}>Login{"\n"}</Text>


      

        <Spacer bottom={24} />
        <SafeAreaView style = {{width: '80%'}}>
        <Text style={styles.text}>
            Gib deinen Benutzernamen und Passwort ein, um dich einzuloggen oder registriere dich, wenn du noch keinen Account hast.
            </Text>

        <Spacer bottom={24} />
        </SafeAreaView>

        <MessageBox 
            text={message}
            show={showMessage}
            onClose={() => {
                setShowMessage(false);    
            }}
        />

    <SafeAreaView style = {{width: '50%'}}>
            <TextInput
                style={styles.textInput}
                onChangeText={setUserName}
                placeholder="Benutzername"
                value={userName}
                keyboardType='default'
                textContentType='username'
            />
            <TextInput
                style={styles.textInput}
                onChangeText={setPassword}
                value={password}
                placeholder="Passwort"
                textContentType='password'
                secureTextEntry={true}
            />
        </SafeAreaView>

        <Spacer bottom={16} />


        <HSButton text={"Einloggen"} style={[styles.widthHalf]}
            disable={!validLogin}
            onPress={async () =>
                {
                    if(loginComplete)
                        return;
    
                    if(userName.length == 0 || password.length == 0)
                    {
                        setMessage("Bitte gib einen Benutzernamen und Passwort ein.");
                        setShowMessage(true);
                        return;
                    }
                    let result = await Login(userName, password);
    
                    if(result.statusCode == 401) {
                        setMessage("Benutzername und Passwort stimmen nicht überein.");
                        setShowMessage(true);
                        return;
                    }
    
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
                }}
        />

        <Spacer bottom={16} />

        <NavButton text={"Registrieren"} navigation={navigation} style={[styles.widthHalf]} navTarget={'Register'}/>

        <Spacer bottom={16} />

        <NavButton text={"Passwort vergessen?"} navigation={navigation} style={[styles.widthHalf]} navTarget={'PasswordReset'}/>

        </View>
    )
}

export default LoginScreen;