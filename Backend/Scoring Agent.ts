import { callQwen } from "./qwenClient";
import { PROMPTS } from "../config/prompts";

export async function scoreCandidates(roleProfile: any, candidates: any[]) {
  const content = await callQwen("qwen-max", [
    { role: "system", content: PROMPTS.scoringSystem },
    {
      role: "user",
      content: JSON.stringify({ role_profile: roleProfile, candidates }),
    },
  ]);
  return JSON.parse(content);
}
