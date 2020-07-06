import { addons } from "react-native";
import {OBTENER_ESPECIALIDADES, SET_ESPECIALIDAD } from '../../Home/Menu/constantes/actionRedux'
import moment from 'moment';


const initialState={
    listaEspecialidades : null,
    Cargando : true,
    idEspecialidad : null,
    especialidadNotSelected : true
};


const TurnosReducer = (state = initialState, action) => {    
    switch(action.type){   
        case(OBTENER_ESPECIALIDADES):{
            const {data} = action
            return{
                ...state,
                listaEspecialidades : data,
                Cargando : false,
            }
            
        }
        case(SET_ESPECIALIDAD):{
            const {data} = action
            return{
                ...state,
                idEspecialidad : data,
                especialidadNotSelected : false
            }
        }
        }
    return{
        ...state
    }
}
export default TurnosReducer