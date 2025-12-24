import { useState, useMemo } from 'react';
import { Bar, BarChart, CartesianGrid, Cell, Tooltip, XAxis, YAxis, } from 'recharts';
import type { MarketingData } from '../../../types/marketing';

interface MarkChart5Props {
  chart5: MarketingData['chart5'];
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;

    return (
      <div className="bg-primary1-2 border-2 border-2-1 rounded-xl p-3 shadow-lg">
        <div className="flex items-center gap-2 mb-2">
          <p className="text-white font-semibold text-sm">
            #{data.rank}
          </p>
        </div>
        <p className="text-white font-bold text-xs mb-2 truncate">
          {data.primaryTitle}
        </p>
        <div className="space-y-1">
          <p className="text-purple-300 text-xs">
            <span className="font-medium">Popularity:</span> {data.popularity.toFixed(2)}
          </p>
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

function MarkChart5({ chart5 }: MarkChart5Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const data = chart5;

  const enrichedData = useMemo(() => {
    return data.map((item, index) => {

      return {
        ...item,
        rank: index + 1,
      };
    });
  }, [data]);

  const maxValue = Math.max(...data.map(d => d.popularity));

  const getBarColor = (entry: any, index: number) => {
    const isActive = activeIndex === index;
    const intensity = entry.popularity / maxValue;
    const rank = entry.rank;

    if (rank === 1) {
      return isActive
        ? `rgba(255, 215, 0, ${0.8 + intensity * 0.2})`
        : `rgba(255, 215, 0, ${0.6 + intensity * 0.4})`;
    }

    if (rank === 2) {
      return isActive
        ? `rgba(192, 192, 192, ${0.8 + intensity * 0.2})`
        : `rgba(192, 192, 192, ${0.6 + intensity * 0.4})`;
    }

    if (rank === 3) {
      return isActive
        ? `rgba(205, 127, 50, ${0.8 + intensity * 0.2})`
        : `rgba(205, 127, 50, ${0.6 + intensity * 0.4})`;
    }

    return isActive
      ? `rgba(138, 0, 255, ${0.7 + intensity * 0.3})`
      : `rgba(138, 0, 255, ${0.4 + intensity * 0.6})`;
  };

  return (
    <div className='w-full h-full text-white mt-3 ml-2'>
      <p className='text-center text-chart-title mb-1'>Top 10 Performing Shows</p>
      <BarChart
        data={enrichedData}
        style={{ height: '95%', width: '100%' }}
        layout='vertical'
        margin={{ left: 5, right: 15, top: 5, bottom: 5 }}
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
          <linearGradient id="goldGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FFD700" stopOpacity={0.6} />
            <stop offset="100%" stopColor="#FFD700" stopOpacity={1} />
          </linearGradient>
          <linearGradient id="silverGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#C0C0C0" stopOpacity={0.6} />
            <stop offset="100%" stopColor="#C0C0C0" stopOpacity={1} />
          </linearGradient>
          <linearGradient id="bronzeGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#CD7F32" stopOpacity={0.6} />
            <stop offset="100%" stopColor="#CD7F32" stopOpacity={1} />
          </linearGradient>
        </defs>

        <CartesianGrid
          stroke="rgba(255,255,255,0.1)"
          strokeDasharray="3 3"
          horizontal={false}
        />

        <XAxis
          type='number'
          tick={{ fill: 'rgba(200,200,200,0.9)', fontSize: 8 }}
          textAnchor="end"
          height={40}
          tickLine={false}
          axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
          label={{
            value: 'Popularity Score',
            position: 'insideBottom',
            offset: 10,
            style: { fill: 'rgba(200,200,200,0.7)', fontSize: 9 }
          }}
        />

        <YAxis
          type='category'
          dataKey="primaryTitle"
          tick={<CustomYAxisTick />}
          axisLine={false}
          tickLine={false}
          interval={0}
          width={90}
        />

        <Tooltip
          content={<CustomTooltip />}
          cursor={{ fill: 'rgba(138, 0, 255, 0.1)' }}
          animationDuration={200}
        />

        <Bar
          dataKey="popularity"
          name="Popularity Score"
          isAnimationActive={true}
          animationDuration={1000}
          animationEasing="ease-out"
          barSize={30}
          radius={[0, 4, 4, 0]}
        >
          {enrichedData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={getBarColor(entry, index)}
              style={{
                filter: activeIndex === index
                  ? 'brightness(1.3) drop-shadow(0 0 8px rgba(255, 215, 0, 0.6))'
                  : entry.rank <= 3
                    ? 'drop-shadow(0 0 4px rgba(255, 215, 0, 0.3))'
                    : 'none',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                stroke: entry.rank <= 3 ? '#FFD700' : 'rgba(138, 0, 255, 0.3)',
                strokeWidth: entry.rank === 1 ? 2 : 1
              }}
            />
          ))}
        </Bar>
      </BarChart>
    </div>
  )
}

export default MarkChart5;
