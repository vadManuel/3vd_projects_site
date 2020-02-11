import {
    LOADING_CONSTRUCTION_ESTIMATE_STARTED,
    CREATE_CONSTRUCTION_ESTIMATE_SUCCESS,
    CREATE_CONSTRUCTION_ESTIMATE_FAILURE,
    DELETE_CONSTRUCTION_ESTIMATE_SUCCESS,
    DELETE_CONSTRUCTION_ESTIMATE_FAILURE,
    UPDATE_CONSTRUCTION_ESTIMATE_SUCCESS,
    UPDATE_CONSTRUCTION_ESTIMATE_FAILURE
} from '../actions/types'

const initialState = {
    loading: false,
    error: null,
    constructionEstimates: []
}

export default function constructionEstimateReducer(state=initialState, action) {
    switch (action.type) {
        case LOADING_CONSTRUCTION_ESTIMATE_STARTED: {
            return {
                ...state,
                loading: true
            }
        }
        case CREATE_CONSTRUCTION_ESTIMATE_SUCCESS: {
            return {
                ...state,
                loading: false,
                error: null,
                constructionEstimates: [
                    ...state.constructionEstimates,
                    action.payload
                ]
            }
        }
        case DELETE_CONSTRUCTION_ESTIMATE_SUCCESS: {
            const constructionEstimates = state.constructionEstimates
            const newConstructionEstimates = constructionEstimates.splice(constructionEstimates.findIndex(i => i.id === action.payload.id), 1)

            return {
                ...state,
                loading: false,
                error: null,
                constructionEstimates: [
                    ...newConstructionEstimates
                ]
            }
        }
        case UPDATE_CONSTRUCTION_ESTIMATE_SUCCESS: {
            const constructionEstimates = state.constructionEstimates
            const newConstructionEstimates = constructionEstimates.splice(constructionEstimates.findIndex(i => i.id === action.payload.id), 1)

            return {
                ...state,
                loading: false,
                error: null,
                constructionEstimates: [
                    ...newConstructionEstimates,
                    action.payload
                ]
            }
        }
        case CREATE_CONSTRUCTION_ESTIMATE_FAILURE:
        case DELETE_CONSTRUCTION_ESTIMATE_FAILURE:
        case UPDATE_CONSTRUCTION_ESTIMATE_FAILURE: {
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