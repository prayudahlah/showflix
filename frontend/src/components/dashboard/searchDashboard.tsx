import type { SearchShowResponse } from "../../types/searchShow";

import LiquidGlass from "../landing/LiquidGlass";
import ShowCard from "./ShowCard";
import ShowHeader from "./ShowHeader";
import PaginationArrows from "../landing/ChevronButtonProps";
import SearchSkeleton from "../landing/SearchSkeleton";

import { useEffect, useRef, useState } from "react";
import { useSearchShow } from "../../hooks/useSearchShow";

interface CursorData {
  nextCursorValue?: number;
  nextCursorTitleId?: string;
  hasMore: boolean;
}

interface SearchDashboardProps {
  searchTerm: string;
  selectedCompanyId: number;
  triggerSearch?: number;
  onSearchTrigger?: () => void;
}

function SearchDashboard({
  searchTerm,
  selectedCompanyId,
  triggerSearch = 0,
  onSearchTrigger
}: SearchDashboardProps) {
  const { mutate, isPending } = useSearchShow();
  const [data, setData] = useState<SearchShowResponse | null>(null)

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
    mutate({
      searchTerm: searchTerm || undefined,
      companyId: selectedCompanyId,
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
      searchTerm: searchTerm || undefined,
      companyId: selectedCompanyId,
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
      searchTerm: searchTerm || undefined,
      companyId: selectedCompanyId,
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
      {/*Tempat Shows*/}
      <LiquidGlass className="w-full max-w-[1080px] mt-5 px-8 mb-20">
        {content}
      </LiquidGlass>
    </>
  );
}

export default SearchDashboard;
