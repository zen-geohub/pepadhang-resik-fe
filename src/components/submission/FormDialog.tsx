import { useFormContext } from "react-hook-form";
import { DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFTemplate from "./PDFTemplate";

const FormDialog = ({
  // form,
  formValue,
  image,
}: {
  // form: UseFormReturn<SubmissionSchema>;
  formValue: object;
  image: string;
}) => {
  // const { watch, formState } = form;
  const {watch, formState} = useFormContext()

  return (
    <DialogContent onInteractOutside={(e) => e.preventDefault()}>
      <DialogHeader>
        <DialogTitle className="text-center lg:font-bold">
          Data yang diajukan
        </DialogTitle>
      </DialogHeader>
      <div className="flex flex-col gap-2">
        <ScrollArea className="h-72">
          {formState.isValid ? (
            Object.entries(formValue).map(([key, value]) => {
              return (
                <p className="text-xs lg:text-base mb-1" key={key}>
                  <span className="font-semibold">{key}:</span> {value}
                </p>
              );
            })
          ) : (
            <p className="text-center text-destructive">
              Formulir tidak valid!
            </p>
          )}
        </ScrollArea>
        <div className="w-full flex justify-end gap-2">
          <Link to="/">
            <Button variant="ghost">Kembali ke beranda</Button>
          </Link>
          <PDFDownloadLink
            document={
              <PDFTemplate
                image={image}
                result={{
                  "Nama Pemohon": watch("Nama Pemohon"),
                  "Alamat Pemohon": watch("Alamat Pemohon"),
                  "Nomor Telepon/Wa yang Masih Aktif": watch(
                    "Nomor Telepon/Wa yang Masih Aktif"
                  ),
                  "Nama Perusahaan": watch("Nama Perusahaan"),
                  "Nomor Induk Berusaha": watch("Nomor Induk Berusaha"),
                  Kemantren: watch("Kemantren"),
                  Kelurahan: watch("Kelurahan"),
                  "Koordinat Lintang": watch("Koordinat Lintang"),
                  "Koordinat Bujur": watch("Koordinat Bujur"),
                  "Sudut Simpang": watch("Sudut Simpang"),
                  "Lokasi Reklame": watch("Lokasi Reklame"),
                  "Rencana Penempatan": watch("Rencana Penempatan"),
                  "Jenis Reklame": watch("Jenis Reklame"),
                  "Ukuran Panjang (m)": watch("Ukuran Panjang (m)"),
                  "Ukuran Lebar (m)": watch("Ukuran Lebar (m)"),
                  Naskah: watch("Naskah"),
                  "Kategori Persil Orang atau Badan": watch(
                    "Kategori Persil Orang atau Badan"
                  ),
                  "Kategori Persil Pemerintah, Pemerintah Daerah, dan/atau Fasilitas Umum":
                    watch(
                      "Kategori Persil Pemerintah, Pemerintah Daerah, dan/atau Fasilitas Umum"
                    ),
                  "Naskah Produk Lainnya": watch("Naskah Produk Lainnya"),
                  "Sisi Hadap": watch("Sisi Hadap"),
                }}
              />
            }
            fileName={`KKPR_${watch("Nama Pemohon")}.pdf`}
          >
            {({ loading }) =>
              loading ? (
                <Button variant="ghost">Tunggu...</Button>
              ) : (
                formState.isValid && <Button>Cetak</Button>
              )
            }
          </PDFDownloadLink>
        </div>
      </div>
    </DialogContent>
  );
};

export default FormDialog;
