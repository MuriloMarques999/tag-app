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
        top: 120,
        left: 0, 
        right: 0, 

        paddingLeft: 35, 
        paddingRight: 35, 
        textAlign: 'center', 
        fontSize: 24, 
        fontFamily: 'Poppins-SemiBold'
    }, 

    texParagraph: {
        position: 'absolute', 
        top: 170, 
        left: 0, 
        right: 0, 

        paddingLeft: 35, 
        paddingRight: 35, 
        textAlign: 'center', 
        fontSize: 18, 
        fontFamily: 'Poppins-SemiBold'
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
        fontFamily: 'Poppins-SemiBold',
    }, 


    titleFormInput: {
        fontFamily: 'Poppins-Regular',
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
        paddingTop: 230, 
        paddingHorizontal: 16,
        paddingBottom: 40,
    }, 

    inputGroup: {
        marginBottom: 16, 
    }, 

    buttonCreate: {
        position: 'absolute',
        bottom: 100,
        width: 358,
        height: 40,
        backgroundColor: '#003f48',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        alignSelf: 'center',
    },

    buttonFont: {
        fontSize: 20,
        fontFamily: 'PoppinsSemiBold', 
        color: '#DDD7C9',
    },
    backButton: {
        position: 'absolute',
        bottom: 40,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
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

    centerContent: {
        position: 'absolute',
        top: 150,
        left: 0,
        right: 0,
        alignItems: 'center', // alinha horizontalmente
        justifyContent: 'center', // alinha verticalmente
    },
    logotipo: {
        width: 75, 
        height: 75,
        resizeMode: 'contain', // não corta a imagem com contain
        marginBottom: 5,
    }, 
    naming: {
        fontSize: 20,
        fontFamily: 'Notable',
        paddingBottom: 100, 
        color: '#003f48'
    }, 

})