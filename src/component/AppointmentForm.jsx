import React, {useState} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import firebase from '../../firebase/firebase';
const AppointmentForm = () => {
  // Estados para almacenar los valores de los campos del formulario
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  function soloNumeros(text) {
    const regex = /^\d+$/;
    return regex.test(text);
  }

  const handleSubmit = () => {
    if (nombre === '' || telefono === '' || correo === '') {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    } else if (nombre.length < 3) {
      Alert.alert('Error', 'El nombre debe tener al menos 3 caracteres');
      return;
    } else if (!soloNumeros(telefono)) {
      Alert.alert('Error', 'El teléfono debe contener solo números');
      return;
    } else if (telefono.length != 10) {
      Alert.alert('Error', 'El teléfono debe tener 10 dígitos');
      return;
    } else if (correo.indexOf('@') === -1 || correo.indexOf('.') === -1) {
      Alert.alert('Error', 'El correo electrónico no es válido');
      return;
    } else {
      try {
        firebase.db.collection('cotizaciones').add({
          nombre,
          telefono,
          correo,
        });
        Alert.alert(
          'Solicitud enviada',
          'Gracias por solicitar una cotización, en breve nos pondremos en contacto contigo',
        );
        setNombre('');
        setTelefono('');
        setCorreo('');
      } catch (error) {
        Alert.alert('Error', 'Ocurrió un error al enviar la solicitud');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Solicita una cotización</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Teléfono"
        value={telefono}
        onChangeText={setTelefono}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={correo}
        onChangeText={setCorreo}
        keyboardType="email-address"
      />
      <Button style={styles.button} onPress={() => handleSubmit()}>
        <Text style={styles.buttonText}>Solicitar cotización</Text>
      </Button>
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
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
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
});

export default AppointmentForm;
