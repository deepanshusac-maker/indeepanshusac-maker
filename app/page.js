import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import BeforeAfter from "@/components/BeforeAfter";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import ScrollToTop from "@/components/ScrollToTop";
import ClientAnimations from "@/components/ClientAnimations";

export default function Home() {
  return (
    <main className="pb-14 md:pb-0 w-full overflow-hidden">
      <ClientAnimations />
      <Navbar />
      <Hero />
      <Marquee />
      <div className="section-divider" />
      <About />
      <div className="section-divider" />
      <Services />
      <WhyUs />
      <div className="section-divider" />
      <BeforeAfter />
      <div className="section-divider" />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
