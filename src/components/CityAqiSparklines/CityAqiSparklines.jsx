
import React from 'react';
import { Sparklines, SparklinesLine, SparklinesSpots } from 'react-sparklines';

const CityAqiSparklines = (prop) => {
    const { data, color } = prop
    return (
        <Sparklines data={data} width={800}>
            <SparklinesLine color={color} style={{ fillOpacity: '0.5' }} />
            <SparklinesSpots style={{ fill: color }} />
        </Sparklines>
    );
};

export default CityAqiSparklines;

