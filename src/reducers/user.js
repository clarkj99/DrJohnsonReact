const user = (state = { patients: [], providers: [], admins: [], selectedUser: null }, action) => {
    switch (action.type) {
        case 'ADD_USERS':
            return { ...state, [action.userType]: action.userList }
        case 'SELECT_USER':
            return { ...state, selectedUser: action.user }
        case 'CLEAR_USER':
            return { ...state, selectedUser: null }
        default:
            return state
    }
}

export default user;