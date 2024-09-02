import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const FeatureCard = ({label, value}: {label: string; value: string | number | undefined}) => {
  const violation =
    label.includes("Kesesuaian") ||
    label.includes("Lokasi ") ||
    label.includes("Jarak");
  const valueStr = value?.toString() || "";
  const isViolating = valueStr.includes("Tidak") || valueStr.includes("Bukan");

  return (
    <Card
      className={cn(
        violation
          ? valueStr !== ""
            ? isViolating
              ? "bg-green-300 dark:bg-green-600"
              : "bg-red-300 dark:bg-red-600"
            : ""
          : ""
      )}
    >
      <CardHeader className="p-3 font-poppins">
        <CardTitle className="text-xs lg:text-base">{label}</CardTitle>
        <CardDescription className="text-foreground text-2xs lg:text-sm">
          {valueStr}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}

export default FeatureCard