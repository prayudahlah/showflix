import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';
import type { ExecutiveData } from '../../../types/executive';

interface ExecChart2Props {
  chart2: ExecutiveData['chart2'];
}

function ExecChart2({ chart2 }: ExecChart2Props) {
  const data = chart2;

  return (
    <div className='w-full h-full text-white mt-3'>
      <p className='text-center text-chart-title'>Show Ratings Distribution</p>
      <BarChart
        data={data}
        style={{ height: '95%', width: '90%' }}
        barCategoryGap={0}
      >
        <CartesianGrid stroke="rgba(255,255,255,0.2)" vertical={false} />

        <XAxis
          dataKey="ratingEnd"
          tick={{
            fill: 'rgba(200,200,200)',
            fontSize: 10,
            dx: 25
          }}
          textAnchor="end"
          height={40}
          tickLine={false}
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

        <Bar
          dataKey="frequency"
          fill="#8A00FF"
          stroke="#0B041D"
          isAnimationActive={true}
        />

      </BarChart>
    </div>
  )
}

export default ExecChart2;
