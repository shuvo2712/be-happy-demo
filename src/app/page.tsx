import HeroSection from "@/components/sections/HeroSection";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import SocialResponsibility from "@/components/sections/SocialResponsibility";
import ServiceGrid from "@/components/sections/ServiceGrid";
import BookingForm from "@/components/forms/BookingForm";

export default function Home() {
  return (
    <main className="flex-1">
      <HeroSection />
      <WhyChooseUs />
      <SocialResponsibility />
      <ServiceGrid />
      <BookingForm />
      
      {/* Simple Footer */}
      <footer className="bg-slate-950 py-12 text-center text-slate-400">
        <p>© {new Date().getFullYear()} Be Happy in Dhaka. All rights reserved.</p>
        <p className="mt-2 text-sm">Your Trusted Local Partner.</p>
      </footer>
    </main>
  );
}
