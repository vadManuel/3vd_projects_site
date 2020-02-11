import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'

import Test from './pages/Test'

class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <h3>Navbar</h3>
                    <Switch>
                        <Route exact path='/' component={ Test } />
                        <Route default component={() => <h3>Page Not Found</h3>} />
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default App