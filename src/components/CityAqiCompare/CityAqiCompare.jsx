import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ReferenceLine, Tooltip, ResponsiveContainer } from 'recharts';
import { APP, CAT_COLOR } from "../../config/app.config";
import { getCategory } from "../../util/util";
import AqiGuid from "../AqiGuide/AqiGuide";

const CityAqiCompare = (prop) => {
    const { data, selectCity } = prop
    let categoriesStack = {}
    APP.CATEGORIES.forEach((category) => {
        categoriesStack[category.name] = category.endRange - category.startRange + 1
    })
    let aqiData = data.map((dataItem) => {
        return dataItem
    })
    categoriesStack = { ...categoriesStack, city: 'AQ Index' }
    const chartData = [categoriesStack, ...aqiData]

    const CustomTooltip = ({ payload, label, active }) => {
        if (payload[0]?.value) {
            const { color, name } = getCategory(payload[0].value)
            if (active && label !== 'AQ Index') {
                return (
                    <div className="custom-tooltip" style={{ backgroundColor: color }}>
                        <h5>{name}</h5>
                        <div className="city">{label}</div>
                        <div className="aqi">{`Aqi : ${payload[0].value.toFixed(2)}`}</div>
                    </div>
                );
            } else if (label === 'AQ Index') {
                return <AqiGuid />
            }
        }
        return null;
    }

    const CustomBar = (props) => {
        const {
            x, y, width, height, aqi
        } = props;
        if (aqi)
            return <rect x={x} y={y} width={width} height={height} style={{ fill: getCategory(aqi).color }} />;
        return null
    };

    const getReferanceLine = () => (
        APP.CATEGORIES.map((category) => {
            return <ReferenceLine key={category.name} y={category.endRange} label={category.name} stroke={category.color} strokeDasharray="3 3" />
        })
    )

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                width={500}
                height={300}
                data={chartData}
                layout="horizontal"
            >
                <XAxis dataKey="city" stroke="#999" />
                <YAxis tickCount={25} stroke="#999" max={500} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="GOOD" fill={CAT_COLOR.GOOD} stackId="a" />
                <Bar dataKey="SATISFACTORY" fill={CAT_COLOR.SATISFACTORY} stackId="a" />
                <Bar dataKey="MODERATE" fill={CAT_COLOR.MODERATE} stackId="a" />
                <Bar dataKey="POOR" fill={CAT_COLOR.POOR} stackId="a" />
                <Bar dataKey="VERY POOR" fill={CAT_COLOR.VERY_POOR} stackId="a" />
                <Bar dataKey="SEVERE" fill={CAT_COLOR.SEVERE} stackId="a" />
                <Bar dataKey="aqi" fill="#fff" shape={<CustomBar />} barCategoryGap={5} barGap={5} onClick={(item) => selectCity(item.city)} />
                <ReferenceLine x={"AQ Index"} stroke={"#999999"} strokeWidth={2} />
                {getReferanceLine()}
            </BarChart>
        </ResponsiveContainer>

    );

}

export default CityAqiCompare;