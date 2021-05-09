import React, { useState, useEffect } from 'react';
import { uniqBy, sortBy } from 'lodash'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import { initiateSocket, subscribe } from './../../api/webSocket';
import CityAqiTable from '../../components/CityAqiTable/CityAqiTable';
import ChartsPanel from '../../components/ChartPanel/ChartPanel'
import Layout from '../../components/Layout/Layout'
import CityAqiCompare from '../../components/CityAqiCompare/CityAqiCompare'

const DEFAULT_DATA = [{ 'city': 'Pune', 'aqi': 0, time: 0 }]
const HomePage = () => {
    const [data, setData] = useState(DEFAULT_DATA);
    const [selectedCity, setSelectedCity] = useState({})
    const [clickedCity, setClickedCity] = useState('')
    const [chartData, setChartData] = useState({})


    useEffect(() => {
        initiateSocket();
    }, []);

    useEffect(() => {
        subscribe((error, response) => {
            if (error) return;
            let newData = response.map((item) => ({ ...item, time: new Date() }
            ))
            var uniqData = sortBy(uniqBy([...newData, ...data], 'city'), 'city')
            const temp = uniqData.filter((item) => (item.city === clickedCity))
            let tempChartData = {}
            uniqData.forEach((item) => {
                if (chartData.hasOwnProperty(item.city)) {
                    let arr = [...chartData[item.city], item.aqi]
                    if (chartData[item.city].length > 20) {
                        arr.shift()
                    }
                    tempChartData[item.city] = arr
                } else {
                    tempChartData[item.city] = []
                }
            })
            setChartData(tempChartData)
            setSelectedCity(temp[0])
            setData(uniqData);
        });
    }, [data, clickedCity, chartData]);


    const selectCity = city => {
        setClickedCity(city)
        const temp = data.filter((item) => (item.city === city
        ))
        setSelectedCity(temp[0])
    }

    return (
        <Layout>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={5}>
                    <Typography variant='h6' align='center' >
                        Live AQI table
                    </Typography>
                    <CityAqiTable selectCity={selectCity} data={data} chartData={chartData} clickedCity={clickedCity} />
                </Grid>
                <Grid item xs={12} sm={6} md={7}>
                    {selectedCity?.aqi ? <ChartsPanel selectedCity={selectedCity} selectCity={selectCity} data={data} chartData={chartData} /> :
                        <CityAqiCompare selectCity={selectCity} data={data} />}
                </Grid>
            </Grid >
        </Layout>
    );
};
export default HomePage;

