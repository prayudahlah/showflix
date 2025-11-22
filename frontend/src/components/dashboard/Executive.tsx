import { useState } from "react";
import { useExecutiveData } from "../../hooks/useExecutiveData";

import ExecChart1 from "../chart/executive/ExecChart1";
import ExecChart2 from "../chart/executive/ExecChart2";
import ExecChart3 from "../chart/executive/ExecChart3";
import ExecChart4 from "../chart/executive/ExecChart4";
import ExecChart5 from "../chart/executive/ExecChart5";

function Executive() {
  const { data, isLoading, isError, error } = useExecutiveData()
  const [selectedCompanyId, setSelectedCompanyId] = useState(20368)
  let content;

  const filteredChart1 = (data?.chart1 ?? []).filter((d) => (
    d.companyId === selectedCompanyId
  ))

  const filteredChart2 = (data?.chart2 ?? []).filter((d) => (
    d.companyId === selectedCompanyId
  ))

  const sortedChart3 = [...(data?.chart3 ?? [])].sort((a, b) => (
    b.titleCount - a.titleCount
  ))

  const filteredChart4 = (data?.chart4 ?? []).filter((d) => (
    d.companyId === selectedCompanyId
  ))

  const sortedChart4 = [...(filteredChart4)].sort((a, b) => (
    b.genreCount - a.genreCount
  ))

  const filteredChart5 = (data?.chart5 ?? []).filter((d) => (
    d.companyId === selectedCompanyId
  ))

  if (isLoading) {
    content = <p className="text-white">Loading...</p>
  } else if (isError) {
    content = <p className="text-white">{(error as Error).message}</p>
  } else {
    content = (
      <>
        <div className="h-20">
          <select
            className="dropdown-front text-secondary-2"
            value={selectedCompanyId}
            onChange={(e) => {
              setSelectedCompanyId(Number(e.target.value))
            }}
          >
            {data?.top10Companies.map((c) => (
              <option key={c.companyId} value={c.companyId}>
                {c.companyName}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-[42%_33%_auto] grid-rows-[45%_55%] gap-2 h-[83%] mx-10">

          <div className="chart-rectangle">
            <ExecChart2 chart2={filteredChart2} />
          </div>
          <div className="chart-rectangle">
            <ExecChart3 chart3={sortedChart3} selectedCompanyId={selectedCompanyId} />
          </div>
          <div className="chart-rectangle row-span-2">
            <ExecChart5 chart5={filteredChart5} />
          </div>
          <div className="chart-rectangle">
            <ExecChart1 chart1={filteredChart1} />
          </div>
          <div className="chart-rectangle">
            <ExecChart4 chart4={sortedChart4} />
          </div>
        </div>
      </>
    )
  }

  return (
    <div className="flex justify-center items-center min-h-screen relative overflow-hidden bg-primary1-2">
      <div className="backdrop-blur-2xl rounded-xl bg-linear-120 from-primary3-3/20 to-primary1-2/20
                      w-[1300px] h-[625px] shadow-[0_0px_40px_1px_rgba(255,255,255,0.1)] to-50% mt-7">
        {content}
      </div>
    </div>
  );
}

export default Executive;
