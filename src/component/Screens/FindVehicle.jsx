import * as React from 'react';
import {Button} from 'react-native-paper';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  FlatList,
  Alert,
  Image,
} from 'react-native';
import CarsContext from '../../../context/cars/CarsContext';
import {useContext} from 'react';

const FindVehicle = () => {
  const {filterVehicles, buscarVehiculos, filterVehiclesNotFound} =
    useContext(CarsContext);
  const [searchTerm, setSearchTerm] = React.useState('');
  const vehicleSearch = () => {
    if (searchTerm === '') {
      Alert.alert('Error', 'No deje el campo vacío');
    } else if (searchTerm.length < 3) {
      Alert.alert('Error', 'Ingrese al menos 3 caracteres');
    } else {
      buscarVehiculos(searchTerm);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Busca tu vehículo</Text>
      {/* Campo de texto para ingresar el término de búsqueda */}
      <TextInput
        style={{backgroundColor: 'white', width: '100%', marginBottom: 15}}
        placeholder="Buscar vehículo por nombre o precio"
        value={searchTerm}
        onChangeText={text => setSearchTerm(text)}
      />
      <Button style={styles.button} onPress={() => vehicleSearch()}>
        <Text style={styles.buttonText}>Buscar</Text>
      </Button>
      {filterVehiclesNotFound && (
        <Text style={{color: 'white', top: 10}}>
          No se encontraron resultados
        </Text>
      )}
      <FlatList
        style={{marginVertical: 20}}
        data={filterVehicles}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={styles.vehicleItem}>
            <Image source={{uri: item.imagen}} style={styles.vehicleImage} />
            <Text style={styles.vehicleDescription}>{item.marca}</Text>
            <Text style={styles.vehiclePrice}>
              ${Intl.NumberFormat('es-CO').format(item.precio)}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#e7e7e7',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 4,
    backgroundColor: '#0899f2',
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  vehicleItem: {
    marginBottom: 20,
    alignItems: 'center',
  },
  vehicleImage: {
    width: 200,
    height: 150,
    marginBottom: 10,
  },
  vehicleDescription: {
    fontSize: 18,
    marginBottom: 5,
    textAlign: 'center',
    color: '#e7e7e7',
  },
  vehiclePrice: {
    fontSize: 16,
    textAlign: 'center',
    color: '#e7e7e7',
  },
});
export default FindVehicle;
