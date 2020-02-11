import {
    LOADING_PROJECT_STARTED,
    CREATE_PROJECT_SUCCESS,
    CREATE_PROJECT_FAILURE,
    DELETE_PROJECT_SUCCESS,
    DELETE_PROJECT_FAILURE,
    UPDATE_PROJECT_SUCCESS,
    UPDATE_PROJECT_FAILURE,
   
    LOADING_CONSTRUCTION_ESTIMATE_STARTED,
    CREATE_CONSTRUCTION_ESTIMATE_SUCCESS,
    CREATE_CONSTRUCTION_ESTIMATE_FAILURE,
    DELETE_CONSTRUCTION_ESTIMATE_SUCCESS,
    DELETE_CONSTRUCTION_ESTIMATE_FAILURE,
    UPDATE_CONSTRUCTION_ESTIMATE_SUCCESS,
    UPDATE_CONSTRUCTION_ESTIMATE_FAILURE,
} from './types'

// PROJECT HELPERS
export const loadingProjectStarted = () => ({
    type: LOADING_PROJECT_STARTED
})

export const createProjectSuccess = (project) => ({
    type: CREATE_PROJECT_SUCCESS,
    ...project
})

export const createProjectFailure = (error) => ({
    type: CREATE_PROJECT_FAILURE,
    error
})

export const deleteProjectSuccess = (project) => ({
    type: DELETE_PROJECT_SUCCESS, 
    ...project
})

export const deleteProjectFailure = (error) => ({
    type: DELETE_PROJECT_FAILURE,
    error
})

export const updateProjectSuccess = (project) => ({
    type: UPDATE_PROJECT_SUCCESS, 
    ...project
})

export const updateProjectFailure = (error) => ({
    type: UPDATE_PROJECT_FAILURE,
    error
})

// CONSTRUCTION ESTIMATE HELPERS
export const loadingConstructionEstimateStarted = () => ({
    type: LOADING_CONSTRUCTION_ESTIMATE_STARTED
})

export const createConstructionEstimateSuccess = (cell) => ({
    type: CREATE_CONSTRUCTION_ESTIMATE_SUCCESS,
    ...cell
})

export const createConstructionEstimateFailure = (error) => ({
    type: CREATE_CONSTRUCTION_ESTIMATE_FAILURE,
    error
})

export const deleteConstructionEstimateSuccess = (cell) => ({
    type: DELETE_CONSTRUCTION_ESTIMATE_SUCCESS, 
    ...cell
})

export const deleteConstructionEstimateFailure = (error) => ({
    type: DELETE_CONSTRUCTION_ESTIMATE_FAILURE,
    error
})

export const updateConstructionEstimateSuccess = (cell) => ({
    type: UPDATE_CONSTRUCTION_ESTIMATE_SUCCESS, 
    ...cell
})

export const updateConstructionEstimateFailure = (error) => ({
    type: UPDATE_CONSTRUCTION_ESTIMATE_FAILURE,
    error
})