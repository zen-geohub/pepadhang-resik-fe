import { useEffect, useState } from "react";
import { Form } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { MapMouseEvent, useMap } from "react-map-gl/maplibre";
import { ChevronLeftIcon, Cross1Icon, PlusIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";

import {
  SubmissionSchema,
  submissionSchema,
} from "@/components/submission/submissionSchema";
import ApplicantData from "@/components/submission/FormData/ApplicantData";
import LocationData from "@/components/submission/FormData/LocationData";
import SubmissionMap from "@/components/submission/SubmissionMap";
import BillboardSpecification from "@/components/submission/FormData/BillboardSpecification";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import html2canvas from "html2canvas";
import ScreenshotMap from "@/components/submission/ScreenshotMap";
import { cn } from "@/lib/utils";
import FormDialog from "@/components/submission/FormDialog";

const Submission = () => {
  const { mapSubmission, mapScreenshot } = useMap();
  const [image, setImage] = useState<string>();
  const [toggleAdd, setToggleAdd] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
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

  const { handleSubmit, setValue, getValues } = form;

  const onSubmit = handleSubmit((value) => {
    setFormValue(value);
  });

  useEffect(() => {
    function onClick(e: MapMouseEvent) {
      const layers = {
        administrasi: ["batasAdmin"],
        simpang: ["simpang"],
        zonaKhusus: ["zonaKhusus"],
        clearArea: ["clearArea"],
      };

      const results = Object.fromEntries(
        Object.entries(layers).map(([key, value]) => [
          key,
          mapSubmission?.queryRenderedFeatures(e.point, { layers: value }),
        ])
      );

      if (results.administrasi && results.administrasi.length > 0) {
        setValue(
          "Kemantren",
          results.administrasi[0].properties.kecamatan.split(" ").pop()
        );
        setValue(
          "Kelurahan",
          results.administrasi[0].properties.desa.split(" ").pop()
        );
      }

      mapScreenshot?.flyTo({
        center: e.lngLat,
        zoom: 17,
        bearing: 0,
      });
      setValue("Koordinat Lintang", e.lngLat.lat);
      setValue("Koordinat Bujur", e.lngLat.lng);
      results.simpang && results.simpang.length > 0
        ? setValue("Sudut Simpang", "Simpang")
        : setValue("Sudut Simpang", "Non-simpang");

      if (results.zonaKhusus && results.zonaKhusus.length > 0) {
        toast("Titik berada di Zona Khusus!");
        resetValue();
      }
      if (results.clearArea && results.clearArea.length > 0) {
        toast("Titik berada di Clear Area!");
        resetValue();
      }
      if (results.administrasi && results.administrasi.length === 0) {
        resetValue();
        toast("Titik berada di luar Kota Yogyakarta!");
      }

      getValues("Koordinat Bujur") !== 0 &&
        (async function () {
          const mapRef = document.getElementById("mapScreenshot");
          if (mapRef) {
            mapScreenshot?.once("idle", async () => {
              const canvas = await html2canvas(mapRef, {
                scale: 1.5,
              });

              setImage(canvas.toDataURL("image/png"));
            });
          }
        })();

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
      if (mapSubmission) {
        mapSubmission.getCanvas().style.cursor = "pointer";
      }
    } else {
      mapSubmission?.off("click", onClick);
      if (mapSubmission) {
        mapSubmission.getCanvas().style.cursor = "";
      }
    }

    return () => {
      mapSubmission?.off("click", onClick);
    };
  }, [toggleAdd, mapSubmission]);

  return (
    <Form {...form}>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <div className="w-dvw h-dvh bg-background flex flex-col lg:flex-row p-2 gap-2 overflow-hidden font-poppins">
          <main className="relative w-full lg:w-1/2 h-fit lg:h-full ">
            <Link to="/">
              <Button
                variant="link"
                className="absolute text-secondary-foreground text-xs lg:no-underline underline"
              >
                <ChevronLeftIcon /> Kembali
              </Button>
            </Link>
            <form onSubmit={onSubmit}>
              <Card className="max-h-dvh">
                <CardHeader>
                  <CardTitle className="text-center text-lg lg:text-xl font-bold">
                    Formulir Permohonan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[calc(100dvh-400px)] lg:h-[calc(100dvh-118px)]">
                    <ApplicantData />
                    <LocationData />
                    <BillboardSpecification />
                    <div className="w-full flex justify-end">
                      <DialogTrigger
                        className="mt-2 mr-2 bg-primary p-2 rounded-md flex justify-center items-center lg:text-base text-sm text-primary-foreground font-semibold"
                        type="submit"
                      >
                        Ajukan
                      </DialogTrigger>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </form>
          </main>
          <section className="w-full lg:w-1/2 h-80 lg:h-full relative">
            <ScreenshotMap />
            <SubmissionMap />
            <Button
              className={cn(
                toggleAdd
                  ? "bg-destructive hover:bg-destructive hover:opacity-90 text-white"
                  : "bg-primary",
                " transition-colors absolute top-2 left-2 z-10"
              )}
              size="icon"
              onClick={() => {
                setToggleAdd(!toggleAdd);
              }}
            >
              {toggleAdd ? <Cross1Icon /> : <PlusIcon />}
            </Button>
          </section>
        </div>
        <FormDialog formValue={formValue} image={image || ""} />
      </Dialog>
    </Form>
  );
};

export default Submission;
