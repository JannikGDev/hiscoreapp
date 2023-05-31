import { StyleSheet, Text, View, Image, Button, TextInput, SafeAreaView } from 'react-native';
import React, {useState} from 'react';
import styles from '../styles/defaultStyle';
import Spacer from '../shared/Spacer'
import MessageBox from '../shared/MessageBox'
import { Register } from '../shared/CompanionAPI'



const RegisterScreen = ({navigation, route}) => {


    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [mail, setMail] = useState("");

    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState("");

    const [registerComplete, setRegisterComplete] = useState(false);

    return (
        <View style={styles.pageContainer}> 

        <Text style={styles.pageTitle}>Registrieren</Text>

        <Spacer bottom={24} />
        <SafeAreaView style = {{width: '80%'}}>
        <Text style={styles.text}>
            Gebe einen neuen Benutzernamen, E-Mail Adresse und Passwort mit mindestens 8 Zeichen ein um dich zu registrieren.
            </Text>
        <Spacer bottom={12} />

        </SafeAreaView>

        <MessageBox 
            text={message}
            show={showMessage}
            onClose={() => {
                setShowMessage(false);
                if(registerComplete)
                    navigation.goBack();
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
                onChangeText={setMail}
                value={mail}
                placeholder="E-Mail-Adresse"
                textContentType='emailAddress'
                autoCorrect={false}
                keyboardType='email-address'
            />
            <TextInput
                style={styles.textInput}
                onChangeText={setPassword}
                value={password}
                placeholder="Passwort"
                textContentType='newPassword'
                secureTextEntry={true}
            />
        </SafeAreaView>

        <Spacer bottom={16} />

        <View style = {{width: '50%'}}>
            <Button
            title="Registrieren"
            color={styles.button.color}
            onPress={ async () =>
            {
                if(registerComplete)
                    return;

                if(userName.length == 0 || password.length < 8 || mail.length == 0) {
                    setMessage("Bitte gebe einen Nutzernamen, eine E-Mail und ein Passwort mit mindestens 8 Zeichen an.");
                    setShowMessage(true);
                    return;
                }

                let result = await Register(userName, password, mail);
                
                if(result.statusCode != 200) {
                    console.log(result);
                    if(result.message.includes('The given UserName')) {
                        setMessage("Der eingegebene Benutzername ist bereits vergeben.");
                        setShowMessage(true);
                    }
                    else if(result.message.includes('The given Mail')) {
                        setMessage("Die eingegebene E-Mail ist bereits vergeben.");
                        setShowMessage(true);
                    }
                    else {
                        setMessage("Die Eingabe wurde abgelehnt mit der Nachricht: " + result.message);
                        setShowMessage(true);
                    }
                   
                    return;
                }

                setMessage(result.message);
                setShowMessage(true);
                if(result.success)
                   setRegisterComplete(true);
                }
            }
            />
        </View>

        </View>
    )
}

export default RegisterScreen;