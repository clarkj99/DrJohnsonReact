const steps = (state = { stepNumber: 1 }, action) => {
    switch (action.type) {
        case 'SET_STEP':
            return { ...state, stepNumber: action.stepNumber }
        default:
            return state
    }
}

export default steps;