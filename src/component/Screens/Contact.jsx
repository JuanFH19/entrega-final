import React from 'react'
import { StyleSheet, View, Text} from 'react-native'

const Contact = () => {
  return (
    <View style={styles.contains}>
      <Text style={styles.title}> Esperamos tu mensaje,
      WhatsApp: 3002200000 </Text>
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

export default Contact
