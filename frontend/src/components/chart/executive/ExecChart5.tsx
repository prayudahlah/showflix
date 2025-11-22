import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';
import type { ExecutiveData } from '../../../types/executive';

interface ExecChart5Props {
  chart5: ExecutiveData['chart5'];
}

function ExecChart5({ chart5 }: ExecChart5Props) {
  const data = chart5;

  return (
    <div className='w-full h-full text-white mt-3'>
      <p className='text-center text-chart-title'>Lorem Ipsum</p>
      <BarChart
        data={data}
        style={{ height: '95%', width: '90%' }}
        layout='vertical'
      >
        <CartesianGrid stroke="rgba(255,255,255,0.2)" horizontal={false} />

        <XAxis
          type='number'
          tick={{ fill: 'rgba(200,200,200)', fontSize: 8 }}
          textAnchor="end"
          height={40}
        />

        <YAxis
          type='category'
          dataKey="primaryTitle"
          tick={{ fill: 'rgba(200,200,200)', fontSize: 8 }}
          textAnchor='end'
          axisLine={false}
          tickLine={false}
          interval={0}
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
          dataKey="popularity"
          fill="#8A00FF"
          isAnimationActive={true}
        />

      </BarChart>
    </div>
  )
}

export default ExecChart5;

