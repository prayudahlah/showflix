interface ArrowButtonProps {
  direction: "left" | "right";
  onClick?: () => void;
  variant?: "default" | "pressed" | "disabled";
}

interface PaginationArrowsProps {
  isFirstPage: boolean;
  hasMore: boolean;
  currentPage?: number;
  onNext?: () => void;
  onPrev?: () => void;
}

function ArrowButton({
  direction,
  onClick,
  variant = "default"
}: ArrowButtonProps) {
  const isPressed = variant === "pressed";
  const isDisabled = variant === "disabled";

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`
        w-[35px] h-[35px] 
        rounded-[10px] 
        flex items-center justify-center 
        transition-all duration-150
        ${isPressed
          ? "bg-primary2-1 translate-y-0.5 shadow-none cursor-default"
          : isDisabled
            ? "bg-primary2-3/40 cursor-not-allowed"
            : "bg-primary2-3 hover:bg-primary2-2 hover:shadow-sm"
        }
        ${!isPressed && !isDisabled && "active:translate-y-0.5 active:shadow-none"}
        focus:outline-none focus:ring-1 focus:ring-primary1-1
      `}
    >
      <div
        className="w-3 h-3 border-t-2 border-r-2 transition-transform duration-150"
        style={{
          transform: `rotate(${direction === "left" ? -135 : 45}deg) scale(${isPressed ? 0.95 : 1})`,
          borderColor: isDisabled ? "#888" : "white",
        }}
      />
    </button>
  );
}

export default function PaginationArrows({
  isFirstPage,
  hasMore,
  currentPage = 1,
  onNext,
  onPrev
}: PaginationArrowsProps) {
  return (
    <div className="flex items-center justify-center gap-4 mt-4">
      <ArrowButton
        direction="left"
        variant={isFirstPage ? "disabled" : "default"}
        onClick={onPrev}
      />

      <div className="text-white text-sm font-medium">
        {currentPage}
      </div>

      <ArrowButton
        direction="right"
        variant={hasMore ? "default" : "disabled"}
        onClick={onNext}
      />
    </div>
  );
}
