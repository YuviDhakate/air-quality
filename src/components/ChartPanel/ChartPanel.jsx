import React from 'react';
import GaugeChart from 'react-gauge-chart'
import { getCategory } from '../../util/util'
import CityAqiSparklines from '../CityAqiSparklines/CityAqiSparklines'
import AqiGuid from '../AqiGuide/AqiGuide'
import { CAT_COLOR } from '../../config/app.config'
import { round } from 'lodash'
import { Grid, Select, Typography, Paper, IconButton } from '@material-ui/core'
import CancelIcon from '@material-ui/icons/Cancel';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    IconButton: {
        display: 'inline-block',
        float: 'right'
    }
});

const guageChartColors = [CAT_COLOR.GOOD, CAT_COLOR.SATISFACTORY, CAT_COLOR.MODERATE, CAT_COLOR.MODERATE, CAT_COLOR.POOR, CAT_COLOR.POOR, CAT_COLOR.VERY_POOR, CAT_COLOR.VERY_POOR, CAT_COLOR.SEVERE, CAT_COLOR.SEVERE]

const ChartsPanel = (prop) => {
    const classes = useStyles();
    const { selectedCity, chartData, data, selectCity } = prop
    const { aqi, city } = selectedCity
    const { name, color } = getCategory(aqi)
    const handleChange = (event) => {
        selectCity(event.target.value)
    };

    return (<Grid container spacing={1}>
        <Grid item xs={12} sm={8}>
            <IconButton aria-label='delete' className={classes.IconButton}>
                <CancelIcon onClick={() => { selectCity('') }} />
            </IconButton>
            <Typography variant='h6' align='center' >
                {selectedCity.city}
            </Typography>
            <GaugeChart id='gauge-chart'
                animate={true}
                nrOfLevels={10}
                colors={guageChartColors}
                percent={aqi / 500}
                needleColor={color}
                textColor={color}
                formatTextValue={(value) => round(aqi)
                }
            />
        </Grid>
        <Grid item xs={12} sm={4}>
            <Typography variant='h6' align='center' >
                Select City &nbsp;
                <Select native
                    value={selectedCity.city}
                    onChange={handleChange}
                    variant={'outlined'} >
                    <option value=''>Compare all cities</option>)
                    {data.map((item) => <option key={item.city} value={item.city}>{item.city}</option>)}
                </Select>
            </Typography>
            <br />
            <Paper>
                <Typography variant='h6' align='center' >
                    Air Quality Index is <br /><strong style={{ color: color }}>{name}</strong>
                </Typography>
                <Typography align='center' >
                    As per Air Quality Standerds
            </Typography>
                <AqiGuid />
            </Paper>
        </Grid>
        <Grid item xs={12}>
            <CityAqiSparklines data={chartData[city]} color={color} />
        </Grid>
    </Grid>)
}

export default ChartsPanel;