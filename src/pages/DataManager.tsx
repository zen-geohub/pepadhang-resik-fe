import SidebarNavigation from "@/components/dashboard/SidebarNavigation";
import { columns } from "@/components/data/columns";
import DataTable from "@/components/data/DataTable";
import { useData } from "@/contexts/DataContext";

const DataManager = () => {
  const { advertisePoint } = useData();

  return (
    <div className="w-dvw lg:w-full h-dvh flex">
      <SidebarNavigation active="admin" />
      <DataTable columns={columns} initialData={advertisePoint} />
    </div>
  );
};

export default DataManager;
