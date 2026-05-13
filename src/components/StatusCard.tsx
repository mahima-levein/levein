
"use client";

import { useState } from "react";
import axios from "axios";
import heroImage from "../assets/bg-hero.jpg";

interface Socials {
  facebook?: string;
  instagram?: string;
  tiktok?: string;
}

interface StatusResult {
  name: string;
  applyDate: string | Date;
  jobTitle: string;
  status: string;
  candidateId: string;
}

interface StatusCardProps {
  socials?: Socials;
}

export default function StatusCard({ socials = {} }: StatusCardProps) {
  const [inputId, setInputId] = useState("");
  const [result, setResult] = useState<StatusResult | null>(null);
  const [feedback, setFeedback] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const formatDate = (value: string | Date) => {
    const dateObj = new Date(value);
    return Number.isNaN(dateObj.valueOf())
      ? String(value || "")
      : dateObj.toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
  };

  const normalize = (value: string) => value.toLowerCase().replace(/\s+/g, "_");
  const statusMap: Record<string, string> = {
    applied: "applied",
    interviewing: "interviewing",
    pending_review: "pending_review",
    shortlisted: "shortlisted",
    rejected: "rejected",
  };
  const statusVariant = result ? statusMap[normalize(result.status)] ?? "default" : "default";

  const statusTheme: Record<
    string,
    { pill: string; dot: string; banner: string; tone: string }
  > = {
    applied: {
      pill: "border border-emerald-200 bg-emerald-50 text-emerald-700",
      dot: "bg-emerald-500",
      banner: "from-emerald-400/35 via-sky-100 to-slate-50",
      tone: "text-emerald-700",
    },
    interviewing: {
      pill: "border border-sky-200 bg-sky-50 text-sky-700",
      dot: "bg-sky-500",
      banner: "from-sky-400/35 via-cyan-100 to-slate-50",
      tone: "text-sky-700",
    },
    pending_review: {
      pill: "border border-amber-200 bg-amber-50 text-amber-700",
      dot: "bg-amber-500",
      banner: "from-amber-400/35 via-amber-100 to-slate-50",
      tone: "text-amber-700",
    },
    shortlisted: {
      pill: "border border-fuchsia-200 bg-fuchsia-50 text-fuchsia-700",
      dot: "bg-fuchsia-500",
      banner: "from-fuchsia-400/35 via-pink-100 to-slate-50",
      tone: "text-fuchsia-700",
    },
    rejected: {
      pill: "border border-rose-200 bg-rose-50 text-rose-700",
      dot: "bg-rose-500",
      banner: "from-rose-400/35 via-rose-100 to-slate-50",
      tone: "text-rose-700",
    },
    default: {
      pill: "border border-slate-200 bg-slate-50 text-slate-700",
      dot: "bg-slate-500",
      banner: "from-slate-200/60 via-slate-100 to-slate-50",
      tone: "text-slate-700",
    },
  };

  const theme = statusTheme[statusVariant] ?? statusTheme.default;
  const displayStatus = result?.status
    ? result.status.replace(/_/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase())
    : "Pending Review";
  const displayDate = result ? formatDate(result.applyDate) : "";
  const hasResult = Boolean(result);

  const safeHref = (url?: string) => url && url.trim().length ? url : null;
  const links = {
    facebook: safeHref(socials.facebook),
    instagram: safeHref(socials.instagram),
    tiktok: safeHref(socials.tiktok),
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const id = inputId.trim();
    if (!id) {
      setFeedback("Enter an application ID first.");
      return;
    }

    setFeedback("Checking status...");
    setIsLoading(true);

    try {
      const response = await axios.post("/api/status", { id }, {
        headers: { "Content-Type": "application/json" }
      });
      console.log("Success:", response.data);
      setResult(response.data);
      setFeedback("");
    } catch (error) {
      console.error("Error:", error);
      if (axios.isAxiosError(error)) {
        console.error("Response data:", error.response?.data);
        setFeedback(error.response?.data?.error || "Unable to find that application ID.");
      } else {
        setFeedback("Something went wrong while checking the status.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setInputId("");
    setFeedback("");
  };

  const handleCopy = () => {
    if (result?.candidateId) {
      navigator.clipboard.writeText(result.candidateId);
      const prev = feedback;
      setFeedback("Copied!");
      setTimeout(() => setFeedback(prev), 1200);
    }
  };
  return (
    <article className="relative isolate w-full overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/10">
      <div className={`absolute inset-0 bg-linear-to-br ${theme.banner}`}></div>
      <div className="absolute -left-20 top-10 h-56 w-56 rounded-full bg-emerald-200/35 blur-3xl"></div>
      <div className="absolute -bottom-24 right-10 h-56 w-56 rounded-full bg-sky-200/35 blur-3xl"></div>

      <div className="relative grid lg:grid-cols-[1fr_0.95fr]">
        <section className="p-6 sm:p-8 lg:p-10">
          {!hasResult && (
            <div className="mt-6">
              <p className={`text-sm font-semibold uppercase tracking-[0.28em] ${theme.tone}`}>
                Check your status
              </p>
              <h1 className="mt-3 font-secondary text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
                Enter your application ID
              </h1>

              <form onSubmit={handleSubmit} className="mt-8 max-w-xl">
                <label className="block">
                  <span className="text-sm font-medium text-slate-700">Application ID</span>
                  <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                    <input
                      type="text"
                      value={inputId}
                      onChange={(e) => setInputId(e.target.value)}
                      placeholder="Enter your ID"
                      autoComplete="off"
                      className="w-full rounded-full border border-slate-200 bg-white px-5 py-3 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-primary/10"
                    />
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-white shadow-lg shadow-primary/20 transition hover:-translate-y-0.5 hover:bg-[#2b5252] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? "Checking..." : "Check"}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M13.5 5.5 12.1 6.9 16.2 11H4v2h12.2l-4.1 4.1 1.4 1.4L20 12 13.5 5.5Z" />
                      </svg>
                    </button>
                  </div>
                </label>
                {feedback && <p className="mt-3 min-h-6 text-sm text-rose-600" role="alert">{feedback}</p>}
              </form>
            </div>
          )}

          {hasResult && result && (
            <div className="mt-6">
              <div className="rounded-4xl border border-slate-200 bg-slate-50/95 p-5 shadow-sm sm:p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Result found</p>
                    <h2 className="mt-2 font-primary text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
                      {result.name || "Candidate status"}
                    </h2>
                    <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">
                      {result.jobTitle || "Open role not available"}
                    </p>
                  </div>
                  <span className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${theme.pill}`}>
                    <span className={`h-2.5 w-2.5 rounded-full ${theme.dot}`} />
                    <span>{displayStatus}</span>
                  </span>
                </div>

                <dl className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
                    <dt className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Candidate ID</dt>
                    <dd className="mt-2 flex flex-wrap items-center gap-2">
                      <code className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm font-semibold text-slate-900">
                        {result.candidateId || "Not available yet"}
                      </code>
                      <button
                        type="button"
                        onClick={handleCopy}
                        className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/10"
                        aria-label="Copy Candidate ID"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M8 7a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V7Z" />
                          <path d="M3 10a3 3 0 0 1 3-3h1v2H6a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1v-1h2v1a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-7Z" />
                        </svg>
                        <span>Copy</span>
                      </button>
                    </dd>
                    <p className="mt-2 text-sm leading-6 text-slate-500">Share this ID when asking for updates.</p>
                  </div>

                  <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
                    <dt className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Applied on</dt>
                    <dd className="mt-2 text-base font-semibold text-slate-900">{displayDate}</dd>
                    <p className="mt-2 text-sm leading-6 text-slate-500">The date your application entered the process.</p>
                  </div>

                  <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
                    <dt className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Current stage</dt>
                    <dd className="mt-2 text-base font-semibold text-slate-900">{displayStatus}</dd>
                    <p className="mt-2 text-sm leading-6 text-slate-500">This status is pulled live from the application record.</p>
                  </div>

                  <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
                    <dt className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Open role</dt>
                    <dd className="mt-2 text-base font-semibold text-slate-900">{result.jobTitle || "Not available"}</dd>
                    <p className="mt-2 text-sm leading-6 text-slate-500">The position linked to this application.</p>
                  </div>
                </dl>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-5">
                  <div className="flex items-center gap-2">
                    {links.facebook && (
                      <a href={links.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook profile" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:-translate-y-0.5 hover:border-primary hover:text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M22 12.06C22 6.52 17.52 2 12 2S2 6.52 2 12.06c0 5.01 3.66 9.16 8.44 9.94v-7.03H7.9v-2.9h2.54V9.41c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.45h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.9h-2.34V22c4.78-.78 8.44-4.93 8.44-9.94Z" />
                        </svg>
                      </a>
                    )}
                    {links.instagram && (
                      <a href={links.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram profile" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:-translate-y-0.5 hover:border-primary hover:text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11Zm0 2a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm5.25-.75a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z" />
                        </svg>
                      </a>
                    )}
                    {links.tiktok && (
                      <a href={links.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok profile" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:-translate-y-0.5 hover:border-primary hover:text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M14.5 3h2.1c.25 1.52 1.37 3.1 3.2 3.7v2.12c-1.38-.03-2.69-.45-3.78-1.16v6.8a6.46 6.46 0 1 1-6.46-6.46c.49 0 .96.06 1.41.18V10a3.77 3.77 0 1 0 2.53 3.55V3Z" />
                        </svg>
                      </a>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/10"
                  >
                    Check another ID
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>

        <aside className="relative min-h-80 overflow-hidden bg-slate-100 lg:min-h-full">
          <img
            src={heroImage.src}
            alt="A modern workspace illustration"
            className="absolute inset-0 h-full w-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-linear-to-tr from-white/5 via-sky-100/35 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(125,211,252,0.34),transparent_42%)]" />

          <div className="relative flex h-full min-h-105 flex-col justify-between p-6 sm:p-8 lg:p-10">
            <div className="ml-auto inline-flex rounded-full border border-white/60 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-600 shadow-sm backdrop-blur-md">
              Status preview
            </div>
          </div>
        </aside>
      </div>
    </article>
  );
}
