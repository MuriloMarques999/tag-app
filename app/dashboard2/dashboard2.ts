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
    marginBottom: 40,
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
    padding: 20,
    height: 318,
    marginBottom: 80,
    marginTop: 80,
    justifyContent: 'center',
  },

  input: {
    backgroundColor: '#DDD7C9',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    fontFamily: 'Poppins',
  },

  select: {
    backgroundColor: '#DDD7C9',
    borderRadius: 10,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  selectContainer: {
    width: '100%',
    position: 'relative',
    zIndex: 10,
  },

  dropdown: {
    backgroundColor: '#DDD7C9',
    borderRadius: 10,
    marginTop: 5,
    overflow: 'hidden',
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    zIndex: 1000,
  },

  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
  },

  dropdownText: {
    fontFamily: 'Poppins',
    color: '#555',
  },

  selectText: {
    fontFamily: 'Poppins',
    color: '#555',
  },

  arrow: {
    fontSize: 16,
    color: '#555',
  },

  buttonPrimary: {
    backgroundColor: '#003f48',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },

  buttonSecondary: {
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
});