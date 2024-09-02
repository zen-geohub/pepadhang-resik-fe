import logoYogya from "../../assets/Logo_Kota_Yogyakarta.7e10e58cc5c567f49755.png";

const Footer = () => {
  return (
    <footer className="w-full h-fit bg-foreground text-xs text-background font-poppins">
      <div className="w-full h-fit flex flex-col items-center lg:flex-row gap-4 lg:gap-12 px-4 lg:px-16 py-4">
        <div className="flex flex-col gap-2 w-fit lg:text-sm">
          <img src={logoYogya} className="w-16" />
          <div>
            <span className="font-medium">
              Dinas Pertanahan dan Tata Ruang Kota Yogyakarta
            </span>
            <br />
            <em>(Kundha Niti Mandala Sarta Tata Sasana)</em> <br />
            Komplek Balaikota Yogyakarta, Kota Yogyakarta <br />
            Jl. Kenari No 56, Mujamuju, Umbulharjo, Yogyakarta 55165 <br />
            Telp. (0274) 515865, 562682 <br />
            WA pelayanan: 08112735100 <br />
            Email: dinpertaru@jogjakota.go.id <br />{" "}
            pertanahan.tataruang@gmail.com <br />
            Email pelayanan: online.dinpertaru@gmail.com
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <h1 className="font-semibold text-lg lg:text-2xl">
            Apa itu Pepadhang Resik Jogja?
          </h1>
          <p className="text-wrap text-justify text-sm">
            Pepadhang Resik Jogja adalah media informasi yang utuh dan mudah
            diakses oleh masyarakat terkait ketentuan penyelenggaraan reklame
            berdasarkan Peraturan Daerah Kota Yogyakarta Nomor 6 Tahun 2022
            tentang Reklame yang kemudian dijabarkan secara lebih teknis dan
            terperinci dalam Peraturan Walikota Yogyakarta Nomor 32 Tahun 2023
            tentang Peraturan Pelaksanaan Peraturan Daerah Kota Yogyakarta Nomor
            6 Tahun 2022 tentang Reklame.
          </p>
        </div>
      </div>
      <div className="w-full h-fit px-4 lg:px-16 bg-[#808080] py-2">
        Pepadhang Resik v1.0.0 © 2024
      </div>
    </footer>
  );
};

export default Footer;
