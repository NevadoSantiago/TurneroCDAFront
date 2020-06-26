
import {combineReducers} from 'redux'
import UserReducer from '../reducers/userReducer'

export default combineReducers({
    user : UserReducer
})