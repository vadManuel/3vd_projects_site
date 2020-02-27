import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../store/reducers/rootReducer'

// import { getFirebase } from 'react-redux-firebase'
// import { getFirestore } from 'redux-firestore'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore' // make sure you add this for firestore
import { fbConfig } from './_fbConfig'

import { createFirestoreInstance } from 'redux-firestore'

// const rrfConfig = {
//     userProfile: 'users',
//     useFirestoreForProfile: true, // Store in Firestore instead of Real Time DB
//     enableLogging: false
// }

firebase.initializeApp(fbConfig)
const db = firebase.firestore()

const store = createStore(rootReducer, applyMiddleware(thunk))

const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
    // enableClaims: true // Get custom claims along with the profile
}

const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance // <- needed if using firestore
}

// function configureStore() {
//     const middleware = [thunk.withExtraArgument(getFirebase)]
//     const createStoreWithMiddleware = compose(
//         applyMiddleware(...middleware)
//     )(createStore)
//     const store = createStoreWithMiddleware(rootReducer)

//     return store
// }

export { store, db, rrfProps }