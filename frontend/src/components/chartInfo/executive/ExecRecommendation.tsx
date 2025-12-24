interface ExecRecommendationProps {
  selectedCompanyId: number;
}

function ExecRecommendation({ selectedCompanyId }: ExecRecommendationProps) {
  let content;

  switch (selectedCompanyId) {
    case 15295: // TVB
      content = (
        <>
          <p>
            Kebanyakan tayangan memperoleh rating di bawah 5, menunjukkan masalah kualitas produksi
            yang bersifat sistemik. Diperlukan perbaikan menyeluruh pada proses kreatif dan
            pengelolaan produksi.
          </p>
          <p>
            Sebagai pemimpin industri (peringkat 1), pengendalian kualitas harus diperkuat agar
            skala produksi tidak menurunkan performa. Jumlah tayangan menurun dibandingkan tahun
            sebelumnya, sehingga evaluasi strategi bisnis menjadi krusial.
          </p>
          <p>
            Kekuatan perusahaan berada pada genre Drama, Comedy, dan Reality. Format tayangan seperti
            <i> Girl with a Suitcase</i>, <i>Big Big World</i>, dan <i>Paternal Affairs</i> dapat
            dijadikan blueprint produksi selanjutnya.
          </p>
        </>
      );
      break;

    case 8666: // BBC
      content = (
        <>
          <p>
            Mayoritas program berada pada rentang rating 7–8, mencerminkan kapabilitas produksi yang
            kuat dan konsisten. Kondisi ini mendukung pengembangan dan ekspansi jangka panjang.
          </p>
          <p>
            Jumlah tayangan relatif stabil dari tahun sebelumnya, sehingga praktik perencanaan dan
            kontrol kualitas perlu dipertahankan dan dioptimalkan untuk diferensiasi konten.
          </p>
          <p>
            BBC unggul pada genre Documentary, Drama, dan Comedy. Tayangan seperti
            <i> Last Tango in Halifax</i>, <i>The Century of the Self</i>, dan <i>McMafia</i> layak
            dijadikan model produksi ke depan.
          </p>
        </>
      );
      break;

    case 9837: // Estúdios Globo
      content = (
        <>
          <p>
            Sebagian besar tayangan mencatat rating di bawah 5, mengindikasikan rendahnya mutu
            produksi dan kebutuhan intervensi pada proses kreatif serta manajerial.
          </p>
          <p>
            Meski demikian, kapasitas produksi perusahaan besar dan daya saing tinggi. Fokus pada
            optimasi dan diferensiasi konten menjadi prioritas strategis.
          </p>
          <p>
            Jumlah tayangan menurun dari tahun sebelumnya sehingga evaluasi strategi bisnis perlu
            segera dilakukan. Genre unggulan meliputi Drama, Soap, dan Comedy dengan contoh tayangan
            seperti <i>Brazil Avenue</i>, <i>Choque de Cultura</i>, dan <i>Above Justice</i>.
          </p>
        </>
      );
      break;

    case 2026: // NHK
      content = (
        <>
          <p>
            Mayoritas program memiliki rating di bawah 5, menunjukkan perlunya perbaikan kualitas
            produksi secara menyeluruh.
          </p>
          <p>
            Perusahaan berada pada posisi kompetitif menengah atas dan mengalami peningkatan jumlah
            tayangan year-on-year yang signifikan. Penguatan manajemen produksi menjadi krusial untuk
            menjaga pertumbuhan.
          </p>
          <p>
            Genre unggulan meliputi Drama, Documentary, dan Family. Tayangan seperti
            <i> Apocalypse: The Second World War</i>, <i>To Your Eternity</i>, dan
            <i> Future Boy Conan</i> dapat dijadikan referensi produksi mendatang.
          </p>
        </>
      );
      break;

    case 15890: // Česká televize
      content = (
        <>
          <p>
            Sebagian besar tayangan memperoleh rating di bawah 5, menunjukkan masalah kualitas
            produksi yang perlu ditangani secara terukur.
          </p>
          <p>
            Perusahaan berada pada posisi kompetitif menengah atas namun mengalami penurunan jumlah
            tayangan dibandingkan tahun sebelumnya, sehingga evaluasi strategi diperlukan.
          </p>
          <p>
            Kekuatan genre terletak pada Documentary, Kids, dan Drama. Tayangan seperti
            <i> Most!</i>, <i>Soul Care</i>, dan <i>Methanol</i> terbukti berkualitas dan dapat
            dijadikan blueprint.
          </p>
        </>
      );
      break;

    case 11454: // Warner Bros. Television
      content = (
        <>
          <p>
            Mayoritas program berada pada rentang rating 7–8, mencerminkan kapabilitas produksi yang
            kuat dan stabil.
          </p>
          <p>
            Kapasitas produksi relatif lebih terbatas dibanding pemimpin pasar, sehingga fokus pada
            spesialisasi konten akan meningkatkan daya saing.
          </p>
          <p>
            Genre unggulan meliputi Drama, Comedy, dan Sci-Fi & Fantasy. Tayangan seperti
            <i> 11.22.63</i>, <i>Young Sheldon</i>, dan <i>The Kominsky Method</i> layak dijadikan
            blueprint produksi.
          </p>
        </>
      );
      break;

    case 14398: // Televisa
      content = (
        <>
          <p>
            Mayoritas tayangan mencatat rating 7–8, menandakan kapabilitas produksi yang baik dan
            konsisten.
          </p>
          <p>
            Jumlah tayangan meningkat signifikan dari tahun sebelumnya sehingga penguatan kontrol
            kualitas perlu dilakukan untuk menopang pertumbuhan.
          </p>
          <p>
            Genre unggulan adalah Drama, Soap, dan Comedy. Tayangan seperti
            <i> El Chavo del Ocho</i>, <i>Rebelde</i>, dan <i>40 y 20</i> dapat dijadikan blueprint.
          </p>
        </>
      );
      break;

    case 11703: // DR TV
      content = (
        <>
          <p>
            Mayoritas program memperoleh rating di bawah 5, menunjukkan kinerja kualitas produksi
            yang rendah dan perlunya perbaikan menyeluruh.
          </p>
          <p>
            Kontribusi produksi relatif rendah, sehingga strategi berbasis kualitas atau niche market
            layak dipertimbangkan. Jumlah tayangan meningkat signifikan dari tahun sebelumnya.
          </p>
          <p>
            Genre unggulan meliputi Documentary, Kids, dan Family. Tayangan seperti
            <i> Ride Upon the Storm</i>, <i>Troldspejlet</i>, dan
            <i> Nissebanden i Grønland</i> dapat dijadikan acuan.
          </p>
        </>
      );
      break;

    case 20368: // Universal Television
      content = (
        <>
          <p>
            Mayoritas program berada pada rentang rating 7–8, menunjukkan kapabilitas produksi yang
            sehat.
          </p>
          <p>
            Kontribusi produksi relatif rendah dan jumlah tayangan menurun dari tahun sebelumnya,
            sehingga evaluasi arah produksi dan strategi bisnis diperlukan.
          </p>
          <p>
            Genre unggulan meliputi Drama, Comedy, dan Crime. Tayangan seperti
            <i> Law & Order: SVU</i>, <i>Late Night with Conan O'Brien</i>, dan
            <i> Zoey's Extraordinary Playlist</i> dapat dijadikan blueprint.
          </p>
        </>
      );
      break;

    case 17505: // TV 2
      content = (
        <>
          <p>
            Sebagian besar tayangan memperoleh rating di bawah 5, menggambarkan masalah kualitas
            produksi secara menyeluruh.
          </p>
          <p>
            Kontribusi produksi relatif rendah namun jumlah tayangan meningkat signifikan dari tahun
            sebelumnya, sehingga penguatan manajemen produksi dan kontrol kualitas sangat diperlukan.
          </p>
          <p>
            Kekuatan genre terletak pada Documentary, Reality, dan Comedy. Tayangan seperti
            <i> Klovn</i>, <i>Seaside Hotel</i>, dan <i>Minkavlerne</i> layak dijadikan blueprint.
          </p>
        </>
      );
      break;

    default:
      content = (
        <p className="text-sm opacity-70">
          Tidak ada rekomendasi yang tersedia untuk perusahaan ini.
        </p>
      );
  }

  return content;
}

export default ExecRecommendation;
