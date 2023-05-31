import { StyleSheet, Text, View, Image, Button, TextInput, SafeAreaView, Modal, Pressable } from 'react-native';
import defaultStyles from '../styles/defaultStyle.js';



const MessageBox = props => {

    return (<Modal
        animationType="slide"
        transparent={true}
        visible={props.show}
        onRequestClose={() => {
            setIsOpen(!isOpen);
        }}>
        <View style={defaultStyles.centeredView}>
          <View style={defaultStyles.modalView}>
            <Text style={defaultStyles.modalText}>{props.text}</Text>
            <Pressable
              style={[defaultStyles.button, defaultStyles.buttonClose]}
              onPress={() => {if(props.onClose) {props.onClose();}}}>
              <Text style={defaultStyles.textStyle}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>)
}


export default MessageBox;