import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


const Reservation = (props) => {
  const formatDate = (date) => {
    const dateArr = date.split('-');
    return dateArr[1] + '/' + dateArr[2] + '/' + dateArr[0];
  }
  return(
    <View style={styles.reservationContainer}>
      <Text style={{ fontSize: 29, fontWeight: 'bold', color: 'tomato' }}>{props.name}</Text>
      <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#282B33', marginTop: -3 }}>{props.location}</Text>
      <Text style={{ fontSize: 18, color: '#282B33' }}>{formatDate(props.arrival)} - {formatDate(props.departure)}</Text>
      <Text style={{ fontSize: 10, paddingTop: 3, color: 'grey' }}>ID: {props.resID}</Text>
      <View style={styles.divider}/>
    </View>
  )
};

const styles = StyleSheet.create({
  reservationContainer: {
    paddingLeft: '5%',
    paddingRight: '5%',
    backgroundColor: 'white'
  },
  divider: {
    borderBottomColor: '#282B33',
    borderBottomWidth: 1,
    marginTop: 15,
    marginBottom: 15
  }
});

export default Reservation;