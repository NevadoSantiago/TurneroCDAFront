import {INICIAR_SESION, CERRAR_SESION} from '../constantes/actionRedux'

const initialState={
    usuario : null,
    tipoUsuario : null,
    idUsuario : null,
    idSucursal : null,
    estaLogueado : false
};

const UserReducer = (state = initialState, action) => {
    var datos = action.data
    switch(action.type){   
        case(INICIAR_SESION):{
            debugger
            return{
                ...state,
                usuario : datos.usuario,
                tipoUsuario:datos.tipoUsuario,
                idUsuario:datos.idUsuario,
                idSucursal:datos.sucursalId,
                estaLogueado : true,
            }
        }
        case(CERRAR_SESION):{
            return{
                ...state,
                usuario : null,
                tipoUsuario:null,
                idUsuario:null,
                idSucursal:null,
                estaLogueado:false
            }
        }
        default:{
            return{
                ...state
            }
        }

    }
}
export default UserReducer