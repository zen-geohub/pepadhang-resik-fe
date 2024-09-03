import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { ArchiveIcon, DashboardIcon, HomeIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { cn } from "@/lib/utils";
import { useLogin } from "@/hooks/useLogin";

const SidebarNavigation = ({ active }: { active: string }) => {
  const { isLogin } = useLogin();

  return (
    <aside className="bg-foreground w-fit lg:min-w-48 h-full flex flex-col justify-between p-2 lg:p-3">
      <div className="w-fit lg:w-full flex flex-col items-center lg:items-stretch gap-2">
        <Button
          variant="ghost"
          className="text-background bg-secondary-foreground border-opacity-30 lg:justify-start lg:text-base p-3"
        >
          <Link to="/" className="flex items-center">
            <HomeIcon className="lg:w-5 lg:h-5" />{" "}
            <span className="hidden ml-1 lg:block">Beranda</span>
          </Link>
        </Button>
        <Button
          variant={active === "dashboard" ? "default" : "ghost"}
          className={cn(
            active === "dashboard" ? "" : "bg-secondary-foreground",
            "text-background border-opacity-30 lg:justify-start lg:text-base p-3"
          )}
        >
          <Link to="/dashboard" className="flex items-center">
            <DashboardIcon className="lg:w-5 lg:h-5" />{" "}
            <span className="hidden ml-1 lg:block">Dashboard</span>
          </Link>
        </Button>
        {isLogin.role === "admin" && (
          <Button
            variant={active === "admin" ? "default" : "ghost"}
            className={cn(
              active === "admin" ? "" : "bg-secondary-foreground",
              "text-background border-opacity-30 lg:justify-start lg:text-base p-3"
            )}
          >
            <Link to="/admin" className="flex items-center">
              <ArchiveIcon className="lg:w-5 lg:h-5" />{" "}
              <span className="hidden ml-1 lg:block">Basisdata</span>
            </Link>
          </Button>
        )}
      </div>
      {isLogin.user !== "" && (
        <div className="flex items-center gap-2">
        <Avatar>
          <AvatarFallback>{isLogin.user.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <p className="hidden text-primary dark:text-primary-foreground font-poppins capitalize lg:block">{isLogin.user}</p>
      </div>
      )}
    </aside>
  );
};

export default SidebarNavigation;
