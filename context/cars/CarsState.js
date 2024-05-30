import React, {useReducer} from 'react';

import firebase from '../../firebase';

import CarsContext from './CarsContext';
import CarsReducer from './CarsReducer';

import {
  CARGAR_CATALOGO,
  CONFIRMAR_VEHICULO,
  ELIMINAR_VEHICULO,
  MOSTRAR_RESUMEN,
  SELECCIONAR_VEHICULO,
  FILTER_VEHICLE,
  OBTENER_HISTORIAL_SERVICIOS,
} from '../../type';

const CarsState = props => {
  const initialState = {
    cars: [],
    vehicle: [],
    filterVehicles: null,
    filterVehiclesNotFound: false,
    historialServicios: null,
    notHistorialServicio: false,
  };

  function buscarVehiculos(keyword) {
    cargarCatalogo();
    const keywordArray = keyword.split(' ');
    let exactMatches = [];
    let partialMatches = [];
    let isExactMatchFound = false;
    for (const vehicle of state.cars) {
      if (vehicle.marca.toLowerCase() === keyword.toLowerCase()) {
        exactMatches.push(vehicle);
        isExactMatchFound = true;
        break;
      } else {
        for (let i = 0; i < keywordArray.length; i++) {
          if (
            vehicle.marca
              .toLowerCase()
              .includes(keywordArray[i].toLowerCase())
          ) {
            partialMatches.push(vehicle);
            break;
          } else if (vehicle.precio < keywordArray[i].toLowerCase()) {
            if (keywordArray[i].toLowerCase() - vehicle.precio < 5000000) {
              partialMatches.push(vehicle);
              break;
            }
          } else if (vehicle.precio > keywordArray[i].toLowerCase()) {
            if (vehicle.precio - keywordArray[i].toLowerCase() < 5000000) {
              partialMatches.push(vehicle);
              break;
            }
          }
        }
      }
    }

    if (partialMatches.length === 0 && exactMatches.length === 0) {
      dispatch({type: FILTER_VEHICLE, payload: {filterVehicles: [], filterVehiclesNotFound: true}});
    } else if (isExactMatchFound) {
      dispatch({
        type: FILTER_VEHICLE,
        payload: {filterVehicles: exactMatches, filterVehiclesNotFound: false},
      });
    } else {
      dispatch({
        type: FILTER_VEHICLE,
        payload: {filterVehicles: partialMatches, filterVehiclesNotFound: false},
      });
    }
  }

  const [state, dispatch] = useReducer(CarsReducer, initialState);
  const cargarCatalogo = async () => {
    try {
      await firebase.db
        .collection('catalogo')
        .get()
        .then(snapshot => {
          let catalogo = snapshot.docs.map(doc => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          dispatch({
            type: CARGAR_CATALOGO,
            payload: {catalogo: catalogo},
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerHistorialServicios = async () => {
    try {
      await firebase.db
        .collection('servicio taller')
        .get()
        .then(snapshot => {
          let historial_servicios = snapshot.docs.map(doc => {
            return {
                id: doc.id,
              ...doc.data(),
            };
          });
          if(historial_servicios.length === 0){
            dispatch({
              type: OBTENER_HISTORIAL_SERVICIOS,
              payload: {historialServicios: historial_servicios, notHistorialServicio: true},
            });
          } else {
            dispatch({
              type: OBTENER_HISTORIAL_SERVICIOS,
              payload: {historialServicios: historial_servicios, notHistorialServicio: false},
            });
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  const seleccionarVehiculo = vehicle => {
    dispatch({
      type: SELECCIONAR_VEHICULO,
      payload: vehicle,
    });
  };
  const confirmarVehiculo = cars => {
    dispatch({
      type: CONFIRMAR_VEHICULO,
      payload: cars,
    });
  };
  const mostrarResumen = total => {
    dispatch({
      type: MOSTRAR_RESUMEN,
      payload: total,
    });
  };
  const eliminarVehiculo = id => {
    dispatch({
      type: ELIMINAR_VEHICULO,
      payload: id,
    });
  };

  return (
    <CarsContext.Provider
      value={{
        cars: state.cars,
        vehicle: state.vehicle,
        filterVehicles: state.filterVehicles,
        filterVehiclesNotFound: state.filterVehiclesNotFound,
        historialServicios: state.historialServicios,
        notHistorialServicio: state.notHistorialServicio,
        obtenerHistorialServicios,
        cargarCatalogo,
        seleccionarVehiculo,
        confirmarVehiculo,
        mostrarResumen,
        eliminarVehiculo,
        buscarVehiculos,
      }}>
      {props.children}
    </CarsContext.Provider>
  );
};

export default CarsState;
