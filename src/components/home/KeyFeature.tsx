import {
  EnvelopeClosedIcon,
  FileTextIcon,
  GearIcon,
} from "@radix-ui/react-icons";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

type FeatureCardProps = {
  title: string;
  desc: string;
  logo: ReactNode;
};

function FeatureCard({ title, desc, logo }: FeatureCardProps) {
  return (
    <Card className="relative min-w-60 lg:min-w-64 hover:shadow-lg cursor-pointer">
      <div className="h-fit absolute -top-10 flex justify-center w-full">
        <div className="p-2 rounded-md bg-primary dark:text-secondary">
          {logo}
        </div>
      </div>
      <CardHeader className="mt-2 lg:mt-6 pb-2">
        <CardTitle className="text-center text-normal lg:text-xl">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-xs text-center lg:text-sm">
        {desc}
      </CardContent>
    </Card>
  );
}

const KeyFeature = () => {
  return (
    <div className="font-poppins w-full h-fit flex flex-col gap-8 justify-center items-center p-8">
      <h1 className="font-bold text-2xl ">Daftar Fitur</h1>
      <Separator className="mb-12 w-24" />
      <div className="flex flex-col lg:flex-row gap-16">
        <a
          href="https://drive.google.com/drive/folders/1lGjxC7qE83MCABPcui7z5JkGlcGKsICI?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FeatureCard
            title="Regulasi"
            desc="Informasi Regulasi Tata Ruang."
            logo={<GearIcon className="w-12 h-12 lg:h-16 lg:w-16" />}
          />
        </a>
        <Link to={"/pengajuan"}>
          <FeatureCard
            title="Layanan"
            desc="Pengajuan KKPR Reklame."
            logo={<FileTextIcon className="w-12 h-12 lg:h-16 lg:w-16" />}
          />
        </Link>
        <a
          href="https://api.whatsapp.com/send/?phone=%2B628112735100&text&type=phone_number&app_absent=0"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FeatureCard
            title="Hubungi Kami"
            desc="Konsultasi dan aduan."
            logo={<EnvelopeClosedIcon className="w-12 h-12 lg:h-16 lg:w-16" />}
          />
        </a>
      </div>
    </div>
  );
};

export default KeyFeature;
