import { Bar, BarChart, CartesianGrid, Cell, Tooltip, XAxis, YAxis } from 'recharts';
import type { ExecutiveData } from '../../../types/executive';

interface ExecChart3Props {
  chart3: ExecutiveData['chart3'];
  selectedCompanyId?: number;
}

function ExecChart3({ chart3, selectedCompanyId }: ExecChart3Props) {
  const data = chart3;

  return (
    <div className='w-full h-full text-white mt-3'>
      <p className='text-center text-chart-title'>Top 10 Companies by Show Produced</p>
      <BarChart
        data={data}
        style={{ height: '95%', width: '100%' }}
        layout='vertical'
        barCategoryGap='20%'
        margin={{ left: -50, right: 15, top: 5, bottom: 5 }}
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
          dataKey="companyName"
          tick={{ fill: 'rgba(200,200,200)', fontSize: 10 }}
          axisLine={false}
          tickLine={false}
          interval={0}
          width={170}
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
          dataKey="titleCount"
          fill="#8A00FF"
          isAnimationActive={true}
          barSize={20}
        >
          {data?.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.companyId === selectedCompanyId ? '#D08947' : '#8A00FF'}
            />
          ))}
        </Bar>

      </BarChart>
    </div>
  )
}

export default ExecChart3;

