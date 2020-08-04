import { INICIAR_SESION, CERRAR_SESION } from "../constantes/actionRedux";

const initialState = {
  usuario: null,
  tipoUsuario: null,
  idUsuario: null,
  sucursal: null,
  estaLogueado: false,
  token: null,
};

const UserReducer = (state = initialState, action) => {
  var datos = action.data;
  switch (action.type) {
    case INICIAR_SESION: {
      return {
        ...state,
        usuario: datos.usuario,
        tipoUsuario: datos.tipoUsuario,
        idUsuario: datos.idUsuario,
        sucursal: datos.sucursal,
        estaLogueado: true,
        token: datos.token,
      };
    }
    case CERRAR_SESION: {
      return {
        ...state,
        usuario: null,
        tipoUsuario: null,
        idUsuario: null,
        sucursal: null,
        estaLogueado: false,
        token: null,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};
export default UserReducer;
