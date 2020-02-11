import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import {
    createProject,
    deleteProject,
    updateProject
} from '../store/actions/projectAction'

class Test extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            userInput: {
                text: ''
            }
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        const target = event.target
        this.setState(prevState => ({
            userInput: {
                ...prevState.userInput,
                [target.name]: target.value
            }
        }))
    }

    handleSubmit(event) {
        event.preventDefault()
        this.props.createProject(this.state)
    }

    render() {
        const {
            userInput: {
                text
            }
        } = this.state
        const { projects } = this.props
        console.log(this.props)

        return (
            <>
                <h2>Test Page</h2>
                <form onSubmit={this.handleSubmit}>
                    <label type='text'>Add a project:</label>
                    <input name='text' value={text} onChange={this.handleChange} />
                    <button style={{ backgroundColor: 'green' }}>Create</button>
                </form>
                { projects && projects.map((project, i) => (
                    <div key={`input-${project.id}-${i}`} style={{display: 'flex', flexDirection: 'row'}}>
                        <input value={project.text} />
                        <button style={{ backgroundColor: 'green' }}>Edit</button>
                        <button style={{ backgroundColor: 'red' }}>Delete</button>
                    </div>
                ))}
            </>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createProject: (project) => { dispatch(createProject(project)) },
        deleteProject: (project) => { dispatch(deleteProject(project)) },
        updateProject: (project) => { dispatch(updateProject(project)) }
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        projects: state.firestore.ordered.projects
    }
}

export default compose(
    firestoreConnect(() => [
        { collection: 'projects' }
    ]),
    connect(mapStateToProps, mapDispatchToProps),
)(Test)