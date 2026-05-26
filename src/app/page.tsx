import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Problems from "@/components/Problems";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import ForPartners from "@/components/ForPartners";
import DemoSection from "@/components/DemoSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Problems />
        <HowItWorks />
        <Features />
        <Testimonials />
        <ForPartners />
        <DemoSection />
      </main>
      <Footer />
    </>
  );
}
