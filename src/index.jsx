import React from 'react'
import ReactDOM from 'react-dom'
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import { Provider } from 'react-redux'

import App from './App'
import * as serviceWorker from './serviceWorker'
// import { configureStore, rrfConfig } from './config/config'
import { store, rrfProps } from './config/config'

// const db = firebase.firestore()
// const store = configureStore()

ReactDOM.render(
    <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
            <App />
        </ReactReduxFirebaseProvider>
    </Provider>,
document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()

// export { db }
