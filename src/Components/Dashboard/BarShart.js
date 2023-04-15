import React from 'react'
import Paper from '@mui/material/Paper';
import {
    Chart,
    BarSeries,
    Title,
    ArgumentAxis,
    ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';

function BarShart() {
    const data = [
        { service: 'Service A', area: 1 },
        { service: 'Service B', area: 2 },
        { service: 'Service C', area: 3 },
    
      ];
    return (
        <div className='w-50 ps-2'>
            <Paper>
                <Chart
                    data={data}
                >
                    <ArgumentAxis />
                    <ValueAxis max={7} />

                    <BarSeries
                        valueField="area"
                        argumentField="service"
                    />
                    <Title text="Rendez-vous" />
                    <Animation />
                </Chart>
            </Paper>
        </div>
    )
}

export default BarShart