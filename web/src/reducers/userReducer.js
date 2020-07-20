
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
        case("INICIAR_SESION"):{
            return{
                ...state,
                idUsuario : datos.idCliente,
                reserva : datos.detalleReserva,
                nombre: datos.nombre,
                loading : false
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