import DiscordPopup from "@/components/DiscordPopup";
import { HotkeyBar } from "@/components/hotkey/HotkeyCollection";
import Leaderboard from "@/components/main/Leaderboard";
import StatisticsMain from "@/components/main/statistics/StatisticsMain";
import Feedback from "@/components/section/Feedback";
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
      <Feedback />
      <HotkeyBar />
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-2/3">
          <Leaderboard length={15} showLoadMoreBtn />
        </div>
        <div className="w-full lg:w-1/3">
          <StatisticsMain />
        </div>
      </div>
      <YoutubeVideos />
    </div>
  );
}
