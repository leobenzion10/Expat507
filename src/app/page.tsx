import Hero from "@/components/home/Hero";
import CategoryGrid from "@/components/home/CategoryGrid";
import FeaturedArticles from "@/components/home/FeaturedArticles";
import TrustSection from "@/components/home/TrustSection";
import ConsultaCTA from "@/components/home/ConsultaCTA";
import NewsletterBanner from "@/components/home/NewsletterBanner";
import GoldDivider from "@/components/ui/GoldDivider";

export default function HomePage() {
  return (
    <>
      <Hero />
      <GoldDivider />
      <CategoryGrid />
      <GoldDivider />
      <FeaturedArticles />
      <GoldDivider />
      <TrustSection />
      <GoldDivider />
      <ConsultaCTA />
      <GoldDivider />
      <NewsletterBanner />
    </>
  );
}
