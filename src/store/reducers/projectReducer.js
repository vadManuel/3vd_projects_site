import {
    LOADING_ALL_PROJECTS_STARTED,
    LOADING_ALL_PROJECTS,
    LOADING_PROJECT_STARTED,
    CREATE_PROJECT_SUCCESS,
    CREATE_PROJECT_FAILURE,
    DELETE_PROJECT_SUCCESS,
    DELETE_PROJECT_FAILURE,
    UPDATE_PROJECT_SUCCESS,
    UPDATE_PROJECT_FAILURE
} from '../actions/types'

const initialState = {
    loading: false,
    error: null,
    projects: []
}

export default function projectReducer(state=initialState, action) {
    switch (action.type) {
        case LOADING_ALL_PROJECTS_STARTED:
        case LOADING_PROJECT_STARTED: {
            return {
                ...state,
                loading: true
            }
        }
        case LOADING_ALL_PROJECTS: {
            return {
                ...state,
                loading: false,
                error: null,
                projects: [
                    ...state.projects,
                    ...action.payload.projects
                ]
            }
        }
        case CREATE_PROJECT_SUCCESS: {
            return {
                ...state,
                loading: false,
                error: null,
                projects: [
                    ...state.projects,
                    action.payload.project
                ]
            }
        }
        case DELETE_PROJECT_SUCCESS: {
            const projects = state.projects
            const newProjects = projects.splice(projects.findIndex(i => (
                i.id === action.payload.project.id
            )), 1)
            console.log('Deleted:',action.payload.project.text,newProjects)

            return {
                ...state,
                loading: false,
                error: null,
                projects: [
                    ...newProjects
                ]
            }
        }
        case UPDATE_PROJECT_SUCCESS: {
            const projects = state.projects
            const newProjects = projects.splice(projects.findIndex(i => (
                i.id === action.payload.project.id
            )), 1)

            return {
                ...state,
                loading: false,
                error: null,
                projects: [
                    ...newProjects,
                    action.payload.project
                ]
            }
        }
        case CREATE_PROJECT_FAILURE:
        case DELETE_PROJECT_FAILURE:
        case UPDATE_PROJECT_FAILURE: {
            console.error(action.payload.error)
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