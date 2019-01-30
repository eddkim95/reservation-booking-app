import { gql } from 'apollo-boost';

const ALL_RESERVATIONS = gql`
  {
    reservations{
      id
      name
      hotelName
      arrivalDate
      departureDate
    }
  }
`;

const ONE_RESERVATION = gql`
  query Reservation($id: ID){
    reservation(id: $id){
      id
      name
      hotelName
      arrivalDate
      departureDate
    }
  }
`;

const CREATE_RESERVATION = gql`
  mutation CreateReservation($name: String, $hotelName: String, $arrivalDate: Date, $departureDate: Date){
    createReservation(name: $name, hotelName: $hotelName, arrivalDate: $arrivalDate, departureDate: $departureDate){
      id
    }
  }
`;

export { ALL_RESERVATIONS, ONE_RESERVATION, CREATE_RESERVATION };