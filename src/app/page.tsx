import { Hero } from "@/components/Hero";
import { Flavors } from "@/components/Flavors";
import { Features } from "@/components/Features";
import { Testimonials } from "@/components/Testimonials";
import { CtaBanner } from "@/components/CtaBanner";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-brand-cream">
      <main className="flex-1">
        <Hero />
        <Flavors />
        <Features />
        <Testimonials />
        <CtaBanner />
      </main>
      <Footer />
    </div>
  );
}
