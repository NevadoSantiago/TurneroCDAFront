import {INICIAR_SESION} from '../constantes/actionRedux'

const initialState={
    usuario : null,
    tipoUsuario : null,
    idUsuario : null,
    idSucursal : null
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
                idSucursal:datos.sucursalId
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