import { Link } from "react-router-dom";

function AboutLink() {
  return (
    <div className="h-[36.91px] w-[289.80px] rounded-4xl flex justify-center items-center text-white pointer-events-auto
                    bg-linear-to-r from-primary2-2/30 via-primary2-2/50 to-primary2-2/30 shadow-[0_0px_30px_5px_rgba(86,4,156,0.5)]">
      <div className="h-[10.91px] w-[89.80px] rounded-4xl flex justify-center items-center text-white
                      bg-primary3-2/17 shadow-[0_0px_30px_5px_rgba(146,25,160,0.5)]">
        <Link to="/about" className="hover:text-[17px] active:scale-97 active:opacity-70 transition-all bg-transparent">
          About
        </Link>
      </div>
    </div>
  )
}

export default AboutLink;
