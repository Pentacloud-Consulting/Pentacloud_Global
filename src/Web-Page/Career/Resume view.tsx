"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Download, 
  FileText, 
  Mail, 
  Phone, 
  Briefcase, 
  Calendar, 
  ArrowLeft, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  Check, 
  ZoomIn, 
  ZoomOut, 
  ShieldCheck,
  FileCode2
} from "lucide-react";
import { CLAY_CARD } from "../Contact/Constants";

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
      window.open(meta.fileUrl, "_blank");
    } finally {
      setTimeout(() => setIsDownloading(false), 800);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F7FB] text-[#0D1B2A] font-inter selection:bg-[#1A7FD4]/20 selection:text-[#1A7FD4] pb-8 sm:pb-16">
      
      {/* Top Brand Header (Responsive & Compact) */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#1A7FD4]/10 shadow-xs">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3.5 flex items-center justify-between gap-2">
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group shrink">
            <Image 
              src="/Logo/Pentacloud logo.png" 
              alt="Pentacloud Logo" 
              width={140} 
              height={35} 
              className="h-7 sm:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
            />
            <span className="hidden md:block h-4 w-px bg-slate-200" />
            <span className="text-[10px] font-bold text-[#4A6080] uppercase tracking-wider hidden md:block">
              Resume Viewer
            </span>
          </Link>

          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <button
              onClick={handleCopyLink}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-[#4A6080] hover:bg-slate-200 transition-colors"
            >
              {copied ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
              <span>{copied ? "Copied" : "Share"}</span>
            </button>

            <Link
              href="/careers"
              className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-extrabold bg-[#1A7FD4]/10 text-[#1A7FD4] hover:bg-[#1A7FD4] hover:text-white transition-all"
            >
              <ArrowLeft size={14} />
              <span>Careers</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-2.5 sm:px-6 pt-3 sm:pt-8">
        
        {/* Candidate Info Hero Header (Mobile Compact Card) */}
        <div className={`${CLAY_CARD} p-4 sm:p-6 mb-4 sm:mb-8 border border-white/60 relative overflow-hidden`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            
            {/* Candidate Identity */}
            <div className="flex items-start gap-3 sm:gap-5">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#1A7FD4] to-[#2563EB] text-white flex items-center justify-center font-nunito font-black text-lg sm:text-2xl shadow-md shrink-0">
                {meta.name.substring(0, 2).toUpperCase()}
              </div>

              <div className="space-y-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-nunito font-black text-[#0D1B2A] truncate">
                    {meta.name}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold bg-[#1A7FD4]/10 text-[#1A7FD4] border border-[#1A7FD4]/20 flex items-center gap-1 shrink-0">
                    <CheckCircle2 size={11} className="text-[#1A7FD4]" /> Application Verified
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#4A6080] font-medium">
                  <div className="flex items-center gap-1 text-[#0D1B2A]">
                    <Briefcase size={13} className="text-[#1A7FD4] shrink-0" />
                    <span className="truncate">Role: <strong className="text-[#1A7FD4]">{meta.position}</strong></span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar size={13} className="text-[#4A6080] shrink-0" />
                    <span>{meta.date}</span>
                  </div>
                </div>

                {/* Direct Contact Links */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {meta.email && meta.email !== "Not provided" && (
                    <a
                      href={`mailto:${meta.email}?subject=Application%20Update%20-%20Pentacloud`}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-blue-50 text-[#1A7FD4] hover:bg-[#1A7FD4] hover:text-white transition-colors text-[11px] font-bold border border-blue-200/60 truncate max-w-[200px] sm:max-w-none"
                    >
                      <Mail size={12} className="shrink-0" />
                      <span className="truncate">{meta.email}</span>
                    </a>
                  )}

                  {meta.phone && meta.phone !== "Not provided" && (
                    <a
                      href={`tel:${meta.phone}`}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white transition-colors text-[11px] font-bold border border-emerald-200/60"
                    >
                      <Phone size={12} className="shrink-0" />
                      <span>{meta.phone}</span>
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Main Download Button */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className="flex-1 sm:flex-none w-full sm:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-[#1A7FD4] to-[#2563EB] text-white font-nunito font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-98 transition-all cursor-pointer"
              >
                <Download size={16} className={isDownloading ? "animate-bounce" : ""} />
                <span>{isDownloading ? "Downloading..." : "Download Resume"}</span>
              </button>

              {meta.fileUrl && (
                <a
                  href={meta.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-3 rounded-xl bg-white text-[#0D1B2A] border border-slate-200 shadow-xs hover:border-[#1A7FD4] hover:text-[#1A7FD4] transition-all font-bold text-xs flex items-center justify-center shrink-0"
                  title="Open raw file in new tab"
                >
                  <ExternalLink size={15} />
                </a>
              )}
            </div>

          </div>
        </div>

        {/* Document Viewer Container */}
        <div className="bg-white rounded-2xl sm:rounded-[24px] border border-slate-200 shadow-lg overflow-hidden mb-6 sm:mb-12">
          
          {/* Mobile Optimized Toolbar */}
          <div className="bg-slate-900 text-slate-200 px-3 sm:px-6 py-2.5 flex items-center justify-between gap-2 border-b border-slate-800">
            <div className="flex items-center gap-2 font-mono text-xs truncate">
              <FileText size={15} className="text-[#1A7FD4] shrink-0" />
              <span className="truncate font-semibold text-slate-100 text-[11px] sm:text-xs">{meta.fileName}</span>
              <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[9px] uppercase font-bold text-slate-400 shrink-0">
                {fileExtension}
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {/* Zoom Controls for Desktop */}
              {isPdf && (
                <div className="hidden sm:flex items-center gap-1 bg-slate-800 p-1 rounded-lg text-xs">
                  <button
                    onClick={() => setZoomLevel(prev => Math.max(50, prev - 15))}
                    className="p-1 hover:bg-slate-700 rounded text-slate-300"
                    title="Zoom Out"
                  >
                    <ZoomOut size={13} />
                  </button>
                  <span className="px-1.5 font-mono text-[10px] text-slate-300">{zoomLevel}%</span>
                  <button
                    onClick={() => setZoomLevel(prev => Math.min(180, prev + 15))}
                    className="p-1 hover:bg-slate-700 rounded text-slate-300"
                    title="Zoom In"
                  >
                    <ZoomIn size={13} />
                  </button>
                </div>
              )}

              <button
                onClick={handleDownload}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#1A7FD4] text-white hover:bg-blue-600 text-[11px] font-bold transition-colors"
              >
                <Download size={13} />
                <span>Save PDF</span>
              </button>
            </div>
          </div>

          {/* Document Preview Box (Mobile Height Responsive) */}
          <div className="bg-slate-100 min-h-[420px] sm:min-h-[700px] flex items-center justify-center p-1.5 sm:p-6 relative overflow-auto">
            
            {fileStatus === "checking" ? (
              <div className="flex flex-col items-center justify-center space-y-2 py-16">
                <div className="w-8 h-8 border-3 border-[#1A7FD4] border-t-transparent rounded-full animate-spin" />
                <span className="text-xs font-semibold text-[#4A6080]">Loading resume...</span>
              </div>
            ) : fileStatus === "valid" ? (
              isPdf ? (
                <div className="w-full h-[500px] sm:h-[750px] lg:h-[850px] bg-white rounded-xl shadow-inner border border-slate-200 overflow-hidden relative">
                  <iframe
                    src={`${meta.fileUrl}#toolbar=1&navpanes=0&zoom=${zoomLevel}`}
                    className="w-full h-full border-none"
                    title="Resume PDF Viewer"
                  />
                </div>
              ) : isImage ? (
                <div className="max-w-4xl max-h-[750px] p-2 sm:p-4 bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden flex items-center justify-center">
                  <img
                    src={meta.fileUrl}
                    alt={`${meta.name}'s Resume`}
                    className="max-w-full max-h-[700px] object-contain rounded"
                    style={{ transform: `scale(${zoomLevel / 100})`, transition: "transform 0.2s ease" }}
                  />
                </div>
              ) : (
                /* Non-PDF / DOCX File Card */
                <div className="max-w-md w-full bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 text-center shadow-md my-6">
                  <div className="w-16 h-16 bg-blue-50 text-[#1A7FD4] rounded-2xl flex items-center justify-center mx-auto mb-3 border border-blue-100">
                    <FileCode2 size={32} />
                  </div>
                  <h3 className="text-lg font-nunito font-black text-[#0D1B2A] mb-1">
                    {meta.fileName}
                  </h3>
                  <p className="text-xs text-[#4A6080] mb-5 leading-relaxed">
                    This document format ({fileExtension.toUpperCase()}) can be downloaded directly to view on your mobile or desktop device.
                  </p>
                  <button
                    onClick={handleDownload}
                    className="w-full py-3 rounded-xl bg-[#1A7FD4] text-white font-nunito font-black text-xs sm:text-sm shadow-md hover:bg-blue-600 transition-all flex items-center justify-center gap-2"
                  >
                    <Download size={16} />
                    <span>Download {fileExtension.toUpperCase()} Document</span>
                  </button>
                </div>
              )
            ) : (
              /* Fallback Card */
              <div className="max-w-lg w-full bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 text-center shadow-md my-4">
                <div className="w-14 h-14 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-amber-200/60">
                  <AlertCircle size={28} />
                </div>
                <h3 className="text-lg font-nunito font-black text-[#0D1B2A] mb-1">
                  Application Record Verified
                </h3>
                <p className="text-xs text-[#4A6080] mb-5 leading-relaxed max-w-sm mx-auto">
                  Application record for <strong className="text-[#0D1B2A]">{meta.name}</strong> ({meta.position}) is active.
                </p>

                <div className="bg-slate-50 p-3.5 rounded-xl text-left border border-slate-200 text-xs space-y-1.5 mb-5 font-mono">
                  <div><strong className="text-slate-700">Applicant:</strong> {meta.name}</div>
                  <div><strong className="text-slate-700">Role:</strong> {meta.position}</div>
                  <div><strong className="text-slate-700">Email:</strong> {meta.email}</div>
                  <div><strong className="text-slate-700">Phone:</strong> {meta.phone}</div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  {meta.email && meta.email !== "Not provided" && (
                    <a
                      href={`mailto:${meta.email}?subject=Pentacloud%20Application%20Follow-up`}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-[#1A7FD4] text-white font-extrabold text-xs flex items-center justify-center gap-1.5 hover:bg-blue-600 transition-colors shadow-xs"
                    >
                      <Mail size={14} />
                      <span>Email Candidate</span>
                    </a>
                  )}
                  {meta.phone && meta.phone !== "Not provided" && (
                    <a
                      href={`tel:${meta.phone}`}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 hover:bg-emerald-700 transition-colors shadow-xs"
                    >
                      <Phone size={14} />
                      <span>Call Candidate</span>
                    </a>
                  )}
                </div>
              </div>
            )}

          </div>

          {/* Bottom Security Footer */}
          <div className="bg-slate-50 px-4 py-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#4A6080] gap-1.5">
            <div className="flex items-center gap-1.5 font-medium">
              <ShieldCheck size={14} className="text-emerald-600 shrink-0" />
              <span>Confidential Career Record &bull; Pentacloud Consulting</span>
            </div>
            <div className="text-[10px] font-mono text-slate-400">
              ID: {meta.fileName.replace(/[^a-zA-Z0-9]/g, "-").slice(0, 18)}
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}
