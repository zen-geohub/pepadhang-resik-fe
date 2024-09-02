import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import {
  CaretDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@radix-ui/react-icons";
import { AdvertisePoint } from "@/contexts/DataContext";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

interface DataTableProps<TData extends AdvertisePoint, TValue> {
  columns: ColumnDef<TData, TValue>[];
  initialData: TData[];
}

const DataTable = <TData extends AdvertisePoint, TValue>({
  columns,
  initialData,
}: DataTableProps<TData, TValue>) => {
  const [data, setData] = useState<TData[]>([]);
  const [originalData, setOriginalData] = useState<TData[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    Konstruksi: false,
    Muka: false,
    Tnggi_Baru: false,
    Ornamen: false,
    K_Ornamen: false,
    K_Tinggi: false,
    K_Fasad: false,
    K_FasadMks: false,
    K_ZonaKhs: false,
    K_ZonaKtt: false,
    K_Simpang: false,
    K_Jarak: false,
    K_ARClear: false,
    Justifikas: false,
    Rekomendas: false,
    P_TndkLnjt: false,
  });
  const [editedRows, setEditedRows] = useState({});

  useEffect(() => {
    setData(initialData as TData[]);
    setOriginalData(initialData as TData[]);
  }, [initialData]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
    meta: {
      updateData: (
        rowIndex: number,
        columnId: string,
        value: string | number
      ) => {
        setData((prev) => {
          return prev.map((row, index) => {
            return index === rowIndex
              ? { ...row, properties: { ...row.properties, [columnId]: value } }
              : row;
          });
        });
      },
      editedRows,
      setEditedRows,
      revertData: (rowIndex: number, revert: boolean) => {
        if (revert) {
          setData((prev) => {
            return prev.map((row, index) => {
              return index === rowIndex ? originalData[rowIndex] : row;
            });
          });
        } else {
          setOriginalData((prev) => {
            return prev.map((row, index) => {
              return index === rowIndex ? data[rowIndex] : row;
            });
          });
        }
      },
    },
  });

  return (
    <div className="p-2 flex flex-col gap-2 h-dvh w-[70%] lg:w-full flex-1">
      <div className="flex gap-2">
        <Input
          placeholder="Pencarian berdasarkan Lokasi"
          value={(table.getColumn("Lokasi")?.getFilterValue() as string) ?? ""}
          onChange={(e) => {
            table.getColumn("Lokasi")?.setFilterValue(e.target.value);
          }}
          className="text-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="">
              Kolom <CaretDownIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent >
            <ScrollArea className="h-72">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize text-sm"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => {
                        column.toggleVisibility(!!value);
                      }}
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </ScrollArea>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <ScrollArea className="h-dvh w-full">
        <Table className="border rounded-md">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
        <ScrollBar orientation="vertical" />
      </ScrollArea>
      <footer className="sticky bottom-0  w-full">
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeftIcon />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRightIcon />
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default DataTable;
