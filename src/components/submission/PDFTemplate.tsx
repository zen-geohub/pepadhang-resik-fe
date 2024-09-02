import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { SubmissionSchema } from "./submissionSchema";

Font.register({
  family: "PT Serif",
  src: "https://fonts.gstatic.com/s/ptserif/v8/EgBlzoNBIHxNPCMwXaAhYPesZW2xOQ-xsNqO47m55DA.ttf",
});

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 60,
    fontFamily: "PT Serif",
  },
  title: {
    // fontFamily: "PT Serif",
    fontSize: 14,
    textAlign: "center",
    textDecoration: "underline",
    marginBottom: 20,
  },
  section: {
    // margin: 10,
    flexDirection: "column",
  },
  text: {
    margin: 5,
    fontSize: 12,
    textAlign: "justify",
    lineHeight: "1.2",
  },
});

const listDasarHukum = [
  "Undang-undang Nomor 26 Tahun 2007 tentang Penataan Ruang sebagaimana telah diubah dengan Undang-undang Nomor 11 Tahun 2020 tentang Cipta Kerja",
  "Peraturan Pemerintah Nomor 21 Tahun 2021 tentang Penyelenggaraan Penataan Ruang",
  "Peraturan Daerah Nomor 2 Tahun 2021 tentang Rencana Tata Ruang Wilayah Kota Yogyakarta Tahun 2021-2041",
  "Peraturan Walikota Yogyakarta Nomor 118 Tahun 2021 tentang Rencana Detail Tata Ruang Kota Yogyakarta Tahun 2021-2041",
  "Peraturan Daerah Kota Yogyakarta Nomor 6 Tahun 2022 tentang Reklame",
  "Peraturan Walikota Yogyakarta Nomor 32 Tahun 2023 Tentang Peraturan Pelaksanaan Peraturan Daerah Kota Yogyakarta Nomor 6 Tahun 2022 Tentang Reklame",
  "Telaah Dinas Pertanahan dan Tata Ruang Kota Yogyakarta Nomor 305 / TKKPRR / DPTR / II / 2024 Tanggal 22 Februari 2024",
];

// const ketentuanTeknis = [
//   "Ketinggian bidang reklame terbawah minimal 5 (lima) meter dari permukaan tanah;",
//   "Zona Khusus, yaitu zona yang tidak diperbolehkan penyelenggaraan reklame, kecuali untuk jenis Reklame Papan Nama Usaha/Profesi yang melekat di bangunan dan/atau Reklame Insidental;",
//   "Naskah reklame di atas gedung merupakan nama usaha yang berada pada gedung tempat diselenggaraknnya usaha bersangkutan;",
//   "Reklame yang melekat/menempel pada bangunan harus memenuhi syarat paling besar 40% dari keluasan fasad;",
//   "Penempatan bidang reklame di atas gedung tidak melampaui fasad bangunan;",
//   "Penempatan reklame pada sudut simpang jalan berlaku ketentuan sesuai dengan fungsi jalan yang membentuk simpang;",
//   "Jarak antar titik Reklame Besar dan/atau Reklame Sedang ditetapkan minimal 50 (lima puluh) meter;",
//   "Penentuan titik awal jarak penempatan reklame diambil dari batas terluar radius sudut simpang sesuai dengan ketentuan pada sudut simpang tersebut;",
//   "Penempatan reklame produk rokok dilarang diselenggarakan: (1) di jalan utama atau jalan protokol, (2) melintang atau memotong jalan, (3) radius 75 meter dari fasilitas sosial/fasilitas umum;",
//   "Penempatan reklame di Zona Kendali Ketat harus membujur atau searah jalan kecuali reklame yang berada di sudut simpang jalan;",
//   "Menggunakan ornamen, desain, atau naskah reklame yang mengandung nilai-nilai keistimewaan Yogyakarta pada reklame di Zona Khusus atau Zona Kendali Ketat."
// ];

const ketentuanLainnya = [
  "Kesesuaian Kegiatan Pemanfaatan Ruang (KKPR) BUKANLAH IZIN, namun dokumen yang berisikan informasi tentang ketentuan tata ruang pada lokasi yang dimaksud sesuai dengan ketentuan peraturan yang berlaku;",
  "Dalam hal Kesesuaian Kegiatan Pemanfaatan Ruang (KKPR) dipergunakan untuk pengajuan Persetujuan Bangunan Gedung (PBG) Konstruksi Reklame, apabila diperlukan persyaratan lain berdasarkan aturan lain yang terkait, maka pemohon wajib mengikuti aturan tersebut;",
  "Apabila terjadi perubahan peraturan, maka informasi ketentuan tata ruang ini dinyatakan tidak berlaku;",
  "Apabila ada kekeliruan maka informasi ketentuan tata ruang ini dapat ditinjau ulang.",
];

type FormDataProps = {
  label: string;
  value: string | number;
};

function FormData({ label, value }: FormDataProps) {
  return (
    <View style={{ marginLeft: 20, display: "flex", flexDirection: "row" }}>
      <Text style={[styles.text, { width: "35%" }]}>{label}</Text>
      <Text style={styles.text}>:</Text>
      <Text style={[styles.text, { width: "65%" }]}>{value}</Text>
    </View>
  );
}

type PDFProps = {
  result: SubmissionSchema;
};

const PDFTemplate = ({ result }: PDFProps) => {
  const area = result["Ukuran Panjang (m)"] * result["Ukuran Lebar (m)"];
  let size;

  if (area < 12) {
    size = "Kecil";
  } else if (area >= 12 && area < 24) {
    size = "Sedang";
  } else {
    size = "Besar";
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>
            KESESUAIAN KEGIATAN PEMANFAATAN RUANG (KKPR)
          </Text>
          <Text style={styles.text}>DASAR HUKUM</Text>
        </View>

        {listDasarHukum.map((item, index) => {
          return (
            <View key={index} style={{ display: "flex", flexDirection: "row" }}>
              <Text style={[styles.text]}>{index + 1}.</Text>
              <Text style={[styles.text]}>{item}</Text>
            </View>
          );
        })}

        {/* <View style={styles.section}>
          <Text>A. Keterangan Lokasi</Text>
          <Text>{result["Rencana Penempatan"]}</Text>
        </View> */}
        {/* {Object.entries(result).map(([key, value], index) => {
          return <FormData key={index} label={`${index + 1}) ${key}`} value={value} />;
        })} */}

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            backgroundColor: "#C8C8C8",
          }}
        >
          <Text style={styles.text}>A.</Text>
          <Text style={[styles.text, { textDecoration: "underline" }]}>
            Data Pemohon
          </Text>
        </View>
        <FormData label="1) Nama" value={result["Nama Pemohon"]} />
        <FormData label="2) Alamat" value={result["Alamat Pemohon"]} />
        <FormData
          label="3) Nomor Telepon/WA"
          value={result["Nomor Telepon/Wa yang Masih Aktif"]}
        />
        {result["Nama Perusahaan"] !== "" ? (
          <FormData
            label="4) Nama Perusahaan"
            value={result["Nama Perusahaan"] || ""}
          />
        ) : null}
        {result["Nomor Induk Berusaha"] !== "" ? (
          <FormData
            label="5) NIB"
            value={result["Nomor Induk Berusaha"] || ""}
          />
        ) : null}

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            backgroundColor: "#C8C8C8",
          }}
        >
          <Text style={styles.text}>B.</Text>
          <Text style={[styles.text, { textDecoration: "underline" }]}>
            Keterangan Lokasi
          </Text>
        </View>
        <FormData label="1) Sudut Simpang" value={result["Sudut Simpang"]} />
        <FormData
          label="2) Koordinat Lintang"
          value={result["Koordinat Lintang"]}
        />
        <FormData
          label="3) Koordinat Bujur"
          value={result["Koordinat Bujur"]}
        />
        <FormData label="4) Kemantren" value={result["Kemantren"]} />
        <FormData label="5) Kelurahan" value={result["Kelurahan"]} />
        <FormData label="6) Lokasi Reklame" value={result["Lokasi Reklame"]} />
        <FormData
          label="7) Rencana Penempatan"
          value={result["Rencana Penempatan"]}
        />
        {result["Rencana Penempatan"] === "Kategori Persil Orang atau Badan" ? (
          <FormData
            label="8) Kategori Persil"
            value={result["Kategori Persil Orang atau Badan"] || ""}
          />
        ) : (
          <FormData
            label="8) Kategori Persil"
            value={
              result[
                "Kategori Persil Pemerintah, Pemerintah Daerah, dan/atau Fasilitas Umum"
              ] || ""
            }
          />
        )}
        {/* <FormData label="9) Denah Lokasi" value={"Coming soon"} /> */}

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            backgroundColor: "#C8C8C8",
          }}
        >
          <Text style={styles.text}>C.</Text>
          <Text style={[styles.text, { textDecoration: "underline" }]}>
            Spesifikasi Reklame
          </Text>
        </View>
        <FormData label="1) Jenis Reklame" value={result["Jenis Reklame"]} />
        <FormData
          label="2) Ukuran Panjang (m)"
          value={result["Ukuran Panjang (m)"]}
        />
        <FormData
          label="3) Ukuran Lebar (m)"
          value={result["Ukuran Lebar (m)"]}
        />
        <FormData
          label="4) Ukuran Luas (m&sup2;)"
          value={`${
            result["Ukuran Panjang (m)"] * result["Ukuran Lebar (m)"]
          } m²;`}
        />
        <FormData label="5) Kategori Ukuran" value={size} />
        <FormData label="6) Sisi Hadap" value={result["Sisi Hadap"]} />
        {/* <FormData label="7) Foto" value={"Coming soon"} /> */}
        <FormData label="7) Naskah" value={result["Naskah"]} />
        {result["Naskah Produk Lainnya"] !== "" ? (
          <FormData
            label="6) Naskah Produk Lainnya"
            value={result["Naskah Produk Lainnya"] || ""}
          />
        ) : null}

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            backgroundColor: "#C8C8C8",
          }}
        >
          <Text style={styles.text}>D.</Text>
          <Text style={[styles.text, { textDecoration: "underline" }]}>
            Kesimpulan
          </Text>
        </View>
        {/* <FormData label="1) Pola pemanfaatan ruang" value={"Coming soon"} /> */}
        {/* <FormData label="2) Ketentuan Zonasi" value={"Coming soon"} /> */}
        {/* <FormData label="3) Ketentuan Lainnya" value={"Coming soon"} /> */}

        {/* {Object.entries(result).map(([key, value], index) => {
          return (
            <View key={index}>
              <Text style={styles.text}>
                {key} : {value}
              </Text>
            </View>
          );
        })} */}
        {/* <View style={styles.section}>
          {Object.entries(result).map(([key, value]) => {
            // console.log(index, key, value);
            return (
              <Text key={key} style={styles.text}>
                {key} : {value}
              </Text>
            );
          })}
        </View> */}
        {/* <View style={styles.section}>
          <Text style={styles.text}>Ketentuan Teknis</Text>
          {ketentuanTeknis.map((item, index) => {
            return (
              <View key={index} style={{ display: "flex", flexDirection: "row" }}>
                <Text style={styles.text}>{index + 1})</Text>
                <Text style={styles.text}>{item}</Text>
              </View>
            );
          })}
        </View> */}

        <View style={styles.section}>
          {/* head */}
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text style={styles.text}>1.</Text>
            <Text style={styles.text}>Ketentuan Teknis</Text>
          </View>

          {/* content */}
          <View
            style={{ display: "flex", flexDirection: "row", marginLeft: 20 }}
          >
            <Text style={styles.text}>a.</Text>
            <Text style={styles.text}>
              Setiap penyelenggaraan reklame wajib mendapatkan izin;
            </Text>
          </View>
          <View
            style={{ display: "flex", flexDirection: "row", marginLeft: 20 }}
          >
            <Text style={styles.text}>b.</Text>
            <Text style={styles.text}>
              Kegiatan yang dimohonkan berada pada Zona di Wilayah SWP
              (Kemantren {result["Kemantren"]});
            </Text>
          </View>

          {/* content with sub-content */}
          <View
            style={{ display: "flex", flexDirection: "row", marginLeft: 20 }}
          >
            <Text style={styles.text}>c.</Text>
            <Text style={styles.text}>
              Kegiatan yang dimohonkan agar disesuaikan dengan ketentuan
              Peraturan Daerah Kota Yogyakarta Nomor 6 Tahun 2022 tentang
              Reklame dan Peraturan Walikota Yogyakarta Nomor 32 Tahun 2023
              Tentang Peraturan Pelaksanaan Peraturan Daerah Kota Yogyakarta
              Nomor 6 Tahun 2022 Tentang Reklame.
            </Text>
          </View>
          <View
            style={{ display: "flex", flexDirection: "row", marginLeft: 40 }}
          >
            <Text style={styles.text}>c.1.</Text>
            <Text style={styles.text}>
              Penempatan reklame produk rokok dilarang melintang atau memotong
              jalan;
            </Text>
          </View>

          {/* sub-content with sub-sub-content */}
          <View
            style={{ display: "flex", flexDirection: "row", marginLeft: 40 }}
          >
            <Text style={styles.text}>c.2.</Text>
            <Text style={styles.text}>
              Reklame papan/billboard harus memenuhi persyaratan sebagai
              berikut:
            </Text>
          </View>
          <View
            style={{ display: "flex", flexDirection: "row", marginLeft: 60 }}
          >
            <Text style={styles.text}>-</Text>
            <Text style={styles.text}>
              Bidang reklame dapat menjorok di atas trotoar dan/atau taman,
              dengan batas maksimal sampai sisi terdalam trotoar dan/atau taman,
              dengan ketinggian bidang reklame terbawah minimal 5 (lima) meter
              dari permukaan tanah;
            </Text>
          </View>
          <View
            style={{ display: "flex", flexDirection: "row", marginLeft: 60 }}
          >
            <Text style={styles.text}>-</Text>
            <Text style={styles.text}>
              Material berupa plat besi dengan konstruksi pipa/frame baja;
            </Text>
          </View>
          <View
            style={{ display: "flex", flexDirection: "row", marginLeft: 60 }}
          >
            <Text style={styles.text}>-</Text>
            <Text style={styles.text}>
              Langgam sesuai dengan konsep setiap toko/bangunan diselaraskan
              dengan nilai-nilai keistimewaan Yogyakarta;
            </Text>
          </View>
          {/* ---------------------------------------------------- */}

          <View
            style={{ display: "flex", flexDirection: "row", marginLeft: 40 }}
          >
            <Text style={styles.text}>c.3.</Text>
            <Text style={styles.text}>
              Penyelenggaraan reklame pada tanah persil Pemerintah, Pemerintah
              Daerah dan/atau fasilitas umum untuk reklame papan/billboard dan
              reklame videotron berlaku ketentuan pemanfaatan ruang milik
              Pemerintah/Pemerintah Daerah;
            </Text>
          </View>

          {/* sub-content with sub-sub-content */}
          <View
            style={{ display: "flex", flexDirection: "row", marginLeft: 40 }}
          >
            <Text style={styles.text}>c.4.</Text>
            <Text style={styles.text}>
              Penyelenggaraan reklame pada tanah persil Pemerintah, Pemerintah
              Daerah dan/atau fasilitas umum untuk reklame papan/billboard dan
              reklame videotron dapat ditempatkan di sisi terluar trotoar,
              dengan ketentuan:
            </Text>
          </View>
          <View
            style={{ display: "flex", flexDirection: "row", marginLeft: 60 }}
          >
            <Text style={styles.text}>-</Text>
            <Text style={styles.text}>
              Lebar trotoar minimal 1 (satu) meter;
            </Text>
          </View>
          <View
            style={{ display: "flex", flexDirection: "row", marginLeft: 60 }}
          >
            <Text style={styles.text}>-</Text>
            <Text style={styles.text}>
              Ditempatkan di luar bahu jalan atau trotoar dengan jarak minimal 1
              (satu) meter dari tepi paling luar bahu jalan atau trotoar;
            </Text>
          </View>
          <View
            style={{ display: "flex", flexDirection: "row", marginLeft: 60 }}
          >
            <Text style={styles.text}>-</Text>
            <Text style={styles.text}>
              Dalam hal tidak terdapat ruang di luar bahu jalan, trotoar, atau
              jalur lalu lintas, maka dapat ditempatkan di sisi terluar ruang
              milik jalan;
            </Text>
          </View>
          <View
            style={{ display: "flex", flexDirection: "row", marginLeft: 60 }}
          >
            <Text style={styles.text}>-</Text>
            <Text style={styles.text}>
              Ketinggian bidang Reklame terbawah minimal 5 (lima) meter dari
              trotoar;
            </Text>
          </View>
          <View
            style={{ display: "flex", flexDirection: "row", marginLeft: 60 }}
          >
            <Text style={styles.text}>-</Text>
            <Text style={styles.text}>
              Tidak mengganggu fungsi utilitas umum;
            </Text>
          </View>
          <View
            style={{ display: "flex", flexDirection: "row", marginLeft: 60 }}
          >
            <Text style={styles.text}>-</Text>
            <Text style={styles.text}>
              Mendapatkan rekomendasi teknis dari Perangkat Daerah yang
              menyelenggarakan urusan pemerintahan di bidang jalan.
            </Text>
          </View>
          {/* ---------------------------------------------------- */}

          <View
            style={{ display: "flex", flexDirection: "row", marginLeft: 40 }}
          >
            <Text style={styles.text}>c.5.</Text>
            <Text style={styles.text}>
              Dalam hal bidang Reklame menjorok di atas trotoar dan/atau taman,
              berlaku ketentuan pemanfaatan ruang milik Pemerintah/Pemerintah
              Daerah;
            </Text>
          </View>
          <View
            style={{ display: "flex", flexDirection: "row", marginLeft: 40 }}
          >
            <Text style={styles.text}>c.6.</Text>
            <Text style={styles.text}>
              Jarak antar titik Reklame Besar dan/atau Reklame Sedang ditetapkan
              minimal 50 (lima puluh) meter, diukur dari jarak titik tiang dalam
              satu ruas jalan yang sama di luar titik Reklame pada sudut
              simpang;
            </Text>
          </View>
          <View
            style={{ display: "flex", flexDirection: "row", marginLeft: 40 }}
          >
            <Text style={styles.text}>c.7.</Text>
            <Text style={styles.text}>
              Penentuan titik awal jarak penempatan Reklame diambil dari batas
              terluar radius sudut simpang sesuai dengan ketentuan pada sudut
              simpang;
            </Text>
          </View>

          {/* sub-content with sub-sub-content */}
          <View
            style={{ display: "flex", flexDirection: "row", marginLeft: 40 }}
          >
            <Text style={styles.text}>c.8.</Text>
            <Text style={styles.text}>
              Titik lokasi permohonan berada pada zona kendali ketat sehingga
              berlaku ketentuan sebagai berikut:
            </Text>
          </View>
          <View
            style={{ display: "flex", flexDirection: "row", marginLeft: 60 }}
          >
            <Text style={styles.text}>-</Text>
            <Text style={styles.text}>
              Penyelenggaraan Reklame wajib mengikuti ketentuan pengaturan pada
              kawasan cagar budaya;
            </Text>
          </View>
          <View
            style={{ display: "flex", flexDirection: "row", marginLeft: 60 }}
          >
            <Text style={styles.text}>-</Text>
            <Text style={styles.text}>
              Penempatan Reklame Besar dan/atau Reklame Sedang membujur atau
              searah jalan kecuali Reklame Besar dan/atau Reklame Sedang yang
              berada di sudut simpang jalan;
            </Text>
          </View>
          <View
            style={{ display: "flex", flexDirection: "row", marginLeft: 60 }}
          >
            <Text style={styles.text}>-</Text>
            <Text style={styles.text}>
              Reklame Besar dan/atau Reklame Sedang yang berada di sudut simpang
              jalan sebagaimana dimaksud pada poin ke 2 (dua) dapat ditempatkan
              secara menyerong sesuai orientasi sudut simpang;
            </Text>
          </View>
          <View
            style={{ display: "flex", flexDirection: "row", marginLeft: 60 }}
          >
            <Text style={styles.text}>-</Text>
            <Text style={styles.text}>
              Reklame Besar dan/atau Reklame Sedang yang menggunakan tiang wajib
              menggunakan ornamen, desain dan naskah yang mencitrakan
              nilai-nilai keistimewaan Yogyakarta;
            </Text>
          </View>
          {/* ---------------------------------------------------- */}

          <View
            style={{ display: "flex", flexDirection: "row", marginLeft: 40 }}
          >
            <Text style={styles.text}>c.9.</Text>
            <Text style={styles.text}>
              Penyelenggara reklame wajib memenuhi etika, estetika, standar
              teknis bangunan, keselamatan masyarakat dan nilai keistimewaan
              Yogyakarta;
            </Text>
          </View>
          {/* ///////////////////////////////////////////////////// */}

          <View
            style={{ display: "flex", flexDirection: "row", marginLeft: 20 }}
          >
            <Text style={styles.text}>d.</Text>
            <Text style={styles.text}>
              Terkait dengan ketentuan teknis lainnya menyangkut lokasi reklame,
              ukuran, pemasangan, larangan, dan ketentuan lainnya menyesuaikan
              dengan peraturan perundangan daerah yang berlaku khususnya tentang
              penyelenggaraan reklame dan peraturan pelaksanaannya;
            </Text>
          </View>
          <View
            style={{ display: "flex", flexDirection: "row", marginLeft: 20 }}
          >
            <Text style={styles.text}>d.</Text>
            <Text style={styles.text}>
              Telaah teknis ini digunakan untuk menerbitkan rekomendasi KKPR
              sebagai syarat pengajuan PBG dan/atau izin penyelenggaraan
              reklame, bukan untuk legalitas operasional kegiatan reklame
              (iklan).
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text style={styles.text}>2.</Text>
            <Text style={styles.text}>Ketentuan Lainnya</Text>
          </View>
          {ketentuanLainnya.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginLeft: 20,
                }}
              >
                <Text style={styles.text}>{index + 1})</Text>
                <Text style={styles.text}>{item}</Text>
              </View>
            );
          })}
        </View>
      </Page>
    </Document>
  );
};

export default PDFTemplate;
