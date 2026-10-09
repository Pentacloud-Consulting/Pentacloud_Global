import React from "react";
import type { Metadata } from "next";
import ResumeView from "@/Web-Page/Career/Resume view";

export const metadata: Metadata = {
  title: "Candidate Resume Viewer | Pentacloud Consulting",
  description: "View and download candidate resumes submitted to Pentacloud Consulting India.",
  robots: {
    index: false,
    follow: false,
  },
};

interface PageProps {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<{
    file?: string;
    url?: string;
    name?: string;
    email?: string;
    phone?: string;
    position?: string;
    role?: string;
    date?: string;
  }>;
}

export default async function ResumeViewerPage({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const slugParam = resolvedParams.slug ? resolvedParams.slug.join("/") : undefined;

  return (
    <ResumeView
      slug={slugParam}
      initialFileUrl={resolvedSearchParams.file || resolvedSearchParams.url}
      initialName={resolvedSearchParams.name}
      initialEmail={resolvedSearchParams.email}
      initialPhone={resolvedSearchParams.phone}
      initialPosition={resolvedSearchParams.position || resolvedSearchParams.role}
      initialDate={resolvedSearchParams.date}
    />
  );
}
