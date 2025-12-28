import type { ExecutiveData } from "../../../types/executive";

interface ExecChart1InfoProps {
  chart1: ExecutiveData['chart1'];
}

function ExecChart1Info({ chart1 }: ExecChart1InfoProps) {
  const data = chart1;

  if (!data || data.length === 0) return null;

  // Hitung total show pertama dan terakhir sebagai proxy tren overall
  const first = data[0].titleCount;
  const last = data[data.length - 1].titleCount;

  let content = "";

  if (last > first * 1.1) {
    content =
      "Jumlah show yang tayang meningkat signifikan dari tahun sebelumnya. Perusahaan berada pada fase ekspansi produksi. Diperlukan penguatan manajemen produksi dan pengendalian kualitas.";
  } else if (last >= first * 0.9 && last <= first * 1.1) {
    content =
      "Jumlah show relatif stabil dari tahun sebelumnya. Kapasitas produksi dan perencanaan perusahaan berjalan konsisten. Strategi pemeliharaan kualitas perlu dipertahankan.";
  } else {
    content =
      "Jumlah show yang tayang menurun dari tahun sebelumnya. Terjadi penurunan kualitas dan strategi bisnis. Evaluasi arah produksi diperlukan.";
  }

  return (
    <p>{content}</p>
  );
}

export default ExecChart1Info;
