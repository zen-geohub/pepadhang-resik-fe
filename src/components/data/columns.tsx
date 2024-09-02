import { AdvertisePoint } from "@/contexts/DataContext";
import { CellContext, ColumnDef, Table } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Dispatch, SetStateAction } from "react";
import TableCell from "./TableCell";
import EditCell from "./EditCell";

export const columns: ColumnDef<AdvertisePoint>[] = [
  {
    id: "Kode",
    accessorFn: (feature) => feature.properties.Kode,
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Kode
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id: "Ukuran",
    accessorFn: (feature) => feature.properties.Ukuran,
    header: "Ukuran",
    cell: TableCell,
    meta: {
      type: "select",
      options: [
        { value: "Sedang", label: "Sedang" },
        { value: "Besar", label: "Besar" },
      ],
    },
  },
  {
    id: "Jenis_Rklm",
    accessorFn: (feature) => feature.properties.Jenis_Rklm,
    header: "Jenis Reklame",
    cell: TableCell,
    meta: {
      type: "select",
      options: [
        { value: "Billboard", label: "Billboard" },
        { value: "Videotron", label: "Videotron" },
        { value: "Reklame Huruf", label: "Reklame Huruf" },
        { value: "Huruf Timbul", label: "Huruf Timbul" },
        { value: "Reklame Kain", label: "Reklame Kain" },
      ],
    },
  },
  {
    id: "Lokasi",
    accessorFn: (feature) => feature.properties.Area_Amtn,
    header: "Lokasi",
    cell: TableCell,
  },
  {
    id: "Naskah",
    accessorFn: (feature) => feature.properties.Naskah,
    header: "Naskah",
    cell: TableCell,
    meta: {
      type: "select",
      options: [
        { value: "Rokok", label: "Produk Rokok" },
        { value: "Usaha", label: "Produk Usaha" },
        { value: "Non Usaha", label: "Produk Non Usaha" },
        { value: "Kosong", label: "Kosong" },
      ],
    },
  },
  {
    id: "Konstruksi",
    accessorFn: (feature) => feature.properties.Konstruksi,
    header: "Konstruksi",
    cell: TableCell,
  },
  {
    id: "Muka",
    accessorFn: (feature) => feature.properties.Muka,
    header: "Jumlah Sisi",
    cell: TableCell,
  },
  {
    id: "Tnggi_Baru",
    accessorFn: (feature) => feature.properties.Tnggi_Baru,
    header: "Tinggi (m)",
    cell: TableCell,
  },
  {
    id: "Ornamen",
    accessorFn: (feature) => feature.properties.Ornamen,
    header: "Ornamen",
    cell: TableCell,
  },
  {
    id: "K_Ornamen",
    accessorFn: (feature) => feature.properties.K_Ornamen,
    header: "Kesesuaian Ornamen",
    cell: TableCell,
  },
  {
    id: "K_Tinggi",
    accessorFn: (feature) => feature.properties.K_Tinggi,
    header: "Kesesuaian Ketinggian",
    cell: TableCell,
  },
  {
    id: "K_Fasad",
    accessorFn: (feature) => feature.properties.K_Fasad,
    header: "Kesesuaian Fasad",
    cell: TableCell,
  },
  {
    id: "K_FasadMks",
    accessorFn: (feature) => feature.properties.K_FasadMks,
    header: "Kesesuaian Fasad Maksimal",
    cell: TableCell,
  },
  {
    id: "K_ZonaKhs",
    accessorFn: (feature) => feature.properties.K_ZonaKhs,
    header: "Lokasi di Zona Khusus",
    cell: TableCell,
  },
  {
    id: "K_ZonaKtt",
    accessorFn: (feature) => feature.properties.K_ZonaKtt,
    header: "Lokasi di Zona Kendali Ketat",
    cell: TableCell,
  },
  {
    id: "K_Simpang",
    accessorFn: (feature) => feature.properties.K_Simpang,
    header: "Lokasi terhadap Sudut Simpang",
    cell: TableCell,
  },
  {
    id: "K_Jarak",
    accessorFn: (feature) => feature.properties.K_Jarak,
    header: "Jarak antar Reklame",
    cell: TableCell,
  },
  {
    id: "K_ARClear",
    accessorFn: (feature) => feature.properties.K_ARClear,
    header: "Lokasi terhadap Clear Area",
    cell: TableCell,
  },
  {
    id: "Justifikas",
    accessorFn: (feature) => feature.properties.Justifikas,
    header: "Justifikasi",
    cell: TableCell,
  },
  {
    id: "Rekomendas",
    accessorFn: (feature) => feature.properties.Rekomendas,
    header: "Rekomendasi",
    cell: TableCell,
  },
  {
    id: "P_Tindakan",
    accessorFn: (feature) => feature.properties.P_Tindakan,
    header: "Potensi Tindakan",
    cell: TableCell,
  },
  {
    id: "P_TndkLnjt",
    accessorFn: (feature) => feature.properties.P_TndkLnjt,
    header: "Potensi Tindak Lanjut",
    cell: TableCell,
  },
  {
    id: "Kondisi",
    accessorFn: feature => feature.properties.Kondisi,
    header: "Kondisi",
    cell: TableCell,
    meta: {
      type: "select",
      options: [
        { value: "Eksisting", label: "Eksisting" },
        { value: "Dibongkar", label: "Dibongkar" },
      ],
    },
  },
  {
    id: "edit",
    cell: ({ row, table }: CellContext<AdvertisePoint, unknown>) => (
      <EditCell
        row={row}
        table={
          table as Table<AdvertisePoint> & {
            options: {
              meta?:
                | {
                    editedRows: Record<string, boolean>;
                    setEditedRows: Dispatch<
                      SetStateAction<Record<string, boolean>>
                    >;
                    revertData: (rowIndex: number, revert: boolean) => void;
                  }
                | undefined;
            };
          }
        }
      />
    ),
  },
];