import { useCallback, useMemo, useState } from "react";
import { useMarketingData } from "../../hooks/useMarketingData";

import MarkChart1 from "../chart/marketing/MarkChart1";
import MarkChart2 from "../chart/marketing/MarkChart2";
import MarkChart3 from "../chart/marketing/MarkChart3";
import MarkChart4 from "../chart/marketing/MarkChart4";
import MarkChart5 from "../chart/marketing/MarkChart5";

import MarkChart1Info from "../chartInfo/marketing/MarkChart1Info";
import MarkChart2Info from "../chartInfo/marketing/MarkChart2Info";
import MarkChart3Info from "../chartInfo/marketing/MarkChart3Info";
import MarkChart4Info from "../chartInfo/marketing/MarkChart4Info";
import MarkChart5Info from "../chartInfo/marketing/MarkChart5Info";

import ExpandableInfo from "../chart/ExpandableInfo";
import MarkRecommendation from "../chartInfo/marketing/MarkRecommendation";
import MetricBox from "../chart/MetricBox";
import { MetricSkeleton, ChartSkeleton } from "../LoadingSkeleton";

function Marketing() {
  const { data, refetch, isLoading, isError, error } = useMarketingData()
  const [selectedCompanyId, setSelectedCompanyId] = useState(20368)

  const filteredMetrics = useMemo(() =>
    (data?.metrics ?? []).filter((d) => d.companyId === selectedCompanyId)[0],
    [data?.metrics, selectedCompanyId]
  )

  const filteredChart1 = useMemo(() =>
    (data?.chart1 ?? []).filter((d) => d.companyId === selectedCompanyId),
    [data?.chart1, selectedCompanyId]
  )

  const sortedChart1 = useMemo(() =>
    [...filteredChart1].sort((a, b) => a.totalTitles - b.totalTitles),
    [filteredChart1]
  )

  const filteredChart2 = useMemo(() =>
    (data?.chart2 ?? []).filter((d) => d.companyId === selectedCompanyId),
    [data?.chart2, selectedCompanyId]
  )

  const sortedChart2 = useMemo(() =>
    [...filteredChart2].sort((a, b) => b.networkCount - a.networkCount),
    [filteredChart2]
  )

  const filteredChart3 = useMemo(() =>
    (data?.chart3 ?? []).filter((d) => d.companyId === selectedCompanyId),
    [data?.chart3, selectedCompanyId]
  )

  const sortedChart3 = useMemo(() =>
    [...filteredChart3].sort((a, b) => b.voteCount - a.voteCount),
    [filteredChart3]
  )

  const filteredChart4 = useMemo(() =>
    (data?.chart4 ?? []).filter((d) => d.companyId === selectedCompanyId),
    [data?.chart4, selectedCompanyId]
  )

  const filteredChart5 = useMemo(() =>
    (data?.chart5 ?? []).filter((d) => d.companyId === selectedCompanyId),
    [data?.chart5, selectedCompanyId]
  )

  const handleCompanyChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCompanyId(Number(e.target.value));
  }, []);

  const handleRetry = useCallback(() => {
    refetch();
  }, [refetch]);

  let content;

  if (isLoading) {
    content = (
      <>
        <div className="relative w-full h-20 flex justify-between">
          <div className="flex flex-col mt-3">
            <h2 className="text-white text-2xl tracking-wider animate-pulse">MARKETING DASHBOARD</h2>
          </div>
          <div className="h-full flex justify-between items-center gap-2">
            {[...Array(4)].map((_, i) => <MetricSkeleton key={i} />)}
          </div>
        </div>
        <div className="grid grid-cols-[40%_40%_20%] grid-rows-[50%_50%] gap-2 h-[83%] w-full">
          {[...Array(2)].map((_, i) => <ChartSkeleton key={i} />)}
          <ChartSkeleton rowSpan={2} />
          {[...Array(2)].map((_, i) => <ChartSkeleton key={i} />)}
        </div>
      </>
    )
  } else if (isError) {
    content = (
      <div className="text-center text-red-400 mt-5">
        <h3 className="text-xl font-bold mb-2">Error Loading Data</h3>
        <p>{(error as Error).message}</p>
        <button
          onClick={handleRetry}
          className="mt-4 px-4 py-2 bg-primary3-3 rounded-xl hover-scale"
        >
          Retry
        </button>
      </div>
    );
  } else {
    content = (
      <>
        <div className="w-full h-20 flex justify-between">
          <div className="flex flex-col mt-3">
            <h2 className="text-white text-2xl tracking-wider">MARKETING DASHBOARD</h2>
            <div>
              <select
                className="text-secondary-2 font-bold mt px-2 bg-primary1-1/60 rounded-xl"
                value={selectedCompanyId}
                onChange={handleCompanyChange}
              >
                {data?.productionCompanies.map((c) => (
                  <option key={c.companyId} value={c.companyId}>
                    {c.companyName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="h-full flex justify-between items-center gap-2">
            <MetricBox
              title="Show Count"
              value={filteredMetrics.showCount}
            />
            <MetricBox
              title="Average Rating"
              value={Number(filteredMetrics.averageRating.toFixed(2))}
            />
            <MetricBox
              title="Average Popularity"
              value={Number(filteredMetrics.averagePopularity.toFixed(2))}
            />
            <MetricBox
              title="Rank"
              value={filteredMetrics.rank}
              isRank={true}
            />
          </div>
        </div>

        <div className="grid grid-cols-[37.5%_37.5%_25%] grid-rows-[50%_50%] gap-2 h-[83%] w-full">

          <div className="chart-box">
            <MarkChart2 chart2={sortedChart2} />
            <ExpandableInfo>
              <MarkChart2Info chart2={sortedChart2} />
            </ExpandableInfo>
          </div>
          <div className="chart-box">
            <MarkChart3 chart3={sortedChart3} />
            <ExpandableInfo>
              <MarkChart3Info chart3={sortedChart3} />
            </ExpandableInfo>
          </div>
          <div className="chart-box row-span-2">
            <MarkChart4 chart4={filteredChart4} />
            <ExpandableInfo>
              <MarkChart4Info chart4={filteredChart4} />
            </ExpandableInfo>
          </div>
          <div className="chart-box">
            <MarkChart5 chart5={filteredChart5} />
            <ExpandableInfo>
              <MarkChart5Info chart5={filteredChart5} />
            </ExpandableInfo>
          </div>
          <div className="chart-box">
            <MarkChart1 chart1={sortedChart1} />
            <ExpandableInfo>
              <MarkChart1Info chart1={sortedChart1} />
            </ExpandableInfo>
          </div>
        </div>
      </>
    )
  }

  return (
    <div className="flex flex-col justify-start items-center min-h-screen relative overflow-hidden bg-primary1-2">
      <div className="absolute -inset-8 bg-linear-to-br from-primary1-2 via-primary2-3 to-primary2-3 animate-gradient opacity-90" />

      <div className="absolute -top-[230px] -left-[330px] w-[670px] h-[360px] bg-primary1-1 rounded-[50%]
                      blur-2xl rotate-50 flex justify-center items-center">
        <div className="w-[338px] h-[159px] bg-primary3-1/50 rounded-[50%] blur-2xl" />
      </div>

      <div className="absolute top-[230px] -right-[330px] w-[670px] h-[360px] bg-primary1-1 rounded-[50%]
                      blur-2xl rotate-175 flex justify-center items-center">
        <div className="w-[338px] h-[159px] bg-primary3-1/20 rounded-[50%] blur-2xl" />
      </div>

      <div className="absolute -bottom-[230px] -left-[50px] w-[570px] h-[360px] bg-primary1-1 rounded-[50%]
                      blur-2xl rotate-10 flex justify-center items-center">
        <div className="w-[338px] h-[159px] bg-primary3-1/30 rounded-[50%] blur-2xl" />
      </div>

      <div className="backdrop-blur-2xl rounded-xl bg-linear-120 from-primary3-3/20 to-primary1-2/20
                      w-[1300px] h-[625px] shadow-[0_0px_40px_1px_rgba(255,255,255,0.1)] to-50% mt-15
                      flex flex-col items-center px-10">
        {content}
      </div>

      <div className="relative z-10 mt-10 mb-50 w-full max-w-[80%]
                rounded-xl border border-white/10
                bg-primary1-1/60 backdrop-blur-sm
                px-10 py-5 text-white shadow-lg">

        <div className="mb-3 flex items-center gap-2">
          <span className="text-xs font-semibold tracking-widest text-white/80 select-none">
            OVERALL RECOMMENTDATON
          </span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        <div className="text-sm leading-relaxed text-white/90 space-y-3 text-justify">
          <MarkRecommendation selectedCompanyId={selectedCompanyId} />
        </div>

      </div>
    </div>
  );
}

export default Marketing;
