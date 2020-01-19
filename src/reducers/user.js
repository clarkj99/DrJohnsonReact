const user = (state = { patients: [], providers: [], admins: [], selectedPatient: null }, action) => {
    switch (action.type) {
        case 'ADD_USERS':
            return { ...state, [action.userType]: action.userList }
        case 'SELECT_PATIENT':
            return { ...state, selectedPatient: action.user }
        case 'CLEAR_USER':
            return { ...state, selectedPatient: null }
        default:
            return state
    }
}

export default user;