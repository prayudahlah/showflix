import type { ExecutiveData } from "../../../types/executive";

interface ExecChart1InfoProps {
  chart1: ExecutiveData['chart1'];
}

function ExecChart1Info({ chart1 }: ExecChart1InfoProps) {
  const data = chart1;
  let content;

  return (
    <>
      <p> NANTI DULU YA</p>
    </>
  )
}

export default ExecChart1Info;
