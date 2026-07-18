import HeroSection from "@/components/sections/HeroSection";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import SocialResponsibility from "@/components/sections/SocialResponsibility";
import ServiceGrid from "@/components/sections/ServiceGrid";
import BookingForm from "@/components/forms/BookingForm";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="flex-1">
      <HeroSection />
      <ServiceGrid />
      <SocialResponsibility />
      <WhyChooseUs />
      <BookingForm />
      <Footer />
    </main>
  );
}
