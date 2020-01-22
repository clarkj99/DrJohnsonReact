const steps = (state = { stepNumber: 1 }, action) => {
    switch (action.type) {
        case 'SET_STEP':
            return { ...state, stepNumber: action.stepNumber }
        case 'RESET_STEP':
            return { stepnumber: 1 }
        default:
            return state
    }
}

export default steps;