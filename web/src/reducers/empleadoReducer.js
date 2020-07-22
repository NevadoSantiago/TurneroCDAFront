import {SET_CONTROL_ES, SET_RECEPCIONISTAS} from '../constantes/actionRedux'

const initialState={
    controlES : null,
    recepcionistas : null,
};

const EmpleadoReducer = (state = initialState, action) => {
    var datos = action.data
    switch(action.type){   
    case SET_CONTROL_ES :{
        return{
            ...state,
            controlES : datos        
        }
        
    }
    
    case SET_RECEPCIONISTAS:{
        return{
            ...state,
            recepcionistas : datos
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