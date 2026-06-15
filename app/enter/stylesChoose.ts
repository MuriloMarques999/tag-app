import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DDD7C9',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 24,
    alignItems: 'center',
  },

  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },

  logotipo: {
    width: 130,
    height: 130,
    resizeMode: 'contain',
    marginBottom: 12,
    maxWidth: 180,
    maxHeight: 180,
  },

  naming: {
    fontSize: 24,
    fontFamily: 'Notable',
    color: '#003f48',
    textAlign: 'center',
    marginBottom: 24,
  },

  ctaInfo: {
    textAlign: 'center',
    fontSize: 18,
    color: '#003f48',
    fontFamily: 'Poppins',
    paddingHorizontal: 16,
    marginBottom: 32,
  },

  buttonFont: {
    fontSize: 20,
    fontFamily: 'PoppinsSemiBold',
    color: '#DDD7C9',
  },

  buttonEmpresa: {
    width: '100%',
    maxWidth: 420,
    height: 50,
    backgroundColor: '#003f48',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginBottom: 16,
  },

  buttonOperador: {
    width: '100%',
    maxWidth: 420,
    height: 50,
    backgroundColor: '#003f48',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
});