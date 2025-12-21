import { Link } from "react-router";

interface PersonCardProps {
  personId: string;
  popularity?: number;
  primaryName?: string;
  profession?: string;
  birthYear?: number;
  deathYear?: number;
}

export default function ShowCard({
  personId,
  popularity,
  primaryName,
  profession,
  birthYear,
  deathYear
}: PersonCardProps) {
  const age = getAge(deathYear, birthYear)

  return (
    <Link
      to={`/person/${personId}`}
      className="
        block relative
        w-full max-w-[1065px] h-[90px]
        mx-auto mt-4
        border border-[#56049C]
        shadow-inner-[2px_2px_10px_#34045D]
        rounded-[10px]
        px-4
        grid grid-cols-[140px_1fr_100px]
        items-center gap-x-4
        text-left
        cursor-pointer
        transition
        hover:bg-white/5
        focus:outline-none
        focus:ring-2 focus:ring-purple-500
        active:scale-[0.99]
      "
    >
      {/* Rating */}
      <div className="flex items-center justify-center">
        <div className="w-[140px] h-[70px] rounded-[20px] bg-gradient-to-br from-[#AF346B] via-[#983182] to-[#5328C7] shadow-[0_0_2px_2px_rgba(138,0,255,0.5)] flex items-center justify-center">
          <div className="w-full h-full rounded-[15px] bg-gradient-to-br from-[rgba(208,87,222,0.9)] via-[rgba(86,4,156,0.45)] to-[rgba(19,8,48,0.18)] border border-[rgba(19,8,48,0.3)] flex items-center justify-center text-white font-urbanist font-semibold text-[32px]">
            {popularity ? popularity.toFixed(2) : "-"}
          </div>
        </div>
      </div>

      {/* Title & Genres */}
      <div className="flex flex-col justify-center ml-4">
        <span className="text-white font-urbanist font-semibold text-[26px] leading-[130%] truncate max-w-[450px]">
          {primaryName ?? "-"}
        </span>
        <span className="text-white font-poppins font-normal text-[14px] leading-[170%] mt-1">
          {profession ?? "-"}
        </span>
      </div>


      {/* Duration */}
      <div className="text-center text-white font-poppins font-normal text-[18px]">
        {age}
      </div>
    </Link>
  );
}

function getAge(birthYear?: number, deathYear?: number) {
  if (!birthYear) {
    return "-"
  }
  if (!deathYear) {
    const date = new Date();
    return date.getFullYear() - birthYear
  }

  return deathYear - birthYear
}
