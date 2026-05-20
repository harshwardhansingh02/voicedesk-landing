import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Problems from "@/components/Problems";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import LiveDemo from "@/components/LiveDemo";
import Testimonials from "@/components/Testimonials";
import ForPartners from "@/components/ForPartners";
import ContactForm from "@/components/ContactForm";
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
        <LiveDemo />
        <Testimonials />
        <ForPartners />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
