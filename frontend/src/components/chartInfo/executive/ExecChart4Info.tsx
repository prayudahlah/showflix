import type { ExecutiveData } from "../../../types/executive";

interface ExecChart4InfoProps {
  chart4: ExecutiveData['chart4'];
}

function ExecChart4Info({ chart4 }: ExecChart4InfoProps) {
  const data = chart4;

  return (
    <>
      <p className="font-semibold">
        Perusahaan kuat pada genre
        <span className="text-secondary-2"> {data[0].genreName}</span>,
        <span className="text-secondary-2"> {data[1].genreName}</span>, dan
        <span className="text-secondary-2"> {data[2].genreName}</span>.
      </p>
      <br />
      <p>
        Genre terbukti berhasil dan menjadi kekuatan untuk perusahaan.
      </p>
    </>
  )
}

export default ExecChart4Info;
