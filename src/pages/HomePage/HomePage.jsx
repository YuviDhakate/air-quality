import React, { useState, useEffect } from 'react';
import { uniqBy, sortBy } from 'lodash'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import { initiateSocket, subscribe } from './../../api/webSocket';
import CityAqiTable from '../../components/CityAqiTable/CityAqiTable';
import ChartsPanel from '../../components/ChartPanel/ChartPanel'
import Layout from '../../components/Layout/Layout'
import CityAqiCompare from '../../components/CityAqiCompare/CityAqiCompare'


const HomePage = () => {
    const [data, setData] = useState([{ 'city': 'Bengaluru', 'aqi': 190.09421376612406, 'time': '2021-05-09T06:16:46.880Z' }, { 'city': 'Bhubaneswar', 'aqi': 98.63801940450601, 'time': '2021-05-09T06:16:46.880Z' }, { 'city': 'Chandigarh', 'aqi': 46.955775392841595, 'time': '2021-05-09T06:16:48.878Z' }, { 'city': 'Chennai', 'aqi': 141.57245634640066, 'time': '2021-05-09T06:16:48.878Z' }, { 'city': 'Delhi', 'aqi': 299.4583968345511, 'time': '2021-05-09T06:16:48.878Z' }, { 'city': 'Hyderabad', 'aqi': 203.0147219550929, 'time': '2021-05-09T06:16:48.878Z' }, { 'city': 'Indore', 'aqi': 52.23410324928509, 'time': '2021-05-09T06:16:46.880Z' }, { 'city': 'Jaipur', 'aqi': 141.86280721041777, 'time': '2021-05-09T06:16:48.878Z' }, { 'city': 'Kolkata', 'aqi': 198.00417746742093, 'time': '2021-05-09T06:16:46.880Z' }, { 'city': 'Lucknow', 'aqi': 78.33295960616987, 'time': '2021-05-09T06:16:48.878Z' }, { 'city': 'Mumbai', 'aqi': 180.19098368581334, 'time': '2021-05-09T06:16:48.878Z' }, { 'city': 'Pune', 'aqi': 223.98125449982362, 'time': '2021-05-09T06:16:46.880Z' }]);
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

