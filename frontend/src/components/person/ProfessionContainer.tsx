import React from "react";

type ProfessionContainerProps = {
  label: string;
  className?: string;
};

const ProfessionContainer: React.FC<ProfessionContainerProps> = ({ label, className }) => {
  return (
    <div
      className={`
        inline-flex items-center justify-center
        p-[1px] rounded-4xl
        bg-linear-to-r from-white to-[#9219A0]
        ${className ?? ""}
      `}
    >
      <div className="px-5 py-0.5 rounded-4xl bg-[#010109] flex items-center justify-center">
        <span className="text-white text-sm font-medium">
        {label}
        </span>
      </div>
    </div>
  );
};

export default ProfessionContainer;
