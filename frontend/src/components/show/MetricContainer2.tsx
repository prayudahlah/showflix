import React from "react";

type MetricContainerProps = {
  children: React.ReactNode;
  className?: string;
};

const MetricContainer: React.FC<MetricContainerProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={`
        w-[350px] h-[25px]
        rounded-[8px]
        bg-linear-to-r from-[#D057DE]/100 to-[#56049C]/100
        shadow-[2px_2px_4px_2px_rgba(19,8,48,0.4)]
        flex items-center justify-center
        ${className ?? ""}
      `}
    >
      {children}
    </div>
  );
};

export default MetricContainer;
