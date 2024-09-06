import { EnterIcon, ExitIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import ToggleTheme from "../ToggleTheme";
import logoYogya from "../../assets/Logo_Kota_Yogyakarta.7e10e58cc5c567f49755.png";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { DialogTrigger } from "../ui/dialog";
import { useLogin } from "@/hooks/useLogin";
import { toast } from "sonner";

const Header = () => {
  const { isLogin, setIsLogin } = useLogin();
  const [fixedHeader, setFixedHeader] = useState<boolean>(false);

  function onScroll() {
    if (window !== undefined) {
      const windowHeight = window.scrollY;
      windowHeight > 0 ? setFixedHeader(true) : setFixedHeader(false);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        fixedHeader ? "bg-background" : "bg-transparent",
        "fixed top-0 h-16 w-full p-2 lg:p-4 z-50 flex justify-between items-center transition-colors"
      )}
    >
      <div className="flex gap-2">
        <img src={logoYogya} className="w-8" />
        <p className="text-xs text-card-foreground tracking-tighter lg:tracking-normal">
          <span className="font-semibold">DINAS PERTANAHAN DAN TATA RUANG</span>
          <br />
          <em>(KUNDHA NITI MANDALA SARTA TATA SASANA)</em>
          <br />
          KOTA YOGYAKARTA
        </p>
      </div>
      <div className="flex gap-2 items-center">
        <ToggleTheme />
        {isLogin.user !== "" ? (
          <Button
            variant="destructive"
            onClick={() => {
              fetch(`${import.meta.env.VITE_BACKEND}/logout`, {
                method: "GET",
                credentials: "include",
              })
                .then((response) => response.json())
                .then((auth) => {
                  setIsLogin({ user: "", role: "" });
                  sessionStorage.removeItem('user')
                  toast(auth.message);
                })
                .catch((err) => console.log(err));
            }}
            className="p-[10px] lg:py-[5px] lg:px-4"
          >
            <span className="hidden lg:inline-block font-sans text-sm font-semibold">Logout</span>
            <ExitIcon className="lg:hidden" />
          </Button>
        ) : (
          <DialogTrigger className="bg-primary p-[10px] lg:py-[5px] lg:px-4 rounded-md">
            <span className="hidden lg:inline-block font-sans text-primary-foreground text-sm font-semibold">Login</span>
            <EnterIcon className="lg:hidden" />
          </DialogTrigger>
        )}
      </div>
    </header>
  );
};

export default Header;
