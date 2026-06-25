// backend/src/services/qwenClient.ts
import axios from "axios";

const QWEN_API_BASE = process.env.QWEN_API_BASE; // e.g. https://api.qwencloud.com/v1
const QWEN_API_KEY = process.env.QWEN_API_KEY;

export async function callQwen(model: string, messages: any[], tools?: any) {
  const res = await axios.post(
    `${QWEN_API_BASE}/chat/completions`,
    {
      model,
      messages,
      tools,
    },
    {
      headers: {
        Authorization: `Bearer ${QWEN_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );
  return res.data;
}
