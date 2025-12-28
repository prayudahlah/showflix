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
    <div
      onClick={() => setIsOpen(prev => !prev)}
      ref={containerRef}
      className="absolute top-1 right-1 flex w-5 h-5
             rounded-lg bg-primary3-1 text-white
             items-center justify-center cursor-pointer
             transition-transform duration-150 ease-in-out
             hover:scale-105 active:scale-95 z-10
             hover:shadow-md"
    >
      <span className="leading-none -mt-1 select-none">ⓘ</span>

      {isOpen && (
        <div
          className={`absolute top-7 right-1 w-[300px] p-3
                  rounded-md bg-primary1-1 text-white text-sm shadow-lg
                  transition-all duration-200 ease-in-out z-50
                  transform scale-100`}
        >
          {children}
        </div>
      )}
    </div>
  );
}

export default ExpandableInfo;
