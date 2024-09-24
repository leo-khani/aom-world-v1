import DiscordPopup from "@/components/DiscordPopup";
import { HotkeyBar } from "@/components/hotkey/HotkeyCollection";
import Leaderboard from "@/components/main/Leaderboard";
import Feedback from "@/components/section/Feedback";
import YoutubeVideos from "@/components/section/YoutubeVideos";

export default function Home() {
  return (
    <div>
      <DiscordPopup />
      <HotkeyBar />
      <Feedback />
      <Leaderboard length={10} showLoadMoreBtn />
      <YoutubeVideos />
    </div>
  );
}
