import type { SearchShowRequest, SearchShowResponse } from "../../../types/searchShow";

import FilterSortDropdown from "../FilterSortDropdown";
import LiquidGlass from "../LiquidGlass";
import ShowCard from "./ShowCard";
import ShowHeader from "./ShowHeader";
import PaginationArrows from "../ChevronButtonProps";
import SearchSkeleton from "../SearchSkeleton";

import { useEffect, useRef, useState } from "react";
import { useSearchShow } from "../../../hooks/useSearchShow";
import RangeSlider from "../RangeSlider";
import FilterRadioGroup from "../FilterRadioGroupProps";

interface CursorData {
  nextCursorValue?: number;
  nextCursorTitleId?: string;
  hasMore: boolean;
}

interface SearchShowProps {
  searchTerm: string;
  triggerSearch?: number;
  onSearchTrigger?: () => void;
}

function SearchShow({
  searchTerm,
  triggerSearch = 0,
  onSearchTrigger
}: SearchShowProps) {
  const { mutate, isPending } = useSearchShow();
  const [data, setData] = useState<SearchShowResponse | null>(null)
  const [filters, setFilters] = useState<SearchShowRequest>({});

  const [currentPage, setCurrentPage] = useState(1);
  const [currentCursor, setCurrentCursor] = useState<CursorData | null>(null);
  const [cursorHistory, setCursorHistory] = useState<CursorData[]>([]);

  useEffect(() => {
    if (triggerSearch > 0) {
      handleApply();
      onSearchTrigger?.();
    }
  }, [triggerSearch]);

  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
  }, []);

  const handleApply = () => {
    console.log(filters)
    mutate({
      ...filters,
      searchTerm: searchTerm || undefined,
      cursorValue: undefined,
      cursorTitleId: undefined,
    },
      {
        onSuccess: (response) => {
          setData(response);
          setCurrentCursor({
            nextCursorValue: response.cursor?.nextCursorValue,
            nextCursorTitleId: response.cursor?.nextCursorTitleId,
            hasMore: response.cursor?.hasMore || false,
          });
          setCursorHistory([]);
          setCurrentPage(1);
        }
      });
  };

  const handleNextPage = () => {
    if (!currentCursor?.nextCursorValue || !currentCursor?.nextCursorTitleId) return;

    mutate({
      ...filters,
      searchTerm: searchTerm || undefined,
      cursorValue: currentCursor.nextCursorValue,
      cursorTitleId: currentCursor.nextCursorTitleId,
    },
      {
        onSuccess: (response) => {
          setData(response);
          setCursorHistory(prev => [...prev, currentCursor]);
          setCurrentCursor({
            nextCursorValue: response.cursor?.nextCursorValue,
            nextCursorTitleId: response.cursor?.nextCursorTitleId,
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
      cursorTitleId: cursorHistory.length === 1 ? undefined : prevCursor.nextCursorTitleId,
    },
      {
        onSuccess: (response) => {
          setData(response);
          setCursorHistory(prev => prev.slice(0, -1));
          setCurrentCursor({
            nextCursorValue: response.cursor?.nextCursorValue,
            nextCursorTitleId: response.cursor?.nextCursorTitleId,
            hasMore: response.cursor?.hasMore || false,
          });
          setCurrentPage(prev => prev - 1);
        }
      });
  };

  let content;

  if (isPending) {
    content = <SearchSkeleton />
  } else {
    content = (
      <div className="flex flex-col justify-between h-full">
        <ShowHeader />

        {
          (data?.searchTitles ?? []).map((item) => (
            <ShowCard
              key={item?.titleId ?? ""}
              titleId={item?.titleId ?? ""}
              rating={item?.averageRating ?? 0}
              primaryTitle={item?.primaryTitle ?? ""}
              genres={item?.genreName ?? ""}
              startYear={item?.startYear ?? "-"}
              isAdult={item.isAdult}
              runtimeMinutes={item?.runtimeMinutes ?? 0}
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
      <div className="flex w-full max-w-[1080px] mt-10 gap-4 items-start">
        <LiquidGlass className="flex-[95%] px-4 py-4">
          <div className="flex h-full">

            {/* FILTER */}
            <div className="w-[55%] flex flex-col justify-start text-white pl-2 pr-8">
              <h2 className="font-semibold text-xl mb-4 text-start">
                FILTER
              </h2>
              <div className="grid grid-cols-2 gap-x-8 gap-y-2 items-center">
                <FilterSortDropdown
                  value={filters?.genre ?? "All Genre"}
                  options={["All Genre", "Drama", "Action", "Comedy", "Sci-Fi", "Horror"]}
                  onChange={(value) => {
                    setFilters((prev) => ({
                      ...prev,
                      genre: value === "All Genre" ? undefined : value,
                    }));
                  }}
                />
                <FilterSortDropdown
                  value={filters?.isAdult === undefined ? "All Rated" : filters.isAdult ? "Adult" : "All Age"}
                  options={["All Rated", "All Age", "Adult"]}
                  onChange={(value) => {
                    setFilters((prev) => ({
                      ...prev,
                      isAdult:
                        value === "All Rated" ? undefined :
                          value === "Adult" ? true : false,
                    }));
                  }}
                />

                <div className="grid grid-cols-[1fr_300px] col-span-2 items-center">
                  <span>Rating:</span>
                  <RangeSlider
                    min={0}
                    max={10}
                    step={0.5}
                    initialMin={0}
                    initialMax={10}
                    onChange={({ min, max }) => {
                      setFilters((prev) => ({
                        ...prev,
                        ratingMin: min,
                        ratingMax: max,
                      }));
                    }}
                  />
                  <span>Runtime:</span>
                  <RangeSlider
                    min={0}
                    max={500}
                    step={10}
                    initialMin={0}
                    initialMax={500}
                    onChange={({ min, max }) => {
                      setFilters((prev) => ({
                        ...prev,
                        runtimeMin: min,
                        runtimeMax: max,
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

              {/* STACK VERTICAL */}
              <div className="flex flex-col gap-6">
                {/* Sort Field */}
                <FilterRadioGroup
                label="Sort By"
                options={["Rating", "Popularity", "Year", "Runtime"]}
                columns={2} 
                value={filters.sortBy ?? "Popularity"}
                  onChange={(val) => 
                    setFilters((prev) => ({
                      ...prev,
                      sortBy: val,
                    }
                  ))}
                />

                {/* Sort Direction → DI BAWAH */}
                <FilterRadioGroup
                  label="Sort Direction"
                  options={["ASC", "DESC"]}
                  direction="col"
                  value={filters?.sortDirection ?? "DESC"}
                  onChange={(val) =>
                    setFilters((prev) => ({
                      ...prev,
                      sortDirection: val,
                    }))
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
      <LiquidGlass className="w-full max-w-[1080px] mt-5 px-8 ">
        {content}
      </LiquidGlass>
    </>
  );
}

export default SearchShow;
