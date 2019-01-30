import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import CreateReservation from './components/CreateReservation';
import ReservationList from './components/ReservationList';
import FindReservation from './components/FindReservation';


const TabNavigator = createBottomTabNavigator(
  {
    'Create Reservation':{
      screen: CreateReservation,
      navigationOptions: {
        tabBarIcon:({ tintColor, horizontal }) => <Icon size={horizontal ? 20 : 25} name='calendar-plus-o' color={tintColor}/>
      }
    },
    'All Reservations':{
      screen: ReservationList,
      navigationOptions: {
        tabBarIcon:({ tintColor, horizontal }) => <Icon size={horizontal ? 20 : 25} name='list' color={tintColor}/>
      }
    },
    'Find Reservation':{
      screen: FindReservation,
      navigationOptions: {
        tabBarIcon:({ tintColor, horizontal }) => <Icon size={horizontal ? 20 : 25} name='search' color={tintColor}/>
      }
    }
  },
  {
    navigationOptions: ({navigation}) => {
      const { routeName } = navigation.state.routes[navigation.state.index];
      return {
        headerTitle: routeName,
        headerStyle: {
          backgroundColor: 'tomato'
        },
        headerTitleStyle: {
          fontSize: 20,
          paddingBottom: '3%',
          color: 'white'
        }
      }
    },
    tabBarOptions:{
      activeTintColor: 'tomato',
      inactiveTintColor: 'grey',
      showLabel: false,
      style: { backgroundColor: '#282B33', paddingTop: '3%' }
    },
    initialRouteName: 'All Reservations'
  }
);

const RootStack = createStackNavigator(
  {
    TabNavigator: TabNavigator
  },
  {
    headerMode: 'screen',
    cardStyle: { backgroundColor: 'white' }
  }
);

const AppContainer = createAppContainer(RootStack);

const client = new ApolloClient({
  uri: 'http://localhost:1234/graphql'
});

const App = () => (
  <ApolloProvider client={client}>
    <AppContainer/>
  </ApolloProvider>
);

export default App;

