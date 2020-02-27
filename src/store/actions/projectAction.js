import * as helper from './helper'
import { db } from '../../config/config'
import firebase from 'firebase/app'

export const createProject = (project) => {
    return (dispatch) => {
        dispatch(helper.loadingProjectStarted())
        console.log('Creating a project...')

        let ref = db.collection('projects').doc()
        const newProject = {
            ...project,
            id: ref.id,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }

        ref.set(newProject).then(() => {
            dispatch(helper.createProjectSuccess(newProject))
            console.log('Project creation successful!')
        }).catch(err => {
            dispatch(helper.createProjectFailure(err.message))
            console.log('Project creation unsuccessful!')
        })
    }
}

export const deleteProject = (project) => {
    return (dispatch) => {
        dispatch(helper.loadingProjectStarted())
        console.log('Deleting a project...')

        let ref = db.collection('projects').doc(project.id)

        ref.delete().then(() => {
            dispatch(helper.deleteProjectSuccess(project))
            console.log('Project deletion successful!')
        }).catch(err => {
            dispatch(helper.deleteProjectFailure(err.message))
            console.log('Project deletion unsuccessful!')
        })
    }
}

export const updateProject = (project) => {
    return (dispatch) => {
        dispatch(helper.loadingProjectStarted())
        console.log('Updating a project...')

        console.log('yeet',project)
        let ref = db.collection('projects').doc(project.id)

        ref.update({
            ...project
        }).then(() => {
            dispatch(helper.updateProjectSuccess(project))
            console.log('Project update successful!')
        }).catch(err => {
            dispatch(helper.updateProjectFailure(err.message))
            console.log('Project update unsuccessful!')
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