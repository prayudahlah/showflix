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
  colorIndex?: number;
}

interface SankeyLink {
  source: number;
  target: number;
  value: number;
  primaryTitle?: string;
  genreName?: string;
  color?: string;
}

interface SankeyData {
  nodes: SankeyNode[];
  links: SankeyLink[];
}


const genreColors = [
  'rgba(99, 102, 241, 0.9)',    
  'rgba(139, 92, 246, 0.9)',      
  'rgba(168, 85, 247, 0.9)',    
  'rgba(196, 181, 253, 0.9)',   
  'rgba(147, 197, 253, 0.9)'    
];

const genreStrokeColors = [
  'rgba(99, 102, 241, 1)',
  'rgba(139, 92, 246, 1)', 
  'rgba(168, 85, 247, 1)',
  'rgba(196, 181, 253, 1)',
  'rgba(147, 197, 253, 1)'
];

const getLinkColor = (colorIndex: number) => {
  const baseColors = [
    'rgba(99, 102, 241, 0.7)',
    'rgba(139, 92, 246, 0.7)',
    'rgba(168, 85, 247, 0.7)',
    'rgba(196, 181, 253, 0.7)',
    'rgba(147, 197, 253, 0.7)'
  ];
  return baseColors[colorIndex % baseColors.length];
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    
    if (data.source !== undefined && data.target !== undefined) {
      return (
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-3 shadow-lg backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: data.color || '#6366f1' }}
            />
            <p className="text-white font-semibold text-sm">
              Show Connection
            </p>
          </div>
          <p className="text-white font-bold text-sm mb-2 truncate max-w-[200px]">
            {data.primaryTitle}
          </p>
          <div className="space-y-1">
            <p className="text-gray-300 text-xs">
              <span className="font-medium text-gray-400">Genre:</span> {data.genreName}
            </p>
            <p className="text-gray-300 text-xs">
              <span className="font-medium text-gray-400">Connections:</span> {data.value}
            </p>
          </div>
        </div>
      );
    } else {
      return (
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-3 shadow-lg backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-2">
            {data.depth === 0 ? (
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: genreColors[data.colorIndex || 0] }}
              />
            ) : (
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
            )}
            <p className="text-white font-bold text-sm truncate max-w-[200px]">
              {data.name}
            </p>
          </div>
          {data.value && (
            <p className="text-gray-300 text-xs">
              <span className="font-medium text-gray-400">Total Connections:</span> {data.value}
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
  
  const nodeColor = isLeftNode && payload.colorIndex !== undefined 
    ? genreColors[payload.colorIndex % genreColors.length]
    : "rgba(252, 228, 108, 0.9)";
    
  const strokeColor = isLeftNode && payload.colorIndex !== undefined
    ? genreStrokeColors[payload.colorIndex % genreStrokeColors.length]
    : "rgba(252, 228, 108, 1)";
  
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={nodeColor}
        fillOpacity={0.9}
        stroke={strokeColor}
        strokeWidth={1.5}
        rx={6}
        ry={6}
      />
      <text
        x={x + 10}
        y={y + height / 2}
        textAnchor={'start'}
        fill="rgba(255,255,255,0.95)"
        fontSize={11}
        fontWeight={600}
        dominantBaseline="middle"
        className="font-sans"
        style={{ 
          textShadow: '0 1px 2px rgba(0,0,0,0.5)',
          pointerEvents: 'none'
        }}
      >
        {payload.name.length > 8
          ? payload.name.substring(0, 8) + '...' 
          : payload.name}
      </text>
    </g>
  );
};

const CustomLink = (props: any) => {
  const { sourceX, sourceY, sourceControlX, targetX, targetY, targetControlX, linkWidth, index, payload, ...rest } = props;
  
  const linkColor = payload.color || 'rgba(255, 255, 255, 0.4)';
  
  return (
    <path
      d={`
        M${sourceX},${sourceY}
        C${sourceControlX},${sourceY} ${targetControlX},${targetY} ${targetX},${targetY}
      `}
      fill="none"
      stroke={linkColor}
      strokeWidth={Math.max(3, linkWidth)}
      strokeOpacity={0.8}
      cursor="pointer"
      className="transition-all duration-200 hover:stroke-opacity-100"
      {...rest}
    />
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

    // top 5 genres
    const topGenres: SankeyNode[] = Array.from(genreConnectionCount.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, value], index) => ({
        name,
        depth: 0,
        value,
        colorIndex: index 
      }));

    const filteredData = data.filter(item => 
      topGenres.some(genre => genre.name === item.genreName)
    );

    titleConnectionCount.clear();
    filteredData.forEach(item => {
      titleConnectionCount.set(item.primaryTitle, (titleConnectionCount.get(item.primaryTitle) || 0) + 1);
    });

    const sortedTitles: SankeyNode[] = Array.from(titleConnectionCount.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([name, value]) => ({
        name,
        depth: 1,
        value
      }));

    const nodes = [...topGenres, ...sortedTitles];

    const nodeIndexMap = new Map<string, number>();
    nodes.forEach((node, index) => {
      nodeIndexMap.set(node.name, index);
    });

    const connectionMap = new Map<string, {count: number, details: {primaryTitle: string, genreName: string}}>();
    
    filteredData.forEach(item => {
      const sourceIndex = nodeIndexMap.get(item.genreName);
      const targetIndex = nodeIndexMap.get(item.primaryTitle);
      
      if (sourceIndex !== undefined && targetIndex !== undefined) {
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
      }
    });

    const links: SankeyLink[] = Array.from(connectionMap.entries()).map(([key, {count, details}]) => {
      const [source, target] = key.split('-').map(Number);
      
      const sourceNode = nodes[source];
      const colorIndex = sourceNode.colorIndex ?? 0;
      
      return {
        source,
        target,
        value: count,
        primaryTitle: details.primaryTitle,
        genreName: details.genreName,
        color: getLinkColor(colorIndex)
      };
    });

    links.sort((a, b) => b.value - a.value);

    return { nodes, links };
  }, [data]);

  return (
    <div ref={containerRef} className='w-full h-full text-white mt-3 ml-2'>
      <p className='text-center text-chart-title mb-4'>Top 5 Genre to Show Distribution</p>
      <div className='w-full h-[calc(100%-50px)]'>
        <Sankey
          width={dimensions.width}
          height={dimensions.height}
          data={sankeyData}
          margin={{ top: 10, right: 20, left: 20, bottom: 10 }}
          node={<CustomNode/>}
          nodeWidth={75}
          nodePadding={3}
          sort={false}
          iterations={64}
          linkCurvature={0.6}
          link={<CustomLink />}
        >
          <Tooltip
            content={<CustomTooltip />}
            animationDuration={200}
            cursor={{ stroke: 'rgba(255, 255, 255, 0.1)', strokeWidth: 1 }}
          />
        </Sankey>
      </div>
    </div>
  );
}

export default MarkChart4;