import { Button } from "../ui/button";
import logoPepadhang from "../../assets/LogoPepadhang (1).png";
import { Link } from "react-router-dom";
import heroLight from "../../assets/hero_light.png";
import heroDark from "../../assets/hero_dark.png";
import { useTheme } from "@/hooks/useTheme";

const Hero = () => {
  const { theme } = useTheme();

  return (
    <div className="w-full h-full relative font-poppins">
      {theme === "light" ? (
        <img
          src={heroLight}
          className="object-cover h-full absolute top-0 brightness-50"
        />
      ) : (
        <img
          src={heroDark}
          className="object-cover h-full absolute top-0 brightness-50"
        />
      )}

      <div className="w-full h-[calc(100dvh-72px)] gap-2 p-4 lg:p-16 absolute bottom-0 bg-transparent flex flex-col lg:flex-row-reverse justify-center items-center">
        <img src={logoPepadhang} className="w-72 lg:w-96" />
        <div className="flex flex-col gap-2 px-2 lg:pr-28">
          <p className="text-primary text-sm lg:text-xl lg:text-justify font-bold text-center">
            (Pengendalian Pemanfaatan Ruang Reklame Berbasis Sistem Informasi
            Kota Yogyakarta)
          </p>
          <p className="text-xs text-justify text-white lg:text-base">
            Media informasi yang utuh dan mudah diakses oleh masyarakat terkait
            ketentuan penyelenggaraan reklame berdasarkan Peraturan Walikota
            Yogyakarta Nomor 32 Tahun 2023 tentang Peraturan Pelaksanaan
            Peraturan Daerah Kota Yogyakarta Nomor 6 Tahun 2022 tentang Reklame.
          </p>
          <Link to={"/dashboard"}>
            <Button className="w-fit">Masuk</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
