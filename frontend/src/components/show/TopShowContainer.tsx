interface TopShowContainerProps {
  rank: number;
  title: string;
  rating: number | string;
}

const TopShowContainer = ({ rank, title, rating }: TopShowContainerProps) => {
  return (
    <div className="relative w-[330px] h-[50px] rounded-[10px] border border-[#56049C] flex items-center px-3">
      
      {/* Rank */}
      <span className="absolute top-1 left-2 text-[#56049C] font-bold text-[14px]">
        #{rank}
      </span>

      {/* Title */}
      <span className="ml-6 text-[#141414] font-bold text-[16px] truncate max-w-[190px]">
        {title}
      </span>

      {/* Rating */}
      <div className="ml-auto w-[52px] h-[34px] rounded-[8px]
        bg-gradient-to-r from-[#D057DECC] to-[#56049CCC]
        shadow-[2px_0_4px_rgba(19,8,48,0.4)]
        flex items-center justify-center"
      >
        <span className="text-white font-semibold text-[16px]">
          {rating}
        </span>
      </div>
    </div>
  );
};

export default TopShowContainer;
