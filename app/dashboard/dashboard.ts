import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DDD7C9',
    padding: 20,
  },

  welcome: {
    fontSize: 20,
    fontFamily: 'PoppinsSemiBold',
    color: '#003f48',
    marginBottom: 50,
    marginTop: 10,
  },

  cardMain: {
    backgroundColor: '#6F8F8F',
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 160,
  },

  titleContainer: {
    width: '55%',
    flexShrink: 1,
  },

  date: {
    fontSize: 18,
    color: '#FFF',
    fontFamily: 'Poppins',
    marginTop: 10,
  },

  title: {
    fontSize: 22,
    color: '#FFF',
    fontFamily: 'PoppinsSemiBold',
    marginTop: 15,
  },

  circle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#F4A261',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 35,
  },

  circleText: {
    color: '#FFF',
    fontFamily: 'PoppinsSemiBold',
    fontSize: 22,
  },

  sectionTitle: {
    marginTop: 40,
    marginBottom: 10,
    fontSize: 18,
    fontFamily: 'PoppinsSemiBold',
    color: '#003f48',
  },

  cardLarge: {
    backgroundColor: '#6F8F8F',
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height:130,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  cardSmall: {
    backgroundColor: '#6F8F8F',
    borderRadius: 20,
    padding: 15,
    width: '30%',
    alignItems: 'center',
    height:130,
  },

  cardLabel: {
    color: '#FFF',
    fontFamily: 'Poppins',
    marginTop: 5,
    fontSize: 22,

  },

  cardNumber: {
    color: '#FFF',
    fontSize: 30,
    fontFamily: 'PoppinsSemiBold',
    marginTop: 20,
  },

  button: {
    marginTop: 40,
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

  cardMedium: {
    backgroundColor: '#6F8F8F',
    borderRadius: 20,
    padding: 20,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    height:130,
    marginBottom: 30,
  }, 

  cardMediumLabel:{
    color: '#FFF',
    fontFamily: 'Poppins',
    fontSize: 28,
    flex: 1,
    flexWrap: 'wrap',
  }, 

  cardMediumNumber: {
    color: '#FFF',
    fontSize: 50,
    fontFamily: 'PoppinsSemiBold',
    paddingRight: 10,
  }

});