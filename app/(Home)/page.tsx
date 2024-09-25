import DiscordPopup from "@/components/DiscordPopup";
import Leaderboard from "@/components/main/Leaderboard";
import StatisticsMain from "@/components/main/statistics/StatisticsMain";
import Feedback from "@/components/section/Feedback";
import GodsSectionContent from "@/components/section/GodsSection/GodsSectionContent";
import HeroSection from "@/components/section/Hero/HeroSection";
import YoutubeVideos from "@/components/section/YoutubeVideos";

/**
 * The Home page component, rendering the main layout of the application.
 *
 * @return {JSX.Element} The JSX element representing the Home page.
 */
export default function Home() {
  return (
    <div className="flex flex-col gap-2">
      <DiscordPopup />
      <HeroSection />
      <GodsSectionContent />
      <Feedback />
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-2/3">
          <Leaderboard length={20} showLoadMoreBtn />
        </div>
        <div className="w-full lg:w-1/3">
          <StatisticsMain />
        </div>
      </div>
      <YoutubeVideos />
    </div>
  );
}
