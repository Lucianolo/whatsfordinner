import axios from 'axios'
import * as Types from './types'
const url = process.env.NODE_ENV === 'production' ? "/api/" : "http://localhost:5000/api/"

export function loadTables () {
    console.log('loading tables')
    return (dispatch) => {
        axios.get(`${url}tables`)
            .then((res) => {
                let tables = res.data
                dispatch({type: Types.LOAD_TABLES, tables})
            }).catch((err) => {
            console.log(err)
        })
    }
}

export function getUser (_id) {
    return axios.get(`${url}users/${_id}`).then((res)=>{
        return res.data
    }).catch((err) => console.log(err))
}

export function getUserProfile (_id) {
    return (dispatch) => {
        axios.get(`${url}users/profile/${_id}`).then((res)=>{
            let profile = res.data
            dispatch({type: Types.SET_PROFILE, profile})
        }).catch((err) => console.log(err))
    }
}

export function getTable (tableId) {
    return (dispatch) => {
        axios.get(`${url}tables/${tableId}`)
            .then((res) => {
                let table = res.data
                dispatch({type: Types.VIEW_TABLE, table})
            }).catch((err) => console.log(err))
    }
}

export function addGuest (tableId, userId) {
    return (dispatch) => {
        axios.post(`${url}tables/${tableId}/guests`,{ userId }).then((res) => {
            let table = res.data
            dispatch({type:Types.ADD_GUEST, table})
        }).catch((err) => console.log(err))
    }
}

export function follow (id, userId) {
    return (dispatch) => {
        axios.post(`${url}users/follow`,{ id, userId }).then((res) => {
            dispatch({type:Types.FOLLOW_USER, userId})
        }).catch((err) => console.log(err))
    }
}
export function SignInUser (userData) {
    return (dispatch) => {
        axios.post(`${url}users`, userData).then((res)=>{
            let user = res.data
            localStorage.setItem('Auth', JSON.stringify(user))
            dispatch({type: Types.SET_USER, user})
        }).catch((err)=>console.log(err))
    }
}


// TODO: REMOVE THE TOGGLE ACTIONS
export function toggleClose() {
    return (dispatch) => {
        dispatch({type: 'TOGGLE_MODAL', modalMode: false})
    }
}
export function toggleOpen() {
    return (dispatch) => {
        dispatch({type: 'TOGGLE_MODAL', modalMode: true})
    }
}
