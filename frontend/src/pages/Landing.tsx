import MagnifyingGlass from "../assets/icons/magnifying_glass.svg"
import TopShadow from "../components/landing/TopShadow";
import MidShadow from "../components/landing/MidShadow";
import SearchShow from "../components/landing/searchShow/SearchShow";
import SearchPerson from "../components/landing/searchPerson/SearchPerson";

import { useState } from "react";

function Landing() {
  const [activeTab, setActiveTab] = useState<"shows" | "persons">("shows");
  const [searchTerm, setSearchTerm] = useState("");

  const handleScroll = () => {
    window.scrollTo({
      top: 800,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative min-h-[300vh] w-full
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

      <div className="absolute mt-[150px] rotate-180 page-title-ellipse top-[550px]" />

      <div className="mt-[350px] z-10 flex flex-col items-center">

        <form className="relative text-white z-10" onSubmit={(e) => e.preventDefault()}>
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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

      <div className="flex justify-between mt-10 gap-1 border-b border-gray-700 w-[500px] z-10">
        <button
          onClick={() => setActiveTab("shows")}
          className={`pb-2 w-full text-center
              ${activeTab === "shows"
              ? "border-b-3 border-white text-xl text-white"
              : "text-gray-400 text-md hover:text-gray-200"
            }
            `}
        >
          SHOWS
        </button>

        <button
          onClick={() => setActiveTab("persons")}
          className={`pb-2 w-full text-center
              ${activeTab === "persons"
              ? "border-b-3 border-white text-xl text-white"
              : "text-gray-400 text-md hover:text-gray-200"}
            `}
        >
          PERSONS
        </button>
      </div>

      {activeTab === "shows" && <SearchShow searchTerm={searchTerm} />}
      {activeTab === "persons" && <SearchPerson searchTerm={searchTerm} />}

    </div>
  )
}

export default Landing;
