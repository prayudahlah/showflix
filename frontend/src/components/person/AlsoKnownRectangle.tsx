import React from "react";

const AlsoKnownRectangle: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={`
        relative  /* ganti absolute ke relative */
        w-[330px] h-[25px]
        bg-white
        shadow-md
        rounded-[10px]
        flex items-center justify-end
        px-3
        ${className ?? ""}
      `}
    >
      <span className="font-poppins font-semibold text-[18px] text-[#34045D]">
        Also Known For
      </span>
    </div>
  );
};

export default AlsoKnownRectangle;
