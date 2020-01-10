const manageLogin = (state = { token: null, role: 0, user: null }, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, user: action.user }
        default:
            return state
    }
}

export default manageLogin;