import React, {useContext, useState, useEffect, Fragment} from 'react';
import CarsContext from '../../../context/cars/CarsContext';
import {ScrollView} from 'react-native-gesture-handler';
import {Text, Card, Button} from 'react-native-paper';
import {View} from 'react-native';

const Catalog = () => {
  const {cars, cargarCatalogo} = useContext(CarsContext);
  useEffect(() => {
    cargarCatalogo();
  }, []);
  return (
    <View>
      <ScrollView>
        <View>
          {cars.map(vehicle => {
            const {id, imagen, marca, modelo, precio} = vehicle;
            return (
              <View style={{margin: 10}}>
                <Card
                  style={{
                    backgroundColor: 'white',
                    borderRadius: 20,
                    marginBottom: 5,
                  }}>
                  <Card.Title title={marca} subtitle={'$' + precio} />
                  <Card.Content>
                    <Text variant="bodyMedium">{modelo}</Text>
                  </Card.Content>
                  <Card.Cover
                    source={{uri: imagen}}
                    style={{
                      width: '95%',
                      marginLeft: '2.5%',
                      marginTop: '2.5%',
                    }}
                  />
                </Card>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default Catalog;
