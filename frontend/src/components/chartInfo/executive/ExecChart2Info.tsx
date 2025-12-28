import type { ExecutiveData } from "../../../types/executive";

interface ExecChart2InfoProps {
  chart2: ExecutiveData['chart2'];
}

function ExecChart2Info({ chart2 }: ExecChart2InfoProps) {
  const data = chart2;

  const top = data.reduce((prev, curr) => (
    curr.frequency > prev.frequency ? curr : prev
  ), data[0]);

  let content;

  if (top.ratingStart < 5) {
    content = (
      <>
        <p className="font-semibold">Mayoritas show memiliki rating &lt; 5</p>
        <br />
        <p>Kinerja kualitas produksi rendah secara sistemik.</p>
        <br />
        <p>Harus dilakukan perbaikan menyeluruh pada proses kreatif dan manajerial.</p>
      </>
    );
  } else if (top.ratingStart >= 5 && top.ratingStart < 6) {
    content = (
      <>
        <p className="font-semibold">Mayoritas show memiliki rating antara 5-6</p>
        <br />
        <p>Produk berada pada tingkat kualitas marginal.</p>
        <br />
        <p>Diperlukan peningkatan signifikan pada kualitas kreatif dan manajerial.</p>
      </>
    );
  } else if (top.ratingStart >= 6 && top.ratingStart < 7) {
    content = (
      <>
        <p className="font-semibold">Mayoritas show memiliki rating antara 6-7</p>
        <br />
        <p>Kualitas produksi show stabil dan dapat diterima pasar.</p>
        <br />
        <p>Namun, tetap diperlukan konsistensi dan optimalisasi produksi.</p>
      </>
    );
  } else if (top.ratingStart >= 7 && top.ratingStart < 8) {
    content = (
      <>
        <p className="font-semibold">Mayoritas show memiliki rating antara 7-8</p>
        <br />
        <p>Perusahaan sudah memiliki kapabilitas produksi yang kuat.</p>
        <br />
        <p>Kondisi ini mendukung pengembangan dan ekspansi jangka panjang.</p>
      </>
    );
  } else if (top.ratingStart >= 8) {
    content = (
      <>
        <p className="font-semibold">Mayoritas show memiliki rating &gt; 8</p>
        <br />
        <p>Perusahaan memiliki kinerja kualitas unggul.</p>
        <br />
        <p>Fokus sebaiknya diarahkan pada penguatan merek dan ekspansi pasar.</p>
      </>
    );
  }

  return content
}

export default ExecChart2Info;
