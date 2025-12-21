import type { SearchPersonRequest, SearchPersonResponse } from "../../../types/searchPerson";

import PaginationArrows from "../ChevronButtonProps";
import FilterSortDropdown from "../FilterSortDropdown";
import LiquidGlass from "../LiquidGlass";
import PersonCard from "./PersonCard";
import PersonHeader from "./PersonHeader";
import SearchSkeleton from "../SearchSkeleton";

import { useSearchPerson } from "../../../hooks/useSearchPerson";
import { useState } from "react";
import RangeSlider from "../RangeSlider";
import FilterDropdown from "../FilterSortDropdown";

interface CursorData {
  nextCursorValue?: number;
  nextCursorPersonId?: string;
  hasMore: boolean;
}

function SearchPerson({ searchTerm }: { searchTerm: string }) {
  const { mutate, isPending } = useSearchPerson();
  const [data, setData] = useState<SearchPersonResponse | null>(null)
  const [filters, setFilters] = useState<SearchPersonRequest>({});

  const [currentPage, setCurrentPage] = useState(1);
  const [currentCursor, setCurrentCursor] = useState<CursorData | null>(null);
  const [cursorHistory, setCursorHistory] = useState<CursorData[]>([]);

  let content;

  const handleApply = () => {
    mutate({
      ...filters,
      searchTerm: searchTerm || undefined,
      cursorValue: undefined,
      cursorPersonId: undefined,
    },
      {
        onSuccess: (response) => {
          setData(response);
          setCurrentCursor({
            nextCursorValue: response.cursor?.nextCursorValue,
            nextCursorPersonId: response.cursor?.nextCursorPersonId,
            hasMore: response.cursor?.hasMore || false,
          });
          setCursorHistory([]);
          setCurrentPage(1);
        }
      });
  };

  const handleNextPage = () => {
    if (!currentCursor?.nextCursorValue || !currentCursor?.nextCursorPersonId) return;

    mutate({
      ...filters,
      searchTerm: searchTerm || undefined,
      cursorValue: currentCursor.nextCursorValue,
      cursorPersonId: currentCursor.nextCursorPersonId,
    },
      {
        onSuccess: (response) => {
          setData(response);
          setCursorHistory(prev => [...prev, currentCursor]);
          setCurrentCursor({
            nextCursorValue: response.cursor?.nextCursorValue,
            nextCursorPersonId: response.cursor?.nextCursorPersonId,
            hasMore: response.cursor?.hasMore || false,
          });
          setCurrentPage(prev => prev + 1);
        }
      });
  };

  const handlePrevPage = () => {
    if (cursorHistory.length === 0) return;

    const prevCursor = cursorHistory[cursorHistory.length - 1];

    mutate({
      ...filters,
      searchTerm: searchTerm || undefined,
      cursorValue: cursorHistory.length === 1 ? undefined : prevCursor.nextCursorValue,
      cursorPersonId: cursorHistory.length === 1 ? undefined : prevCursor.nextCursorPersonId,
    },
      {
        onSuccess: (response) => {
          setData(response);
          setCursorHistory(prev => prev.slice(0, -1));
          setCurrentCursor({
            nextCursorValue: response.cursor?.nextCursorValue,
            nextCursorPersonId: response.cursor?.nextCursorPersonId,
            hasMore: response.cursor?.hasMore || false,
          });
          setCurrentPage(prev => prev - 1);
        }
      });
  };

  if (isPending) {
    content = <SearchSkeleton />
  } else {
    content = (
      <div className="flex flex-col justify-between h-full">
        <PersonHeader />

        {
          (data?.searchPersons ?? []).map((item) => (
            <PersonCard
              key={item?.personId ?? ""}
              personId={item?.personId ?? ""}
              popularity={item?.popularity ?? 0}
              primaryName={item?.primaryName ?? ""}
              profession={item?.profession ?? ""}
              age={item?.age}
            />
          ))
        }

        <PaginationArrows
          isFirstPage={cursorHistory.length === 0}
          hasMore={data?.cursor?.hasMore || false}
          currentPage={currentPage}
          onNext={handleNextPage}
          onPrev={handlePrevPage}
        />
      </div>
    )
  }

  return (
    <>
      {/*Tempat Filter & Sort*/}
      <div className="flex w-full max-w-[1080px] mt-10 px-8 gap-4 items-start">
        <LiquidGlass className="flex-[95%] px-4 py-4">
          <div className="flex h-full">

            {/* FILTER */}
            <div className="w-[55%] flex flex-col justify-start text-white">
              <h2 className="font-semibold text-xl mb-4 text-start">
                FILTER
              </h2>
              <div className="grid grid-cols-1 gap-x-4 gap-y-2">

                <FilterSortDropdown
                  value="PROFESSION"
                  options={[
                    "All",
                    "actor",
                    "actress",
                    "miscellaneous",
                    "producer",
                    "writer",
                    "camera_department",
                    "director",
                    "art_department",
                    "sound_department",
                    "cinematographer"
                  ]}
                  onChange={(value) =>
                    setFilters((prev) => ({
                      ...prev,
                      profession: value === "All" ? undefined : value
                    }))
                  }
                />

                <div className="grid grid-cols-[1fr_300px] col-span-3 items-center pr-15">
                  <span>Birth Year:</span>
                  <RangeSlider
                    min={1800}
                    max={2025}
                    step={10}
                    initialMin={1800}
                    initialMax={2025}
                    onChange={({ min, max }) => {
                      setFilters((prev) => ({
                        ...prev,
                        birthDateMin: min,
                        birthDateMax: max,
                      }));
                    }}
                  />
                  <span>Death Year:</span>
                  <RangeSlider
                    min={1800}
                    max={2025}
                    step={10}
                    initialMin={1800}
                    initialMax={2025}
                    onChange={({ min, max }) => {
                      setFilters((prev) => ({
                        ...prev,
                        deathDateMin: min,
                        deathDateMax: max,
                      }));
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="w-px h-auto py-2 bg-primary2-2/50" />

            {/* SORT */}
            <div className="w-[40%] flex flex-col justify-start pl-8">
              <h2 className="text-white font-semibold text-xl mb-4 text-start">
                SORT
              </h2>

              <div className="grid grid-cols-1 gap-x-4 gap-y-2">
                <FilterDropdown
                  value={`POPULARITY (${filters.SortDirection ?? "DESC"})`}
                  options={["ASC", "DESC"]}
                  onChange={(value) =>
                    setFilters((prev) => ({ ...prev, SortDirection: value }))
                  }
                />
              </div>

            </div>
          </div>
        </LiquidGlass>

        <div className="flex-[5%] flex items-start justify-end">
          <button
            onClick={handleApply}
            className="
              w-[130px] h-[30px]
              rounded-[100px]
              bg-gradient-to-r from-primary2-2/80 via-[#89189C]/80
              shadow-[0_5px_4px_rgba(19,8,48,0.4)]
              flex items-center justify-center
              text-white font-poppins font-normal text-[15px] leading-[170%]
              tracking-widest uppercase
              transform transition-all duration-200 ease-in-out
              hover:scale-105 hover:shadow-[0_6px_6px_rgba(19,8,48,0.5)]
              active:scale-95 active:shadow-[0_4px_3px_rgba(19,8,48,0.3)]
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
