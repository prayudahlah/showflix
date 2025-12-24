import type { MarketingData } from "../../../types/marketing";

interface MarkChart3InfoProps {
  chart3: MarketingData['chart3'];
}

function MarkChart3Info({ chart3 }: MarkChart3InfoProps) {
  const data = chart3;

  // Hitung mayoritas awareness rendah
  const thresholdPopularity = 50; // contoh threshold
  const majorityLowAwareness = data.filter(d => (d.popularity ?? 0) < thresholdPopularity).length / data.length > 0.5;

  // Cari flagship show: popularity tertinggi
  const flagshipShow = data.reduce((prev, curr) => (curr.popularity ?? 0) > (prev.popularity ?? 0) ? curr : prev, data[0]);

  return (
    <>
      {majorityLowAwareness && (
        <>
          <p className="font-semibold">
            Mayoritas show memiliki tingkat awareness publik yang terbatas.
          </p>
          <br />
          <p>
            Namun, show <span className="text-secondary-2">{flagshipShow.primaryTitle}</span> menjadi flagship content dan kontributor utama terhadap popularitas.
          </p>
          <br />
          <p>
            Optimalisasi promosi pada show unggulan menjadi kunci untuk meningkatkan performa pemasaran dan profit secara keseluruhan.
          </p>
        </>
      )}
      {!majorityLowAwareness && (
        <>
          <p className="font-semibold">
            Mayoritas show memiliki awareness publik yang baik.
          </p>
          <br />
          <p>
            Show <span className="text-secondary-2">{flagshipShow.primaryTitle}</span> tetap menjadi konten unggulan dan fokus strategi promosi dapat diarahkan pada penguatan posisi flagship.
          </p>
        </>
      )}
    </>
  );
}

export default MarkChart3Info;
