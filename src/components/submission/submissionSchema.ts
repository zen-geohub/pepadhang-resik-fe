import { isMobilePhone } from "validator"
import { z } from "zod";

export const submissionSchema = z
  .object({
    "Nama Pemohon": z.string().min(3, "Nama pemohon minimal 3 karakter!"),
    "Alamat Pemohon": z.string().min(8, "Alamat pemohon minimal 8 karakter!"),
    "Nama Perusahaan": z.string().optional(),
    "Nomor Induk Berusaha": z.string().optional(),
    "Nomor Telepon/Wa yang Masih Aktif": z
      .string()
      .refine(
        (value) => isMobilePhone(value, "id-ID"),
        "Nomor telepon tidak valid"
      ),

    Kemantren: z.string().min(1, "Kemantren tidak boleh kosong!"),
    Kelurahan: z.string().min(1, "Kelurahan tidak boleh kosong!"),
    "Koordinat Lintang": z.number().min(-90).max(90),
    "Koordinat Bujur": z.number().min(-180).max(180),
    "Sudut Simpang": z.string().min(1, "Sudut simpang tidak boleh kosong!"),
    "Lokasi Reklame": z.string().min(8, "Lokasi reklame minimal 8 karakter!"),
    "Rencana Penempatan": z.enum(
      [
        "Kategori Persil Orang atau Badan",
        "Kategori Persil Pemerintah, Pemerintah Daerah, dan/atau Fasilitas Umum",
      ],
      { required_error: "Rencana penempatan tidak boleh kosong!" }
    ),
    "Kategori Persil Orang atau Badan": z.string().optional(),
    "Kategori Persil Pemerintah, Pemerintah Daerah, dan/atau Fasilitas Umum": z
      .string()
      .optional(),

    "Jenis Reklame": z.string(),
    "Ukuran Panjang (m)": z
      .number()
      .positive()
      .min(1, "Panjang tidak boleh sama dengan 0"),
    "Ukuran Lebar (m)": z.number().positive().min(1),
    // "Ukuran Luas": z.number(),
    Naskah: z.enum(
      ["Produk Rokok", "Produk Alat Kontrasepsi", "Produk Lainnya"],
      { required_error: "Naskah tidak boleh kosong!" }
    ),
    "Naskah Produk Lainnya": z.string().optional(),
    "Sisi Hadap": z.string(),
    // KTP: z.instanceof(File).refine((file) => {
    //   file.size <= 5000000  ;
    // }, "Scan KTP dibutuhkan!"),
    // Simulasi: z.instanceof(File).refine((file) => {
    //   file.size <= 5000000  ;
    // }, "File Simulasi dibutuhkan!"),
  })
  .refine(
    (data) => {
      if (data.Naskah === "Produk Lainnya") {
        return !!data["Naskah Produk Lainnya"];
      }
      return true;
    },
    { message: "Naskah tidak boleh kosong!", path: ["Naskah Produk Lainnya"] }
  )
  .refine(
    (data) => {
      if (data["Rencana Penempatan"] === "Kategori Persil Orang atau Badan") {
        return !!data["Kategori Persil Orang atau Badan"];
      } else if (
        data["Rencana Penempatan"] ===
        "Kategori Persil Pemerintah, Pemerintah Daerah, dan/atau Fasilitas Umum"
      ) {
        return !!data[
          "Kategori Persil Pemerintah, Pemerintah Daerah, dan/atau Fasilitas Umum"
        ];
      }
      return true;
    },
    {
      message: "Kategori Persil harus diisi!",
      path: [
        "Kategori Persil Orang atau Badan",
        "Kategori Persil Pemerintah, Pemerintah Daerah, dan/atau Fasilitas Umum",
      ],
    }
  )
  .refine(
    (data) => {
      const area = data["Ukuran Panjang (m)"] * data["Ukuran Lebar (m)"];
      return area > 0;
    },
    {
      message: "Luas tidak boleh sama dengan 0",
      path: ["Ukuran Panjang (m)", "Ukuran Lebar (m)"],
    }
  )
  .refine(
    (data) => {
      const area = data["Ukuran Panjang (m)"] * data["Ukuran Lebar (m)"];
      return area <= 32;
    },
    {
      message: "Luas tidak boleh lebih dari 32",
      path: ["Ukuran Panjang (m)", "Ukuran Lebar (m)"],
    }
  );

export type SubmissionSchema = z.infer<typeof submissionSchema>;
// export default submissionSchema