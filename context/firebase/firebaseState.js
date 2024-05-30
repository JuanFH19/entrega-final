import React, {useReducer} from "react";
import firebase from "../../firebase";
import firebaseReducer from "./firebaseReducer";
import FirebaseContext from "./firebaseContext";
import { OBTENER_VEHICULO } from "../../type";
import _ from 'lodash'
import Catalog from "../../src/component/Screens/Catalog";

const FirebaseState = props =>{
    //Crear el state inial
    const initialState={
        Catalog:[],
    }
    //useReducer con el dispatch 
    const [state, dispatch] = useReducer(firebaseReducer, initialState)
    const obtenerVehiculo=() =>{
        firebase.db
            .collection('catalogo')
            .onSnapshot(manejarSnapshot)

            function manejarSnapshot(snapshot){
                let vehicle = snapshot.docs.map(doc=>{
                    return{
                        id: doc.id,
                        ...doc.data()
                    }
                });
                
                vehicle = _.sortBy(vehicle, 'categoriaScrollView')
                console.log(vehicle)
                dispatch ({
                    type: OBTENER_VEHICULO,
                    payload: vehicle,
                })
            }
    }
    return(
    <FirebaseContext.Provider
        value={{
            Catalog:state.Catalog,
            firebase,
            obtenerVehiculo
        }}    
    >
        {props.children}
    </FirebaseContext.Provider>
    )

}

export default FirebaseState;