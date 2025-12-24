import type { ExecutiveData } from "../../../types/executive";

interface ExecChart3InfoProps {
  chart3: ExecutiveData['chart3'];
  selectedCompanyId?: number;
}

function ExecChart3Info({ chart3, selectedCompanyId }: ExecChart3InfoProps) {
  const data = chart3;
  let content;

  const rank = data.findIndex(d => d.companyId === selectedCompanyId) + 1;

  if (rank === 1) {
    content = (
      <>
        <p className="font-semibold">Perusahaan mendominasi kapasitas produksi industri sebagai peringkat 1.</p>
        <br />
        <p>Diperlukan penguatan pengendalian kualitas agar skala tidak menurunkan performa.</p>
      </>
    );
  } else if (rank >= 2 && rank <= 3) {
    content = (
      <>
        <p className="font-semibold">Perusahaan memiliki kapasitas tinggi dan daya saing kuat (peringkat {rank}).</p>
        <br />
        <p>Diperlukan optimalisasi dan diferensiasi konten prioritas.</p>
      </>
    );
  } else if (rank >= 4 && rank <= 5) {
    content = (
      <>
        <p className="font-semibold">Perusahaan berada pada posisi kompetitif menengah atas (peringkat {rank}).</p>
        <br />
        <p>Strategi ekspansi dan peningkatan kualitas disarankan.</p>
      </>
    );
  } else if (rank >= 6 && rank <= 7) {
    content = (
      <>
        <p className="font-semibold">Kapastias produksi relatif terbatas tertinggal dibanding pemimpin pasar (peringkat {rank}).</p>
        <br />
        <p>Fokus pada segmentasi pasar atau spesialisasi konten.</p>
      </>
    );
  } else if (rank >= 8 && rank <= 10) {
    content = (
      <>
        <p className="font-semibold">Perusahaan memiliki kontribusi produksi yang rendah dibanding kompetitor (peringkat {rank}).</p>
        <br />
        <p>Strategi berbasis kualitas show atau niche market menjadi opsi.</p>
      </>
    );
  } else {
    content = (
      <p className="font-semibold text-gray-400">Perusahaan tidak ditemukan dalam data produksi.</p>
    );
  }

  return content;
}

export default ExecChart3Info;
