import { StyleSheet } from 'react-native';

const defaultStyles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
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
            fontSize: 0,
        },
    },
    pageContainer: {
        flexDirection: 'column',
        backgroundColor: '#040205',
        flex: 1,
        alignItems: 'center',
        height: '100%'
    },
    pageTitle: {
        color: '#F9FDFC',
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    inlineIcon: {
        resizeMode: 'contain',
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
    },
    buttonOpen: {
        backgroundColor: '#3D3F56',
    },
    buttonClose: {
        backgroundColor: '#3D3F56',
    },
    buttonIndicator: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        right: -15,
        top: -15,
        width: 50,
        height: 50,
        flex: 1,
    },
    buttonIndicatorText: {
        color: '#FD65AF',
        textAlign: 'center',
        fontWeight: 'bold',
        right: -0.5,
        top: -1,
    },
    navButton: {
        margin: 6,
    },
    hsButton: {
        color: '#F9FDFC',
        backgroundColor: '#3D3F56',
        margin: 6,
        minWidth: 250,
        padding: 3
    },
    widthHalf: {
        width: '50%'
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
        padding: 25,
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
    camera: {
        width: '100%',
        height: '100%',
    },
    loader: {
        width: '100%',
        height: '100%',
    },
    panelContainer: {
        flex: 1,
        flexDirection: 'column',
        width: '90%',
        margin: 12,
        justifyContent: 'space-evenly'
    },
    panelRow: {
        flexDirection: 'row',
        width: '100%',
        aspectRatio: 3,
        justifyContent: 'space-evenly'
    },
    panel: {
        flex: 0.3,
        margin: 12,
        backgroundColor: 'black',
        borderWidth: 4,
        borderRadius: 2,
        aspectRatio: 1,
        borderColor: 'white'
    },
    panelText: {
        marginTop: 3,
    },
    panelImage: {
        width: '100%',
        height: '100%', 
        resizeMode: 'contain'
    },
    headerLogo: {
        width: '100%',
    },

  });
  

  export default defaultStyles;