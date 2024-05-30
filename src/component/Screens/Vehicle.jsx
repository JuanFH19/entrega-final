import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const Vehicle = ({imageUrl,description, price}) => {
  return (
    <View style={styles.container}>
        <Image
            source={{uri:imageUrl}}
            style={styles.image}
        />
        <Text style ={{marginTop: 10, color: 'white'}}>
          {description}
        </Text>
        <Text></Text>
        <Text style={{marginTop: 5, fontWeight: 'bold', color: 'white'}}>$ {price}</Text>   
    </View>
  );
};

const styles=StyleSheet.create({
  container: {
    backgroundColor: 'black',
    alignItems: 'center'
  },
    image:{ 
        width:300,
        height:200,
      }
});
export default Vehicle;