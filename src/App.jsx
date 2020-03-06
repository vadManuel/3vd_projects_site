import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'

import Test from './pages/Test'
import Foo from './Foo'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import { MobileView, BrowserView } from 'react-device-detect'
// import { mobileCheck } from './utils/funcs'
import './styles.css'
import Container from '@material-ui/core/Container'

class App extends React.Component {
    render() {
        return (
            <Router>
                <Container>
                    <MobileView>
                        <h3>Mobile Navbar</h3>
                        <Switch>
                            {/* <Route exact path='/' component={Test} /> */}
                            <Route default component={() => <h3>Page Not Found</h3>} />
                        </Switch>
                    </MobileView>
                    <BrowserView>
                        <h3>Browser Navbar</h3>
                        <Switch>
                            <Route exact path='/' component={Foo} />
                            <Route default component={() => <h3>Page Not Found</h3>} />
                        </Switch>
                    </BrowserView>
                </Container>
            </Router>
        )
    }
}

function mapStateToProps(state) {
    return {
        projects: state.firestore.ordered.projects
    }
}

function mapDispatchToProps(dispatch) {
    return {
        // populateProjects: (projects) => { dispatch(populateProjects(projects)) }
    }
}

export default compose(
    firestoreConnect(() => [
        { collection: 'projects' }
    ]),
    connect(mapStateToProps, mapDispatchToProps)
)(App)

// export default connect(mapStateToProps, mapDispatchToProps)(App)