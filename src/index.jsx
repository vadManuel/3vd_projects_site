import React from 'react'
import ReactDOM from 'react-dom'
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import { Provider } from 'react-redux'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore' // make sure you add this for firestore
import { createFirestoreInstance } from 'redux-firestore'

import App from './App'
import * as serviceWorker from './serviceWorker'
import { configureStore, rrfConfig } from './config/config'
import { fbConfig } from './config/_fbConfig'

const store = configureStore()
firebase.initializeApp(fbConfig)

ReactDOM.render(
    <Provider store={store}>
        <ReactReduxFirebaseProvider
            firebase={firebase}
            config={rrfConfig}
            dispatch={store.dispatch}
            createFirestoreInstance={createFirestoreInstance}
        >
            <App />
        </ReactReduxFirebaseProvider>
    </Provider>,
document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()

