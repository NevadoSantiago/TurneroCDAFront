import { addons } from "react-native";
import {OBTENER_ESPECIALIDADES} from '../../Home/Menu/constantes/actionRedux'
import moment from 'moment';


const initialState={
    listaEspecialidades : null,
    Cargando : true,
};


const TurnosReducer = (state = initialState, action) => {    
    switch(action.type){   
        case(OBTENER_ESPECIALIDADES):{
            console.log("OBTENER ESPECIALIDADES")
            const {data} = action
            return{
                ...state,
                listaEspecialidades : data,
                Cargando : false,
            }
            
        }
        }
    return{
        ...state
    }
}
export default TurnosReducer