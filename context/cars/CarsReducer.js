import { OBTENER_HISTORIAL_SERVICIOS, FILTER_VEHICLE, CARGAR_CATALOGO, CONFIRMAR_VEHICULO, ELIMINAR_VEHICULO, SELECCIONAR_VEHICULO } from "../../type";

export default (state, action) => {
    const {payload} = action;
    switch(action.type){
        case OBTENER_HISTORIAL_SERVICIOS:
            return{
                ...state,
                historialServicios: payload.historialServicios,
                notHistorialServicio: payload.notHistorialServicio
            }
        case FILTER_VEHICLE:
            console.log(payload.filterVehicles, payload.filterVehiclesNotFound)
            return{
                ...state,
                filterVehicles: payload.filterVehicles,
                filterVehiclesNotFound: payload.filterVehiclesNotFound,
            }
        case CARGAR_CATALOGO:
            return{
                ...state,
                cars: payload.catalogo
            }
        case SELECCIONAR_VEHICULO:
            return{
                ...state,
                vehicle: action.payload
            }
        case CONFIRMAR_VEHICULO:
            return{
                ...state,
                vehicle: [...state.vehicle, action.payload]
            }
        case ELIMINAR_VEHICULO:
            return{
                ...state,
                vehicle: state.vehicle.filter(articulo => articulo.id !== action.payload)
            }
        default:
            return state;
    }
}