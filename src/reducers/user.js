const user = (state = { patients: [], providers: [], admins: [] }, action) => {
    switch (action.type) {
        case 'ADD_USERS':
            return { ...state, [action.userType]: action.userList }
        case 'SELECT_USER':
            return { ...state, selectedUser: action.user }
        default:
            return state
    }
}

export default user;