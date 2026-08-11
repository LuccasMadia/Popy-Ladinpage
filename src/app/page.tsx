import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { FlavorShowcase } from "@/components/FlavorShowcase";
import { WhyPopy } from "@/components/WhyPopy";
import { Partners } from "@/components/Partners";
import { HowItWorks } from "@/components/HowItWorks";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <FlavorShowcase />
        <WhyPopy />
        <Partners />
        <HowItWorks />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
