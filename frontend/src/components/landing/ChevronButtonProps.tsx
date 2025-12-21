import { useState } from "react";

interface ArrowButtonProps {
  direction: "left" | "right";
  onClick?: () => void;
}

function ArrowButton({ direction, onClick }: ArrowButtonProps) {
  const [active, setActive] = useState(false);

  return (
    <button
      onClick={() => {
        setActive(!active);
        onClick?.();
      }}
      className={`w-[35px] h-[35px] rounded-[10px] flex items-center justify-center ${
        active ? "bg-[#20104A]" : "bg-[#34045D]"
      } transition-colors`}
    >
      <div
        className="w-3 h-3 border-t-2 border-r-2 border-white transform"
        style={{
          transform: `rotate(${direction === "left" ? -135 : 45}deg)`,
        }}
      />
    </button>
  );
}

export default function PaginationArrows() {
  return (
    <div className="flex justify-end mt-4 space-x-2">
      <ArrowButton direction="left" />
      <ArrowButton direction="right" />
    </div>
  );
}

