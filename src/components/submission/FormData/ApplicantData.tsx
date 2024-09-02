import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { SubmissionSchema } from "../submissionSchema";

export type FormProps = {
  control: Control<SubmissionSchema>;
};

const ApplicantData = ({ control }: FormProps) => {
  return (
    <>
      <p className="font-semibold text-sm lg:text-base">
        A. <u>Data Pemohon</u>
      </p>
      <div className="ml-4 mr-[1px] flex flex-col gap-1">
        <FormField
          control={control}
          name="Nama Pemohon"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel className="text-xs lg:text-sm">
                  Nama Pemohon *
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
          name="Alamat Pemohon"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel className="text-xs lg:text-sm">
                  Alamat Pemohon *
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
          name="Nama Perusahaan"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel className="text-xs lg:text-sm">
                  Nama Perusahaan
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
          name="Nomor Induk Berusaha"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel className="text-xs lg:text-sm">
                  Nomor Induk Berusaha
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
          name="Nomor Telepon/Wa yang Masih Aktif"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel className="text-xs lg:text-sm">
                  Nomor Telepon/Wa yang Masih Aktif *
                </FormLabel>
                <FormControl>
                  <Input type="tel" {...field} />
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

export default ApplicantData;
