import {SET_CONTROL_ES, SET_RECEPCIONISTAS, ELIMINAR_EMPLEADO,SET_ESPECIALIDADES,SET_CANTIDAD_GENTE} from '../constantes/actionRedux'
import {eliminarEmpleadoServ} from '../servicios/AdminServices'

const initialState={
    controlES : null,
    recepcionistas : null,
    especialidades: null,
    cantidadGente: null,
};

const eliminarEmpleadoStore = (idEmpleado,state) =>{
    var {controlES} = state
    for(var i =0 ; i< controlES.length; i++){
        if(controlES[i].idEmpleado==idEmpleado){
            delete controlES[i]
        }
    }
}

const EmpleadoReducer = (state = initialState, action) => {
    var datos = action.data
    switch(action.type){   
    case SET_CONTROL_ES :{
        return{
            ...state,
            controlES : datos        
        }
        
    }
    case ELIMINAR_EMPLEADO:{
        const idEmpleado = action.data;     
        if(eliminarEmpleadoServ(idEmpleado)){
           eliminarEmpleadoStore(idEmpleado,state) 
        }    
        return{
            ...state,
        }
    }
    
    case SET_RECEPCIONISTAS:{
        return{
            ...state,
            recepcionistas : datos
        }
    }
    case SET_CANTIDAD_GENTE:{
        return{
            ...state,
            cantidadGente : datos
        }
    }
    case SET_ESPECIALIDADES:{
        return{
            ...state,
            especialidades : datos
        }
    }
        default:{
            return{
                ...state
            }
        }

    }
}
export default EmpleadoReducer