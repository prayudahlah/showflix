interface ChartSkeletonProps {
  rowSpan?: number;
}

const rowSpanClasses: Record<number, string> = {
  1: "row-span-1",
  2: "row-span-2",
  3: "row-span-3",
  4: "row-span-4",
  5: "row-span-5",
  6: "row-span-6",
};
export const ChartSkeleton = ({ rowSpan = 1 }: ChartSkeletonProps) => (
  <div className={`chart-box animate-pulse ${rowSpanClasses[rowSpan]}`} />
);

export const MetricSkeleton = () => (
  <div className="metric-box-back animate-pulse">
    <div className="flex flex-col justify-between metric-box-front text-white px-2 pb-1 animate-pulse" />
  </div>
);
