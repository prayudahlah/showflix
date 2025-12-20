interface AkaContainerProps {
  title: string;
  rating: number | string;
}

const AkaContainer = ({ title, rating }: AkaContainerProps) => {
  return (
    <div className="relative w-[330px] h-[50px] rounded-[10px] border border-[#D057DE] flex items-center px-3">
      
      {/* Title */}
      <span className="ml-6 text-[#FFFFFF] font-bold text-[16px] truncate max-w-[190px]">
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

export default AkaContainer;
