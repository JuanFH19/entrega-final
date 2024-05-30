import { Button, Text, Container, FromControl,HStack, Box } from "react-native-paper";
import React, {useContext, useState, useEffect} from "react";
import CarsContext from "../../context/cars/CarsContext";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native-gesture-handler";
import { View } from "react-native";


const FromPedido = () => {
    const [cantidad, setCantidad] = useState (1)
    const [total, guardarTotal] = useState ()

    const{cars} = useContext(CarsContext)
    const{precio} = cars

    const navigation = useNavigation();
    navigation.navigate();
    const decrementar = () =>{
        if(cantidad >1 ){
            const nuevaCantidad = parseInt(cantidad) - 1
            {guardarCantidad (nuevaCantidad)}
        }
    }

    const incrementar = () =>{
        const nuevaCantidad = parseInt(cantidad) + 1
        guardarTotal(nuevaCantidad)
    }

    const calcularTotal = () =>{
        const totalApagar = precio * cantidad
    }

    useEffect(() =>{
        calcularTotal()
    }, [cantidad])

    return(
        <View>
            <View>
                <View>
                    <Text>Manejo de Cantidades</Text>
                    <View>
                        <Button 
                            onPress={()=>decrementar}
                        >-</Button>
                        <TextInput> {cantidad} </TextInput>
                        <Button
                            onPress={()=>incrementar}
                        >+</Button>
                    </View>
                    <Text>Total del Vehiculo: </Text>
                </View>
            </View>
        </View>
    )
}
export default FromPedido