import { addons } from "react-native";
import {CERRAR_SESION, INICIAR_SESION,ACTUALIZAR_TURNOS} from '../../Home/Menu/constantes/actionRedux'


const initialState={
    turnosAsignados: null,
    idUsuario:null,
    nuevoTurno:false
};


const TurnosReducer = (state = initialState, action) => {
    var datos = action.data
    var nuevoMail
    var nuevoId
    
    switch(action.type){   
        case(INICIAR_SESION):{
            nuevoId = datos
            return{
                ...state,
                idUsuario : nuevoId 
            }
            
        }
        case(ACTUALIZAR_TURNOS):{
            const hayNuevoTurno = action.data
            return{
                ...state,
                nuevoTurno : hayNuevoTurno
            }
        }
    }
    return{
        ...state
    }
}
export default TurnosReducer