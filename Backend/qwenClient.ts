import axios from "axios";

const base = process.env.QWENAPIBASE!;
const key = process.env.QWENAPIKEY!;

export async function callQwen(model: string, messages: any[]) {
  const res = await axios.post(
    ${base}/chat/completions,
    { model, messages },
    {
      headers: {
        Authorization: Bearer ${key},
        "Content-Type": "application/json",
      },
    }
  );
  return res.data.choices[0].message.content;
}
