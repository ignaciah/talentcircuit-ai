"use client";

import { useState } from "react";
import { apiPost } from "../../../lib/api";

export default function CandidatePage({ params }) {
  const roleId = params.id;
  const [csv, setCsv] = useState("");
  const [parsed, setParsed] = useState([]);
  const [scores, setScores] = useState([]);

  function parseCsv(text) {
    const lines = text.trim().split("\n");
    const headers = lines[0].split(",");
    return lines.slice(1).map((line) => {
      const values = line.split(",");
      const obj: any = {};
      headers.forEach((h, i) => (obj[h.trim()] = values[i].trim()));
      return obj;
    });
  }

  async function handleScore() {
    const candidates = parseCsv(csv);
    setParsed(candidates);

    const roleProfile = JSON.parse(localStorage.getItem("roleProfile"));
    const result = await apiPost(`/roles/${roleId}/candidates/score`, {
      roleProfile,
      candidates,
    });
    setScores(result);
  }

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-xl font-semibold">Upload Candidates</h1>

      <textarea
        className="w-full border p-3 min-h-[200px]"
        placeholder="Paste CSV: name,email,location,skills,experience"
        value={csv}
        onChange={(e) => setCsv(e.target.value)}
      />

      <button
        onClick={handleScore}
        className="px-4 py-2 bg-black text-white rounded"
      >
        Score Candidates
      </button>

      {scores.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-lg font-medium">Scores</h2>
          <ul className="space-y-2">
            {scores.map((s, i) => (
              <li key={i} className="border p-3 rounded">
                <strong>{parsed[i].name}</strong> — {s.score} ({s.decision})
                <p className="text-sm text-gray-600">{s.rationale}</p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
