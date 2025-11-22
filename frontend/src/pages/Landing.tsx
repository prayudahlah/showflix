import MagnifyingGlass from "../assets/icons/magnifying_glass.svg"
import TopShadow from "../components/landing/TopShadow";
import MidShadow from "../components/landing/MidShadow";

function Landing() {
  const handleScroll = () => {
    window.scrollTo({
      top: 800,
      behavior: "smooth",
    });
  };

  return (
    <div className="absolute top-0 right-0 left-0 h-[2700px] 
                    bg-primary1-2 flex flex-col items-center -z-20 overflow-x-hidden">
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
                      shadow-[0_0_10px_2px_rgba(208,87,222,0.5)] 
                      focus:outline-none focus:shadow-[0_0_30px_4px_rgba(208,87,222,0.5)]
                      focus:ring-2 focus:ring-primary2-1
                      search-bar transition-all"
          />

          <img src={MagnifyingGlass} className="absolute top-[11px] right-[20px]" />
        </form>
      </div>
    </div>
  )
}

export default Landing;
