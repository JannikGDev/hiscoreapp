import { StyleSheet } from 'react-native';

const defaultStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#040205',
      alignItems: 'center',
      flexDirection: 'column'
    },
    navigationHeader: {
        headerStyle: {
            backgroundColor: '#040205',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    },
    pageContainer: {
        flexDirection: 'column',
        backgroundColor: '#040205',
        flex: 1,
        alignItems: 'center',
        paddingTop: 32,
    },
    pageTitle: {
        color: '#F9FDFC',
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    inlineIcon: {
        resizeMode: 'contain',
        flexDirection: 'row'
    },
    logo: {
        resizeMode: 'contain'
    },
    text: {
        color: '#F9FDFC',
        textAlign: 'center'
    },
    textDark: {
        color: '#8C9093'
    },
    textAlert: {
        color: '#D90B14'
    },
    textBig: {
        fontSize: 32
    },
    textBigger: {
        fontSize: 26
    },
    textLeftBound: {
        textAlign: 'left'
    },
    textBold: {
        fontWeight: 'bold',
    },
    textItalic: {
        fontStyle: 'italic',
    },
    button: {
        color: '#3D3F56',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#3D3F56',
    },
    buttonClose: {
        backgroundColor: '#3D3F56',
    },
    textInput: {
        height: 40,
        marginBottom: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: "#ffffff"
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    listContainer: {
        flex: 1,
        backgroundColor: '#040205',
        marginTop: 0,
    },
    listItem: {
        backgroundColor: '#3D3F56',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    questItemOpen: {
        backgroundColor: '#3D3F56',
    },
    questItemDone: {
        backgroundColor: '#323340',
    },

  });
  

  export default defaultStyles;