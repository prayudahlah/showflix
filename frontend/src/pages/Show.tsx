import { useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useShowById } from "../hooks/useShow.ts";

import ProfileAvatar from "../assets/icons/profile_avatar.svg";

import GradientBg from "../components/GradientBg.tsx";
import Throbber from "../components/Throbber.tsx";
import UrlNotFound from "./UrlNotFound.tsx";
import GenreContainer from "../components/show/GenreContainer.tsx";
import MetricContainer from "../components/show/MetricContainer.tsx";
import MetricContainer2 from "../components/show/MetricContainer2.tsx";
import LineGradient from "../components/show/LineGradient.tsx";
import PinkVertLine from "../components/show/PinkVertLine.tsx";

function Show() {
  const { id } = useParams();
  const { data, refetch, isLoading, isError, error } = useShowById(id ?? "");

  const formattedFirstDate: string = useMemo(() => {
    const d = new Date(data?.firstAirDate ?? "");
    const year = d.getUTCFullYear();
    const month = String(d.getUTCMonth() + 1).padStart(2, "0");
    const day = String(d.getUTCDate()).padStart(2, "0");

    return `${year}/${month}/${day}`;
  }, [data?.firstAirDate]);

  const formattedNetworks: string = useMemo(
    () =>
      (data?.networks ?? [])
        .map((n) => n.networkName)
        .join(", "),
    [data?.networks]
  );

  const formattedProdHouse: string = useMemo(
    () =>
      (data?.productionCompanies ?? [])
        .map((pc) => pc.companyName)
        .join(", "),
    [data?.productionCompanies]
  );

  const formattedCreatedDate: string = useMemo(() => {
    const d = new Date(data?.createdDate ?? "");
    const year = d.getUTCFullYear();
    return `${year}`;
  }, [data?.createdDate]);

  const formattedRuntime: string = useMemo(() => {
    if (data?.runtimeMinutes == null) {
      return "Unknown Runtime";
    }

    const r = data.runtimeMinutes;
    const hour = Math.floor(r / 60);
    const minute = r % 60;

    const hourStr = hour > 0 ? `${hour}h` : "";
    const minuteStr = minute > 0 ? `${minute}m` : "";

    return `${hourStr} ${minuteStr}`;
  }, [data?.runtimeMinutes]);

  const formattedOriginalTitle: string = useMemo(
    () => data?.originalTitle ?? "-",
    [data?.originalTitle]
  );

  const formattedAltTitle: string = useMemo(
    () => data?.titleAkas?.map((t) => t.altTitle).join(", ") ?? "-",
    [data?.titleAkas]
  );

  const formattedGenres = useMemo(() => {
    return data?.genres ?? [];
  }, [data?.genres]);

  const formattedRating = useMemo(() => {
    if (data?.averageRating == null) return "-";
    return data.averageRating.toFixed(2);
  }, [data?.averageRating]);

  const formattedPopularity = useMemo(() => {
    if (data?.newPopularity == null) return "-";
    return data.newPopularity.toFixed(2);
  }, [data?.newPopularity]);

  const formattedRank = useMemo(() => {
    if (data?.popularityRank == null) return "-";
    return data.popularityRank > 10000
      ? "10000+"
      : data.popularityRank.toString();
  }, [data?.popularityRank]);

  const formattedOverview = useMemo(() => {
    return data?.overview ?? "-";
  }, [data?.overview]);

  const formattedDirectorCreator = useMemo(() => {
    if (!data?.principals) return "-";

    const names = data.principals
      .filter((p) => p.jobType === "director" || p.jobType === "creator")
      .map((p) => p.primaryName)
      .filter(Boolean);

    return names.length > 0 ? names.join(", ") : "-";
  }, [data?.principals]);

  const formattedWriters = useMemo(() => {
    if (!data?.principals) return "-";

    const names = data.principals
      .filter((p) => p.jobType === "writer")
      .map((p) => p.primaryName)
      .filter(Boolean);

    return names.length > 0 ? names.join(", ") : "-";
  }, [data?.principals]);

  const formattedActors = useMemo(() => {
    if (!data?.principals) return "-";

    const names = data.principals
      .filter((p) => p.jobType === "actor" || p.jobType === "actress")
      .map((p) => p.primaryName)
      .filter(Boolean)
      .slice(0, 3);

    return names.length > 0 ? names.join(", ") : "-";
  }, [data?.principals]);

  const formattedJobTypeCast = useMemo(() => {
    if (!data?.principals) return "-";

    const jobTypes = data.principals
      .filter((p) => p.jobType === "actor" || p.jobType === "actress")
      .map(p => p.jobType)
      .filter((jt): jt is string => Boolean(jt));

    const uniqueJobTypes = Array.from(new Set(jobTypes));

    return uniqueJobTypes.length > 0
      ? uniqueJobTypes.join(", ")
      : "-";
  }, [data?.principals]);

  const topCastList = useMemo(() => {
    return data?.principals
      ?.filter(p => p.jobType === "actor" || p.jobType === "actress")
      .slice(0, 6) ?? [];
  }, [data?.principals]);
  const TOP_CAST_SLOTS = 6;

  const peopleBehindList = useMemo(() => {
    return data?.principals
      ?.filter(p =>
        ["director", "writer", "creator"].includes(p.jobType ?? "")
      )
      .slice(0, 4) ?? [];
  }, [data?.principals]);
  const PEOPLE_BEHIND_SLOTS = 4;


  const formattedAvailableLanguageName: string = useMemo(
    () =>
      data?.availableLanguages
        ?.map((t) => t.languageName)
        .filter(Boolean)
        .join(", ") ?? "-",
    [data?.availableLanguages]
  );

  const formattedSpokenLanguageName: string = useMemo(
    () =>
      data?.spokenLanguages
        ?.map((t) => t.languageName)
        .filter(Boolean)
        .join(", ") ?? "-",
    [data?.spokenLanguages]
  );

  {/*STOP*/}

  const handleRetry = useCallback(() => {
    refetch();
  }, [refetch]);

  let content;

  if (isLoading) {
    content = (
      <div className="absolute inset-0 flex justify-center items-center">
        <Throbber />
      </div>
    );
  } else if (isError) {
    if (error.status === 404) {
      content = <UrlNotFound />;
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
        {/*Page Atas: Gradient*/}
        <section className="relative min-h-screen">
          <div className="absolute top-0 left-0 w-full h-full z-0">
            <GradientBg />
          </div>
          
          <div className="relative z-10 flex justify-center h-full">
            <div className="w-[80%] mt-[120px] text-white">
              <div className="flex justify-between w-full gap-10">
                
                {/* KIRI ATAS */}
                <div className="flex flex-col w-[70%]">
                  <h2 className="text-3xl font-bold mb-4">{data?.primaryTitle}</h2>

                  <div className="flex items-center gap-6 mb-4 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-300">First Aired:</span>
                      <span className="font-medium">{formattedFirstDate || "-"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-300">Network:</span>
                      <span className="font-medium">{formattedNetworks || "-"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-300">Prod. Companies:</span>
                      <span
                        className="font-medium truncate max-w-[300px]"
                        title={formattedProdHouse}
                      >
                        {formattedProdHouse || "-"}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 mb-6">
                    <span>{formattedCreatedDate}</span>
                    <span>{data?.isAdult ? "Adult" : "Non-Adult"}</span>
                    <span>{formattedRuntime}</span>
                  </div>
                  <div className="flex items-center gap-6 mb-4">
                    <div className="flex items-center gap-2">
                      <h5 className="font-semibold">Original Title:</h5>
                      <span className="text-[#D057DE] font-medium">
                        {formattedOriginalTitle}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <h5 className="font-semibold">Alt Title:</h5>
                      <span className="text-[#D057DE] font-medium">
                        {formattedAltTitle}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-wrap mb-20">
                    {formattedGenres
                      .filter(g => g.genreName)
                      .map((genre, idx) => (
                        <GenreContainer
                          key={idx}
                          label={genre.genreName!}
                        />
                      ))}
                  </div>

                  {/* KIRI BAWAH */}
                  <div className="mt-10 mb-2">
                    <p className="text-white text-sm leading-relaxed">
                      {formattedOverview}
                    </p>
                  </div>

                  <LineGradient className="my-2" />

                  <div className="flex items-start">
                    <h5 className="text-white font-semibold w-1/4 min-w-[150px]">Directors / Creators</h5>
                    <p className="text-white text-sm flex-1">
                      {formattedDirectorCreator}
                    </p>
                  </div>

                  <LineGradient className="my-2" />

                  <div className="flex items-start">
                    <h5 className="text-white font-semibold w-1/4 min-w-[150px]">Writers</h5>
                    <p className="text-white text-sm flex-1">
                      {formattedWriters}
                    </p>
                  </div>

                  <LineGradient className="my-2" />

                  <div className="flex items-start">
                    <h5 className="text-white font-semibold w-1/4 min-w-[150px]">Stars</h5>
                    <p className="text-white text-sm flex-1">
                      {formattedActors}
                    </p>
                  </div>
                </div>

                {/* KANAN ATAS*/}
                <div className="flex flex-col items-center w-[30%] gap-6">
                  <div className="flex flex-col items-center">
                    <MetricContainer>
                      <span className="text-white text-xs font-semibold">
                        SHOWFLIX RATING
                      </span>
                    </MetricContainer>
                    <h2 className="text-white font-bold text-4xl">
                      {formattedRating}
                    </h2>
                  </div>

                  <div className="flex flex-col items-center">
                    <MetricContainer>
                      <span className="text-white text-xs font-semibold">RANK</span>
                    </MetricContainer>
                    <h2 className="text-white font-bold text-4xl">
                      #{formattedRank}
                    </h2>
                  </div>

                  <div className="flex flex-col items-center">
                    <MetricContainer>
                      <span className="text-white text-xs font-semibold">
                        POPULARITY
                      </span>
                    </MetricContainer>
                    <h2 className="text-white font-bold text-4xl">
                      {formattedPopularity}
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Page Bawah: Putih Transparan */}
        <section className="relative bg-white/65 backdrop-blur-sm flex justify-center py-20">
          <div className="w-[80%]">
            <div className="flex w-full gap-10">
              {/*KIRI*/}
              <div className="w-[60%]">

                {/* Top Cast */}
                <div>
                  <div className="flex items-center gap-3 mt-10 mb-10">
                    <PinkVertLine className="h-[32px]" />
                    <h4 className="text">Top Cast</h4>
                  </div>

                  <div className="grid grid-cols-2 gap-x-10 gap-y-7">
                    {Array.from({ length: TOP_CAST_SLOTS }).map((_, i) => {
                      const person = topCastList[i];

                      return (
                        <div
                          key={i}
                          className="grid grid-cols-[60px_1fr] grid-rows-2 items-center gap-x-4"
                        >
                          <img
                            src={ProfileAvatar}
                            alt="Profile Avatar"
                            className="w-15 h-15 row-span-2"
                          />

                          <p className="font-bold bg-linear-to-r from-[#56049C] to-[#89189C] bg-clip-text text-transparent">
                            {person?.primaryName ?? "-"}
                          </p>

                          <p className="text-[#0B041D]">
                            {person?.jobType ?? "-"}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                </div>

                {/* People Behind */}
                <div>
                  <div className="flex items-center gap-3 mt-15 mb-10">
                    <PinkVertLine className="h-[32px]" />
                    <h4 className="text">People Behind</h4>
                  </div>

                  <div className="grid grid-cols-2 gap-x-10 gap-y-7">
                    {Array.from({ length: PEOPLE_BEHIND_SLOTS }).map((_, i) => {
                      const person = peopleBehindList[i];

                      return (
                        <div
                          key={i}
                          className="grid grid-cols-[60px_1fr] grid-rows-2 items-center gap-x-4"
                        >
                          <img
                            src={ProfileAvatar}
                            alt="Profile Avatar"
                            className="w-15 h-15 row-span-2"
                          />

                          <p className="font-bold bg-linear-to-r from-[#56049C] to-[#89189C] bg-clip-text text-transparent">
                            {person?.primaryName ?? "-"}
                          </p>

                          <p className="text-[#0B041D]">
                            {person?.jobType ?? "-"}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>                
              
              {/*KANAN*/}
              <div className="w-[40%] h-[400px] flex flex-col mt-10 mb-10">
                
                <div className="flex-[2] flex flex-col items-center justify-center">
                  <MetricContainer2>
                    <span className="text-white text-xs">
                      LANGUAGES
                    </span>
                  </MetricContainer2>
                  <p className="text-black mt-5 text-sm leading-relaxed text-center max-w-[240px]">
                    {formattedSpokenLanguageName || formattedAvailableLanguageName || "-"}
                  </p>
                </div>

                <div className="flex-[8] flex flex-col items-center justify-center">
                  <MetricContainer2>
                    <span className="text-white text-xs">
                      FIND ANOTHER
                    </span>
                  </MetricContainer2>
                  <div className="mt-4 text-center">
                    {/*TO DO*/}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <div className="relative bg-[#010109] min-h-screen">
      {content}
    </div>
  );
}

export default Show;