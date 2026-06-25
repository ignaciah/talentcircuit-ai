import express from "express";
import { scoreCandidates } from "../services/scoringAgent";

const router = express.Router();

router.post("/roles/:id/candidates/score", async (req, res) => {
  const { roleProfile, candidates } = req.body;
  const scores = await scoreCandidates(roleProfile, candidates);
  res.json(scores);
});

export default router;
