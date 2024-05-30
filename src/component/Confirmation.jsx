import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
 
const Confirmation = ({ route }) => {
  console.log(route);
  const { name, date, time } = route.params;
 
  useEffect(() => {
    console.log('Name:', name);
    console.log('Date:', date);
    console.log('Time:', time);
  }, [name, date, time]);
 
  return (
    <View>
      <Text>Appointment Confirmed!</Text>
      <Text>Name: {name}</Text>
      <Text>Date: {date}</Text>
      <Text>Time: {time}</Text>
    </View>
  );
};
 
export default Confirmation;