import { callQwen } from "./qwenClient";
import { PROMPTS } from "../config/prompts";

export async function reviewOutputs(jd: string, scores: any[], outreach: any[]) {
  const content = await callQwen("qwen-max", [
    { role: "system", content: PROMPTS.supervisorSystem },
    {
      role: "user",
      content: JSON.stringify({ jd_text: jd, scores, outreach }),
    },
  ]);
  return JSON.parse(content);
}
