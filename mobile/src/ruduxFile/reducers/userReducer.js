import { addons } from "react-native";
import {CERRAR_SESION, INICIAR_SESION,ACTUALIZAR_TURNOS,SET_COORDENADAS,SET_FILTRO} from '../../Home/Menu/constantes/actionRedux'


const initialState={
    mail: null,
    idUsuario:null,
    nombre: null,
    loading:true,
    nuevoTurno:false,
    reserva:null,
    ubicacion:null,
    filtro:null
};


const UserReducer = (state = initialState, action) => {
    var datos = action.data
    
    switch(action.type){   
        case(INICIAR_SESION):{

            return{
                ...state,
                idUsuario : datos.idCliente,
                reserva : datos.detalleReserva,
                nombre: datos.nombre,
                loading : false
            }
            
        }
        case(ACTUALIZAR_TURNOS):{
            const hayNuevoTurno = action.data
            return{
                ...state,
                nuevoTurno : hayNuevoTurno
            }
        }
        case(SET_COORDENADAS):{
            const {busqueda} = action
            return{
                ...state,
                ubicacion : action.data,
                filtro:busqueda
            }
            
        }
        case(SET_FILTRO):{
            const {data} = action
            return{
                ...state,
                filtro:data
            }
            
        }
    }
    return{
        ...state
    }
}
export default UserReducer