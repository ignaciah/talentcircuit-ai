// backend/src/routes/workflows.ts
import express from "express";
import { generateRoleProfile } from "../services/intakeAgent";
import { scoreCandidates } from "../services/scoringAgent";

const router = express.Router();

router.post("/roles/intake", async (req, res) => {
  const { intakeText } = req.body;
  const roleProfile = await generateRoleProfile(intakeText);
  // save to DB...
  res.json(roleProfile);
});

router.post("/roles/:roleId/score", async (req, res) => {
  const { roleId } = req.params;
  const { candidates } = req.body;
  // fetch roleProfile from DB by roleId...
  const roleProfile = {}; // placeholder
  const scores = await scoreCandidates(roleProfile, candidates);
  // save decisions...
  res.json(scores);
});

export default router;
