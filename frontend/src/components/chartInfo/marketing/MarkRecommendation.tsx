interface MarkRecommendationProps {
  selectedCompanyId: number;
}

function MarkRecommendation({ selectedCompanyId }: MarkRecommendationProps) {
  let content;

  switch (selectedCompanyId) {
    case 15295: // TVB
      content = (
        <>
          <p>
            TVB Jade merupakan mitra utama perusahaan dengan jangkauan pasar dan daya tarik
            komersial tertinggi. Optimalisasi strategi promosi dan co-marketing melalui network ini
            penting untuk meningkatkan eksposur dan pendapatan.
          </p>
          <p>
            Sebagian besar tayangan masih memiliki awareness publik yang terbatas. Fokuskan upaya
            promosi pada flagship seperti <i>Girl With a Suitcase</i>, <i>Big Big World</i>, dan
            <i> Paternal Affairs</i> untuk memperbaiki kinerja pemasaran dan meningkatkan profit.
          </p>
        </>
      );
      break;

    case 8666: // BBC
      content = (
        <>
          <p>
            BBC One menjadi mitra utama dengan jangkauan pasar dan daya tarik komersial terkuat.
            Seluruh strategi promosi dan co-marketing sebaiknya dioptimalkan melalui network ini
            untuk memaksimalkan eksposur dan pendapatan.
          </p>
          <p>
            Banyak program masih memiliki awareness terbatas. Prioritaskan promosi
            <i> The North Water</i> serta program unggulan lain untuk menjaga reputasi dan
            meningkatkan hasil pemasaran serta profitabilitas.
          </p>
        </>
      );
      break;

    case 9837: // Estúdios Globo
      content = (
        <>
          <p>
            TV Globo merupakan mitra utama dengan cakupan pasar dan daya tarik komersial terbesar.
            Optimalisasi promosi dan co-marketing melalui TV Globo perlu menjadi prioritas utama.
          </p>
          <p>
            Mayoritas tayangan memiliki awareness publik yang terbatas. Fokuskan pemasaran pada
            <i> Brazil Avenue</i>, <i>Choque de Cultura</i>, dan <i>Above Justice</i> untuk
            meningkatkan visibilitas dan pendapatan.
          </p>
        </>
      );
      break;

    case 2026: // NHK
      content = (
        <>
          <p>
            NHK merupakan mitra utama dengan jangkauan pasar dan daya tarik komersial tertinggi di
            pasar domestik Jepang.
          </p>
          <p>
            Sebagian besar tayangan masih memiliki awareness publik terbatas. Optimalisasi promosi
            pada <i>Apocalypse: The Second World War</i> serta seri unggulan lain penting untuk
            meningkatkan visibilitas dan pendapatan. Jepang perlu diprioritaskan sebagai pasar
            utama distribusi dan pemasaran.
          </p>
        </>
      );
      break;

    case 15890: // Česká televize
      content = (
        <>
          <p>
            CT1 merupakan mitra utama dengan jangkauan pasar dan daya tarik komersial tertinggi di
            Republik Ceko.
          </p>
          <p>
            Sebagian besar tayangan masih memiliki awareness publik terbatas. Fokuskan promosi pada
            <i> Most!</i>, <i>Soul Care</i>, dan <i>Methanol</i> untuk meningkatkan visibilitas dan
            monetisasi melalui strategi distribusi dan co-marketing lokal.
          </p>
        </>
      );
      break;

    case 11454: // Warner Bros. Television
      content = (
        <>
          <p>
            CBS menjadi mitra utama dengan jangkauan pasar dan daya tarik komersial terbesar bagi
            perusahaan.
          </p>
          <p>
            Banyak tayangan masih memiliki awareness publik terbatas. Fokuskan promosi pada
            <i> Young Sheldon</i>, <i>11.22.63</i>, dan <i>The Kominsky Method</i> untuk
            mempertahankan positioning premium dan meningkatkan hasil komersial di pasar Amerika
            Serikat.
          </p>
        </>
      );
      break;

    case 14398: // Televisa
      content = (
        <>
          <p>
            Las Estrellas merupakan mitra utama dengan jangkauan pasar dan daya tarik komersial
            tertinggi di Meksiko.
          </p>
          <p>
            Sebagian besar tayangan masih memiliki awareness publik terbatas. Fokuskan promosi pada
            <i> El Chavo del Ocho</i>, <i>Rebelde</i>, dan <i>40 y 20</i> untuk meningkatkan
            visibilitas, daya tarik komersial, serta pendapatan domestik.
          </p>
        </>
      );
      break;

    case 11703: // DR TV
      content = (
        <>
          <p>
            DR1 menjadi mitra utama dengan jangkauan pasar dan daya tarik komersial tertinggi di
            Denmark.
          </p>
          <p>
            Banyak tayangan masih memiliki awareness publik terbatas. Optimalisasi promosi pada
            <i> Ride Upon the Storm</i>, <i>Troldspejlet</i>, dan
            <i> Nissebanden i Grønland</i> penting untuk meningkatkan awareness dan monetisasi di
            pasar lokal.
          </p>
        </>
      );
      break;

    case 20368: // Universal Television
      content = (
        <>
          <p>
            NBC merupakan mitra utama dengan jangkauan pasar dan daya tarik komersial tertinggi di
            Amerika Serikat.
          </p>
          <p>
            Sebagian besar tayangan masih memiliki awareness publik terbatas. Fokuskan promosi pada
            <i> Law &amp; Order: Special Victims Unit</i>,
            <i> Late Night with Conan O'Brien</i>, dan
            <i> Zoey's Extraordinary Playlist</i> untuk memperkuat posisi flagship dan meningkatkan
            pendapatan.
          </p>
        </>
      );
      break;

    case 17505: // TV 2
      content = (
        <>
          <p>
            TV 2 merupakan mitra utama dengan jangkauan pasar dan daya tarik komersial tertinggi di
            Denmark.
          </p>
          <p>
            Mayoritas tayangan masih memiliki awareness publik terbatas. Fokuskan promosi pada
            <i> Klovn</i>, <i>Seaside Hotel</i>, dan <i>Minkavlerne</i> untuk meningkatkan visibilitas,
            monetisasi, serta pangsa pasar regional secara strategis.
          </p>
        </>
      );
      break;

    default:
      content = (
        <p className="text-sm opacity-70">
          Tidak tersedia rekomendasi pemasaran untuk perusahaan ini.
        </p>
      );
  }

  return content;
}

export default MarkRecommendation;
