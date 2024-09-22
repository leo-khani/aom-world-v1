import Leaderboard from "@/components/main/Leaderboard";
import Feedback from "@/components/section/Feedback";
import Hotkey from "@/components/section/Hotkey";
import YoutubeVideos from "@/components/section/YoutubeVideos";

export default function Home() {
  return (
    <div>
      <Hotkey />
      <Feedback />
      <Leaderboard length={10} showLoadMoreBtn />
      <YoutubeVideos />
    </div>
  );
}
