// backend/src/services/intakeAgent.ts
import { callQwen } from "./qwenClient";

export async function generateRoleProfile(intakeText: string) {
  const messages = [
    {
      role: "system",
      content:
        "You are a recruiting workflow architect. Return JSON with role_profile and jd_text.",
    },
    {
      role: "user",
      content: intakeText,
    },
  ];

  const result = await callQwen("qwen-max", messages);
  const content = result.choices[0].message.content;
  // Assume content is JSON string; parse and validate
  const parsed = JSON.parse(content);
  return parsed;
}
