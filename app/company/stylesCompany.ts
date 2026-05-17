import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DDD7C9',
  },
  ctaInfo: {
        position: 'absolute',
        top: 180, 
        left: 0, 
        right: 0, 

        paddingLeft: 35,
        paddingRight: 35,
        textAlign: 'center',
        fontSize: 16,
        color: '#003f48',
        fontFamily: 'Poppins',
    },
    subTitle: {
        position: 'absolute',
        top: 130,
        left: 0, 
        right: 0, 

        paddingLeft: 35, 
        paddingRight: 35, 
        textAlign: 'center', 
        fontSize: 24, 
        fontFamily: 'PoppinsSemiBold'
    }, 

    title: {
        position: 'absolute',
        top: 50,

        alignSelf: 'center',
        
        alignItems: 'center', // alinha o texto
        justifyContent: 'center', // alinha o texto

        width: 358, 
        height: 40, 
        borderColor: '#003f48',
        borderRadius: 20, 
        borderWidth: 2,
        paddingRight: 35, 
        paddingLeft: 35,
        backgroundColor: 'rgba(0, 62, 72, 0.12)',
    },

    titleFont: {
        color: '#0A171D', 
        fontSize: 20, 
        fontFamily: 'PoppinsSemiBold',
    }, 


    titleFormInput: {
        fontFamily: 'Poppins',
        fontSize: 16,
        color:'#0A171D', 
        left: 5,
    },
    formInput: {
        width: 358, 
        height: 40, 
        backgroundColor: '#FEF6E9',
        borderRadius: 10, 
        marginTop: 8,
        paddingLeft: 16,
        paddingRight: 16, 
        paddingTop: 2,
        paddingBottom: 2,
    }, 

    formContainer: {
        paddingTop: 250, 
        paddingHorizontal: 16,
        paddingBottom: 40,
    }, 

    inputGroup: {
        marginBottom: 16, 
    }, 

    buttonsContainer: {
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 24,
        gap: 12,
    },

    buttonCreate: {
        width: '100%',
        height: 40,
        backgroundColor: '#003f48',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },

    buttonFont: {
        fontSize: 20,
        fontFamily: 'PoppinsSemiBold', 
        color: '#DDD7C9',
    },
    backButton: {
        width: '100%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    }, 

    backButtonFont: {
        fontSize: 20,
        fontFamily: 'PoppinsSemiBold', 
        color: '#003f48',
    },

    inputWrapper: {
        position: 'relative',
        justifyContent: 'center',
    }, 

    icon: {
        position: 'absolute',
        right: 16,
        height: '100%',
        justifyContent: 'center',
    },

})