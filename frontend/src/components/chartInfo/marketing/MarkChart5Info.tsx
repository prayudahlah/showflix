import type { MarketingData } from "../../../types/marketing";

interface MarkChart5InfoProps {
  chart5: MarketingData['chart5'];
}

function MarkChart5Info({ chart5 }: MarkChart5InfoProps) {
  const data = chart5;

  return (
    <>
      <p className="font-semibold">
        <span className="text-secondary-2">{data[0].primaryTitle}</span>,
        <span className="text-secondary-2"> {data[1].primaryTitle}</span>, dan
        <span className="text-secondary-2"> {data[2].primaryTitle} </span>
        menjadi show terbaik perusahaan.
      </p>
      <br />
      <p>Show terbukti menarik penonton dan berkualitas.</p>
      <br />
      <p>Marketing dapat memperhatikan show tersebut untuk ditonjolkan atau untuk melihat keberhasilan marketing lalu.</p>
    </>
  )
}

export default MarkChart5Info;

// 
