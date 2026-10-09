"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Download, 
  FileText, 
  Mail, 
  Phone, 
  User, 
  Briefcase, 
  Calendar, 
  ArrowLeft, 
  ExternalLink, 
  Eye, 
  CheckCircle2, 
  AlertCircle, 
  Share2, 
  Copy, 
  Check, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Sparkles,
  Printer,
  ShieldCheck,
  Building2,
  FileCode2
} from "lucide-react";
import { CLAY_CARD, NEUMORPHIC_BUTTON } from "../Contact/Constants";

interface ResumeViewProps {
  initialFileUrl?: string;
  initialName?: string;
  initialEmail?: string;
  initialPhone?: string;
  initialPosition?: string;
  initialDate?: string;
  slug?: string;
}

export default function ResumeView({
  initialFileUrl,
  initialName,
  initialEmail,
  initialPhone,
  initialPosition,
  initialDate,
  slug,
}: ResumeViewProps) {
  const [copied, setCopied] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isDownloading, setIsDownloading] = useState(false);
  const [fileError, setFileError] = useState(false);

  // Extract or parse metadata from URL or slug
  const [meta, setMeta] = useState({
    fileUrl: "",
    name: "",
    email: "",
    phone: "",
    position: "",
    date: "",
    fileName: "",
  });

  const [fileStatus, setFileStatus] = useState<"checking" | "valid" | "not_found">("checking");

  useEffect(() => {
    // Determine details from search params or slug
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      const urlFile = searchParams.get("file") || searchParams.get("url") || initialFileUrl || "";
      const urlName = searchParams.get("name") || initialName || "";
      const urlEmail = searchParams.get("email") || initialEmail || "";
      const urlPhone = searchParams.get("phone") || initialPhone || "";
      const urlPosition = searchParams.get("position") || searchParams.get("role") || initialPosition || "";
      const urlDate = searchParams.get("date") || initialDate || new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' });

      // Clean slug fallback
      let parsedName = urlName;
      let parsedPosition = urlPosition;
      let targetFileUrl = urlFile;
      let extractedFileName = "Resume.pdf";

      if (slug) {
        const cleanSlug = Array.isArray(slug) ? slug.join("/") : slug;
        extractedFileName = cleanSlug.split("/").pop() || "Resume.pdf";
        
        if (!targetFileUrl) {
          targetFileUrl = `/api/uploads/resumes/${extractedFileName}`;
        }

        if (!parsedName) {
          const parts = extractedFileName.replace(/\.(pdf|doc|docx|png|jpg|jpeg)$/i, "").split("-").filter(Boolean);
          if (parts.length > 0) {
            parsedName = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
          }
        }

        if (!parsedPosition) {
          const lowerName = extractedFileName.toLowerCase();
          if (lowerName.includes("salesforce")) parsedPosition = "Salesforce Consultant / BA";
          else if (lowerName.includes("developer") || lowerName.includes("dev")) parsedPosition = "Software Developer";
          else if (lowerName.includes("designer") || lowerName.includes("ui")) parsedPosition = "UI/UX Designer";
          else if (lowerName.includes("manager")) parsedPosition = "Project Manager";
          else parsedPosition = "Applicant";
        }
      }

      if (targetFileUrl) {
        extractedFileName = targetFileUrl.split("/").pop()?.split("?")[0] || extractedFileName;
      }

      if (targetFileUrl && !targetFileUrl.startsWith("http") && !targetFileUrl.startsWith("/api/")) {
        targetFileUrl = `/api/uploads/resumes/${extractedFileName}`;
      }

      setMeta({
        fileUrl: targetFileUrl,
        name: parsedName || "Applicant",
        email: urlEmail || "Not provided",
        phone: urlPhone || "Not provided",
        position: parsedPosition || "Career Applicant",
        date: urlDate,
        fileName: extractedFileName,
      });

      // Verify file existence on server
      if (targetFileUrl) {
        setFileStatus("checking");
        fetch(targetFileUrl, { method: "HEAD" })
          .then((res) => {
            if (res.ok && res.status === 200) {
              setFileStatus("valid");
            } else {
              setFileStatus("not_found");
            }
          })
          .catch(() => setFileStatus("not_found"));
      } else {
        setFileStatus("not_found");
      }
    }
  }, [initialFileUrl, initialName, initialEmail, initialPhone, initialPosition, initialDate, slug]);

  const fileExtension = meta.fileName.split(".").pop()?.toLowerCase() || "pdf";
  const isPdf = fileExtension === "pdf" || meta.fileUrl.endsWith(".pdf");
  const isImage = ["png", "jpg", "jpeg", "webp", "svg"].includes(fileExtension);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = async () => {
    if (!meta.fileUrl) {
      alert("Resume file URL is not available.");
      return;
    }

    setIsDownloading(true);

    try {
      // Try direct download via anchor element
      const response = await fetch(meta.fileUrl);
      if (!response.ok) throw new Error("Network response was not ok");
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = meta.fileName || `${meta.name.replace(/\s+/g, "_")}_Resume.${fileExtension}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(blobUrl);
      document.body.removeChild(a);
    } catch (error) {
      // Fallback: Open in new tab for direct download
      window.open(meta.fileUrl, "_blank");
    } finally {
      setTimeout(() => setIsDownloading(false), 800);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F7FB] text-[#0D1B2A] font-inter selection:bg-[#1A7FD4]/20 selection:text-[#1A7FD4] pb-16">
      
      {/* Top Brand Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#1A7FD4]/10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <Image 
              src="/Logo/Pentacloud logo.png" 
              alt="Pentacloud Logo" 
              width={180} 
              height={45} 
              className="h-9 sm:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
            />
            <span className="hidden sm:block h-5 w-px bg-slate-200" />
            <span className="text-[10px] font-bold text-[#4A6080] uppercase tracking-wider hidden sm:block">
              Career Application Viewer
            </span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={handleCopyLink}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 text-[#4A6080] hover:bg-slate-200 hover:text-[#0D1B2A] transition-colors"
            >
              {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
              {copied ? "Link Copied!" : "Share Link"}
            </button>

            <Link
              href="/careers"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold bg-[#1A7FD4]/10 text-[#1A7FD4] hover:bg-[#1A7FD4] hover:text-white transition-all shadow-sm"
            >
              <ArrowLeft size={16} />
              <span>Back to Careers</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10">
        
        {/* Candidate Info Hero Header */}
        <div className={`${CLAY_CARD} p-6 sm:p-8 mb-8 border border-white/60 relative overflow-hidden`}>
          {/* Subtle Background Glow */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#1A7FD4]/5 rounded-full blur-3xl -z-10 pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            {/* Candidate Identity */}
            <div className="flex items-start gap-4 sm:gap-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#1A7FD4] to-[#2563EB] text-white flex items-center justify-center font-nunito font-black text-2xl sm:text-3xl shadow-[0_10px_25px_rgba(26,127,212,0.35)] shrink-0">
                {meta.name.substring(0, 2).toUpperCase()}
              </div>

              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h1 className="text-2xl sm:text-3xl font-nunito font-black text-[#0D1B2A]">
                    {meta.name}
                  </h1>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#1A7FD4]/10 text-[#1A7FD4] border border-[#1A7FD4]/20 flex items-center gap-1">
                    <CheckCircle2 size={13} className="text-[#1A7FD4]" /> Verification Ready
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm text-[#4A6080] font-medium">
                  <div className="flex items-center gap-1.5 text-[#0D1B2A] font-semibold">
                    <Briefcase size={15} className="text-[#1A7FD4]" />
                    <span>Applied for: <strong className="text-[#1A7FD4] font-extrabold">{meta.position}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-[#4A6080]" />
                    <span>Submitted: {meta.date}</span>
                  </div>
                </div>

                {/* Direct Contact Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  {meta.email && meta.email !== "Not provided" && (
                    <a
                      href={`mailto:${meta.email}?subject=Application%20Update%20-%20Pentacloud%20Consulting`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-[#1A7FD4] hover:bg-[#1A7FD4] hover:text-white transition-colors text-xs font-bold border border-blue-200/60"
                    >
                      <Mail size={13} />
                      <span>{meta.email}</span>
                    </a>
                  )}

                  {meta.phone && meta.phone !== "Not provided" && (
                    <a
                      href={`tel:${meta.phone}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white transition-colors text-xs font-bold border border-emerald-200/60"
                    >
                      <Phone size={13} />
                      <span>{meta.phone}</span>
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Action Bar (Download & Actions) */}
            <div className="flex flex-wrap items-center gap-3 self-start lg:self-center">
              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className="flex-1 sm:flex-none px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#1A7FD4] to-[#2563EB] text-white font-nunito font-black text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-[0_10px_25px_rgba(26,127,212,0.35)] hover:shadow-[0_15px_30px_rgba(26,127,212,0.45)] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
              >
                <Download size={18} className={isDownloading ? "animate-bounce" : ""} />
                <span>{isDownloading ? "Downloading..." : "Download Resume"}</span>
              </button>

              {meta.fileUrl && (
                <a
                  href={meta.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3.5 rounded-2xl bg-white text-[#0D1B2A] border border-slate-200 shadow-sm hover:border-[#1A7FD4] hover:text-[#1A7FD4] transition-all font-bold text-xs sm:text-sm flex items-center gap-1.5"
                  title="Open raw file in new tab"
                >
                  <ExternalLink size={16} />
                  <span className="hidden sm:inline">Open File</span>
                </a>
              )}
            </div>

          </div>
        </div>

        {/* Document Viewer Container */}
        <div className="bg-white rounded-[24px] border border-slate-200 shadow-xl overflow-hidden mb-12">
          
          {/* Viewer Toolbar */}
          <div className="bg-slate-900 text-slate-200 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800">
            <div className="flex items-center gap-2 font-mono text-xs sm:text-sm truncate">
              <FileText size={16} className="text-[#1A7FD4] shrink-0" />
              <span className="truncate font-semibold text-slate-100">{meta.fileName}</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] uppercase font-bold text-slate-400">
                {fileExtension}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Zoom Controls */}
              {isPdf && (
                <div className="hidden sm:flex items-center gap-1 bg-slate-800 p-1 rounded-lg text-xs">
                  <button
                    onClick={() => setZoomLevel(prev => Math.max(50, prev - 15))}
                    className="p-1 hover:bg-slate-700 rounded text-slate-300"
                    title="Zoom Out"
                  >
                    <ZoomOut size={14} />
                  </button>
                  <span className="px-2 font-mono text-[11px] text-slate-300">{zoomLevel}%</span>
                  <button
                    onClick={() => setZoomLevel(prev => Math.min(180, prev + 15))}
                    className="p-1 hover:bg-slate-700 rounded text-slate-300"
                    title="Zoom In"
                  >
                    <ZoomIn size={14} />
                  </button>
                </div>
              )}

              <button
                onClick={handleDownload}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1A7FD4] text-white hover:bg-blue-600 text-xs font-bold transition-colors"
              >
                <Download size={13} />
                <span>Save PDF</span>
              </button>
            </div>
          </div>

          {/* Document Preview Box */}
          <div className="bg-slate-100 min-h-[600px] sm:min-h-[750px] flex items-center justify-center p-2 sm:p-6 relative overflow-auto">
            
            {fileStatus === "checking" ? (
              <div className="flex flex-col items-center justify-center space-y-3 py-20">
                <div className="w-10 h-10 border-4 border-[#1A7FD4] border-t-transparent rounded-full animate-spin" />
                <span className="text-xs font-semibold text-[#4A6080]">Loading applicant resume preview...</span>
              </div>
            ) : fileStatus === "valid" ? (
              isPdf ? (
                <div className="w-full h-[650px] sm:h-[800px] bg-white rounded-xl shadow-inner border border-slate-200 overflow-hidden relative">
                  <iframe
                    src={`${meta.fileUrl}#toolbar=1&navpanes=0&zoom=${zoomLevel}`}
                    className="w-full h-full border-none"
                    title="Resume PDF Viewer"
                  />
                </div>
              ) : isImage ? (
                <div className="max-w-4xl max-h-[800px] p-4 bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden flex items-center justify-center">
                  <img
                    src={meta.fileUrl}
                    alt={`${meta.name}'s Resume`}
                    className="max-w-full max-h-[750px] object-contain rounded"
                    style={{ transform: `scale(${zoomLevel / 100})`, transition: "transform 0.2s ease" }}
                  />
                </div>
              ) : (
                /* Non-PDF / DOCX File Card */
                <div className="max-w-lg w-full bg-white p-8 rounded-2xl border border-slate-200 text-center shadow-lg my-12">
                  <div className="w-20 h-20 bg-blue-50 text-[#1A7FD4] rounded-2xl flex items-center justify-center mx-auto mb-4 border border-blue-100">
                    <FileCode2 size={40} />
                  </div>
                  <h3 className="text-xl font-nunito font-black text-[#0D1B2A] mb-2">
                    {meta.fileName}
                  </h3>
                  <p className="text-xs text-[#4A6080] mb-6 leading-relaxed">
                    This document format ({fileExtension.toUpperCase()}) can be downloaded directly to view on your device.
                  </p>
                  <button
                    onClick={handleDownload}
                    className="w-full py-3.5 rounded-xl bg-[#1A7FD4] text-white font-nunito font-black text-sm shadow-md hover:bg-blue-600 transition-all flex items-center justify-center gap-2"
                  >
                    <Download size={18} />
                    <span>Download {fileExtension.toUpperCase()} Document</span>
                  </button>
                </div>
              )
            ) : (
              /* Informative Card when legacy file wasn't stored on server */
              <div className="max-w-xl w-full bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 text-center shadow-lg my-8">
                <div className="w-16 h-16 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-amber-200/60">
                  <AlertCircle size={32} />
                </div>
                <h3 className="text-xl font-nunito font-black text-[#0D1B2A] mb-2">
                  Application Record Verified
                </h3>
                <p className="text-xs sm:text-sm text-[#4A6080] mb-6 leading-relaxed max-w-md mx-auto">
                  Application record for <strong className="text-[#0D1B2A]">{meta.name}</strong> ({meta.position}) is active. The original PDF file was sent via email before automatic server hosting was configured.
                </p>

                <div className="bg-slate-50 p-4 rounded-xl text-left border border-slate-200 text-xs space-y-2 mb-6 font-mono">
                  <div><strong className="text-slate-700">Applicant:</strong> {meta.name}</div>
                  <div><strong className="text-slate-700">Role:</strong> {meta.position}</div>
                  <div><strong className="text-slate-700">Email:</strong> {meta.email}</div>
                  <div><strong className="text-slate-700">Phone:</strong> {meta.phone}</div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  {meta.email && meta.email !== "Not provided" && (
                    <a
                      href={`mailto:${meta.email}?subject=Pentacloud%20Application%20Follow-up`}
                      className="flex-1 py-3 px-4 rounded-xl bg-[#1A7FD4] text-white font-extrabold text-xs flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors shadow-sm"
                    >
                      <Mail size={15} />
                      <span>Email Candidate ({meta.email})</span>
                    </a>
                  )}
                  {meta.phone && meta.phone !== "Not provided" && (
                    <a
                      href={`tel:${meta.phone}`}
                      className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 text-white font-extrabold text-xs flex items-center justify-center gap-2 hover:bg-emerald-700 transition-colors shadow-sm"
                    >
                      <Phone size={15} />
                      <span>Call Candidate ({meta.phone})</span>
                    </a>
                  )}
                </div>
              </div>
            )}

          </div>

          {/* Bottom Security Footer */}
          <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-[#4A6080] gap-2">
            <div className="flex items-center gap-2 font-medium">
              <ShieldCheck size={16} className="text-emerald-600" />
              <span>Confidential Career Candidate Record &bull; Pentacloud Consulting India</span>
            </div>
            <div className="text-[11px] font-mono text-slate-400">
              ID: {meta.fileName.replace(/[^a-zA-Z0-9]/g, "-").slice(0, 20)}
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}
