import React from 'react';
import { StyleSheet, Text, View, TextInput, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ApolloConsumer } from 'react-apollo';
import { ONE_RESERVATION } from '../gqlQueries';
import Reservation from './Reservation';


export default class FindReservation extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
      id: '',
      reservation: null
    };
  }

  render(){
    return(
      <ApolloConsumer>
        {client => (
          <View style={styles.formContainer}>
            <Text style={styles.formLabel}>SEARCH BY ID</Text>
            <TextInput
              autoFocus
              style={styles.formInput}
              value={this.state.id}
              placeholder='Input Reservation ID'
              onChangeText={(text) => this.setState({ id: text })}
            />
            <Button
              title='FIND RESERVATION   '
              icon={
                <Icon
                  name='search'
                  size={18}
                  color='white'
                />
              }
              containerStyle={{ marginBottom:20 }}
              iconRight
              raised={true}
              disabled={this.state.id === ''}
              onPress={async() => {
              const { data } = await client.query({
                query: ONE_RESERVATION,
                variables: { id: this.state.id }
              }).catch((err) => {
                Alert.alert(
                  'Invalid ID Input',
                  `${err}`,
                  [
                    { text: 'Retry' }
                  ]
                );
                this.setState({ id: '' });
              });
              this.setState({ id: '', reservation: data.reservation});
            }}/>
            {this.state.reservation && <Reservation
              key={this.state.reservation.id}
              name={this.state.reservation.name}
              location={this.state.reservation.hotelName}
              arrival={this.state.reservation.arrivalDate}
              departure={this.state.reservation.departureDate}
              resID={this.state.reservation.id}
            />}
          </View>
        )}
      </ApolloConsumer>
    )
  }
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
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
    marginBottom: 20
  },
  formLabel: {
    color:'grey',
    fontWeight: 'bold',
    fontSize: 12,
    marginBottom: 5
  }
});