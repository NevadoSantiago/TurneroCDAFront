import { addons } from "react-native";
import {OBTENER_TURNOS, LIMPIAR_SESION,CAMBIAR_DIA,ACTUALIZAR_TURNOS} from '../../Home/Menu/constantes/actionRedux'
import moment from 'moment';

const initialState={
    turnosAsignados: null,
    diaCalendario:moment().format("YYYY-MM-DD"),
    loading: true
};


const TurnosReducer = (state = initialState, action) => {    
    switch(action.type){   
        case(OBTENER_TURNOS):{
            console.log("OBTENER TURNOS")
            const {data} = action
            return{
                ...state,
                turnosAsignados : data,
                loading : false
            }
            
        }
        case(CAMBIAR_DIA):{
            
            const {data} = action
            return{
                ...state,
                diaCalendario : data,
            }
            
        }
        case(ACTUALIZAR_TURNOS):{
            console.log("LOADING TRUE")
            return{
                ...state,
                loading : true,
            }
            
        }
        case(LIMPIAR_SESION):{
            return{
                ...state,
                turnosAsignados : null,
                loading:true
            }
            
        }
    }
    return{
        ...state
    }
}
export default TurnosReducer