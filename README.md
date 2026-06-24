Repository Structure (Final)

`
talentcircuit/
  backend/
    src/
      index.ts
      routes/
        roles.ts
        candidates.ts
        outreach.ts
        supervisor.ts
      services/
        qwenClient.ts
        intakeAgent.ts
        scoringAgent.ts
        outreachAgent.ts
        supervisorAgent.ts
      db/
        models.ts
    package.json
    tsconfig.json
    .env.example

  frontend/
    app/
      layout.tsx
      page.tsx
      role/[id]/page.tsx
      role/[id]/candidates/page.tsx
      role/[id]/outreach/page.tsx
    lib/
      api.ts
    package.json
    next.config.mjs

  docs/
    architecture.md
    prompts.md
    README.md
# TalentCircuit — AI Autopilot for Recruiting
Built for the Global AI Hackathon (Qwen Cloud)

TalentCircuit automates the recruiting workflow:
- Intake → JD → Rubric
- Candidate scoring
- Personalized outreach
- Safety + bias review

## Features
- Multi-agent architecture (Intake, Scoring, Outreach, Supervisor)
- Human-in-the-loop checkpoints
- JSON-only contracts for reliability
- Clean, minimal UI for demo clarity

## Tech Stack
- Backend: Node.js + Express
- Frontend: Next.js
- AI: Qwen Cloud (qwen-max)
- Storage: Local JSON or Postgres

## Getting started

### Prerequisites
- Node.js (LTS)
- Qwen Cloud account + API key

### Setup

1. Clone the repo:
   ```bash
   git clone https://github.com/your-org/talentcircuit.git
   cd talentcircuit
