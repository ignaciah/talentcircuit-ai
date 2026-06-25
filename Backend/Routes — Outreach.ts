import express from "express";
import { generateOutreach } from "../services/outreachAgent";

const router = express.Router();

router.post("/roles/:id/outreach", async (req, res) => {
  const { roleProfile, selectedCandidates } = req.body;
  const outreach = await generateOutreach(roleProfile, selectedCandidates);
  res.json(outreach);
});

export default router;
