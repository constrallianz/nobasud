"use client";

import HeroSection from "@/components/homepage/HeroSection";
import CompanyValues from "@/components/homepage/CompanyValues";
import ServicesSection from "@/components/homepage/ServicesSection";
import KeyNumbers from "@/components/homepage/KeyNumbers";
import RecentProjects from "@/components/homepage/RecentProjects";
import NewsletterSection from "@/components/newsletter/NewsletterSection";
import CareersSection from "@/components/homepage/CareersSection";

export default function HomePage() {
  return (
    <div className="font-montserrat">
      {/* Hero Section */}
      <HeroSection />
      {/* Company Values Section */}
      <CompanyValues />

      {/* Services Section */}
      <ServicesSection />

      {/* Key Numbers Section */}
      <KeyNumbers />

      {/* Recent Projects Section */}
      <RecentProjects />

      {/* Newsletter Section */}
      <NewsletterSection />

      {/* Careers Section */}
     <CareersSection />
    </div>
  );
}
