import Header from "@/components/home/Header";
import Hero from "@/components/home/Hero";
import KeyFeature from "@/components/home/KeyFeature";
import Footer from "@/components/home/Footer";

const Home = () => {
  return (
    <div className="w-dvw lg:w-full h-dvh">
      <Header />
      <Hero />
      <KeyFeature />
      <Footer />
    </div>
  );
};

export default Home;
