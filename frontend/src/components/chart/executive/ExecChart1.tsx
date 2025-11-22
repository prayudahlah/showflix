import { Line, LineChart, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts';
import type { ExecutiveData } from '../../../types/executive';

interface ExecChart1Props {
  chart1: ExecutiveData['chart1'];
}

function ExecChart1({ chart1 }: ExecChart1Props) {
  const data = chart1;

  return (
    <div className='w-full h-full text-white mt-3'>
      <p className='text-center text-chart-title'>Show Aired Each Year</p>
      <LineChart
        data={data}
        style={{ height: '85%', width: '90%' }}
        barCategoryGap='0%'
      >
        <CartesianGrid stroke="rgba(255,255,255,0.2)" vertical={false} />

        <XAxis
          dataKey="yearAired"
          tick={{ fill: 'rgba(200,200,200)', fontSize: 10 }}
          angle={-90}
          textAnchor="end"
        />

        <YAxis
          tick={{ fill: 'rgba(200,200,200)', fontSize: 12 }}
          textAnchor='end'
          axisLine={false}
          tickLine={false}
        />

        <Tooltip
          contentStyle={{
            background: '#130830',
            border: '2px solid #8A00FF',
            color: 'rgba(255,255,255)',
            borderRadius: '10px',
          }}
        />

        <Line
          type="linear"
          dataKey="titleCount"
          stroke="#8A00FF"
          strokeWidth={3}
          dot={false}
          activeDot={true}
        />
      </LineChart>
    </div>
  );
}

export default ExecChart1;
