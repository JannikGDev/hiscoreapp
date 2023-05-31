import { StyleSheet, Text, View, Image, Button, TextInput, SafeAreaView } from 'react-native';
import React, {useState, useContext} from 'react';
import styles from '../styles/defaultStyle';
import Spacer from '../shared/Spacer'
import MessageBox from '../shared/MessageBox'
import { Login } from '../shared/CompanionAPI'
import { UserContext } from '../shared/Contexts';
import { IsLoggedIn } from '../shared/GlobalStorage.js'



const LoginScreen = ({navigation, route}) => {

    const {userState, setUserState} = useContext(UserContext);

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState("");

    const [loginComplete, setLoginComplete] = useState(false);

    return (
        <View style={styles.pageContainer}> 

        <Text style={styles.pageTitle}>Login</Text>

        <Spacer bottom={24} />
        <SafeAreaView style = {{width: '80%'}}>
        <Text style={styles.text}>
            Gebe deinen Benutzernamen und Passwort ein um dich einzuloggen oder registriere dich wenn du noch keinen Account hast.
            </Text>

        <Spacer bottom={12} />
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

        <View style = {{width: '50%'}}>
            <Button
            title="Einloggen"
            color={styles.button.color}
            onPress={ async () =>
            {
                if(loginComplete)
                    return;

                if(userName.length == 0 || password.length == 0)
                {
                    setMessage("Bitte gebe einen Benutzernamen und Passwort ein.");
                    setShowMessage(true);
                    return;
                }
                let result = await Login(userName, password);

                if(result.statusCode == 401) {
                    setMessage("Benutzername und Passwort stimmen nicht überein.");
                    setShowMessage(true);
                    return;
                }

                let newState = {...userState};
                newState.loggedIn = await IsLoggedIn();
                setUserState(newState);

                if(!newState.loggedIn) {
                    setMessage(result.message);
                    setShowMessage(true);
                }
            }}
            />
        </View>

        <Spacer bottom={16} />

        <View style = {{width: '50%'}}>
            <Button
            title="Registrieren"
            color={styles.button.color}
            onPress={() =>
                navigation.navigate('Register')
            }
            />
        </View>

        <Spacer bottom={16} />

        <View style = {{width: '50%'}}>
            <Button
            title="Passwort vergessen?"
            color={styles.button.color}
            onPress={() =>
                navigation.navigate('PasswordReset')
            }
            />
        </View>

        </View>
    )
}

export default LoginScreen;