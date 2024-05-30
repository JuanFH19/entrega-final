import React from 'react'
import { StyleSheet, View,Text } from 'react-native'

const Promotions = () => {
    return (
        <View style={styles.contains}>
        <Text style={styles.title}> Muy Pronto Estaran Habilitadas Nuestras Promociones</Text>
        </View>
      );
    };
    
    const styles = StyleSheet.create({
        contains:{
            flex:1,
            backgroundColor: 'black',
            justifyContent: 'center',
        },
        title:{
            color: 'rgb(199, 101, 101)',
            fontSize: 40,
            textAlign: 'center'
        },
    });

export default Promotions
