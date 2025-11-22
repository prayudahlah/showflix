import { useMemo } from 'react';
import { Line, LineChart, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts';
import type { ExecutiveData } from '../../../types/executive';

interface ExecChart1Props {
  chart1: ExecutiveData['chart1'];
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const value = data.titleCount;
    const year = data.yearAired;

    return (
      <div className="bg-primary1-2 border-2 border-primary2-1 rounded-xl p-3 shadow-lg">
        <p className="text-white font-semibold text-sm mb-2">
          Year: {year}
        </p>
        <div className="space-y-1">
          <p className="text-purple-300 text-xs">
            <span className="font-medium">Shows Aired:</span> {value}
          </p>
          {payload[0].payload.trend && (
            <p className="text-purple-300 text-xs">
              <span className="font-medium">Trend:</span> {payload[0].payload.trend}
            </p>
          )}
        </div>
      </div>
    );
  }
  return null;
};

const CustomActiveDot = (props: any) => {
  const { cx, cy } = props;

  return (
    <g>
      <circle
        cx={cx}
        cy={cy}
        r={12}
        fill="#D08947"
        opacity={0.2}
        className="animate-pulse"
      />
      <circle
        cx={cx}
        cy={cy}
        r={8}
        fill="#D08947"
        opacity={0.4}
      />
      <circle
        cx={cx}
        cy={cy}
        r={5}
        fill="#D08947"
      />
    </g>
  );
};

function ExecChart1({ chart1 }: ExecChart1Props) {
  const data = chart1;

  const dataWithTrend = useMemo(() => {
    return data.map((item, index) => {
      if (index === 0) return { ...item, trend: 'Start' };

      const prev = data[index - 1].titleCount;
      const current = item.titleCount;
      const diff = current - prev;
      const percentChange = prev !== 0 ? ((diff / prev) * 100).toFixed(1) : '0';

      let trend = '';
      if (diff > 0) trend = `↑ +${percentChange}%`;
      else if (diff < 0) trend = `↓ ${percentChange}%`;
      else trend = '→ 0%';

      return { ...item, trend };
    });
  }, [data]);

  return (
    <div className='w-full h-full text-white mt-3'>
      <p className='text-center text-chart-title mb-1'>Show Aired Each Year</p>
      <LineChart
        data={dataWithTrend}
        style={{ height: '85%', width: '90%' }}
        margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
      >
        <defs>
          <linearGradient id="colorTitleCount" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8A00FF" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8A00FF" stopOpacity={0.1} />
          </linearGradient>
          <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#8A00FF" stopOpacity={0.8} />
            <stop offset="85%" stopColor="#D08947" stopOpacity={0.6} />
          </linearGradient>
        </defs>

        <CartesianGrid
          stroke="rgba(255,255,255,0.1)"
          strokeDasharray="3 3"
          vertical={false}
        />

        <XAxis
          dataKey="yearAired"
          tick={{ fill: 'rgba(200,200,200,0.9)', fontSize: 10 }}
          angle={-90}
          textAnchor="end"
          height={60}
          tickLine={false}
          axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
          label={{
            value: 'Year',
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
            value: 'Number of Shows',
            angle: -90,
            position: 'insideBottomLeft',
            offset: 30,
            style: { fill: 'rgba(200,200,200,0.7)', fontSize: 11 }
          }}
        />

        <Tooltip
          content={<CustomTooltip />}
          cursor={{
            stroke: 'rgba(138, 0, 255, 0.5)',
            strokeWidth: 2,
            strokeDasharray: '5 5'
          }}
          animationDuration={200}
        />

        <Line
          type="monotone"
          dataKey="titleCount"
          name="Shows Aired"
          stroke="url(#lineGradient)"
          strokeWidth={3}
          dot={false}
          activeDot={<CustomActiveDot />}
          isAnimationActive={true}
          animationDuration={1500}
          animationEasing="ease-in-out"
          style={{
            filter: 'drop-shadow(0 0 8px rgba(138, 0, 255, 0.4))'
          }}
        />
      </LineChart>
    </div>
  );
}

export default ExecChart1;
