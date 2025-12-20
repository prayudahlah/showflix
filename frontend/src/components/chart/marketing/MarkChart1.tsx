import { useMemo } from 'react';
import { Bar, BarChart, CartesianGrid,  Tooltip, XAxis, YAxis } from 'recharts';
import type { MarketingData } from '../../../types/marketing';

interface MarkChart1Props {
  chart1: MarketingData['chart1'];
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;

    return (
      <div className="bg-primary1-2 border-2 border-2-1 rounded-xl p-3 shadow-lg">
        <p className="text-white font-semibold text-sm mb-2">
          Region: {data.regionName}
        </p>
        <p className="text-purple-300 text-xs">
          Total Titles: {data.totalTitles}
        </p>
      </div>
    );
  }
  return null;
};

function MarkChart1({ chart1 }: MarkChart1Props) {
  const data = chart1;

  const dataPrepared = useMemo(() => {
    return data.map((item) => ({
      ...item,
    }));
  }, [data]);

  return (
    <div className='w-full h-full text-white mt-3'>
      <p className='text-center text-chart-title mb-1'>Total Titles per Region</p>

      <BarChart
        data={dataPrepared}
        style={{ height: '85%', width: '90%' }}
        margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
      >
        <defs>
          <linearGradient id="colorFrequency" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8A00FF" stopOpacity={0.9} />
            <stop offset="100%" stopColor="#8A00FF" stopOpacity={0.3} />
          </linearGradient>
          <linearGradient id="colorFrequencyHover" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D08947" stopOpacity={0.95} />
            <stop offset="100%" stopColor="#D08947" stopOpacity={0.5} />
          </linearGradient>
        </defs>

        <CartesianGrid
          stroke="rgba(255,255,255,0.1)"
          strokeDasharray="3 3"
          vertical={false}
        />

        <XAxis
          dataKey="regionName"
          tick={{
            fill: 'rgba(200,200,200,0.9)',
            fontSize: 8,
            dx: 0
          }}
          textAnchor="end"
          angle={-35}
          height={60}
          tickLine={false}
          axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
          label={{
            value: 'Region',
            position: 'insideBottom',
            offset: 10,
            style: { fill: 'rgba(200,200,200,0.7)', fontSize: 11 }
          }}
        />

        <YAxis
          tick={{ fill: 'rgba(200,200,200,0.9)', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          label={{
            value: 'Total Titles',
            angle: -90,
            position: 'insideBottomCenter',
            offset: 20,
            style: { fill: 'rgba(200,200,200,0.7)', fontSize: 11 }
          }}
        />

        <Tooltip
          content={<CustomTooltip />}
          cursor={{ fill: 'rgba(138, 0, 255, 0.1)' }}
          animationDuration={200}
        />

        <Bar
          dataKey="totalTitles"
          name="Total Titles"
          fill="url(#colorFrequency)"
          radius={[6, 6, 0, 0]}
          style={{
            filter: 'drop-shadow(0 0 8px rgba(138, 0, 255, 0.4))'
          }}
          animationDuration={1500}
          animationEasing="ease-in-out"
        />
      </BarChart>
    </div>
  );
}

export default MarkChart1;