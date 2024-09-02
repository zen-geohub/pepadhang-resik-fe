import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

type AdvertiseProperties = {
  Nomor: string;
  Kode: number;
  Ukuran: string;
  Jenis_Rklm: string;
  Area_Amtn: string;
  Naskah: string;
  Konstruksi: string;
  Muka: string;
  Fungsi_Jln: string;
  WADMKD: string;
  Tnggi_Baru: number;
  Ornamen: string;
  K_Ornamen: string;
  K_Tinggi: string;
  K_Rokok: string;
  K_Fasad: string;
  K_FasadMks: string;
  K_ZonaKhs: string;
  K_ZonaKtt: string;
  K_Simpang: string;
  K_ARClear: string;
  K_Jarak: string;
  Justifikas: string;
  Rekomendas: string;
  P_Tindakan: string;
  P_TndkLnjt: string;
  Kondisi: string;
};

type AdvertiseGeometry = {
  type: string;
  coordinates: Array<number>;
};

export type AdvertisePoint = {
  _id: string;
  type: string;
  properties: AdvertiseProperties;
  geometry: AdvertiseGeometry;
};

interface AdvertiseContext {
  advertisePoint: AdvertisePoint[];
  setAdvertisePoint: Dispatch<SetStateAction<AdvertisePoint[]>>;
}

const AdvertiseData = createContext<AdvertiseContext>({
  advertisePoint: [],
  setAdvertisePoint: () => {},
});

export const DataContext: FC<{ children: ReactNode }> = ({ children }) => {
  const [advertisePoint, setAdvertisePoint] = useState<AdvertisePoint[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND}/data`, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setAdvertisePoint(data);
      } catch (error) {
        console.log("Failed to fetch data: ", error);
      }
    })();
  }, []);

  return (
    <AdvertiseData.Provider value={{ advertisePoint, setAdvertisePoint }}>
      {children}
    </AdvertiseData.Provider>
  );
};

export const useData = () => {
  const context = useContext(AdvertiseData);

  return context;
};
