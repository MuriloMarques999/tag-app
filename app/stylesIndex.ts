import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#DDD7C9',
    },

    centerContent: {
        flex: 1, 
        alignItems: 'center', // alinha horizontalmente
        justifyContent: 'center', // alinha verticalmente
    },

    logotipo: {
        width: 130, 
        height: 130,
        resizeMode: 'contain', // não corta a imagem com contain
        marginBottom: 5,
    }, 
    naming: {
        fontSize: 20,
        fontFamily: 'Notable',
        paddingBottom: 100, 
        color: '#003f48'
    }, 

    ctaInfo: {
        position: 'absolute',
        bottom: 160, 
        left: 0, 
        right: 0, 

        paddingLeft: 35,
        paddingRight: 35,
        textAlign: 'center',
        fontSize: 16,
        color: '#003f48',
        fontFamily: 'Poppins',
    },

    button1: {
        position: 'absolute',
        bottom: 80,
        left: 16,

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

})