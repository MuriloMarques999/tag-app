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

  title: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 420,
    minHeight: 56,
    borderColor: '#003f48',
    borderRadius: 20,
    borderWidth: 2,
    paddingHorizontal: 20,
    justifyContent: 'center',
    marginBottom: 24,
    backgroundColor: 'rgba(0, 62, 72, 0.12)',
  },

  titleFont: {
    color: '#0A171D',
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
  },

  subTitle: {
    textAlign: 'center',
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 16,
  },

  ctaInfo: {
    textAlign: 'center',
    fontSize: 16,
    color: '#003f48',
    fontFamily: 'Poppins',
    paddingHorizontal: 16,
    marginBottom: 24,
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
    paddingBottom: 40,
  },

  inputGroup: {
    marginBottom: 16,
  },

  buttonsContainer: {
    width: '100%',
    maxWidth: 420,
    paddingTop: 16,
    paddingBottom: 24,
    gap: 12,
  },

  buttonCreate: {
    width: '100%',
    height: 50,
    backgroundColor: '#003f48',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
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