import MagnifyingGlass from "../assets/icons/magnifying_glass.svg"
import TopShadow from "../components/landing/TopShadow";
import MidShadow from "../components/landing/MidShadow";
import LiquidGlass from "../components/landing/LiquidGlass";
import { useSearchShow } from "../hooks/useSearchShow";

function Landing() {
  const { mutate, isLoading, data } = useSearchShow();

  mutate({ searchTerm: "love", ratingMin: 7 });

  console.log(data)

  const handleScroll = () => {
    window.scrollTo({
      top: 800,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative min-h-screen w-full
                bg-primary1-2 flex flex-col items-center overflow-x-hidden">
      <TopShadow />

      <div className="flex flex-col items-center text-white mt-[180px] text-center page-title-ellipse">
        <h1 className="mt-[71px]">THE UNIVERSE OF STORIES</h1>
        <h4>Perfectly Organized</h4>
        <button
          className="border-2 border-primary3-2 py-1 w-[228px] rounded-4xl mt-[44px] mb-[80px] hover-scale shadow-md shadow-primary3-2"
          onClick={handleScroll}
        >
          START EXPLORING
        </button>
      </div>

      <MidShadow />

      <div className="flex flex-col items-center text-white mt-[150px] text-center rotate-180 page-title-ellipse" />

      <div className="-mt-[200px] ">
        <form className="relative text-white z-10">
          <input
            placeholder="Start Browsing"
            className="w-[800px] border-2 border-primary2-1 rounded-3xl py-2 px-4
                      shadow-[0_0_10px_2px_rgba(208,87,222,0.2)] 
                      focus:outline-none focus:shadow-[0_0_30px_4px_rgba(208,87,222,0.3)]
                      focus:ring-2 focus:ring-primary2-1
                      search-bar transition-all"
          />

          <img src={MagnifyingGlass} className="absolute top-[11px] right-[20px]" />
        </form>
      </div>

      {/*Tempat Filter*/}
      <LiquidGlass className="w-full max-w-[1080px] h-[150px] mt-30 px-8">
        <h2 className="text-white font-semibold text-xl mt-6 text-center">
          TEMPAT FILTER
        </h2>
      </LiquidGlass>

      {/*Tempat Shows*/}
      <LiquidGlass className="w-full max-w-[1080px] h-[1264px] mt-5 px-8">
        <h2 className="text-white font-semibold text-xl mt-6 text-center">
          TEMPAT SHOWS
        </h2>
      </LiquidGlass>

    </div>
  )
}

export default Landing;
