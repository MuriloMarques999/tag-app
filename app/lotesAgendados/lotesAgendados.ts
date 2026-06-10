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

  card: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 15,
  },

  cardHeader: {
    backgroundColor: '#3E6B6B',
    paddingVertical: 8,
    alignItems: 'center',
  },

  ref: {
    color: '#DDD7C9',
    fontFamily: 'PoppinsSemiBold',
  },

  cardContent: {
    backgroundColor: '#6F8F8F',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  text: {
    color: '#DDD7C9',
    fontFamily: 'Poppins',
    marginBottom: 3,
  },

  arrowButton: {
    backgroundColor: '#F2A65A',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  arrowText: {
    color: '#003f48',
    fontSize: 18,
    fontFamily: 'PoppinsSemiBold',
  },

  logoutButton: {
    marginTop: 15,
    backgroundColor: '#C0392B',
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

});