import { useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useShowById } from "../hooks/useShow.ts";

import GradientBg from "../components/GradientBg.tsx";
import Throbber from "../components/Throbber.tsx";
import UrlNotFound from "./UrlNotFound.tsx";

function Show() {
  const { id } = useParams()
  const { data, refetch, isLoading, isError, error } = useShowById(id ?? "")

  const formattedFirstDate: string = useMemo(() => {
    const d = new Date(data?.firstAirDate ?? "");
    const year = d.getUTCFullYear();
    const month = String(d.getUTCMonth() + 1).padStart(2, "0");
    const day = String(d.getUTCDate()).padStart(2, "0");

    return `${year}/${month}/${day}`
  }, [data?.firstAirDate])

  const formattedNetworks: string = useMemo(() =>
    (data?.networks ?? [])
      .map(n => n.networkName)
      .join(", "),
    [data?.networks]
  )

  const formattedProdHouse: string = useMemo(() =>
    (data?.productionCompanies ?? [])
      .map(pc => pc.companyName)
      .join(", "),
    [data?.productionCompanies]
  )

  const formattedCreatedDate: string = useMemo(() => {
    const d = new Date(data?.createdDate ?? "");
    const year = d.getUTCFullYear();

    return `${year}`
  }, [data?.createdDate])

  const formattedRuntime: string = useMemo(() => {
    if (data?.runtimeMinutes == null) { return "Unknown Runtime" }

    const r = data.runtimeMinutes

    const hour = Math.floor(r / 60)
    const minute = r % 60

    const hourStr = hour > 0 ? `${hour}h` : ""
    const minuteStr = minute > 0 ? `${minute}m` : ""

    return `${hourStr} ${minuteStr}`
  }, [data?.productionCompanies])

  const handleRetry = useCallback(() => {
    refetch();
  }, [refetch]);

  let content;

  if (isLoading) {
    content = (
      <div className="absolute inset-0 flex justify-center items-center">
        <Throbber />
      </div>
    )
  } else if (isError) {
    if (error.status === 404) {
      content = (
        <UrlNotFound />
      )
    } else {
      content = (
        <div className="text-center text-red-400 mt-5">
          <h3 className="text-xl font-bold mb-2">Error Loading Data</h3>
          <p>{error.message}</p>
          <button
            onClick={handleRetry}
            className="mt-4 px-4 py-2 bg-primary3-3 rounded-xl hover-scale"
          >
            Retry
          </button>
        </div>
      );
    }
  } else {
    content = (
      <>
        <GradientBg />
        <div className="w-[80%] mt-[120px] z-50">
          <div className="flex justify-between text-white">
            <div>
              <h2>{data?.primaryTitle}</h2>
              <p>First Aired: {formattedFirstDate || "-"}</p>
              <p>Network: {formattedNetworks || "-"}</p>
              <p>Production Companies: {formattedProdHouse || "-"}</p>
              <div className="flex justify-between">
                <p>{formattedCreatedDate}</p>
                <p>{data?.isAdult ? "All Age" : "R13"}</p>
                <p>{formattedRuntime}</p>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }


  return (
    <div className="flex justify-center min-h-screen relative overflow-hidden bg-[#010109]">
      {content}
    </div>
  )

}

export default Show;
