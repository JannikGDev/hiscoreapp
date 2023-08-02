import { StyleSheet, Text, View, Image, Button, TextInput, SafeAreaView } from 'react-native';
import React, {useState} from 'react';
import styles from '../styles/defaultStyle';
import Spacer from '../shared/Spacer'
import MessageBox from '../shared/MessageBox'
import { PasswordResetRequest, PasswordResetSubmit } from '../shared/HiscoreAPI'



const PasswordResetScreen = ({navigation, route}) => {

    const [mail, setMail] = useState("");
    const [code, setCode] = useState("");
    const [newPassword, setNewPassword] = useState("");


    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState("");

    return (
        <View style={styles.pageContainer}> 

        <Text style={styles.pageTitle}>Passwort zurücksetzen</Text>

        <Spacer bottom={24} />
        <SafeAreaView style = {{width: '80%'}}>
        <Text style={styles.text}>
            Gib deine Mailadresse ein, um dein Passwort zurückzusetzen.
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
                onChangeText={setMail}
                value={mail}
                placeholder="E-Mail Adresse"
                textContentType='emailAddress'
                autoCorrect={false}
                keyboardType='email-address'
            />
        </SafeAreaView>

        <Spacer bottom={12} />

        <View style = {{width: '50%'}}>
            <Button
            title="Absenden"
            color={styles.button.color}
            onPress={ async () =>
            {
                if(mail.length == 0) {
                    setMessage("Bitte geben Sie eine E-Mail-Adresse ein.");
                    setShowMessage(true);
                    return;
                }
                let result = await PasswordResetRequest(mail);
                if(result.statusCode == 200) {
                    setMessage("Eine E-Mail mit dem Code wurde verschickt.");
                    setShowMessage(true);
                }
                else {
                    setMessage("Es wurde kein Nutzer mit dieser E-Mail gefunden.");
                    setShowMessage(true);
                }
            }}
            />
        </View>

        <Spacer bottom={32} />
        
        <Text style={[styles.text,{width: '80%', textAlign: 'center'}]}>
            Gib den Code aus der e-Mail ein und wähle ein neues Passwort
        </Text>


        <Spacer bottom={32} />
        <SafeAreaView style = {{width: '50%'}}>
        <TextInput
                style={styles.textInput}
                onChangeText={setCode}
                value={code}
                placeholder="Code"
                textContentType='none'
                autoCorrect={false}
            />
             

        <TextInput
                style={styles.textInput}
                onChangeText={setNewPassword}
                value={newPassword}
                placeholder="Neues Passwort"
                textContentType='newPassword'
                autoCorrect={false}
                secureTextEntry={true}
            />
        </SafeAreaView>

        <Spacer bottom={12} />

        <View style = {{width: '50%'}}>
            <Button
            title="Passwort ändern"
            color={styles.button.color}
            onPress={ async () =>
            {

                if(code.length == 0 || newPassword.length < 8) {
                    setMessage("Bitte geben Sie den Code aus der E-Mail und ein Passwort mit mindestens 8 Zeichen ein.");
                    setShowMessage(true);
                    return;
                }

                let result = await PasswordResetSubmit(code, newPassword);

                if(result.statusCode == 401) {
                    setMessage("Der angegebene Code ist nicht gültig.");
                    setShowMessage(true);
                    return;
                }
                else if(result.statusCode == 400) {
                    setMessage("Das Passwort muss mindestens 8 Zeichen haben.");
                    setShowMessage(true);
                    return;
                }
                else if(result.statusCode == 404) {
                    setMessage("Der User mit diesem Code ist nicht mehr vorhanden.");
                    setShowMessage(true);
                    return;
                }
                else if(result.statusCode == 200) {
                    setMessage("Das Passwort wurde geändert.");
                    setShowMessage(true);
                    return;
                }
                
            }}
            />
        </View>


        </View>
    )
}

export default PasswordResetScreen;