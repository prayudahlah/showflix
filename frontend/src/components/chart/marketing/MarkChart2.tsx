import { useState, useMemo } from 'react';
import { ResponsiveContainer, Treemap, Tooltip } from "recharts";
import type { MarketingData } from "../../../types/marketing";

type MarkChart2Props = {
    chart2: MarketingData['chart2']
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;

    return (
      <div className="bg-primary1-2 border-2 border-2-1 rounded-xl p-3 shadow-lg">
        <div className="flex items-center gap-2 mb-2">
          <p className="text-white font-semibold text-sm">
            {data.name}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-purple-300 text-xs">
            <span className="font-medium">Shows:</span> {data.size}
          </p>
          <p className="text-purple-300 text-xs">
            <span className="font-medium">Share:</span> {data.percentage?.toFixed(1)}%
          </p>
          <p className="text-purple-300 text-xs">
            <span className="font-medium">Rank:</span> #{data.rank}
          </p>
        </div>
      </div>
    );
  }
  return null;
};

const CustomContent = (props: any) => {
  const { x, y, width, height, name, fill, size, rank, isHovered, onHover, onLeave } = props;

  const showIcon = rank <= 5;
  const showName = width >= 60 && height >= 35;
  const showValue = width >= 60 && height >= 45;

  return (
    <g
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      style={{ cursor: 'pointer' }}
    >
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill,
          stroke: isHovered ? '#D08947' : 'rgba(255,255,255,0.3)',
          strokeWidth: isHovered ? 3 : 1.5,
          filter: isHovered ? 'brightness(1.2) drop-shadow(0 0 8px rgba(208, 137, 71, 0.6))' : 'none',
          transition: 'all 0.3s ease',
        }}
      />

      {rank <= 5 && width >= 40 && height >= 30 && (
        <g>
          <circle
            cx={x + 15}
            cy={y + 15}
            r={10}
            fill="rgba(0,0,0,0.5)"
          />
          <text
            x={x + 15}
            y={y + 15}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#D08947"
            fontSize={9}
            fontWeight="bold"
          >
            #{rank}
          </text>
        </g>
      )}

      {showName && (
        <text
          x={x + width / 2}
          y={y + (showIcon ? 32 : height / 3)}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#fff"
          fontSize={Math.min(12, width / 8)}
          fontWeight="600"
          style={{ textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}
        >
          {name}
        </text>
      )}

      {showValue && (
        <text
          x={x + width / 2}
          y={y + (showIcon && showName ? 48 : showName ? height / 3 + 15 : height / 3)}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="rgba(255,255,255,0.9)"
          fontSize={Math.min(11, width / 10)}
          fontWeight="500"
        >
          {size} shows
        </text>
      )}
    </g>
  );
};

function MarkChart2({ chart2 }: MarkChart2Props) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const data = chart2 ?? [];

  const enrichedData = useMemo(() => {
    const sizes = data.map(d => d.networkCount);
    const minSize = Math.min(...sizes);
    const maxSize = Math.max(...sizes);
    const total = sizes.reduce((sum, val) => sum + val, 0);

    return data.map((d, index) => {
      const normalized = maxSize === minSize ? 1 : (d.networkCount - minSize) / (maxSize - minSize);

      const darkR = 138, darkG = 0, darkB = 255;
      const lightR = 220, lightG = 180, lightB = 255;

      const r = Math.round(lightR + (darkR - lightR) * normalized);
      const g = Math.round(lightG + (darkG - lightG) * normalized);
      const b = Math.round(lightB + (darkB - lightB) * normalized);

      return {
        name: d.networkName,
        size: d.networkCount,
        fill: `rgb(${r}, ${g}, ${b})`,
        percentage: total > 0 ? (d.networkCount / total) * 100 : 0,
        rank: index + 1,
        total: data.length
      };
    });
  }, [data]);

  return (
    <div className='w-full h-full text-white mt-3 flex flex-col items-center'>
      <p className='text-center text-chart-title mb-1'>Network Distribution</p>
      <ResponsiveContainer height="85%" width="95%">
        <Treemap
          data={enrichedData}
          dataKey="size"
          nameKey="name"
          isAnimationActive={false}
          content={(props: any) => {
            const index = enrichedData.findIndex(d => d.name === props.name);
            return (
              <CustomContent
                {...props}
                isHovered={hoveredIndex === index}
                onHover={() => setHoveredIndex(index)}
                onLeave={() => setHoveredIndex(null)}
              />
            );
          }}
        >
          <Tooltip content={<CustomTooltip />} />
        </Treemap>
      </ResponsiveContainer>
    </div>
  )
}

export default MarkChart2;