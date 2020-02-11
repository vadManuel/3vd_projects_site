import * as helper from './helper'

export const createProject = ({ project }) => {
    return (dispatch, getState, { getFirestore }) => {
        console.log('Creating a project...')
        dispatch(helper.loadingProjectStarted())

        const db = getFirestore()
        let projectRef = db.collection('projects').doc()
        const id = projectRef.id

        projectRef.set({
            ...project,
            id
        }).then(res => {
            console.log('Project creation successful!')
            dispatch(helper.createProjectSuccess(res.data))
        }).catch(err => {
            console.log('Project creation unsuccessful!')
            dispatch(helper.createProjectFailure(err.message))
        })
    }
}

export const deleteProject = ({ project }) => {
    return (dispatch, getState, { getFirestore }) => {
        console.log('Deleting a project...')
        dispatch(helper.loadingProjectStarted())

        const db = getFirestore()
        let projectRef = db.collection('projects').doc(project.id)

        projectRef.delete().then(res => {
            console.log('Project deletion successful!')
            dispatch(helper.deleteProjectSuccess(res.data))
        }).catch(err => {
            console.log('Project deletion unsuccessful!')
            dispatch(helper.deleteProjectFailure(err.message))
        })
    }
}

export const updateProject = ({ project }) => {
    return (dispatch, getState, { getFirestore }) => {
        console.log('Updating a project...')
        dispatch(helper.loadingProjectStarted())

        const db = getFirestore()
        let projectRef = db.collection('projects').doc(project.id)

        projectRef.set({
            ...project
        }).then(res => {
            console.log('Project update successful!')
            dispatch(helper.updateProjectSuccess(res.data))
        }).catch(err => {
            console.log('Project update unsuccessful!')
            dispatch(helper.updateProjectFailure(err.message))
        })
    }
}

// const firestore = getFirestore()
//   firestore.collection('goalz').doc(goalID).get().then((doc) => {
//    if(doc.exists){
//     const data = doc.data()
//     dispatch({ type: 'GET_GOAL', data }) 
//    }else{
//     console.log('does not exist')
//    }
   
//   })
//  }
// }