import { ResponsiveContainer, Treemap } from "recharts";
import type { ExecutiveData } from "../../../types/executive";

interface ExecChart4Props {
  chart4: ExecutiveData['chart4'];
}

function ExecChart4({ chart4 }: ExecChart4Props) {
  const data = chart4 ?? [];

  const sizes = data.map(d => d.genreCount);
  const minSize = Math.min(...sizes);
  const maxSize = Math.max(...sizes);

  const getColor = (size: number) => {
    if (maxSize === minSize) return '#89189C';

    const normalized = (size - minSize) / (maxSize - minSize);

    const darkR = 124, darkG = 77, darkB = 121;
    const lightR = 204, lightG = 153, lightB = 186;

    const r = Math.round(lightR + (darkR - lightR) * normalized);
    const g = Math.round(lightG + (darkG - lightG) * normalized);
    const b = Math.round(lightB + (darkB - lightB) * normalized);

    return `rgb(${r}, ${g}, ${b})`;
  };

  const treeData = data.map(d => ({
    name: d.genreName,
    size: d.genreCount,
    fill: getColor(d.genreCount)
  }))

  return (
    <div className='w-full h-full text-white mt-3 flex flex-col items-center'>
      <p className='text-center text-chart-title mb-3'>Genre Distribution</p>
      <ResponsiveContainer
        height="80%"
        width="95%"
      >
        <Treemap
          data={treeData}
          dataKey="size"
          stroke="#fff"
          fill="fill"
          nameKey="name"
          isAnimationActive={false}
          content={(props: any) => {
            const { x, y, width, height, name, fill } = props;
            const showText = width >= 40 && height >= 25;

            return (
              <g>
                <rect
                  x={x}
                  y={y}
                  width={width}
                  height={height}
                  style={{ fill, stroke: '#f0f0f0', strokeWidth: 1 }}
                />
                {showText && (
                  <text
                    x={x + 4}
                    y={y + 12}
                    textAnchor="start"
                    fill="#f0f0f0"
                    fontSize={10}
                    fontFamily="poppins"
                    fontWeight="200"
                  >
                    {name}
                  </text>
                )}
              </g>
            );
          }}
        />
      </ResponsiveContainer>
    </div>
  )
}

export default ExecChart4;
