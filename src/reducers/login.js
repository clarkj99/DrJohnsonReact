const login = (state = { user: null }, action) => {
    switch (action.type) {
        case 'ADD_LOGIN':
            return { ...state, user: action.user }
        case 'LOGOUT':
            return { ...state, user: null }
        case 'UPDATE_LOGIN_PROFILE':
            return { ...state, user: { ...state.user, profile: { ...action.profile } } }
        default:
            return state
    }
}

export default login;