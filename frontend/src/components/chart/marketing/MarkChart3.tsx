import { useMemo } from 'react';
import { Scatter, ScatterChart, Tooltip, XAxis, YAxis, CartesianGrid, ZAxis } from 'recharts';
import type { MarketingData } from '../../../types/marketing';

interface MarkChart3Props {
  chart3: MarketingData['chart3'];
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-primary1-2 border-2 border-primary2-1 rounded-xl p-3 shadow-lg">
        <p className="text-white font-semibold text-sm mb-2">
          {data.primaryTitle}
        </p>
        <div className="space-y-1">
          <p className="text-purple-300 text-xs">
            <span className="font-medium">Vote Count:</span> {data.voteCount}
          </p>
          <p className="text-purple-300 text-xs">
            <span className="font-medium">Average Rating:</span> {data.averageRating}
          </p>
          <p className="text-purple-300 text-xs">
            <span className="font-medium">Popularity:</span> {data.popularity}
          </p>
        </div>
      </div>
    );
  }
  return null;
};

function MarkChart3({ chart3 }: MarkChart3Props) {
  const data = chart3;

  const dataPrepared = useMemo(() => {
    return data.map((item) => ({
      ...item,
      voteCount: Number(item.voteCount ?? 0),
      averageRating: Number(item.averageRating ?? 0),
      popularity: Number(item.popularity ?? 0),
    }));
  }, [data]);

  return (
    <div className="w-full h-full text-white mt-3">
      <p className="text-center text-chart-title mb-1">Vote Count vs. Rating vs. Popularity</p>

      <ScatterChart
        data={dataPrepared}
        style={{ height: '85%', width: '90%' }}
        margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
      >
        <defs>
          <linearGradient id="bubbleGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8A00FF" stopOpacity={1} />
            <stop offset="95%" stopColor="#8A00FF" stopOpacity={0.01} />
          </linearGradient>
        </defs>

        <CartesianGrid stroke="rgba(255,255,255,0.1)" strokeDasharray="3 3" />

        <XAxis
          dataKey="voteCount"
          type="number"
          allowDuplicatedCategory={false}
          tick={{ fill: 'rgba(200,200,200,0.9)', fontSize: 10 }}
          height={60}
          tickLine={false}
          axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
          label={{
            value: 'Vote Count',
            position: 'insideBottom',
            offset: 10,
            style: { fill: 'rgba(200,200,200,0.7)', fontSize: 11 },
          }}
        />

        <YAxis
          dataKey="averageRating"
          tick={{ fill: 'rgba(200,200,200,0.9)', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          label={{
            value: 'Average Rating',
            angle: -90,
            position: 'insideBottomCenter',
            offset: 30,
            style: { fill: 'rgba(200,200,200,0.7)', fontSize: 11 },
          }}
        />

        <ZAxis 
          dataKey="popularity" 
          range={[0, 150]} 
        />

        <Tooltip
          content={<CustomTooltip />}
          cursor={{
            stroke: 'rgba(138, 0, 255, 0.5)',
            strokeWidth: 2,
            strokeDasharray: '5 5',
          }}
          animationDuration={200}
        />

        <Scatter
          data={dataPrepared}
          dataKey="voteCount"
          name="Titles"
          fill="url(#bubbleGradient)"
          shape="circle"
          fillOpacity={0.35}
          stroke="rgba(138, 0, 255, 0.5)"
          strokeWidth={2}
          isAnimationActive={true}
          animationDuration={1500}
          animationEasing="ease-in-out"
          style={{
            filter: 'drop-shadow(0 0 1px rgba(138, 0, 255, 0.4))',
          }}
        />
      </ScatterChart>
    </div>
  );
}

export default MarkChart3;
