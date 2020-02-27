import React from 'react'

export default function Block(props) {
    const {
        onChangeItem,
        onClickItem,
        deleteProject,
        project,
        // loading,
        textDisabled,
        editLabel,
        i
    } = props

    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <input disabled={textDisabled} value={project.text}
                name='text' onChange={(e) => onChangeItem(e,i)} />
            <button style={{ backgroundColor: 'green' }} onClick={(e) => onClickItem(e,i)}
            // >{loading ? 'Sending' : editLabel}</button>
            >{editLabel}</button>
            <button style={{ backgroundColor: 'red' }}
                onClick={() => {
                    console.log('Deleting project', project.text)
                    deleteProject(project)
                }}
            >Delete</button>
        </div>
    )
}