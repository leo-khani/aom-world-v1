import TermsOfService from "@/components/policy/TermsOfService";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Terms of Service | Aomworld.pro",
  description: "Terms of Service for Aomworld.pro",
};

export default function TermsOfServicePage() {
  return (
    <>
      {/* This is the TermsOfService component, which renders the privacy policy text and layout. */}
      <TermsOfService />
    </>
  );
}
