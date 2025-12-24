import type { ExecutiveData } from "../../../types/executive";

interface ExecChart5InfoProps {
  chart5: ExecutiveData['chart5'];
}

function ExecChart5Info({ chart5 }: ExecChart5InfoProps) {
  const data = chart5;

  return (
    <>
      <p className="font-semibold">
        Show
        <span className="text-secondary-2"> {data[0].primaryTitle}</span>,
        <span className="text-secondary-2"> {data[1].primaryTitle}</span>, dan
        <span className="text-secondary-2"> {data[2].primaryTitle}</span>
        menjadi show terbaik perusahaan.
      </p>
      <br />
      <p>Show terbukti menarik penonton dan berkualitas.</p>
      <br />
      <p>Show tersebut dapat dijadikan blueprint show yang akan diproduksi kedepannya.</p>
    </>
  )
}

export default ExecChart5Info;
