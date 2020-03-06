import React, { useState, useEffect, useCallback } from 'react'

import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'
import Hidden from '@material-ui/core/Hidden'
import {
    DatePicker,
    MuiPickersUtilsProvider
} from '@material-ui/pickers'
import ArrowForward from '@material-ui/icons/ArrowForward'
import Input from '@material-ui/core/Input'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Table from '@material-ui/core/Table'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import Typography from '@material-ui/core/Typography'
import DateFnsUtils from '@date-io/date-fns'
import 'date-fns'
import moment from 'moment'

const projects = ['Apple', 'Pear', 'Fruit', 'Mango', 'Pineapple', 'Walmart', 'Code', 'Mercedes', 'Toyota']

function tableGenerator(startDate, endDate) {
    const len = moment(endDate).diff(moment(startDate), 'days') + 1
    let ret = Array(len)

    for (let i = 0; i < len; i++) {
        ret[i] = moment().startOf('week').add(i, 'days')
    }

    return ret
}


function Foo() {
    const [startDate, setStartDate] = useState(moment().startOf('week'))
    const [endDate, setEndDate] = useState(moment().endOf('week'))
    const [columns, setColumns] = useState(tableGenerator(startDate, endDate))
    const [rows, setRows] = useState([{ projectName: null, regularHours: Array(moment(endDate).diff(moment(startDate), 'days') + 1).fill(0), overtimeHours: Array(moment(endDate).diff(moment(startDate), 'days') + 1).fill(0) },
    { projectName: null, regularHours: Array(moment(endDate).diff(moment(startDate), 'days') + 1).fill(0), overtimeHours: Array(moment(endDate).diff(moment(startDate), 'days') + 1).fill(0) }
    ])

    const [summary, setSummary] = useState(updateSummary())

    const onAddRow = useCallback(e => {
        e.preventDefault()
        let newRows = rows.slice()
        newRows.push({ projectName: null, regularHours: Array(moment(endDate).diff(moment(startDate), 'days') + 1).fill(0), overtimeHours: Array(moment(endDate).diff(moment(startDate), 'days') + 1).fill(0) })
        setRows(newRows)
    }, [startDate, endDate, rows, setRows])
    const onProjectNameChange = useCallback((i, e) => {
        let newRows = rows.slice()
        newRows[i]['projectName'] = e
        setRows(newRows)
    }, [rows, setRows])
    const onRegularHoursChange = useCallback((j, i, e) => {
        let newRows = rows.slice()
        newRows[j]['regularHours'][i] = e.target.value
        setRows(newRows)
    }, [rows, setRows])
    const onOvertimeHoursChange = useCallback((j, i, e) => {
        let newRows = rows.slice()
        newRows[j]['overtimeHours'][i] = e.target.value
        setRows(newRows)
    }, [rows, setRows])

    const onStartDateChange = useCallback(e => {
        setStartDate(e)
    }, [setStartDate])
    const onEndDateChange = useCallback(e => {
        setEndDate(e)
    }, [setEndDate])

    const updateSummary = useCallback(() => {
        let newSummary = Array(moment(endDate).diff(moment(startDate), 'days')+1).fill().map(() => Array(2).fill(0))
        
        for (let i = 0; i < newSummary.length; i++) {
            for (let j = 0; j < rows.length; j++) {
                newSummary[i][0] = newSummary[i][0] + rows[j].regularHours[i] + rows[j].regularHours[i]
                newSummary[i][1] = newSummary[i][1] + rows[j].overtimeHours[i] + rows[j].overtimeHours[i]
            }
        }

        setSummary(newSummary)
    }, [startDate, endDate, rows, setSummary])


    return (
        <Container>
            <Paper style={{ padding: '1.5em' }}>
                <Grid container>
                    <Grid container xs={12} spacing={3} justify='flex-end' style={{ marginBottom: '1.5em' }}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid container xs={9} justify='center' spacing={3}>
                                <Grid item xs={5}>
                                    <DatePicker
                                        autoOk
                                        fullWidth
                                        okLabel={false} // don't tell me what to do
                                        margin='none'
                                        label='Start Date'
                                        format='MM/dd/yyyy'
                                        value={startDate}
                                        onChange={onStartDateChange}
                                    />
                                </Grid>
                                <Grid item xs={2} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <ArrowForward fontSize='large' />
                                </Grid>
                                <Grid item xs={5} >
                                    <DatePicker
                                        autoOk
                                        fullWidth
                                        okLabel={false} // don't tell me what to do
                                        margin='none'
                                        label='End Date'
                                        format='MM/dd/yyyy'
                                        value={endDate}
                                        onChange={onEndDateChange}
                                    />
                                </Grid>
                            </Grid>
                        </MuiPickersUtilsProvider>
                    </Grid>

                    <Grid container xs={12}>
                        <Grid item xs={4}>
                            <Table size='small'>
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ paddingTop: '1.9rem' }}>Project Name</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    { rows.map((r, j) => {
                                        return (
                                            <TableRow key={j}>
                                                <TableCell style={{ minWidth: '100px' }} component='th' scope='row'>
                                                    <Autocomplete
                                                        options={projects}
                                                        getOptionLabel={o => o}
                                                        value={r.projectName}
                                                        onChange={(_, i) => onProjectNameChange(j, i)}
                                                        renderInput={params => {
                                                            return (
                                                                <TextField
                                                                    {...params}
                                                                    placeholder='Add Project'
                                                                    variant='standard'
                                                                    margin='none'
                                                                    fullWidth
                                                                />
                                                            )
                                                        }
                                                        }
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                                    <TableRow>
                                        <TableCell style={{ minWidth: '100px' }} component='th' scope='row'>
                                            <Button variant='outlined' fullWidth onClick={onAddRow}>
                                                <AddIcon />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Grid>
                        <Grid container xs={8} style={{ overflowX: 'scroll' }} wrap='nowrap'>
                            <Table size='small'>
                                <TableHead>
                                    <TableRow>
                                        { columns.map((c, i) => {
                                            return (
                                                <TableCell key={i} align='center'>
                                                    {c.format('ddd, MMM D')}
                                                </TableCell>
                                            )
                                        })}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    { rows.map((r, j) => {
                                        return (
                                            <TableRow key={j}>
                                                { Array.apply(null, Array(columns.length)).map((_, i) => {
                                                    return (
                                                        <TableCell key={i} style={{ minWidth: '3rem' }}>
                                                            <Grid container spacing={1}>
                                                                <Grid item xs={6}>
                                                                    <Input value={r.regularHours[i]} onChange={e => onRegularHoursChange(j, i, e)} inputProps={{ style: { textAlign: 'center' } }} style={{ width: '1.5rem' }} />
                                                                </Grid>
                                                                <Grid item xs={6}>
                                                                    <Input value={r.overtimeHours[i]} onChange={e => onOvertimeHoursChange(j, i, e)} inputProps={{ style: { textAlign: 'center' } }} style={{ width: '1.5rem' }} />
                                                                </Grid>
                                                            </Grid>
                                                        </TableCell>
                                                    )
                                                })}
                                            </TableRow>
                                        )
                                    })}
                                    <TableRow>
                                        { summary.map((e, i) => {
                                            return (
                                                <TableCell key={i} style={{ minWidth: '3rem' }}>
                                                    <Grid container spacing={1}>
                                                        <Grid item xs={6}>
                                                            <Typography>{e[0]}</Typography>
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <Typography>{e[1]}</Typography>
                                                        </Grid>
                                                    </Grid>
                                                </TableCell>
                                            )
                                        })}
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}

export default Foo
