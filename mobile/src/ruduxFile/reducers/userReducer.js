import { addons } from "react-native";
import {CERRAR_SESION, INICIAR_SESION,ACTUALIZAR_TURNOS} from '../../Home/Menu/constantes/actionRedux'


const initialState={
    mail: null,
    idUsuario:null,
    nombre: null,
    loading:true,
    nuevoTurno:false,
    reserva:null
};


const UserReducer = (state = initialState, action) => {
    var datos = action.data
    console.log("REDUX RESERVA")
    console.log(datos)
    
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
    }
    return{
        ...state
    }
}
export default UserReducer