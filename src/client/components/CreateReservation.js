import React from 'react';
import { StyleSheet, Text, View, TextInput, Alert } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Mutation } from 'react-apollo';
import { CREATE_RESERVATION } from '../gqlQueries';


export default class CreateReservation extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
      name: '',
      hotel: '',
      arrival: null,
      departure: null
    };
  }

  render(){
    return(
      <Mutation mutation={CREATE_RESERVATION}>
        {(createReservation) => (
          <View style={styles.newReservationContainer}>
            <Text style={styles.formLabel}>GUEST NAME*</Text>
            <TextInput
              autoFocus
              style={styles.formInput}
              value={this.state.name}
              placeholder='Input Name'
              onChangeText={(text) => this.setState({ name: text })}
            />

            <Text style={styles.formLabel}>LOCATION*</Text>
            <TextInput
              style={styles.formInput}
              value={this.state.hotel}
              placeholder='Input Hotel Name'
              onChangeText={(text) => this.setState({ hotel: text })}
            />
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
              <View style={{ width: '50%' }}>
                <Text style={styles.formLabel}>ARRIVAL*</Text>
                <DatePicker
                  style={styles.datePicker}
                  placeholder='Select Date'
                  date={this.state.arrival}
                  confirmBtnText='Confirm'
                  cancelBtnText='Cancel'
                  onDateChange={(date) => {this.setState({ arrival: date })}}
                />
              </View>
              <View style={{ width: '50%' }}>
                <Text style={styles.formLabel}>DEPARTURE*</Text>
                <DatePicker
                  style={styles.datePicker}
                  placeholder='Select Date'
                  date={this.state.departure}
                  confirmBtnText='Confirm'
                  cancelBtnText='Cancel'
                  onDateChange={(date) => {this.setState({ departure: date })}}
                />
              </View>
            </View>
            <Button
              title='BOOK RESERVATION   '
              icon={
                <Icon
                  name='check-circle'
                  size={18}
                  color='white'
                />
              }
              iconRight
              raised={true}
              disabled={ this.state.name === '' || this.state.hotel === '' || this.state.arrival === null || this.state.departure === null }
              onPress={(e) => {
              e.preventDefault();
              createReservation({ variables: {name: this.state.name, hotelName: this.state.hotel, arrivalDate: this.state.arrival, departureDate: this.state.departure }})
              .then(({data}) => {
                this.setState({ name: '', hotel: '', arrival: null, departure: null });
                Alert.alert(
                  'Reservation Created',
                  `ID: ${data.createReservation.id}`,
                  [
                    { text: 'OK' }
                  ]
                );
              })
            }}/>
            <Text style={{ color: 'grey', marginTop: 10, fontSize: 12 }}>*required fields</Text>
          </View>
        )}
      </Mutation>
    )
  }
}

const styles = StyleSheet.create({
  newReservationContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingLeft: '5%',
    paddingRight: '5%',
    marginTop: 15
  },
  formInput: {
    padding: '1%',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    backgroundColor: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#282B33',
    marginBottom: 20
  },
  formLabel: {
    color:'grey',
    fontWeight: 'bold',
    fontSize: 12,
    marginBottom: 5
  },
  datePicker:{
    width: '100%'
  }
});