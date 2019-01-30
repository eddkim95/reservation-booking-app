import React from 'react';
import { StyleSheet, FlatList, View, ActivityIndicator } from 'react-native';
import { Query } from 'react-apollo';
import { ALL_RESERVATIONS } from '../gqlQueries';
import Reservation from './Reservation';


const ReservationList = () => (
  <Query
    query={ALL_RESERVATIONS}
    pollInterval={500}
  >
    {({ loading, data }) => {
      if (loading) return <ActivityIndicator style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} size='large'/>
      return (
        <View style={styles.container}>
          <FlatList
            data={data.reservations}
            renderItem={
              ({item}) => <Reservation
                key={item.id}
                name={item.name}
                location={item.hotelName}
                arrival={item.arrivalDate}
                departure={item.departureDate}
                resID={item.id}
              />
            }
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      )
    }}
  </Query>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15
  }
});

export default ReservationList;