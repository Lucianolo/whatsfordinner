import { combineReducers } from 'redux'
import tables from './reducers/tables'
import authUser from './reducers/authUser'
import common from './reducers/common'
import { routerReducer } from 'react-router-redux'

export default combineReducers({
    tables,
    authUser,
    common,
    router: routerReducer
})
