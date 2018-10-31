import { combineReducers } from 'redux'
import tables from './reducers/tables'
import common from './reducers/common'
import error from './reducers/error'
import { routerReducer } from 'react-router-redux'
import authReducer from "./reducers/authReducer"

export default combineReducers({
    tables,
    auth: authReducer,
    common,
    errors: error,
    router: routerReducer
})
