import { combineReducers } from 'redux'
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore'
import projectReducer from './projectReducer'

const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    projectStore: projectReducer
})

export default rootReducer