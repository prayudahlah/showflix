import { useCallback } from "react";
import { useParams } from "react-router-dom";
import { usePersonById } from "../hooks/usePerson.ts";

import GradientBg from "../components/GradientBg.tsx";
import Throbber from "../components/Throbber.tsx";
import UrlNotFound from "./UrlNotFound.tsx";
import ProfessionContainer from "../components/person/ProfessionContainer.tsx";
import AlsoKnownRectangle from "../components/person/AlsoKnownRectangle.tsx";
import AkaContainer from "../components/person/AkaContainer.tsx";
import PinkVertLine from "../components/person/PinkVertLine.tsx";
import OtherWorksContainer from "../components/person/OtherWorksContainer.tsx";

function Person() {
  const { id } = useParams()
  const { data, refetch, isLoading, isError, error } = usePersonById(id ?? "")

  const formattedYear = data?.birthYear
    ? `${data.birthYear} - ${data.deathYear ?? "Now"}`
    : data?.deathYear
      ? `- - ${data.deathYear}`
      : "Unknown"
    ;

  const distinctJobTypes = data?.titlePrincipals
    ? Array.from(new Set(data.titlePrincipals
      .map(tp => tp.jobType)
      .filter(Boolean)
    ))
    : [];

  const topKnownTitles = data?.knownTitles
    ?.sort((a, b) => (b.averageRating ?? 0) - (a.averageRating ?? 0))
    .slice(0, 3);

  const uniquePrincipals = data?.titlePrincipals
    ?.filter(tp => tp.primaryTitle && tp.jobType)
    .reduce<{ primaryTitle: string; jobType: string }[]>((acc, curr) => {
      const exists = acc.some(
        item => item.primaryTitle === curr.primaryTitle
      );

      if (!exists) {
        acc.push({
          primaryTitle: curr.primaryTitle!,
          jobType: curr.jobType!,
        });
      }

      return acc;
    }, [])
    .slice(0, 6);

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
        <div className="h-screen w-full flex flex-col">

          {/* ATAS */}
          <div className="relative h-[55vh] w-full overflow-hidden">
            <GradientBg />
            <div className="relative z-10 w-[80%] h-full mx-auto flex justify-between items-start text-white pt-[120px] gap-4">

              {/* KIRI ATAS */}
              <div className="flex flex-col gap-2">
                <h2>{data?.primaryName}</h2>

                <div>
                  <span className="text-gray-300">Born:</span>
                  <span className="font-medium"> {formattedYear}</span>
                </div>

                <div>
                  <span className="font-bold text-[#D057DE]">Age:</span>
                  <span className="font-bold text-[#D057DE]"> {data?.age ?? "Unknown"}</span>
                </div>

                <div className="flex gap-2 mt-4 overflow-x-auto">
                  {distinctJobTypes.map(job => (
                    <ProfessionContainer key={job} label={job!} />
                  ))}
                </div>
              </div>

              {/* KANAN ATAS */}
              <div className="flex flex-col items-end gap-2">
                <AlsoKnownRectangle />
                {topKnownTitles?.map((title, idx) => (
                  <AkaContainer
                    key={idx}
                    title={title.primaryTitle ?? "-"}
                    rating={(title.averageRating ?? 0).toFixed(2)}
                  />
                ))}
              </div>

            </div>
          </div>

          {/* BAWAH */}
          <div className="relative bg-white/65 backdrop-blur-sm flex justify-center py-15">
            <div className="w-[80%]">
              <div>
                <div className="flex items-center gap-3 mt-0 mb-15">
                  <PinkVertLine className="h-[32px]" />
                  <h4 className="text">Other Works</h4>
                </div>
                <div className="grid grid-cols-3 grid-rows-2 gap-4">
                  {uniquePrincipals?.map(item => (
                    <OtherWorksContainer
                      key={item.primaryTitle}
                      title={
                        <span
                          className="font-bold truncate max-w-[200px] block"
                          title={item.primaryTitle}
                        >
                          {item.primaryTitle}
                        </span>
                      }
                      jobType={item.jobType}
                    />
                  ))}
                </div>
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

export default Person;
