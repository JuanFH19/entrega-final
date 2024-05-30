import {OBTENER_VEHICULO} from '../../type'
export default (state, action) =>{
    switch(action.type){
        case OBTENER_VEHICULO:
            return{
                ...state,
                vehicle: action.payload
            }
        default:
            return state;
    }
}