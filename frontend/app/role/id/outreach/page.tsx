"use client";

import { useState } from "react";
import { apiPost } from "../../../lib/api";

export default function OutreachPage({ params }) {
  const roleId = params.id;
  const [selected, setSelected] = useState([]);
  const [outreach, setOutreach] = useState([]);

  async function handleGenerate() {
    const roleProfile = JSON.parse(localStorage.getItem("roleProfile"));
    const result = await apiPost(`/roles/${roleId}/outreach`, {
      roleProfile,
      selectedCandidates: selected,
    });
    setOutreach(result);
  }

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-xl font-semibold">Outreach Generator</h1>

      <textarea
        className="w-full border p-3 min-h-[200px]"
        placeholder="Paste selected candidate JSON array"
        value={JSON.stringify(selected, null, 2)}
        onChange={(e) => setSelected(JSON.parse(e.target.value))}
      />

      <button
        onClick={handleGenerate}
        className="px-4 py-2 bg-black text-white rounded"
      >
        Generate Outreach
      </button>

      {outreach.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-lg font-medium">Emails</h2>
          {outreach.map((o, i) => (
            <div key={i} className="border p-3 rounded">
              <strong>{o.subject}</strong>
              <pre className="whitespace-pre-wrap mt-2">{o.body}</pre>
            </div>
          ))}
        </section>
      )}
    </main>
  );
}
