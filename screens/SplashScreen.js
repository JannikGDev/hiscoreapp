import styles from '../styles/defaultStyle';
import { StyleSheet, Text, View, Image, Button, ActivityIndicator } from 'react-native';


const SplashScreen = ({navigation, route}) => { 

    return (

        <View style={{flex: 1, backgroundColor: styles.container.backgroundColor}}>
            <ActivityIndicator style={styles.loader}/>
        </View>
    )
};

export default SplashScreen;
