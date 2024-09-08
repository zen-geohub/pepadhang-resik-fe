import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Cross1Icon } from "@radix-ui/react-icons";

const BillboardSpecification = () => {
  const { control, watch } = useFormContext();
  const area = watch("Ukuran Panjang (m)") * watch("Ukuran Lebar (m)");
  const naskah = watch("Naskah");

  return (
    <>
      <p className="mt-4 font-semibold text-sm lg:text-normal">
        C. <u>Spesifikasi Reklame</u>
      </p>
      <div className="ml-4 mt-2 mr-[1px] flex flex-col gap-2 text-xs lg:text-sm">
        <FormField
          control={control}
          name="Jenis Reklame"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel className="text-xs lg:text-sm">
                  Jenis Reklame *
                </FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Reklame Papan/Billboard">
                        Reklame Papan/Billboard
                      </SelectItem>
                      <SelectItem value="Reklame Videotron">
                        Reklame Videotron
                      </SelectItem>
                      <SelectItem value="Reklame Lukisan Dinding (Wall Painting)">
                        Reklame Lukisan Dinding (Wall Painting)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <div className="w-full flex items-center gap-2">
          <FormField
            control={control}
            name="Ukuran Panjang (m)"
            render={({ field }) => {
              return (
                <FormItem className="flex-1">
                  <FormLabel className="text-xs lg:text-sm">
                    Ukuran Panjang (m) *
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value
                          ? Number(e.target.value)
                          : "";
                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <Cross1Icon className="mt-5" />
          <FormField
            control={control}
            name="Ukuran Lebar (m)"
            render={({ field }) => {
              return (
                <FormItem className="flex-1">
                  <FormLabel className="text-xs lg:text-sm">
                    Ukuran Lebar (m) *
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      min={0}
                      onChange={(e) => {
                        const value = e.target.value
                          ? Number(e.target.value)
                          : "";
                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>
        {area > 32 ? (
          <p className="text-red-500 font-semibold">
            Luas reklame tidak boleh lebih dari 32 m&sup2;
          </p>
        ) : area > 8 ? (
          <p className="font-semibold">
            Membutuhkan Persetujuan Bangunan Gedung (PBG)
          </p>
        ) : null}

        <FormField
          control={control}
          name="Naskah"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel className="text-xs lg:text-sm">Naskah *</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Produk Rokok">Produk Rokok</SelectItem>
                      <SelectItem value="Produk Alat Kontrasepsi">
                        Produk Alat Kontrasepsi
                      </SelectItem>
                      <SelectItem value="Produk Lainnya">
                        Produk Lainnya
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        {naskah === "Produk Lainnya" && (
          <FormField
            control={control}
            name="Naskah Produk Lainnya"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel className="text-xs lg:text-sm">
                    Naskah Produk Lainnya *
                  </FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        )}
        <FormField
          control={control}
          name="Sisi Hadap"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel className="text-xs lg:text-sm">
                  Sisi Hadap *
                </FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1 sisi">1 sisi</SelectItem>
                      <SelectItem value="2 sisi">2 sisi</SelectItem>
                      <SelectItem value="3 sisi">3 sisi</SelectItem>
                      <SelectItem value="4 sisi">4 sisi</SelectItem>
                      <SelectItem value="Lebih dari 4 sisi">
                        Lebih dari 4 sisi
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
      </div>
    </>
  );
};

export default BillboardSpecification;
