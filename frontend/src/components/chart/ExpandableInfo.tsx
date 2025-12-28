import { useEffect, useRef, useState, type ReactNode } from "react";

type ExpandableInfoProps = {
  children: ReactNode;
};

function ExpandableInfo({ children }: ExpandableInfoProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative inline-block h-full">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(prev => !prev);
        }}
        className="absolute top-1 right-1 flex w-5 h-5
                 rounded-lg bg-primary3-1 text-white
                 items-center justify-center cursor-pointer
                 transition-transform duration-150 ease-in-out
                 hover:scale-105 active:scale-95
                 hover:shadow-md focus:outline-none"
        aria-label="Toggle info"
      >
        <span className="leading-none -mt-1 select-none">ⓘ</span>
      </button>

      {isOpen && (
        <div
          className={`absolute top-8 right-4 w-[300px] p-3
                  rounded-md bg-primary1-1 text-white text-sm shadow-lg
                  transition-all duration-200 ease-in-out z-10
                  transform scale-100`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative">
            <div className="absolute -top-2 right-2 w-0 h-0 
                          border-l-[8px] border-r-[8px] border-b-[8px]
                          border-l-transparent border-r-transparent 
                          border-b-primary1-1"></div>
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

export default ExpandableInfo;
