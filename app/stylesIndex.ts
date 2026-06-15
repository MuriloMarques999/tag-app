import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DDD7C9',
    paddingHorizontal: 20,
    paddingVertical: 24,
    justifyContent: 'space-between',
  },

  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 32,
  },

  logotipo: {
    width: 130,
    height: 130,
    resizeMode: 'contain',
    marginBottom: 16,
    maxWidth: 180,
    maxHeight: 180,
  },

  naming: {
    fontSize: 24,
    fontFamily: 'Notable',
    color: '#003f48',
    textAlign: 'center',
  },

  ctaInfo: {
    textAlign: 'center',
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#003f48',
    fontFamily: 'Poppins',
    marginBottom: 32,
  },

  button1: {
    width: '100%',
    maxWidth: 420,
    height: 48,
    backgroundColor: '#003f48',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    alignSelf: 'center',
  },

  buttonFont: {
    fontSize: 20,
    fontFamily: 'PoppinsSemiBold',
    color: '#DDD7C9',
  },
});