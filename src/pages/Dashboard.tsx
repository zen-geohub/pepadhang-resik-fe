import DashboardMap from "@/components/dashboard/DashboardMap";
import AgencyContent from "@/components/dashboard/infobar/AgencyContent";
import Infobar from "@/components/dashboard/infobar/Infobar";
import SidebarNavigation from "@/components/dashboard/SidebarNavigation";
import { cn } from "@/lib/utils";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { useState } from "react";

export type AdvertisingFeature = {
  Kode: number;
  Ukuran: string;
  "Jenis Reklame": string;
  Lokasi: string;
  Kelurahan: string;
  "Naskah/Konten Reklame": string;
  Konstruksi: string;
  "Jumlah Sisi": string;
  Tinggi: number;
  Ornamen: string;
  "Ornamen Zona Khusus/Ketat": string;
  "Kesesuaian Ketentuan Reklame Rokok": string;
  "Kesesuaian Ketinggian": string;
  "Kesesuaian Posisi Reklame di Atas Bangunan": string;
  "Kesesuaian Posisi Reklame di Atas Bangunan Maksimal": string;
  "Lokasi di Zona Khusus": string;
  "Lokasi di Zona Kendali Ketat": string;
  "Lokasi terhadap Sudut Simpang": string;
  "Jarak Antar Reklame": string;
  "Lokasi terhadap Clear Area": string;
  Justifikasi: string;
  Rekomendasi: string;
  "Potensi Tindakan": string;
  "Tindakan yang dilakukan jika tidak dilakukan penyesuaian": string;
  Kondisi: "Eksisting" | "Dibongkar" | "";
};

const Dashboard = () => {
  const [feature, setFeature] = useState<AdvertisingFeature>({
    Kode: 0,
    Ukuran: "",
    "Jenis Reklame": "",
    Lokasi: "",
    Kelurahan: "",
    "Naskah/Konten Reklame": "",
    Konstruksi: "",
    "Jumlah Sisi": "",
    Tinggi: 0,
    Ornamen: "",
    "Ornamen Zona Khusus/Ketat": "",
    "Kesesuaian Ketentuan Reklame Rokok": "",
    "Kesesuaian Ketinggian": "",
    "Kesesuaian Posisi Reklame di Atas Bangunan": "",
    "Kesesuaian Posisi Reklame di Atas Bangunan Maksimal": "",
    "Lokasi di Zona Khusus": "",
    "Lokasi di Zona Kendali Ketat": "",
    "Lokasi terhadap Sudut Simpang": "",
    "Jarak Antar Reklame": "",
    "Lokasi terhadap Clear Area": "",
    Justifikasi: "",
    Rekomendasi: "",
    "Potensi Tindakan": "",
    "Tindakan yang dilakukan jika tidak dilakukan penyesuaian": "",
    Kondisi: "",
  });

  const [isInfobarOpen, setIsInfobarOpen] = useState<boolean>(true);

  return (
    <main className="w-dvw h-dvh relative flex overflow-hidden">
      <SidebarNavigation active="dashboard" />

      <DashboardMap setFeature={setFeature} />
      <aside
        className={cn(
          isInfobarOpen
            ? "translate-x-0"
            : "translate-x-[88%] lg:translate-x-[92%]",
          "transition-transform h-full w-48 lg:w-72 absolute right-0 flex items-center"
        )}
      >
        <button
          className="bg-background h-12 p-1 rounded-l-md"
          onClick={() => setIsInfobarOpen(!isInfobarOpen)}
        >
          <ChevronLeftIcon
            className={cn(
              isInfobarOpen ? "rotate-180" : "rotate-0",
              "transition-transform"
            )}
          />
        </button>
        {feature.Kode !== 0 ? <Infobar feature={feature} /> : <AgencyContent />}
      </aside>
    </main>
  );
};

export default Dashboard;
