import { CellContext, Column, ColumnDef, Row, Table } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";

type Option = {
  value: string;
  label: string;
};

interface CreateTableCellProps<TData> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getValue: () => any;
  row: Row<TData>;
  column: Column<TData> & {
    columnDef: ColumnDef<TData> & {
      meta?: {
        type: string;
        options?: Option[];
      };
    };
  };
  table: Table<TData> & {
    options: {
      meta?: {
        updateData: (index: number, id: string, value: string | number) => void;
        editedRows: Record<string, boolean>;
      };
    };
  };
}

const CreateTableCell = <TData extends object>({column, getValue, row, table}: CreateTableCellProps<TData>) => {
  const initialValue = getValue()
  const [value, setValue] = useState<string>(initialValue)

  const columnMeta = column.columnDef.meta;
  const tableMeta = table.options.meta;

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  function onBlur() {
    tableMeta?.updateData(row.index, column.id, value)
  }

  function onValueChange(value: string) {
    setValue(value)
    tableMeta?.updateData(row.index, column.id, value)
  }

  if (tableMeta?.editedRows[row.id]) {
    return columnMeta?.type === "select" ? (
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {columnMeta?.options?.map((option: Option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    ) : (
      <Input 
        value={value}
        type={columnMeta?.type || "text"}
        onBlur={onBlur}
        onChange={(e) => setValue(e.target.value)}
      />
    )
  }

  return <span>{value}</span>
}

const TableCell = <TData extends object>(cellContext: CellContext<TData, unknown>) => {
  return (
    <CreateTableCell 
      getValue={cellContext.getValue}
      row={cellContext.row}
      column={
        cellContext.column as Column<TData> & {
          columnDef: {
            meta?: {
              type: string;
            }
          }
        }
      }
      table={
        cellContext.table as Table<TData> & {
          options: {
            meta?: {
              updateData: (index: number, id: string, value: string | number) => void
              editedRows: Record<string, boolean>
            }
          }
        }
      }
    />
  )
}

export default TableCell