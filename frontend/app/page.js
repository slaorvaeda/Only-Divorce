import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
import Expertise from "./components/Expertise";
import Assistance from "./components/Assistance";
import Testimonials from "./components/Testimonials";
import ConsultationForm from "./components/ConsultationForm";
import Locations from "./components/Locations";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f4f5fb] text-slate-900">
      <Hero />
      <AboutSection />
      <Expertise />
      <Assistance />
      <Testimonials />
      <ConsultationForm />
      <Locations />
    </div>
  );
}
