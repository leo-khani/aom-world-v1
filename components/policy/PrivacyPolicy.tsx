"use client";

import React from "react";
import {
  IconShield,
  IconChartBar,
  IconLock,
  IconWorld,
  IconAlertCircle,
  IconMail,
} from "@tabler/icons-react";

const PrivacyPolicy = () => {
  return (
    <div className="py-16">
      <div className="max-w-5xl mx-auto py-8 px-12 bg-secondary text-gray-100 rounded-xl shadow-2xl">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-600">
          Aomworld.pro Privacy Pledge
        </h1>

        <div className="space-y-8">
          <Section
            icon={<IconShield size={24} />}
            title="Our Commitment to Your Privacy"
            content="At Aomworld.pro, we prioritize your privacy. We've adopted a minimalist approach to data collection, ensuring that your personal information remains yours."
          />

          <Section
            icon={<IconChartBar size={24} />}
            title="Limited Data Collection"
            content="We do not collect any personal data from our users. The only information we gather is anonymous analytics data, which helps us improve our service and user experience."
          />

          <Section
            icon={<IconLock size={24} />}
            title="Third-Party Analytics Security"
            content="The analytics data we collect is securely managed by a trusted third-party application. This ensures that the limited data we do collect is handled with the highest standards of security and privacy."
          />

          <Section
            icon={<IconWorld size={24} />}
            title="Global Standards, Local Compliance"
            content="While we operate globally, we ensure our minimal data collection practices comply with local privacy laws, including GDPR and CCPA."
          />

          <Section
            icon={<IconAlertCircle size={24} />}
            title="Transparency is Our Policy"
            content="We believe in complete transparency. Our analytics collection is designed to be anonymous, but if you have any questions about our practices, we're always here to provide clear, honest answers."
          />

          <Section
            icon={<IconMail size={24} />}
            title="Open Communication"
            content="Have concerns or questions? We're just a message away. Reach out to us at nibogamesinfo@gmail.com or through our Discord support channel."
          />
        </div>

        <p className="mt-12 text-sm text-center text-indigo-300">
          Last updated: {new Date().toLocaleDateString()}. Themis. We regularly
          review our privacy measures to ensure they align with our commitment
          to minimal data collection and maximum user privacy.
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
    <div className="flex-shrink-0 w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center p-1">
      {icon}
    </div>
    <div>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-indigo-200">{content}</p>
    </div>
  </div>
);

export default PrivacyPolicy;
