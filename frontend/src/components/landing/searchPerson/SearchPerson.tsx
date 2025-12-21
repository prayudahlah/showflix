import type { SearchPersonResponse } from "../../../types/searchPerson";

import PaginationArrows from "../ChevronButtonProps";
import FilterSortDropdown from "../FilterSortDropdown";
import LiquidGlass from "../LiquidGlass";
import PersonCard from "./PersonCard";
import PersonHeader from "./PersonHeader";
import SearchSkeleton from "../SearchSkeleton";

import { useSearchPerson } from "../../../hooks/useSearchPerson";
import { useEffect, useState } from "react";

function SearchPerson() {
  const { mutate, isPending } = useSearchPerson();
  const [data, setData] = useState<SearchPersonResponse | null>(null)
  let content;

  useEffect(() => {
    mutate(
      { searchTerm: "kim" },
      {
        onSuccess: (response) => {
          setData(response)
        },
      }
    );
  }, [mutate]);

  if (isPending) {
    content = <SearchSkeleton />
  } else {
    content = (
      <div className="flex flex-col justify-between h-full">
        <PersonHeader />

        {
          (data?.searchPersons ?? []).map((item) => (
            <PersonCard
              key={item.personId}
              personId={item.personId}
              popularity={item.popularity}
              primaryName={item.primaryName}
              profession={item.profession}
              age={item.age}
            />
          ))
        }

        <PaginationArrows />
      </div>
    )
  }

  return (
    <>
      {/*Tempat Filter & Sort*/}
      <div className="flex w-full max-w-[1080px] mt-10 px-8 gap-4 items-start">
        <LiquidGlass className="flex-[95%] h-[150px] px-4 py-4">
          <div className="flex h-full">

            {/* FILTER */}
            <div className="w-[55%] flex flex-col justify-start">
              <h2 className="text-white font-semibold text-xl mb-4 text-start">
                FILTER
              </h2>
              <div className="grid grid-cols-3 grid-rows-2 gap-x-4 gap-y-2">
                <FilterSortDropdown label="PROFESSION" options={["All", "9+", "8+", "7+", "6+"]} />
                <FilterSortDropdown label="BIRTH DATE" options={["Drama", "Action", "Comedy", "Sci-Fi", "Horror"]} />
                <FilterSortDropdown label="DEATH DATE" options={["< 60 min", "60–90 min", "90–120 min", "> 120 min"]} />
              </div>
            </div>

            {/* SORT */}
            <div className="w-[40%] flex flex-col justify-start pl-8">
              <h2 className="text-white font-semibold text-xl mb-4 text-start">
                SORT
              </h2>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                <FilterSortDropdown label="POPULARITY" options={["ASC", "DESC"]} />
              </div>
            </div>
          </div>
        </LiquidGlass>

        <div className="flex-[5%] flex items-start justify-end">
          <button
            className="
              w-[130px] h-[30px]
              rounded-[100px]
              bg-linear-to-r from-primary2-2/80 via-[#89189C]/80
              shadow-[0_5px_4px_rgba(19,8,48,0.4)]
              flex items-center justify-center
              text-white font-poppins font-normal text-[15px] leading-[170%]
              tracking-widest uppercase
            "
          >
            APPLY
          </button>
        </div>
      </div>


      {/*Tempat Shows*/}
      <LiquidGlass className="w-full max-w-[1080px] mt-5 px-8">
        {content}
      </LiquidGlass>
    </>
  );
}

export default SearchPerson;
