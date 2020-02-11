import * as helper from './helper'

export const createConstructionEstimate = ({ cell }) => {
    return (dispatch, getState, { getFirestore }) => {
        console.log('Creating a construction estimate cell...')
        dispatch(helper.loadingConstructionEstimateStarted())

        const db = getFirestore()
        let ref = db.collection('construction_estimate').doc()
        const id = ref.id

        ref.set({
            ...cell,
            id
        }).then(res => {
            console.log('Construction estimate cell creation successful!')
            dispatch(helper.createConstructionEstimateSuccess(res.data))
        }).catch(err => {
            console.log('Construction estimate cell creation unsuccessful!')
            dispatch(helper.createConstructionEstimateFailure(err.message))
        })
    }
}

export const deleteConstructionEstimate = ({ cell }) => {
    return (dispatch, getState, { getFirestore }) => {
        console.log('Deleting a construction estimate cell...')
        dispatch(helper.loadingConstructionEstimateStarted())

        const db = getFirestore()
        let ref = db.collection('construction_estimate').doc(cell.id)

        ref.delete().then(res => {
            console.log('Construction estimate cell deletion successful!')
            dispatch(helper.deleteConstructionEstimateSuccess(res.data))
        }).catch(err => {
            console.log('Construction estimate cell deletion unsuccessful!')
            dispatch(helper.deleteConstructionEstimateFailure(err.message))
        })
    }
}

export const updateConstructionEstimate = ({ cell }) => {
    return (dispatch, getState, { getFirestore }) => {
        console.log('Updating a construction estimate cell...')
        dispatch(helper.loadingConstructionEstimateStarted())

        const db = getFirestore()
        let ref = db.collection('construction_estimate').doc(cell.id)

        ref.set({
            ...cell
        }).then(res => {
            console.log('Construction estimate cell update successful!')
            dispatch(helper.updateConstructionEstimateSuccess(res.data))
        }).catch(err => {
            console.log('Construction estimate cell update unsuccessful!')
            dispatch(helper.updateConstructionEstimateupdateProjectFailure(err.message))
        })
    }
}

// const firestore = getFirestore()
// firestore.collection('goalz').doc(goalID).get().then((doc) => {
//     if (doc.exists) {
//         const data = doc.data()
//         dispatch({ type: 'GET_GOAL', data })
//     } else {
//         console.log('does not exist')
//     }
// })
//  }
// }