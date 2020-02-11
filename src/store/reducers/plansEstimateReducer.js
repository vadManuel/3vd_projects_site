import {
    LOADING_PLANS_ESTIMATE_STARTED,
    CREATE_PLANS_ESTIMATE_SUCCESS,
    CREATE_PLANS_ESTIMATE_FAILURE,
    DELETE_PLANS_ESTIMATE_SUCCESS,
    DELETE_PLANS_ESTIMATE_FAILURE,
    UPDATE_PLANS_ESTIMATE_SUCCESS,
    UPDATE_PLANS_ESTIMATE_FAILURE
} from '../actions/type'

const initialState = {
    loading: false,
    error: null,
    plansEstimates: []
}

export default function plansEstimateReducer(state=initialState, action) {
    switch (action.type) {
        case LOADING_PLANS_ESTIMATE_STARTED: {
            return {
                ...state,
                loading: true
            }
        }
        case CREATE_PLANS_ESTIMATE_SUCCESS: {
            return {
                ...state,
                loading: false,
                error: null,
                plansEstimates: [
                    ...state.plansEstimates,
                    action.payload
                ]
            }
        }
        case DELETE_PLANS_ESTIMATE_SUCCESS: {
            const plansEstimates = state.plansEstimates
            const newPlansEstimates = plansEstimates.splice(plansEstimates.findIndex(i => i.id === action.payload.id), 1)

            return {
                ...state,
                loading: false,
                error: null,
                plansEstimates: [
                    ...newPlansEstimates
                ]
            }
        }
        case UPDATE_PLANS_ESTIMATE_SUCCESS: {
            const plansEstimates = state.plansEstimates
            const newPlansEstimates = plansEstimates.splice(plansEstimates.findIndex(i => i.id === action.payload.id), 1)

            return {
                ...state,
                loading: false,
                error: null,
                plansEstimates: [
                    ...newPlansEstimates,
                    action.payload
                ]
            }
        }
        case CREATE_PLANS_ESTIMATE_FAILURE:
        case DELETE_PLANS_ESTIMATE_FAILURE:
        case UPDATE_PLANS_ESTIMATE_FAILURE: {
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        }
        default: {
            return state
        }
    }
}