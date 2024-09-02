import Header from "@/components/home/Header";
import Hero from "@/components/home/Hero";
import KeyFeature from "@/components/home/KeyFeature";
import Footer from "@/components/home/Footer";
import { Dialog } from "@/components/ui/dialog";
import LoginDialog from "@/components/home/LoginDialog";
import { useEffect, useState } from "react";
import { useLogin } from "@/contexts/LoginContext";

const Home = () => {
  const {isLogin} = useLogin()
  const [loginOpen, setLoginOpen] = useState<boolean>(false)

  useEffect(() => {
    if (isLogin) {
      setLoginOpen(false)
    }
  }, [isLogin])

  return (
    <div className="w-dvw lg:w-full h-dvh">
      <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
        <Header />
        <Hero />
        <KeyFeature />
        <Footer />
        <LoginDialog />
      </Dialog>
    </div>
  );
};

export default Home;
