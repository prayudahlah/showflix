import type { MarketingData } from "../../../types/marketing";

interface MarkChart4InfoProps {
  chart4: MarketingData['chart4'];
}

function MarkChart4Info({ chart4 }: MarkChart4InfoProps) {
  const data = chart4;
  const genreConnectionCount = new Map<string, number>();

  data.forEach(item => {
    genreConnectionCount.set(item.genreName, (genreConnectionCount.get(item.genreName) || 0) + 1);
  });

  const topGenres = Array.from(genreConnectionCount.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([genreName]) => genreName)

  return (
    <>
      <p className="font-semibold">
        <span className="text-secondary-2">{topGenres[0]}</span>,
        <span className="text-secondary-2"> {topGenres[1]}</span>,
        <span className="text-secondary-2"> {topGenres[2]}</span>,
        <span className="text-secondary-2"> {topGenres[3]}</span>, dan
        <span className="text-secondary-2"> {topGenres[4]} </span>
        merupakan genre utama yang berkontribusi terhadap top show perusahaan.
      </p>
      <br />
      <p>
        Kontribusi ini mencerminkan pola spesialisasi produksi dan preferensi pasar.
      </p>
      <br />
      <p>
        Strategi pengembangan konten dan promosi sebaiknya difokuskan untuk meningkatkan kinerja perusahaan.
      </p>
    </>
  )
}

export default MarkChart4Info;
