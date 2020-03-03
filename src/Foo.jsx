import React, { useState } from 'react'
import ReactDataGrid from 'react-data-grid'
import { ProgressBar } from 'react-bootstrap'

import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'

const useStyles = makeStyles({
    underline: false
})

const ProgressBarFormatter = ({ value }) => {
    return <ProgressBar now={value} label={`${value}%`} />;
}

const options = [
    { id: 'a', value: 'a' },
    { id: 'b', value: 'b' },
    { id: 'c', value: 'c' },
    { id: 'd', value: 'd' }
]

function AutocompleteEditor() {
    const classes = useStyles()

    const [option, setOption] = useState({id: '', value: ''})
    // console.log(option)

    return (
        <Autocomplete
            style={{ margin: '1em .25em' }}
            options={options}
            autoHighlight
            getOptionLabel={option => option.value}
            // onChange={e => console.log(e)}
            // value={option.value}
            renderInput={params => (
                <TextField
                    {...params}
                    placeholder='Choose a project'
                    InputProps={{
                        ...params.InputProps,
                        disableUnderline: true,
                        autoComplete: 'new-password'
                    }}
                />
            )}
        />
    )
}

const columns = [
    { key: 'id', name: 'ID' },
    { key: 'title', name: 'Title' },
    { key: 'complete', name: 'Complete', formatter: ProgressBarFormatter }
]

function onGridRowsUpdated({ fromRow, toRow, updated }, rows, setRows) {
    const newRows = rows.slice()
    for (let i = fromRow; i <= toRow; i++) {
        newRows[i] = { ...newRows[i], ...updated }
    }
    setRows(newRows)
}

function Foo() {
    const [rows, setRows] = useState([
        { id: 0, title: 'Task 1', complete: 20 },
        { id: 1, title: 'Task 2', complete: 40 },
        { id: 2, title: 'Task 3', complete: 60 }
    ])

    return (
        <>
            <AutocompleteEditor />
            <ReactDataGrid
                columns={columns}
                rowGetter={i => rows[i]}
                rowsCount={rows.length}
                onGridRowsUpdated={obj => onGridRowsUpdated(obj, rows, setRows)}
                enableCellSelect
            />
        </>
    )
}

export default Foo
