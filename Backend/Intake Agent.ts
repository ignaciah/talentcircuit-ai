import { callQwen } from "./qwenClient";
import { PROMPTS } from "../config/prompts";

export async function generateRoleProfile(intakeText: string) {
  const content = await callQwen("qwen-max", [
    { role: "system", content: PROMPTS.intakeSystem },
    { role: "user", content: intakeText },
  ]);
  return JSON.parse(content);
}
