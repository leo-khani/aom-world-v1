import {
  IconBinoculars,
  IconBrandAppleArcade,
  IconChartBar,
  IconContract,
  IconDeviceLandlinePhone,
  IconHome,
  IconMoodSilence,
  IconSquareF0,
  IconTrophy,
  IconUserHeart,
} from "@tabler/icons-react";

export const siteConfig = {
  title: "AOM World",
  beta: true,
  description: "AOM World",
  url: "https://aomworld.com",

  logo: {
    gameIcon: "/images/logo/game-icon.webp",
  },

  socialLinks: {
    twitter: "https://twitter.com/aomworldpro",
    github: "https://github.com/aomworldpro",
    discord: "https://discord.gg/KQsyeqnkfx",
    instagram: "https://instagram.com/aomworldpro",
    donate: "https://buymeacoffee.com/mr_nibo",
  },

  navbarItems: [
    {
      name: "Home",
      link: "/",
      icon: <IconHome stroke={2} size={16} />,
    },
    {
      name: "Wiki",
      link: "/wiki",
      icon: <IconMoodSilence stroke={2} size={16} />,
    },
    {
      name: "Hotkeys",
      link: "/hotkey",
      icon: <IconSquareF0 stroke={2} size={16} />,
    },

    {
      name: "Statistics",
      link: "/statistics",
      icon: <IconChartBar stroke={2} size={16} />,
    },
    {
      name: "Leaderboard",
      link: "/leaderboard/1",
      icon: <IconTrophy stroke={2} size={16} />,
    },
  ],

  footerItems: [
    {
      name: "About Us",
      link: "/about",
      icon: <IconUserHeart stroke={2} size={16} />,
    },
    {
      name: "Contact Us",
      link: "/contact",
      icon: <IconDeviceLandlinePhone stroke={2} size={16} />,
    },

    {
      name: "Privacy Policy",
      link: "/privacy-policy",
      icon: <IconContract stroke={2} size={16} />,
    },
    {
      name: "Terms of Service",
      link: "/terms-of-service",
      icon: <IconBrandAppleArcade stroke={2} size={16} />,
    },
  ],

  licenceText:
    "Age of Mythology: Retold ©Microsoft Corporation. Aomworld.com was created under Microsoft's Game Content Usage Rules using assets from Microsoft , and it is not endorsed by or affiliated with Microsoft.",
};
