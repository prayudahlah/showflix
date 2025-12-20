import React from "react";

type PinkVertLineProps = {
  className?: string;
};

const PinkVertLine: React.FC<PinkVertLineProps> = ({ className }) => {
  return (
    <div
      className={`w-[4px] bg-[#89189C] rounded-full ${className ?? ""}`}
    />
  );
};

export default PinkVertLine;
