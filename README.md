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
- Alibaba Cloud deployment assets in [scripts/deploy-alibaba.sh](scripts/deploy-alibaba.sh) and [.github/workflows/deploy-alibaba.yml](.github/workflows/deploy-alibaba.yml)

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

## Deploy to Alibaba Cloud
1. Copy the Alibaba environment template:
   ```bash
   cp .env.alibaba.example .env.alibaba
   ```
2. Fill in your Alibaba Cloud credentials and registry settings.
3. Build and push the image:
   ```bash
   chmod +x scripts/deploy-alibaba.sh
   ALIYUN_ACCESS_KEY_ID=... ALIYUN_ACCESS_KEY_SECRET=... ALIYUN_REGION=cn-hangzhou ./scripts/deploy-alibaba.sh
   ```
4. Run the container on your ECS instance or container service:
   ```bash
   docker run -d -p 80:4000 --name talentcircuit-ai --env-file .env.alibaba registry.cn-hangzhou.aliyuncs.com/talentcircuit/talentcircuit-ai:latest
   ```


