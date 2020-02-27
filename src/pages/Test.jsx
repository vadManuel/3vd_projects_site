import React from 'react'
// import { compose } from 'redux'
import { connect } from 'react-redux'
// import { firestoreConnect } from 'react-redux-firebase'
import {
    createProject,
    deleteProject,
    updateProject
} from '../store/actions/projectAction'
// import { db } from '../config/config'
import Block from './projectTest'
import { objArrEq } from '../utils/funcs'

class Test extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            projectsProps: [],
            projects: undefined,
            userInput: {
                text: ''
            },
            updatingProjectsProps: null
        }

        this.onChange = this.onChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.onChangeItem = this.onChangeItem.bind(this)
        this.onClickItem = this.onClickItem.bind(this)
    }

    onChange(event) {
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
        this.props.createProject(this.state.userInput)
    }

    onChangeItem(event,i) {
        const target = event.target
        let projects = JSON.parse(JSON.stringify(this.state.projects))
        let projectsProps = this.state.projectsProps

        if (projects[i].text && projects[i].text !== target.value) {
            projectsProps[i]['editLabel'] = 'Submit'
        } else {
            projectsProps[i]['editLabel'] = 'Cancel'
        }

        projects[i][target.name] = target.value

        this.setState({
            projectsProps,
            projects
        })
    }

    onClickItem(event,i) {
        // let projects = JSON.parse(JSON.stringify(this.state.projects))
        let projects = this.state.projects
        let projectsProps = this.state.projectsProps

        if (projectsProps[i].editLabel === 'Submit') {
            projectsProps[i]['textDisabled'] = true
            projectsProps[i]['editLabel'] = 'Updating'
            this.setState({ projectsProps })
            
            return this.props.updateProject(projects[i])
            // projectsProps[i]['editLabel'] = 'Edit'
        } else if (projectsProps[i].textDisabled) {
            projectsProps[i]['textDisabled'] = false
            projectsProps[i]['editLabel'] = 'Cancel'
        } else {
            projectsProps[i]['textDisabled'] = true
            projectsProps[i]['editLabel'] = 'Edit'
        }

        return this.setState({ projectsProps })
    }

    componentDidUpdate() {
        if (this.state.updatingProjectsProps && !this.props.projectStore.loading) {
            console.log(this.state.projectsProps[0].editLabel)
            console.timeEnd('loading')
            this.setState({ projectsProps: this.state.updatingProjectsProps, updatingProjectsProps: null })
        }

        if (this.props.projectStore && this.props.projectStore.loading) {
            let projectsProps = this.state.projectsProps
            let change = false
            projectsProps.forEach((item, i) => {
                if (item.editLabel === 'Updating') {
                    change = true
                    projectsProps[i]['editLabel'] = 'Edit'
                }
            })
            if (change) {
                console.log(this.state.projectsProps[0].editLabel)
                console.time('loading')
                this.setState({ updatingProjectsProps: projectsProps })
            }
        }

        if (this.props.projects && !objArrEq(this.state.projects, this.props.projects)) {
            let newProjectsProps = this.state.projectsProps
            let len = this.props.projects.length
            if (this.state.projects) len -= this.state.projects.length
            while (len-- > 0) newProjectsProps.push({ 'textDisabled': true, 'editLabel': 'Edit' })
            
            let projects = []
            this.props.projects.forEach((project, i) => {
                if (newProjectsProps[i].textDisabled)
                    projects.push(project)
                else
                    projects.push(this.state.projects[i])
            })

            this.setState({
                projectsProps: newProjectsProps,
                projects
            })
        }
    }

    render() {
        const {
            projectsProps,
            projects,
            userInput: {
                text
            }
        } = this.state

        return (
            <>
                <h2>Test Page {this.props.projectStore.loading ? 'loading' : 'not loading'}</h2>
                <form onSubmit={this.handleSubmit}>
                    <label type='text'>Add a project:</label>
                    <input name='text' value={text} onChange={this.onChange} />
                    <button style={{ backgroundColor: 'green' }}>Create</button>
                </form>
                {/* {(projects && projects.length !== 0) && console.log('updating projects list', projects[0].text, projectsProps[0].editLabel)} */}
                {projects ? (projects.length !== 0 ? projects.map((project, i) => {
                    // if (projectsProps[i].editLabel === 'Updating')
                    console.log(projectsProps[0].editLabel, projects[0].text)
                    const blockProps = {
                        i,
                        onChangeItem: this.onChangeItem,
                        onClickItem: this.onClickItem,
                        deleteProject: this.props.deleteProject,
                        project,
                        ...projectsProps[i],
                        // loading: this.props.projectStore.loading
                    }
                
                    return <Block key={i} { ...blockProps} />
                }) : 'You have no projects') : 'Loading projects...'}
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
    return {
        projectStore: state.projectStore,
        projects: state.firestore.ordered.projects
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Test)