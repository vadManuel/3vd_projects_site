import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../store/reducers/rootReducer'

import { getFirebase } from 'react-redux-firebase'

const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true, // Store in Firestore instead of Real Time DB
    enableLogging: false
}

function configureStore() {
    const middleware = [thunk.withExtraArgument({ getFirebase })]
    const createStoreWithMiddleware = compose(
        applyMiddleware(...middleware)
    )(createStore)
    const store = createStoreWithMiddleware(rootReducer)

    return store
}

export { configureStore, rrfConfig }