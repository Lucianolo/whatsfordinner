import { SET_CURRENT_USER, SET_USER, FOLLOW_USER, SET_PROFILE } from '../actions/types'
import isEmpty from '../../utils/is-empty'

const initialState = {
    isAuthenticated: false,
    user: {},
    profile: {}
}

export default function(state = initialState, action ) {
    switch(action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            }
        case SET_USER:
            return {
                ...state,
                isAuth: Object.keys(action.user).length > 0 ? true : false,
                user: action.user
            }
        case FOLLOW_USER:
            let user = Object.assign({}, state.user)
            user.following.push(action.user_id)
            return {
                ...state,
                user: user
            }
        case SET_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        default:
            return state
    }
}
