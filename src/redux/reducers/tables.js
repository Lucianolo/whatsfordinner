const initialState = {
    tables: [],
    table: {}
}
export default (state = initialState, action) => {
    switch (action.type) {
        case 'LOAD_TABLES' :
            return {
                ...state,
                tables: action.tables
            }
        case 'VIEW_TABLE':
            return {
                ...state,
                table: action.table
            }
        case 'ADD_GUEST':
            let table = Object.assign({}, state.table)
            table.guests.append(action.userId)
            return {
                ...state,
                table: table
            }
        default:
            return state
    }
}
