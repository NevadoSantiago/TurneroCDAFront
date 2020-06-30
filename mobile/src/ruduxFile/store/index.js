
import {combineReducers} from 'redux'
import UserReducer from '../reducers/userReducer'
import TurnosReducer from '../reducers/turnosReducer'

export default combineReducers({
    user : UserReducer,
    turnos: TurnosReducer
})