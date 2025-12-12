import { useMemo, useRef, useState, useEffect } from 'react';
import { Sankey, Tooltip } from 'recharts';
import type { MarketingData } from '../../../types/marketing';

interface MarkChart4Props {
  chart4: MarketingData['chart4'];
}

interface SankeyNode {
  name: string;
  depth?: number;
  value?: number;
}

interface SankeyLink {
  source: number;
  target: number;
  value: number;
  primaryTitle?: string;
  genreName?: string;
}

interface SankeyData {
  nodes: SankeyNode[];
  links: SankeyLink[];
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    
    if (data.source !== undefined && data.target !== undefined) {
      return (
        <div className="bg-primary1-2 border-2 border-2-1 rounded-xl p-3 shadow-lg">
          <div className="flex items-center gap-2 mb-2">
            <p className="text-white font-semibold text-sm">
              Show Connection
            </p>
          </div>
          <p className="text-white font-bold text-xs mb-2 truncate">
            {data.primaryTitle}
          </p>
          <div className="space-y-1">
            <p className="text-purple-300 text-xs">
              <span className="font-medium">Genre:</span> {data.genreName}
            </p>
            <p className="text-purple-300 text-xs">
              <span className="font-medium">Connections:</span> {data.value}
            </p>
          </div>
        </div>
      );
    } else {
      return (
        <div className="bg-primary1-2 border-2 border-2-1 rounded-xl p-3 shadow-lg">
          <p className="text-white font-bold text-xs mb-2 truncate">
            {data.name}
          </p>
          {data.value && (
            <p className="text-purple-300 text-xs">
              <span className="font-medium">Total Connections:</span> {data.value}
            </p>
          )}
        </div>
      );
    }
  }
  return null;
};

const CustomNode = (props: any) => {
  const { x, y, width, height, payload } = props;
  const isLeftNode = payload.depth === 0;
  
  if (width <= 0 || height <= 0) return null;
  
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={payload.depth === 0 ? "rgba(255, 215, 0, 0.9)" : "rgba(138, 0, 255, 0.9)"}
        fillOpacity={0.9}
        stroke={payload.depth === 0 ? "rgba(255, 215, 0, 1)" : "rgba(255, 255, 255, 1)"}
        strokeWidth={1.5}
        rx={4}
        ry={4}
      />
      <text
        x={x + 15}
        y={y + height / 2}
        textAnchor={isLeftNode ? 'start' : 'start'}
        fill="rgba(255,255,255,1)"
        fontSize={10}
        fontWeight={600}
        dominantBaseline="middle"
        className="font-sans"
      >
        {payload.name.length > 7
          ? payload.name.substring(0, 7) + '...' 
          : payload.name}
      </text>
    </g>
  );
};

function MarkChart4({ chart4 }: MarkChart4Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 100 });
  const data = chart4;

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({
          width: width,
          height: (height - 50)
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const sankeyData: SankeyData = useMemo(() => {
    const genreConnectionCount = new Map<string, number>();
    const titleConnectionCount = new Map<string, number>();
    
    data.forEach(item => {
      genreConnectionCount.set(item.genreName, (genreConnectionCount.get(item.genreName) || 0) + 1);
      titleConnectionCount.set(item.primaryTitle, (titleConnectionCount.get(item.primaryTitle) || 0) + 1);
    });

    const sortedGenres = Array.from(genreConnectionCount.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([name, value]) => ({
        name,
        depth: 0,
        value
      }));

    const sortedTitles = Array.from(titleConnectionCount.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([name, value]) => ({
        name,
        depth: 1,
        value
      }));

    const nodes = [...sortedGenres, ...sortedTitles];

    const nodeIndexMap = new Map<string, number>();
    nodes.forEach((node, index) => {
      nodeIndexMap.set(node.name, index);
    });

    const connectionMap = new Map<string, {count: number, details: {primaryTitle: string, genreName: string}}>();
    
    data.forEach(item => {
      const sourceIndex = nodeIndexMap.get(item.genreName)!;
      const targetIndex = nodeIndexMap.get(item.primaryTitle)!;
      const key = `${sourceIndex}-${targetIndex}`;
      
      if (connectionMap.has(key)) {
        const existing = connectionMap.get(key)!;
        connectionMap.set(key, {
          count: existing.count + 1,
          details: existing.details
        });
      } else {
        connectionMap.set(key, {
          count: 1,
          details: { 
            primaryTitle: item.primaryTitle, 
            genreName: item.genreName 
          }
        });
      }
    });

    const links: SankeyLink[] = Array.from(connectionMap.entries()).map(([key, {count, details}]) => {
      const [source, target] = key.split('-').map(Number);
      
      return {
        source,
        target,
        value: count,
        primaryTitle: details.primaryTitle,
        genreName: details.genreName
      };
    });

    links.sort((a, b) => b.value - a.value);

    return { nodes, links };
  }, [data]);

  return (
    <div ref={containerRef} className='w-full h-full text-white mt-3 ml-2'>
      <p className='text-center text-chart-title mb-3'>Genre to Show Distribution</p>
      <div className='w-full h-[calc(100%-40px)]'>
        <Sankey
          width={dimensions.width}
          height={dimensions.height}
          data={sankeyData}
          margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
          node={<CustomNode/>}
          nodeWidth={70}
          nodePadding={2}
          sort={false}
          iterations={64}
          linkCurvature={0.5}
          link={{
            stroke: 'rgba(255, 255, 255, 1)',
            strokeWidth: 10,
            strokeOpacity: 0.3,
            fill: 'none',
            cursor: 'pointer'
          }}
        >
          <Tooltip
            content={<CustomTooltip />}
            animationDuration={200}
            cursor={{ stroke: 'rgba(255, 255, 255, 0.3)', strokeWidth: 2 }}
          />
        </Sankey>
      </div>
    </div>
  );
}

export default MarkChart4;