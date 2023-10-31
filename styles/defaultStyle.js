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
        height: '100vh',
        top: 50
    },
    pageTitle: {
        color: '#35d3ea',
        fontSize: 32,
        fontWeight: '300',
        textAlign: 'center',
        textTransform: 'uppercase',
        letterSpacing: 3
        
    },
    inlineIcon: {
        resizeMode: 'contain',
    },
    text: {
        color: '#35d3ea',
        textAlign: 'center',
        fontWeight: '300'
    },
    textDark: {
        color: '#8C9093'
    },

    textLight: {
        color: '#fff'
    },
    textAlert: {
        color: '#D90B14'
    },

    textSmaller: {
        fontSize: 12,
    },

    textBig: {
        fontSize: 24,
    },
    textBigger: {
        fontSize: 45,
        textTransform: 'uppercase',
    },

    textLeftBound: {
        textAlign: 'left',
    },

    textRightBound: {
        textAlign: 'right',
    },

    textBold: {
        fontWeight: 'bold',
    },
    textItalic: {
        fontStyle: 'italic',
    },
    button: {
        color: '#101f31',
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
        color: '#35d3ea',
        backgroundColor: '#101f31',
        margin: 6,
        minWidth: 250,
        padding: 5,
        backgroundSize: '100% 100%',
    },

    hsButtonEnabled: {
        backgroundImage: `url(${require("../assets/button-normal.png")})`,
    },

    hsButtonDisabled: {
        backgroundImage: `url(${require("../assets/button-grey.png")})`,
    },

    widthHalf: {
        width: '50%'
    },  

    textInput: {
        height: 40,
        marginBottom: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: "#040205",
        borderBottomColor: '#35d3ea',
        color: '#35d3ea',
        textAlign: 'center'    
    },

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        color: '#fff',
        backgroundColor: '#101f31',
        borderRadius: 0,
        padding: 25,
        paddingBottom: 0,
        borderColor: '#0c1725',
        borderWidth: 20,
        alignItems: 'center',
    },

    modalText: {
        marginBottom: 0,
        textAlign: 'center',
        color:'#35d3ea'
    },
    listContainer: {
        backgroundColor: '#040205',
        marginTop: 0,
        
    },

    hiscoreListContainer: {
        zIndex:-1,
        marginTop: -45,
        paddingTop: 45,
        borderWidth:1,
        borderStyle: 'solid',
        borderColor:'#34d2e9',
        borderTopColor:'transparent'
        
    },


    listItem: {
        backgroundColor: 'transparent',
        padding: 5,
        marginVertical: 3,
        marginHorizontal: 8,
        justifyContent: 'center',
        

    },

    questItemOpen: {
        backgroundColor: '#0c1725',
    },
    questItemDone: {
        backgroundColor: '#060d16',
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
        justifyContent: 'space-evenly',
        marginTop:'20px'
    },
    panel: {
        flex: 0.3,
        margin: 12,
        backgroundColor: 'black',
        borderWidth: 2,
        borderRadius: 0,
        aspectRatio: 1,
        borderColor: '#35d3ea',
        marginBottom: '20px'
    },
    panelText: {
        marginTop: 3
   
    },
    panelImage: {
        width: '100%',
        height: '100%', 
        resizeMode: 'contain'
    },
    headerLogo: {
        width: '100%',
    },

    headerbg: {
        width: '100%',
    },

    headerText: {
    marginTop: -90,
    paddingBottom:'20px'
    },


    profileItem: {
        
        backgroundColor:'888',
        borderWidth: 0,
        borderColor: '#cff',
        padding:0,
        margin: 0
        },

  });
  

  export default defaultStyles;