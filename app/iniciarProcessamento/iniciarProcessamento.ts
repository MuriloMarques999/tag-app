import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DDD7C9',
    padding: 20,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },

  back: {
    fontSize: 28,
    color: '#003f48',
    marginRight: 10,
  },

  title: {
    fontSize: 20,
    fontFamily: 'PoppinsSemiBold',
    color: '#003f48',
  },

  subtitle: {
    textAlign: 'center',
    fontFamily: 'Poppins',
    color: '#003f48',
    marginBottom: 30,
  },

  card: {
    backgroundColor: '#6F8F8F',
    borderRadius: 20,
    padding: 20,
    marginBottom: 40,
  },

  input: {
    backgroundColor: '#DDD7C9',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    fontFamily: 'Poppins',
    color: '#555',
  },

  timer: {
    fontSize: 40,
    textAlign: 'center',
    fontFamily: 'PoppinsSemiBold',
    color: '#003f48',
    marginBottom: 10,
  },

  counter: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Poppins',
    color: '#003f48',
    marginBottom: 30,
  },

  buttonPrimary: {
    backgroundColor: '#003f48',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#DDD7C9',
    fontSize: 18,
    fontFamily: 'PoppinsSemiBold',
  },

  messageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 60,
  },

  messageCard: {
    backgroundColor: '#6F8F8F',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    marginBottom: 30,
    width: '100%',
  },

  messageTitle: {
    fontSize: 24,
    fontFamily: 'PoppinsSemiBold',
    color: '#DDD7C9',
    marginBottom: 20,
  },

  metricsContainer: {
    width: '100%',
    marginBottom: 20,
  },

  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#5A7C7C',
  },

  metricLabel: {
    fontSize: 16,
    fontFamily: 'Poppins',
    color: '#DDD7C9',
  },

  metricValue: {
    fontSize: 18,
    fontFamily: 'PoppinsSemiBold',
    color: '#DDD7C9',
  },

  buttonsContainer: {
    width: '100%',
    gap: 12,
  },

  buttonSecondary: {
    backgroundColor: '#003f48',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});