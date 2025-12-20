import React from "react";

type LineGradientProps = {
  className?: string;
};

const LineGradient: React.FC<LineGradientProps> = ({ className }) => {
  return (
    <div
      className={`h-[0.5px] w-[930px] ${className ?? ""}`}
      style={{
        background:
          "linear-gradient(90deg, #FFFFFF 0%, #FFFFFF 44%, #9219A0 81%, #530099 100%)",
      }}
    />
  );
};

export default LineGradient;
