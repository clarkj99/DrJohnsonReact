const user = (state = { patients: [], providers: [], admins: [], selectedPatient: null, creatingPatient: false }, action) => {
    switch (action.type) {
        case 'ADD_USERS':
            return { ...state, [action.userType]: action.userList }
        case 'ADD_PATIENT_TO_LIST':
            return { ...state, patients: [action.user, ...state.patients] }
        case 'SELECT_PATIENT':
            return {
                ...state, selectedPatient:
                    action.user
            }
        case 'UPDATE_PATIENT_PROFILE':
            return { ...state, selectedPatient: { ...state.selectedPatient, profile: { ...action.profile } } }
        case 'UPDATE_PATIENT_HISTORY':
            return { ...state, selectedPatient: { ...state.selectedPatient, history: { ...action.history } } }
        case 'SET_CREATING_PATIENT':
            return { ...state, creatingPatient: action.value }
        case 'CLEAR_USER':
            return { ...state, selectedPatient: null }
        default:
            return state
    }
}

export default user;