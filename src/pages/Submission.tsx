import { useEffect, useState } from "react";
import { Form } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { MapMouseEvent, useMap } from "react-map-gl/maplibre";
import {
  ChevronLeftIcon,
  SewingPinFilledIcon,
  SewingPinIcon,
} from "@radix-ui/react-icons";
import { toast } from "sonner";

import {
  SubmissionSchema,
  submissionSchema,
} from "@/components/submission/submissionSchema";
import ApplicantData from "@/components/submission/FormData/ApplicantData";
import LocationData from "@/components/submission/FormData/LocationData";
import SubmissionMap from "@/components/submission/SubmissionMap";
import BillboardSpecification from "@/components/submission/FormData/BillboardSpecification";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFTemplate from "@/components/submission/PDFTemplate";
import { Link } from "react-router-dom";

const Submission = () => {
  const { mapSubmission } = useMap();
  const [toggleAdd, setToggleAdd] = useState<boolean>(false);
  const [formValue, setFormValue] = useState<object>({});
  const form = useForm<SubmissionSchema>({
    resolver: zodResolver(submissionSchema),
    defaultValues: {
      "Nama Pemohon": "",
      "Alamat Pemohon": "",
      "Nama Perusahaan": "",
      "Nomor Induk Berusaha": "",
      "Nomor Telepon/Wa yang Masih Aktif": "",
      Kemantren: "",
      Kelurahan: "",
      "Koordinat Lintang": 0,
      "Koordinat Bujur": 0,
      "Sudut Simpang": "",
      "Lokasi Reklame": "",
      "Rencana Penempatan": undefined,
      "Jenis Reklame": "",
      "Ukuran Panjang (m)": 0,
      "Ukuran Lebar (m)": 0,
      Naskah: undefined,
      "Naskah Produk Lainnya": "",
      "Sisi Hadap": "",
    },
  });

  const { control, handleSubmit, watch, setValue, formState } = form;

  const selectedRencanaPenempatan = watch("Rencana Penempatan");
  const area = watch("Ukuran Panjang (m)") * watch("Ukuran Lebar (m)");
  const naskah = watch("Naskah");

  const onSubmit = handleSubmit((value) => {
    console.log(value);
    setFormValue(value);
  });

  useEffect(() => {
    function onClick(e: MapMouseEvent) {
      const administrasi = mapSubmission?.queryRenderedFeatures(e.point, {
        layers: ["batasAdmin"],
      });
      const simpang = mapSubmission?.queryRenderedFeatures(e.point, {
        layers: ["constraints"],
        filter: ["==", ["get", "layer"], "Simpang"],
      });
      const zonaKhusus = mapSubmission?.queryRenderedFeatures(e.point, {
        layers: ["constraints"],
        filter: ["==", ["get", "layer"], "Zona Khusus"],
      });
      const clearArea = mapSubmission?.queryRenderedFeatures(e.point, {
        layers: ["constraints"],
        filter: ["==", ["get", "layer"], "Clear Area"],
      });

      if (administrasi && administrasi.length > 0) {
        setValue(
          "Kemantren",
          administrasi[0].properties.kecamatan.split(" ").pop()
        );
        setValue("Kelurahan", administrasi[0].properties.desa.split(" ").pop());
      }
      setValue("Koordinat Lintang", e.lngLat.lat);
      setValue("Koordinat Bujur", e.lngLat.lng);
      simpang && simpang.length > 0
        ? setValue("Sudut Simpang", "Simpang")
        : setValue("Sudut Simpang", "Non-simpang");

      if (zonaKhusus && zonaKhusus.length > 0) {
        toast("Titik berada di Zona Khusus!");
        resetValue();
      }
      if (clearArea && clearArea.length > 0) {
        toast("Titik berada di Clear Area!");
        resetValue();
      }

      function resetValue() {
        setValue("Koordinat Lintang", 0);
        setValue("Koordinat Bujur", 0);
        setValue("Kemantren", "");
        setValue("Kelurahan", "");
        setValue("Sudut Simpang", "");
      }
    }

    if (toggleAdd) {
      mapSubmission?.on("click", onClick);
    } else {
      mapSubmission?.off("click", onClick);
    }

    return () => {
      mapSubmission?.off("click", onClick);
    };
  }, [toggleAdd, mapSubmission]);

  return (
    <Dialog>
      <div className="w-dvw h-dvh bg-background flex flex-col lg:flex-row p-2 gap-2 overflow-auto font-poppins">
        <main className="relative w-full lg:w-1/2 h-fit lg:h-full ">
          <Link to="/">
            <Button variant="link" className="absolute text-black">
              <ChevronLeftIcon /> Kembali
            </Button>
          </Link>
          <Form {...form}>
            <form onSubmit={onSubmit}>
              <Card className="max-h-dvh">
                <CardHeader>
                  <CardTitle className="text-center text-xl font-bold">
                    Formulir Permohonan
                  </CardTitle>
                </CardHeader>
                <CardContent className="">
                  <ScrollArea className="h-[calc(100dvh-400px)] lg:h-[calc(100dvh-118px)]">
                    <ApplicantData control={control} />
                    <LocationData
                      control={control}
                      selectedRencanaPenempatan={selectedRencanaPenempatan}
                    />
                    <BillboardSpecification
                      control={control}
                      area={area}
                      naskah={naskah}
                    />
                    <div className="w-full flex justify-end">
                      <DialogTrigger
                        className="mt-2 mr-2 bg-primary p-2 rounded-md flex justify-center items-center"
                        type="submit"
                        disabled={!formState.isValid}
                      >
                        Ajukan
                      </DialogTrigger>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </form>
          </Form>
        </main>
        <section className="w-full lg:w-1/2 h-80 lg:h-full relative">
          <SubmissionMap
            markerLatitude={watch("Koordinat Lintang")}
            markerLongitude={watch("Koordinat Bujur")}
          />
          <Button
            className="absolute top-2 left-2"
            size="icon"
            onClick={() => {
              setToggleAdd(!toggleAdd);
            }}
          >
            {toggleAdd ? <SewingPinFilledIcon /> : <SewingPinIcon />}
          </Button>
        </section>
      </div>
      <DialogContent onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="text-center lg:font-bold">
            Data yang diajukan
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <ScrollArea className="h-72">
            {Object.entries(formValue).map(([key, value]) => {
              return (
                <p className="text-xs lg:text-base mb-1" key={key}>
                  <span className="font-semibold">{key}:</span> {value}
                </p>
              );
            })}
          </ScrollArea>
          <div className="w-full flex justify-end gap-2">
            <Link to="/">
              <Button variant="ghost">Kembali ke beranda</Button>
            </Link>
            <PDFDownloadLink
              document={
                <PDFTemplate
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
              fileName="KKPR.pdf"
            >
              {({ loading }) =>
                loading ? (
                  <Button variant="ghost">Tunggu...</Button>
                ) : (
                  <Button>Cetak</Button>
                )
              }
            </PDFDownloadLink>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Submission;
