import Leaderboard from "@/components/main/Leaderboard";
import Hotkey from "@/components/section/Hotkey";
import YoutubeVideos from "@/components/section/YoutubeVideos";

export default function Home() {
  return (
    <div className="">
      <Hotkey />
      <Leaderboard length={10} showLoadMoreBtn />
      <YoutubeVideos />
    </div>
  );
}
