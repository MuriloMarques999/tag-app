import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DDD7C9',
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 24,
    alignItems: 'center',
  },

  title: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 420,
    minHeight: 56,
    borderColor: '#003f48',
    borderRadius: 20,
    borderWidth: 2,
    paddingHorizontal: 20,
    paddingVertical: 12,
    justifyContent: 'center',
    marginBottom: 24,
    backgroundColor: 'rgba(0, 62, 72, 0.12)',
  },

  titleFont: {
    color: '#0A171D',
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
  },

  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
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
    marginBottom: 24,
  },

  subTitle: {
    textAlign: 'center',
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 16,
  },

  texParagraph: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 24,
    paddingHorizontal: 16,
  },

  titleFormInput: {
    fontFamily: 'Poppins',
    fontSize: 16,
    color: '#0A171D',
    marginBottom: 8,
  },

  formInput: {
    width: '100%',
    maxWidth: 420,
    height: 48,
    backgroundColor: '#FEF6E9',
    borderRadius: 10,
    marginTop: 8,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 2,
    paddingBottom: 2,
  },

  formContainer: {
    width: '100%',
    maxWidth: 420,
  },

  inputGroup: {
    marginBottom: 16,
  },

  buttonCreate: {
    width: '100%',
    maxWidth: 420,
    height: 50,
    backgroundColor: '#003f48',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginTop: 16,
  },

  buttonFont: {
    fontSize: 20,
    fontFamily: 'PoppinsSemiBold',
    color: '#DDD7C9',
  },

  backButton: {
    width: '100%',
    maxWidth: 420,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
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
});