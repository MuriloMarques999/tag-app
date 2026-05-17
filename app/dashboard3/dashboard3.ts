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
    backgroundColor: '#6F8F8F',
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,
    position: 'relative',
  },

  ref: {
    fontFamily: 'PoppinsSemiBold',
    color: '#DDD7C9',
  },

  frame: {
    position: 'absolute',
    right: 15,
    top: 15,
    color: '#DDD7C9',
    fontFamily: 'Poppins',
    fontSize: 12,
  },

  text: {
    color: '#DDD7C9',
    fontFamily: 'Poppins',
    marginTop: 2,
  },

  badge: {
    position: 'absolute',
    right: 15,
    bottom: 15,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 15,
  },

  badgeDone: {
    backgroundColor: '#F2A65A',
  },

  badgeWaiting: {
    backgroundColor: '#A8D5BA',
  },

  badgeText: {
    fontFamily: 'PoppinsSemiBold',
    color: '#003f48',
  },

  buttonPrimary: {
    backgroundColor: '#003f48',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: '#DDD7C9',
    fontSize: 18,
    fontFamily: 'PoppinsSemiBold',
  },
});