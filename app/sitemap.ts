import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch top players for the sitemap
  const topPlayers = await fetchTopPlayers();

  const playerUrls = topPlayers.map((player: { userName: any; }) => ({
    url: `https://www.aomworld.pro/player/${player.userName}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }));

  return [
    {
      url: 'https://www.aomworld.pro',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://www.aomworld.pro/leaderboard',
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.9,
    },
    {
        url: 'https://www.aomworld.pro/player/MrNibo',
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.7,
      },
    ...playerUrls,
  ];
}

async function fetchTopPlayers() {
    const response = await fetch("https://www.aomworld.pro/api/leaderboard/getLeaderboard", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        region: "7",
        matchType: "1",
        consoleMatchType: 15,
        searchPlayer: "",
        page: 1,
        count: 100, // Fetch top 100 players for the sitemap
        sortColumn: "rank",
        sortDirection: "ASC",
      }),
    });
  
    if (!response.ok) {
      throw new Error("Failed to fetch top players for sitemap");
    }
  
    const result = await response.json();
    return result.items;
  }