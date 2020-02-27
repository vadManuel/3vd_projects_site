import {
    LOADING_PROJECT_STARTED,
    CREATE_PROJECT_SUCCESS,
    CREATE_PROJECT_FAILURE,
    DELETE_PROJECT_SUCCESS,
    DELETE_PROJECT_FAILURE,
    UPDATE_PROJECT_SUCCESS,
    UPDATE_PROJECT_FAILURE
} from './types'

// PROJECT HELPERS
export const loadingProjectStarted = () => {
    console.log('Helping: Project started loading')
    return {
        type: LOADING_PROJECT_STARTED
    }
}

export const createProjectSuccess = (project) => {
    console.log('Helping: Project successfully created!')
    console.log('increateproject', project)
    return {
        type: CREATE_PROJECT_SUCCESS,
        payload: {
            project
        }
    }
}

export const createProjectFailure = (error) => ({
    type: CREATE_PROJECT_FAILURE,
    payload: {
        error
    }
})

export const deleteProjectSuccess = (project) => ({
    type: DELETE_PROJECT_SUCCESS,
    payload: {
        project
    }
})

export const deleteProjectFailure = (error) => ({
    type: DELETE_PROJECT_FAILURE,
    payload: {
        error
    }
})

export const updateProjectSuccess = (project) => ({
    type: UPDATE_PROJECT_SUCCESS,
    payload: {
        project
    }
})

export const updateProjectFailure = (error) => ({
    type: UPDATE_PROJECT_FAILURE,
    payload: {
        error
    }
})