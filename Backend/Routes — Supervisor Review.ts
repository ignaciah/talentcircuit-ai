import express from "express";
import { reviewOutputs } from "../services/supervisorAgent";

const router = express.Router();

router.post("/roles/:id/review", async (req, res) => {
  const { jd_text, scores, outreach } = req.body;
  const issues = await reviewOutputs(jd_text, scores, outreach);
  res.json(issues);
});

export default router;
