import { useState, useMemo, useCallback } from "react";
import { useExecutiveData } from "../../hooks/useExecutiveData";

import ExecChart1 from "../chart/executive/ExecChart1";
import ExecChart2 from "../chart/executive/ExecChart2";
import ExecChart3 from "../chart/executive/ExecChart3";
import ExecChart4 from "../chart/executive/ExecChart4";
import ExecChart5 from "../chart/executive/ExecChart5";
import MetricBox from "../chart/MetricBox";
import { MetricSkeleton, ChartSkeleton } from "../LoadingSkeleton";

function Executive() {
  const { data, refetch, isLoading, isError, error } = useExecutiveData()
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
    [...filteredChart1].sort((a, b) => a.yearAired - b.yearAired),
    [filteredChart1]
  )

  const filteredChart2 = useMemo(() =>
    (data?.chart2 ?? []).filter((d) => d.companyId === selectedCompanyId),
    [data?.chart2, selectedCompanyId]
  )

  const sortedChart2 = useMemo(() =>
    [...filteredChart2].sort((a, b) => a.ratingEnd - b.ratingEnd),
    [filteredChart2]
  )

  const sortedChart3 = useMemo(() =>
    [...(data?.chart3 ?? [])].sort((a, b) => b.titleCount - a.titleCount),
    [data?.chart3]
  )

  const filteredChart4 = useMemo(() =>
    (data?.chart4 ?? []).filter((d) => d.companyId === selectedCompanyId),
    [data?.chart4, selectedCompanyId]
  )

  const sortedChart4 = useMemo(() =>
    [...filteredChart4].sort((a, b) => b.genreCount - a.genreCount),
    [filteredChart4]
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
            <h2 className="text-white text-2xl tracking-wider animate-pulse">EXECUTIVE DASHBOARD</h2>
          </div>
          <div className="h-full flex justify-between items-center gap-2">
            {[...Array(4)].map((_, i) => <MetricSkeleton key={i} />)}
          </div>
        </div>
        <div className="grid grid-cols-[37.5%_37.5%_25%] grid-rows-[45%_55%] gap-2 h-[83%] w-full">
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
            <h2 className="text-white text-2xl tracking-wider">EXECUTIVE DASHBOARD</h2>
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

        <div className="grid grid-cols-[37.5%_37.5%_25%] grid-rows-[45%_55%] gap-2 h-[83%] w-full">

          <div className="chart-box">
            <ExecChart2 chart2={sortedChart2} />
          </div>
          <div className="chart-box">
            <ExecChart3 chart3={sortedChart3} selectedCompanyId={selectedCompanyId} />
          </div>
          <div className="chart-box row-span-2">
            <ExecChart5 chart5={filteredChart5} />
          </div>
          <div className="chart-box">
            <ExecChart1 chart1={sortedChart1} />
          </div>
          <div className="chart-box">
            <ExecChart4 chart4={sortedChart4} />
          </div>
        </div>
      </>
    )
  }

  return (
    <div className="flex justify-center items-center min-h-screen relative overflow-hidden bg-primary1-2">
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
                      w-[1300px] h-[625px] shadow-[0_0px_40px_1px_rgba(255,255,255,0.1)] to-50% mt-7
                      flex flex-col items-center px-10">
        {content}
      </div>
    </div>
  );
}

export default Executive;
