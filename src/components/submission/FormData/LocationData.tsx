import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormContext } from "react-hook-form";

const LocationData = () => {
  const { control, watch } = useFormContext();
  const selectedRencanaPenempatan = watch("Rencana Penempatan");

  return (
    <>
      <p className="mt-4 font-semibold text-sm lg:text-normal">
        B. <u>Keterangan Lokasi</u>
      </p>
      <div className="ml-4 mt-2 mr-[1px] flex flex-col gap-2 text-xs lg:text-sm">
        <div className="w-full flex items-center gap-2">
          <FormField
            control={control}
            name="Kemantren"
            render={({ field }) => {
              return (
                <FormItem className="flex-1">
                  <FormLabel className="text-xs lg:text-sm">
                    Kemantren *
                  </FormLabel>
                  <FormControl>
                    <Input type="text" {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={control}
            name="Kelurahan"
            render={({ field }) => {
              return (
                <FormItem className="flex-1">
                  <FormLabel className="text-xs lg:text-sm">
                    Kelurahan *
                  </FormLabel>
                  <FormControl>
                    <Input type="text" {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>
        <p className="text-xs text-muted-foreground">Pilih menggunakan peta</p>

        <div className="w-full flex items-center gap-2">
          <FormField
            control={control}
            name="Koordinat Lintang"
            render={({ field }) => {
              return (
                <FormItem className="flex-1">
                  <FormLabel className="text-xs lg:text-sm">
                    Koordinat Lintang *
                  </FormLabel>
                  <FormControl>
                    <Input type="text" {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={control}
            name="Koordinat Bujur"
            render={({ field }) => {
              return (
                <FormItem className="flex-1">
                  <FormLabel className="text-xs lg:text-sm">
                    Koordinat Bujur *
                  </FormLabel>
                  <FormControl>
                    <Input type="text" {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>
        <p className="text-xs text-muted-foreground">Pilih menggunakan peta</p>

        <FormField
          control={control}
          name="Sudut Simpang"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel className="text-xs lg:text-sm">
                  Sudut Simpang *
                </FormLabel>
                <FormControl>
                  <Input type="text" {...field} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <p className="text-xs text-muted-foreground">Pilih menggunakan peta</p>

        <FormField
          control={control}
          name="Lokasi Reklame"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel className="text-xs lg:text-sm">
                  Lokasi Reklame *
                </FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={control}
          name="Rencana Penempatan"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel className="text-xs lg:text-sm">
                  Rencana Penempatan *
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
                      <SelectItem value="Kategori Persil Orang atau Badan">
                        Persil Orang atau Badan
                      </SelectItem>
                      <SelectItem value="Kategori Persil Pemerintah, Pemerintah Daerah, dan/atau Fasilitas Umum">
                        Persil Pemerintah, Pemerintah Daerah, dan/atau Fasilitas
                        Umum
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        {selectedRencanaPenempatan === "Kategori Persil Orang atau Badan" && (
          <FormField
            control={control}
            name="Kategori Persil Orang atau Badan"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Kategori Persil Orang atau Badan</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Persil/Halaman">
                          Persil/Halaman
                        </SelectItem>
                        <SelectItem value="Menempel Pagar">
                          Menempel Pagar
                        </SelectItem>
                        <SelectItem value="Menempel Fasad Bangunan">
                          Menempel Fasad Bangunan
                        </SelectItem>
                        <SelectItem value="Dalam Gedung">
                          Dalam Gedung
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        )}
        {selectedRencanaPenempatan ===
          "Kategori Persil Pemerintah, Pemerintah Daerah, dan/atau Fasilitas Umum" && (
          <FormField
            control={control}
            name="Kategori Persil Pemerintah, Pemerintah Daerah, dan/atau Fasilitas Umum"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>
                    Kategori Persil Pemerintah, Pemerintah Daerah, dan/atau
                    Fasilitas Umum
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
                        <SelectItem value="Taman">Taman</SelectItem>
                        <SelectItem value="Trotoar">Trotoar</SelectItem>
                        <SelectItem value="Tiang Penerangan Jalan Umun (PJU)">
                          Tiang Penerangan Jalan Umun (PJU)
                        </SelectItem>
                        <SelectItem value="Halte Bus">Halte Bus</SelectItem>
                        <SelectItem value="Jembatan Penyebrangan">
                          Jembatan Penyebrangan
                        </SelectItem>
                        <SelectItem value="Pasar/Terminal/Tempat Khusus Parkir">
                          Pasar/Terminal/Tempat Khusus Parkir
                        </SelectItem>
                        <SelectItem value="Gapura">Gapura</SelectItem>
                        <SelectItem value="Tugu Jam/Pos Polisi/Penunjuk Peta Kota">
                          Tugu Jam/Pos Polisi/Penunjuk Peta Kota
                        </SelectItem>
                        <SelectItem value="Papan Petunjuk Arah">
                          Papan Petunjuk Arah
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        )}
      </div>
    </>
  );
};

export default LocationData;
