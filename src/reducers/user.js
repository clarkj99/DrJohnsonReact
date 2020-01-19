const user = (state = { patients: [], providers: [], admins: [], selectedPatient: null, creatingPatient: false }, action) => {
    switch (action.type) {
        case 'ADD_USERS':
            return { ...state, [action.userType]: action.userList }
        case 'SELECT_PATIENT':
            return { ...state, selectedPatient: action.user }
        case 'SET_CREATING_PATIENT':
            return { ...state, creatingPatient: action.value }
        case 'CLEAR_USER':
            return { ...state, selectedPatient: null }
        default:
            return state
    }
}

export default user;