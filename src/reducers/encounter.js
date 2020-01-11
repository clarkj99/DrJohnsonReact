const encounter = (state = { encounters: [] }, action) => {
    switch (action.type) {
        case 'ADD_ENCOUNTERS':
            return { ...state, encounters: action.encounters }
        default:
            return state
    }
}

export default encounter;