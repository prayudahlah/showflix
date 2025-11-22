import { memo, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Cell, Tooltip, XAxis, YAxis, LabelList } from 'recharts';
import type { ExecutiveData } from '../../../types/executive';

interface ExecChart2Props {
  chart2: ExecutiveData['chart2'];
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const percentage = data.percentage || 0;

    return (
      <div className="bg-primary1-2 border-2 border-2-1 rounded-xl p-3 shadow-lg">
        <p className="text-white font-semibold text-sm mb-2">
          Rating Range: {data.ratingStart.toFixed(1)} - {data.ratingEnd.toFixed(1)}
        </p>
        <div className="space-y-1">
          <p className="text-purple-300 text-xs">
            <span className="font-medium">Shows:</span> {data.frequency}
          </p>
          <p className="text-purple-300 text-xs">
            <span className="font-medium">Percentage:</span> {percentage.toFixed(1)}%
          </p>
        </div>
      </div>
    );
  }
  return null;
};

const CustomLabel = (props: any) => {
  const { x, y, width, value } = props;
  if (value <= 10) return null;

  return (
    <text
      x={x + width / 2}
      y={y - 5}
      fill="rgba(255,255,255,0.8)"
      textAnchor="middle"
      fontSize={10}
      fontWeight="500"
    >
      {value}
    </text>
  );
};

const ExecChart2 = memo(function ExecChart2({ chart2 }: ExecChart2Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const data = chart2;

  const total = data.reduce((sum, item) => sum + item.frequency, 0);
  const dataWithPercentage = data.map(item => ({
    ...item,
    percentage: total > 0 ? (item.frequency / total) * 100 : 0
  }));

  const maxFrequency = Math.max(...data.map(d => d.frequency));

  const getBarColor = (frequency: number, index: number) => {
    const isActive = activeIndex === index;
    const intensity = frequency / maxFrequency;

    if (isActive) {
      return `rgba(208, 137, 71, ${0.7 + intensity * 0.3})`;
    }

    return `rgba(138, 0, 255, ${0.5 + intensity * 0.5})`;
  };

  return (
    <div className='w-full h-full text-white mt-3'>
      <p className='text-center text-chart-title mb-1'>Show Ratings Distribution</p>
      <BarChart
        data={dataWithPercentage}
        style={{ height: '90%', width: '95%' }}
        margin={{ top: 10, right: 10 }}
        barCategoryGap={0}
        onMouseMove={(state) => {
          if (state.isTooltipActive) {
            const index = state.activeTooltipIndex;
            setActiveIndex(typeof index === 'string' ? parseInt(index, 10) : (index ?? null));
          } else {
            setActiveIndex(null);
          }
        }}
        onMouseLeave={() => setActiveIndex(null)}
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
          dataKey="ratingEnd"
          tick={{
            fill: 'rgba(200,200,200,0.9)',
            fontSize: 10,
            dx: 25
          }}
          textAnchor="end"
          height={40}
          tickLine={false}
          axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
          label={{
            value: 'Rating',
            position: 'insideBottom',
            offset: 10,
            style: { fill: 'rgba(200,200,200,0.7)', fontSize: 11 }
          }}
        />

        <YAxis
          tick={{ fill: 'rgba(200,200,200,0.9)', fontSize: 11 }}
          textAnchor='end'
          axisLine={false}
          tickLine={false}
          label={{
            value: 'Frequency',
            angle: -90,
            position: 'insideLeft',
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
          dataKey="frequency"
          name="Number of Shows"
          stroke="rgba(138, 0, 255, 0.3)"
          strokeWidth={1}
          isAnimationActive={true}
          animationDuration={800}
          animationEasing="ease-out"
          radius={[4, 4, 0, 0]}
        >
          {dataWithPercentage.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={getBarColor(entry.frequency, index)}
              style={{
                filter: activeIndex === index ? 'brightness(1.2)' : 'none',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
            />
          ))}

          <LabelList
            content={<CustomLabel />}
          />
        </Bar>
      </BarChart>
    </div>
  )
});

export default ExecChart2;
