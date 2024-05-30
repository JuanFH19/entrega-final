import {Text, Card} from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import {Container, Avatar, Box, FormControl, HSatck, List, Button} from 'react-native-paper'
import CarsContext from '../../context/cars/CarsContext'
import firebase from 'firebase/compat/app'
import { useContext, useEffect } from 'react'
import CarsReducer from '../../context/cars/CarsReducer'
import { Alert } from 'react-native'
import globalStyles from '../styles/global'
import { ScrollView } from 'react-native-gesture-handler'

const Resumencars = () =>{
    const {cars, total, mostrarResumen,eliminarVehiculo} = useContext(CarsContext)
    const navigation = useNavigation();

    useEffect(()=>{
        calcularTotal()
    },[cars])

    const calcularTotal = () =>{
        let nuevoTotal = 0;
        nuevoTotal = CarsReducer((nuevoTotal,articulo) => nuevoTotal+articulo,0);
        mostrarResumen(nuevoTotal)
    }

    
    const Progresocars = () =>{
        Alert.alert(
            'Desea confirmar la compra del vehiculo',
            'Una vez confirmado no se puede revertir',
            [
                {
                    text: 'Confirmar',
                    onPress: async () =>{
                        const vehicleObj = {
                            completado: false,
                            orden: vehicle,
                            total: Number(total),
                            creado: Date.now(),
                        };

                        try{
                            const vehicle = await firebase.db.collection('Catalogo').add(vehicleObj)
                            console.log(vehicle.id)
                        } catch (error) {
                            console.log(error)
                        }
                        navigation.navigate('Progresocars')
                                            
                    },
                },
                    {
                        text: 'cancelar', style:'cancel'
                    },
                        
                
            ],
        );
    };

    const confirmarEliminar = id =>{
        Alert.alert(
            'Desea eliminar el vehiculo',
            'Una vez confirmado no se puede cambiar',
            [
                {
                    text: 'Confirmar',
                    onPress: () => {
                        eliminarVehiculo(id);
                    },
                },
                {
                    text: 'Cancelar',
                    style:'cancel',
                },
            ],
        );
    };
    return(
    <ScrollView style={ globalStyles.contenedor}>
        <Box style={globalStyles.contenido}>
            <Text style={globalStyles.titulos}> Resumen Vehiculo </Text>
            {cars.map((vehicle, i)=>{
                const {año, marca, imagen, id, precio} = vehicle;
                return(
                    <View key ={id+i}>
                        <Avatar size="70mpx" source={{uri: imagen}}></Avatar>
                       <List.Item>
                            <Text> {marca} </Text>
                            <Text> año: {año} </Text>
                            <Text> $: {precio} </Text>
                            <Button
                                full
                                style={{backgroundColor: 'red', marginTop: 20}}
                                onPress={() => confirmarEliminar(id)}>
                                <Text style={[globalStyles.botonTexto, {color: '#FFF'}]}>
                                    Eliminar
                                </Text>
                            </Button>
                        </List.Item> 
                    </View>
                )
            })}
        <Text style={globalStyles.cantidad}>Total a pagar: $ {total}</Text>
            <Button
                onPress={() => navigation.navigate('Menu')}
                style={{marginTop: 30, backgroundColor: '#000'}}
                dark>
                <Text style={[globalStyles.botonTexto, {color: '#FFF'}]}>
                    Volver al menu
                </Text>
            </Button>
            <Box>
                <Button
                    style={[globalStyles.button, {marginTop: 30}]}
                    onPress={() => progresoPedido()}
                    full>
                        <Text style={globalStyles.botonTexto}>Ordenar pedido</Text>
                </Button>
            </Box>
        </Box>
    </ScrollView>
    );
};
export default Resumencars;  