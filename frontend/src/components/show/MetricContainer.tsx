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
        w-[150px] h-[25px]
        rounded-[8px]
        bg-linear-to-r from-[#D057DE]/80 to-[#56049C]/80
        shadow-[4px_0px_4px_rgba(19,8,48,0.4)]
        flex items-center justify-center
        ${className ?? ""}
      `}
    >
      {children}
    </div>
  );
};

export default MetricContainer;
