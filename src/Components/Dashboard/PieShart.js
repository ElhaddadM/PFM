import React from 'react'
import Paper from '@mui/material/Paper';
import {
  Chart,
  PieSeries,
  Title,
  Legend
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';
function PieShart() {
  const data = [
    { service: 'Service A', area: 50 },
    { service: 'Service B', area: 7 },
    { service: 'Service C', area: 7 },

  ];
  return (
    <div className='w-50 ps-2'>

      <Paper>
        <Chart
          data={data}
        >
          <PieSeries
            valueField="area"
            argumentField="service"
          />
          <Title
            text="Statistic"
          />
          <Animation />
          <Legend />
        </Chart>
      </Paper>
    </div>

  )
}

export default PieShart