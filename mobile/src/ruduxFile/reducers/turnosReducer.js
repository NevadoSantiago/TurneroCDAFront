import { addons } from "react-native";
import {OBTENER_ESPECIALIDADES, SET_ESPECIALIDAD,SET_SUCURSALES} from '../../Home/Menu/constantes/actionRedux'
import moment from 'moment';


const initialState={
    listaEspecialidades : null,
    sucursales:null,
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
        case(SET_SUCURSALES):{
            const {data} = action
            return{
                ...state,
                sucursales : data,
            }
        }
        }
    return{
        ...state
    }
}
export default TurnosReducer