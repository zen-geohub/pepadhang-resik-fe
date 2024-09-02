import FeatureCard from "./FeatureCard";
import { ScrollArea } from "@/components/ui/scroll-area";

const Infobar = ({ feature }: { feature: object }) => {
  return (
    <ScrollArea className="h-full rounded-l-md relative">
      <div className="flex flex-col gap-2 bg-background p-2 ">
        <h1 className="sticky top-0 bg-background p-1 lg:p-2 text-center font-bold text-sm lg:text-2xl font-poppins">
          Informasi
        </h1>
        {feature &&
          Object.entries(feature).map(([key, value]) => {
            return <FeatureCard key={key} label={key} value={value} />;
          })}
      </div>
    </ScrollArea>
  );
};

export default Infobar;
