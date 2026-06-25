
"use client";

import { useState } from "react";
import { apiPost } from "../lib/api";

export default function HomePage() {
  const [intake, setIntake] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    setLoading(true);
    const data = await apiPost("/roles/intake", { intakeText: intake });
    localStorage.setItem("roleProfile", JSON.stringify(data));
    setResult(data);
    setLoading(false);
  }

  return (
    <main className="mx-auto max-w-3xl p-6 space-y-6">
      <h1 className="text-2xl font-semibold">TalentCircuit – Role Intake</h1>

      <textarea
        className="w-full border rounded p-3 min-h-[160px]"
        placeholder="Paste hiring manager notes here..."
        value={intake}
        onChange={(e) => setIntake(e.target.value)}
      />

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="px-4 py-2 rounded bg-black text-white"
      >
        {loading ? "Generating..." : "Generate JD & Rubric"}
      </button>

      {result && (
        <section className="space-y-3">
          <h2 className="text-xl font-medium">Job Description</h2>
          <pre className="whitespace-pre-wrap bg-gray-50 p-3 rounded">
            {result.jd_text}
          </pre>

          <h3 className="font-medium">Great Profile</h3>
          <ul className="list-disc pl-5">
            {result.great_profile?.map((b: string, i: number) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
