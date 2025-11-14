import { useState } from "react";
import { useExecutiveData } from "../../hooks/useExecutiveData";

import Chart1 from "../chart/executive/Chart1";

function Executive() {
  const { data, isLoading, isError, error } = useExecutiveData()
  const [selectedCompanyId, setSelectedCompanyId] = useState(20368)
  let content;

  const filteredChart1 = (data?.chart1 ?? []).filter((d) => (
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

        <div className="grid grid-cols-[42%_33%_auto] grid-rows-[40%_auto] gap-4 h-[450px] mx-10">

          <div className="chart-rectangle"></div>
          <div className="chart-rectangle"></div>
          <div className="chart-rectangle row-span-2">
          </div>
          <div className="chart-rectangle">
            <Chart1 chart1={filteredChart1} />
          </div>
          <div className="chart-rectangle"></div>
        </div>
      </>
    )
  }

  return (
    <div className="flex justify-center items-center min-h-screen relative overflow-hidden bg-primary1-2">
      <div className="backdrop-blur-2xl rounded-xl bg-linear-120 from-primary3-3/20 to-primary1-2/20
                      w-[1300px] h-[600px] shadow-[0_0px_40px_1px_rgba(255,255,255,0.1)] to-50%">
        {content}
      </div>
    </div>
  );
}

export default Executive;
