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
- Backend: Node.js
- Frontend: Next.js
- AI: Qwen Cloud (qwen-max)
- Storage: Local JSON or Postgres

## Deployment readiness
The repository now includes:
- a working Node entrypoint at [src/index.js](src/index.js)
- a deployment start command in [package.json](package.json)
- a [Procfile](Procfile) for platform deployments
- a [Dockerfile](Dockerfile) for container deployments
- an environment template at [.env.example](.env.example)

## Run locally
```bash
npm start
```

Then visit:
- http://127.0.0.1:4000/health
- http://127.0.0.1:4000/

## Deploy to Qwen Cloud
Set these environment variables in your deployment environment:
- QWEN_API_KEY
- QWEN_API_BASE
- QWEN_MODEL
- PORT

## Docker
```bash
docker build -t talentcircuit-ai .
docker run -p 4000:4000 --env-file .env talentcircuit-ai
```


