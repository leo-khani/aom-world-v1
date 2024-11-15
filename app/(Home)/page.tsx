import DiscordPopup from "@/components/DiscordPopup";
import Leaderboard from "@/components/main/Leaderboard";
import GodsSectionContent from "@/components/section/GodsSection/GodsSectionContent";
import HeroSection from "@/components/section/Hero/HeroSection";
import YoutubeVideos from "@/components/section/YoutubeVideos";

/**
 * The Home page component, rendering the main layout of the application.
 *
 * @return {JSX.Element} The JSX elements representing the Home page.
 */

export default function Home() {
  return (
    <div className="flex flex-col gap-2">
      <DiscordPopup />
      <HeroSection />
      <GodsSectionContent />

      <Leaderboard length={15} showLoadMoreBtn />

      <YoutubeVideos />
    </div>
  );
}
