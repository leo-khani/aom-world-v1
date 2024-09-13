import Leaderboard from "@/components/main/Leaderboard";
import YoutubeVideos from "@/components/section/YoutubeVideos";

export default function Home() {
  return (
    <div className="">
      <Leaderboard length={10} showLoadMoreBtn />
      <YoutubeVideos />
    </div>
  );
}
