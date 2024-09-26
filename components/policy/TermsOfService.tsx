"use client";

import React from "react";
import {
  IconGavel,
  IconChartBar,
  IconAlertTriangle,
  IconEye,
  IconMessageReport,
  IconRefresh,
} from "@tabler/icons-react";

const TermsOfService = () => {
  return (
    <div className="py-16">
      <div className="max-w-5xl mx-auto py-8 px-12 bg-secondary text-gray-100 rounded-xl shadow-2xl">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-600">
          Aomworld.pro Adventurer's Code
        </h1>

        <div className="space-y-8">
          <Section
            icon={<IconGavel size={24} />}
            title="The Binding Scroll"
            content="By accessing Aomworld.pro, you're not just entering a website, you're joining a realm of leaderboards and stats. These terms are your binding scroll - they govern your adventures here. Read them carefully, brave explorer, for they are the laws of our digital land of rankings and achievements."
          />

          <Section
            icon={<IconChartBar size={24} />}
            title="The Hall of Legends"
            content="Aomworld.pro is the grand Hall of Legends, showcasing leaderboards and statistics for gaming realms. While we strive for accuracy in our ancient records, even the wisest sages can err. Should you spot a discrepancy in the rankings, alert our scribes posthaste."
          />

          <Section
            icon={<IconAlertTriangle size={24} />}
            title="Code of Honor"
            content="In our realm, honor is paramount. Attempts to manipulate leaderboards, submit false data, or engage in any form of trickery are grave offenses. Such actions may result in banishment from our lands. Let fair play be your guiding star as you climb the ranks of legend."
          />

          <Section
            icon={<IconEye size={24} />}
            title="The All-Seeing Eye"
            content="Our mystic seers collect minimal data to power our arcane services, including the tracking of views through IP divination. We do not yet offer personal quarters (user accounts) in our realm. Consult our Privacy Scroll for more details on how we handle the essence of data."
          />

          <Section
            icon={<IconMessageReport size={24} />}
            title="Ye Olde Feedback Scroll"
            content="Your voice shapes our realm. Use the Feedback Scroll to share your thoughts, report bugs in our matrix, or suggest improvements to our leaderboards. While we value your input, remember that by submitting ideas, you grant us the right to use them to enhance the Aomworld.pro experience for all adventurers."
          />

          <Section
            icon={<IconRefresh size={24} />}
            title="Evolving Lore"
            content="As our realm grows, so too may these terms. We'll notify you of significant changes, but it's your responsibility to check this scroll periodically. Your continued use of Aomworld.pro after changes means you accept the updated terms, brave adventurer."
          />
        </div>

        <p className="mt-12 text-sm text-center text-indigo-300">
          Last updated: {new Date().toLocaleDateString()}. Themis. May these
          terms guide your journey through the vast leaderboards and statistics
          of Aomworld.pro.
        </p>
      </div>
    </div>
  );
};

interface SectionProps {
  icon: React.ReactNode;
  title: string;
  content: string;
}
const Section = ({ icon, title, content }: SectionProps) => (
  <div className="flex items-start space-x-4">
    <div className="flex-shrink-0 w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center">
      {icon}
    </div>
    <div>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-blue-200">{content}</p>
    </div>
  </div>
);

export default TermsOfService;
