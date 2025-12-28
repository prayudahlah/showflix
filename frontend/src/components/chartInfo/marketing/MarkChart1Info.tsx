import type { MarketingData } from "../../../types/marketing";

interface MarkChart1InfoProps {
  chart1: MarketingData['chart1'];
}

function MarkChart1Info({ chart1 }: MarkChart1InfoProps) {
  const data = chart1;
  const bestRegion = data[data.length - 1].regionName;

  return (
    <>
      <p className="font-semibold">
        <span className="text-secondary-2">{bestRegion} </span>
        menjadi pasar utama perusahaan.
      </p>
      <br />
      <p>
        <span className="text-secondary-2">{bestRegion} </span>
        memiliki kontribusi audiens dan potensi komersial tertinggi bagi perusahaan.
      </p>
      <br />
      <p>
        Seluruh strategi distribusi, promosi, dan pemasaran sebaiknya diprioritaskan pada pasar ini untuk memaksimalkan eksposur dan pendapatan.
      </p>
    </>
  )
}

export default MarkChart1Info;

//   
