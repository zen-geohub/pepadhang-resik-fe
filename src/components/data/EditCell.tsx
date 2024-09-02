import { AdvertisePoint } from "@/contexts/DataContext";
import { Row, Table } from "@tanstack/react-table";
import { Dispatch, MouseEvent, SetStateAction } from "react";
import { Button } from "../ui/button";
import { CheckIcon, Cross1Icon, Pencil1Icon } from "@radix-ui/react-icons";

interface EditCellProps<TData> {
  row: Row<TData>;
  table: Table<TData> & {
    options: {
      meta?: {
        editedRows: Record<string, boolean>;
        setEditedRows: Dispatch<SetStateAction<Record<string, boolean>>>;
        revertData: (rowIndex: number, revert: boolean) => void;
      };
    };
  };
}

const EditCell = <TData extends object>({
  row,
  table,
}: EditCellProps<TData>) => {
  const tableMeta = table.options.meta;

  const setEditedRows = (e: MouseEvent<HTMLButtonElement>) => {
    const status = e.currentTarget.name;

    tableMeta?.setEditedRows((prev) => {
      const newEditedRows = {
        ...prev,
        [row.id]: !prev[row.id],
      };

      if (status === "cancel") {
        tableMeta?.revertData(row.index, status === "cancel");
      }
      if (status === "done") {
        const { _id, properties, type } = row.original as AdvertisePoint;
        // const {
        //   Nomor, Kode, Ukuran
        // } = properties

        fetch(`${import.meta.env.VITE_BACKEND}/data/${_id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: type,
            properties: properties,
          }),
        })
          .then((response) => response.json())
          .then((data) => console.log(data))
          .catch((err) => console.log(err));
      }

      return newEditedRows;
    });
  };

  return (
    <div>
      {tableMeta?.editedRows[row.id] ? (
        <div className="flex gap-2">
          <Button
            size="icon"
            variant="destructive"
            onClick={setEditedRows}
            name="cancel"
          >
            <Cross1Icon />
          </Button>
          <Button
            size="icon"
            variant="default"
            onClick={setEditedRows}
            name="done"
          >
            <CheckIcon />
          </Button>
        </div>
      ) : (
        <Button
          size="icon"
          variant="default"
          onClick={setEditedRows}
          name="edit"
        >
          <Pencil1Icon />
        </Button>
      )}
    </div>
  );
};

export default EditCell;
