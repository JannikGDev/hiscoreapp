import { StyleSheet, Text, View, Image, Button, TextInput, SafeAreaView, Modal, Pressable } from 'react-native';
import styles from '../styles/defaultStyle.js';



const MessageBox = props => {

    return (<Modal
        animationType="slide"
        transparent={true}
        visible={props.show}
        onRequestClose={() => {
            setIsOpen(!isOpen);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{props.text}</Text>
            <Pressable
              style={[{backgroundColor: styles.button.color, padding: 6}]}
              onPress={() => {if(props.onClose) {props.onClose();}}}>
              <Text style={styles.text}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>)
}


export default MessageBox;