import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { APP, CAT_COLOR } from "../../config/app.config"
import { getCategory } from "../../util/util"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'


const useStyles = makeStyles({
    table: {
        width: '100%',
    },
    tableCell: {
        fontSize: '10px',
        padding: '3px 12px 3px 8px'
    }
});

const AqiGuide = () => {
    const classes = useStyles();
    return (
        <TableContainer>
            <Table size="small" className={classes.table}>
                <TableHead style={{ background: CAT_COLOR.DEFAULT }}>
                    <TableRow>
                        <TableCell className={classes.tableCell}>Air Quality Index</TableCell>
                        <TableCell className={classes.tableCell}>Category</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {APP.CATEGORIES.map((category) => {
                        const { color } = getCategory(category.startRange);
                        return (
                            <TableRow key={category.name} style={{ background: color }}>
                                <TableCell className={classes.tableCell}>
                                    {category.startRange} - {category.endRange}
                                </TableCell>
                                <TableCell className={classes.tableCell}>{category.name}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default AqiGuide;