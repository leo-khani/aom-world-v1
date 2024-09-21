import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch top players for the sitemap from 5 pages
  const topPlayers = await fetchTopPlayers(20);

  const playerUrls = topPlayers.map((player: { rlUserId: any; name: string }) => ({
    url: `https://www.aomworld.pro/player/${player.rlUserId}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.7,
    title: `${player.name}'s Profile`, // Add title for player pages
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
      url: 'https://www.aomworld.pro/gods-statistics',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: 'https://www.aomworld.pro/statistics',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
      title: 'AOM World Pro - Statistics', // Add title for statistics page
    },
    ...playerUrls,
  ];
}

async function fetchTopPlayers(pages: number) {
  let allPlayers: any[] = [];

  for (let page = 1; page <= pages; page++) {
    const response = await fetch("https://api.ageofempires.com/api/agemyth/Leaderboard", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        region: "7",
        matchType: "1",
        consoleMatchType: 15,
        searchPlayer: "",
        page: page,
        count: 100, 
        sortColumn: "rank",
        sortDirection: "ASC",
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch top players for sitemap on page ${page}`);
    }

    const result = await response.json();
    allPlayers = allPlayers.concat(result.items);
  }

  return allPlayers;
}