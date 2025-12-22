export default function ShowsHeader() {
  return (
    <div
      className="
        w-full max-w-[1065px] h-[40px]
        mx-auto
        rounded-[10px]
        bg-gradient-to-r from-[#89189C]/59 to-[#56049C]/59
        shadow-[0_4px_4px_rgba(0,0,0,0.35)]
        backdrop-blur-[2px]
        grid grid-cols-[140px_1fr_100px] items-center px-8
      "
    >
      <div className="text-center text-white font-poppins font-semibold text-[20px]">Popularity</div>
      <div className="text-center text-white font-poppins font-semibold text-[20px]">Name</div>
      <div className="text-center text-white font-poppins font-semibold text-[20px]">Age</div>
    </div>
  );
}
