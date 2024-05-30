import 'react-native-gesture-handler'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import Home from './src/component/Home';
import Catalog from './src/component/Screens/Catalog';
import Contact from './src/component/Screens/Contact';
import FindVehicle from './src/component/Screens/FindVehicle';
import DriveTesting from './src/component/Screens/DriveTesting';
import Mechanic from './src/component/Screens/Mechanic';
import History from './src/component/Screens/History';
import Promotions from './src/component/Screens/Promotions';
import AppointmentForm from './src/component/AppointmentForm';

import FirebaseState from './context/firebase/firebaseState';
import CarsState from './context/cars/CarsState';
import FromPedido from './src/component/FormPedido';
import ResumenPedido from './src/component/ResumenPedido'
 
const Stack = createStackNavigator();
 
const App = () => {
  return (
    <>
      <FirebaseState>
        <CarsState>
            <PaperProvider>
            <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen name="Home" component={Home}/>
                <Stack.Screen name="ResumenPedido" component={ResumenPedido}/>
                <Stack.Screen name="Catalog" component={Catalog}/>
                <Stack.Screen name="FindVehicle" component={FindVehicle}/>
                <Stack.Screen name="DriveTesting" component={DriveTesting}/>
                <Stack.Screen name="Mechanic" component={Mechanic}/>
                <Stack.Screen name="History" component={History}/>
                <Stack.Screen name="Promotions" component={Promotions}/>
                <Stack.Screen name="Contact" component={Contact}/>
                <Stack.Screen name="AppointmentForm" component={AppointmentForm}/>
              </Stack.Navigator>
            </NavigationContainer>
          </PaperProvider>
        </CarsState>
      </FirebaseState>
    </> 
  )
}
export default App