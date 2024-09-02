import logoYogya from "../../../assets/Logo_Kota_Yogyakarta.7e10e58cc5c567f49755.png";

const AgencyContent = () => {
  return (
    <div className="bg-background p-2 font-poppins rounded-l-md w-full h-full flex-col items-center justify-center gap-2 flex">
      <img src={logoYogya} className="h-[100px]" />

      <h2 className="font-semibold lg:font-bold text-xs lg:text-lg">
        Pepadhang Resik Jogja
      </h2>

      <div className="w-full h-[2px] bg-foreground"></div>

      <h4 className="font-medium lg:font-semibold text-center text-2xs lg:text-sm">
        Dinas Pertanahan dan Tata Ruang
        <br />
        Kota Yogyakarta
      </h4>

      <article className="text-center text-3xs lg:text-xs">
        Jln. Kenari No.56, Muja Muju, Umbulharjo, Kota Yogyakarta, <br />
        Daerah Istimewa Yogyakarta 55165 <br />
        Telp. 0274515865, 0274515866 <br />
        No. WA Layanan Online: 0811-2735-100 <br />
        Email: pertanahantataruang@jogjakota.go.id
      </article>
    </div>
  );
}

export default AgencyContent