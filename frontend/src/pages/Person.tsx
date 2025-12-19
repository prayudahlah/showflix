import { useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import { usePersonById } from "../hooks/usePerson.ts";

import GradientBg from "../components/GradientBg.tsx";
import Throbber from "../components/Throbber.tsx";
import UrlNotFound from "./UrlNotFound.tsx";

function Person() {
  const { id } = useParams()
  const { data, refetch, isLoading, isError, error } = usePersonById(id ?? "")

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
              <h2>{data?.primaryName}</h2>
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

export default Person;
