import React, {useContext, useEffect} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {Text} from 'react-native-paper';
import CarsContext from '../../../context/cars/CarsContext';

const History = () => {
  const {historialServicios, notHistorialServicio, obtenerHistorialServicios} =
    useContext(CarsContext);

  useEffect(() => {
    obtenerHistorialServicios();
  }, []);
  return (
    <View style={styles.container}>
      {notHistorialServicio ? (
        <Text style={styles.title}>No se encontraron resultados</Text>
      ) : (
        <>
          <Text style={styles.title}>Historial de servicios</Text>
          <FlatList
            style={{marginVertical: 20}}
            data={historialServicios}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <View style={{padding: 10, alignItems: 'center', width: 300}}>
                <View
                  style={{
                    backgroundColor: '#b0b6ba',
                    alignItems: 'center',
                    width: 200,
                    padding: 10,
                  }}>
                  <Text
                    style={{color: 'white', fontSize: 25, textAlign: 'center'}}>
                    {item.servicio}
                  </Text>
                  <Text
                    style={{color: 'white', fontSize: 20, textAlign: 'center'}}>
                    {item.nombre}
                  </Text>
                  <Text
                    style={{color: 'white', fontSize: 20, textAlign: 'center'}}>
                    {item.telefono}
                  </Text>
                  <Text
                    style={{color: 'white', fontSize: 20, textAlign: 'center'}}>
                    {item.correo}
                  </Text>
                </View>
              </View>
            )}
          />
        </>
      )}
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
    textAlign: 'center',
    color: '#e7e7e7',
    paddingTop: 30,
  },
});

export default History;
