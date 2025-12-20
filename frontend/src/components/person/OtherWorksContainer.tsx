import React from "react";

type OtherWorksContainerProps = {
  title: React.ReactNode;
  jobType: string;
};

const OtherWorksContainer: React.FC<OtherWorksContainerProps> = ({
  title,
  jobType,
}) => {
  return (
    <div
      className='relative w-[330px] h-[50px] rounded-[10px] border border-[#89189C] flex items-center px-3'
    >
      {/* TITLE */}
      <span className="font-poppins font-bold text-[18px] text-[#141414] whitespace-nowrap">
        {title}
      </span>

      {/* JOB TYPE */}
      <span className="ml-auto font-poppins font-normal text-[18px] text-[#141414]">
        {jobType}
      </span>
    </div>
  );
};

export default OtherWorksContainer;
