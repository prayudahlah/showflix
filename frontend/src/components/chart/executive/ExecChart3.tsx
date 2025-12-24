import { useState, useMemo } from 'react';
import { Bar, BarChart, CartesianGrid, Cell, Tooltip, XAxis, YAxis } from 'recharts';
import type { ExecutiveData } from '../../../types/executive';

interface ExecChart3Props {
  chart3: ExecutiveData['chart3'];
  selectedCompanyId?: number;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const rank = data.rank;
    const isSelected = data.isSelected;

    return (
      <div className="bg-primary1-2 border-2 border-2-1 rounded-xl p-3 shadow-lg">
        <div className="flex items-center gap-2 mb-2">
          <p className="text-white font-semibold text-sm">
            #{rank} {data.companyName}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-purple-300 text-xs">
            <span className="font-medium">Shows Produced:</span> {data.titleCount}
          </p>
          {isSelected && (
            <p className="text-orange-400 text-xs font-semibold mt-2">
              Currently Selected
            </p>
          )}
        </div>
      </div>
    );
  }
  return null;
};

const CustomYAxisTick = (props: any) => {
  const { x, y, payload } = props;
  const maxLength = 12;
  const text = payload.value.length > maxLength
    ? payload.value.substring(0, maxLength) + '...'
    : payload.value;

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={-5}
        y={0}
        textAnchor="end"
        fill="rgba(200,200,200,0.9)"
        fontSize={12}
        dominantBaseline="middle"
      >
        {text}
      </text>
    </g>
  );
};

function ExecChart3({ chart3, selectedCompanyId }: ExecChart3Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const data = chart3;

  const enrichedData = useMemo(() => {
    const total = data.reduce((sum, item) => sum + item.titleCount, 0);

    return data.map((item, index) => ({
      ...item,
      rank: index + 1,
      percentage: total > 0 ? (item.titleCount / total) * 100 : 0,
      isSelected: item.companyId === selectedCompanyId
    }));
  }, [data, selectedCompanyId]);

  const maxValue = Math.max(...data.map(d => d.titleCount));

  const getBarColor = (entry: any, index: number) => {
    const isActive = activeIndex === index;
    const isSelected = entry.companyId === selectedCompanyId;
    const intensity = entry.titleCount / maxValue;

    if (isSelected) {
      return isActive
        ? `rgba(208, 137, 71, ${0.8 + intensity * 0.2})`
        : `rgba(208, 137, 71, ${0.6 + intensity * 0.4})`;
    }

    return isActive
      ? `rgba(138, 0, 255, ${0.7 + intensity * 0.3})`
      : `rgba(138, 0, 255, ${0.4 + intensity * 0.6})`;
  };

  return (
    <div className='w-full h-full text-white mt-3'>
      <p className='text-center text-chart-title mb-1'>Top 10 Companies by Show Produced</p>
      <BarChart
        data={enrichedData}
        style={{ height: '90%', width: '100%' }}
        layout='vertical'
        barCategoryGap='20%'
        margin={{ left: -100, right: 20, top: 5, bottom: 5 }}
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
          <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#8A00FF" stopOpacity={0.6} />
            <stop offset="100%" stopColor="#8A00FF" stopOpacity={0.9} />
          </linearGradient>
          <linearGradient id="barGradientSelected" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#D08947" stopOpacity={0.7} />
            <stop offset="100%" stopColor="#D08947" stopOpacity={1} />
          </linearGradient>
        </defs>

        <CartesianGrid
          stroke="rgba(255,255,255,0.1)"
          strokeDasharray="3 3"
          horizontal={false}
        />

        <XAxis
          type='number'
          tick={{ fill: 'rgba(200,200,200,0.9)', fontSize: 9 }}
          textAnchor="end"
          height={40}
          tickLine={false}
          axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
          label={{
            value: 'Number of Shows',
            position: 'insideBottom',
            offset: 10,
            style: { fill: 'rgba(200,200,200,0.7)', fontSize: 10 }
          }}
        />

        <YAxis
          type='category'
          dataKey="companyName"
          axisLine={false}
          tickLine={false}
          interval={0}
          width={200}
          tick={<CustomYAxisTick />}
        />

        <Tooltip
          content={<CustomTooltip />}
          cursor={{ fill: 'rgba(138, 0, 255, 0.1)' }}
          animationDuration={200}
        />

        <Bar
          dataKey="titleCount"
          name="Shows Produced"
          isAnimationActive={true}
          animationDuration={1000}
          animationEasing="ease-out"
          barSize={18}
          radius={[0, 4, 4, 0]}
        >
          {enrichedData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={getBarColor(entry, index)}
              style={{
                filter: activeIndex === index ? 'brightness(1.2)' : 'none',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                stroke: entry.isSelected ? '#D08947' : 'rgba(138, 0, 255, 0.3)',
                strokeWidth: entry.isSelected ? 2 : 1
              }}
            />
          ))}
        </Bar>
      </BarChart>
    </div>
  );
}

export default ExecChart3;
