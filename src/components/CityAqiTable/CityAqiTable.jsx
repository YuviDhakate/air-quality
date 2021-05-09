import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { round } from 'lodash'
import { getCategory, timeAgo } from '../../util/util'
import CityAqiSparklines from '../CityAqiSparklines/CityAqiSparklines'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    table: {
        minWidth: 100,
        minHeight: 400,
    },
    activeRow: {
        background: '#ccc'
    }
});


const CityAqiTable = (prob) => {
    const classes = useStyles();
    const { selectCity, data, chartData, clickedCity } = prob

    const rows = (arr) => {
        const currTime = new Date();
        return arr &&
            arr.map((item) => {
                const timeDiff = currTime - new Date(item.time)
                const { color } = getCategory(item.aqi)
                return (
                    <TableRow key={item.city} className={item.city === clickedCity ? classes.activeRow : ''} onClick={() => selectCity(item.city)}>
                        <TableCell component='th' scope='row'>
                            {item.city}
                        </TableCell>
                        <TableCell align='right'><span style={{ color: color }}>{round(item.aqi, 2)} </span></TableCell>
                        <TableCell align='right'>{item.aqi ? timeAgo.format(currTime - timeDiff) : 'Fetching'} </TableCell>
                        <TableCell width='100'>
                            <CityAqiSparklines data={chartData[item.city]} color={color} />
                        </TableCell>
                    </TableRow >
                )
            }
            );
    }
    return (
        <TableContainer component={Paper}>
            <Table size='small' className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>City</TableCell>
                        <TableCell align='right'>Current AQI</TableCell>
                        <TableCell align='right'>Last Updated</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows(data)}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CityAqiTable;