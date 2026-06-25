// backend/src/services/scoringAgent.ts
import { callQwen } from "./qwenClient";

export async function scoreCandidates(roleProfile: any, candidates: any[]) {
  const messages = [
    {
      role: "system",
      content:
        "You are a candidate scoring engine. Return JSON array with score, decision, rationale for each candidate.",
    },
    {
      role: "user",
      content: JSON.stringify({ roleProfile, candidates }),
    },
  ];

  const result = await callQwen("qwen-max", messages);
  const content = result.choices[0].message.content;
  return JSON.parse(content);
}
