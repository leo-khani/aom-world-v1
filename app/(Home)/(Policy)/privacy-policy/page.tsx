import PrivacyPolicy from "@/components/policy/PrivacyPolicy";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Privacy Policy | Aomworld.pro",
  description: "Privacy Policy for Aomworld.pro",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* This is the PrivacyPolicy component, which renders the privacy policy text and layout. */}
      <PrivacyPolicy />
    </>
  );
}
