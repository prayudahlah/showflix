import type { MarketingData } from "../../../types/marketing";

interface MarkChart2InfoProps {
  chart2: MarketingData['chart2'];
}

function MarkChart2Info({ chart2 }: MarkChart2InfoProps) {
  const data = chart2;

  return (
    <>
      <p className="font-semibold">
        <span className="text-secondary-2">{data[0].networkName} </span>
        menjadi mitra utama perusahaan.
      </p>
      <br />
      <p>
        <span className="text-secondary-2">{data[0].networkName} </span>
        memiliki jangkauan pasar dan daya tarik komersial tertinggi untuk perusahaan.
      </p>
      <br />
      <p>
        Seluruh strategi promosi dan co-marketing sebaiknya dioptimalkan melalui network ini untuk memaksimalkan eksposur dan pendapatan.
      </p>
    </>
  )
}

export default MarkChart2Info;
