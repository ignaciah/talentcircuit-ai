# TalentCircuit AI — QwenCloud Deployment Guide

This guide provides step-by-step instructions for deploying TalentCircuit AI to QwenCloud.

## Prerequisites

- Node.js 18+ (verified locally)
- Docker & Docker CLI
- QwenCloud account with valid API credentials
- Git (for CI/CD deployment)

## Deployment Status

✅ **Code Ready**: All services verified and running  
✅ **Docker Image**: Built and tested successfully  
✅ **Dependencies**: Installed and audited (0 vulnerabilities)  
✅ **Health Check**: `/health` endpoint operational  

## Quick Start: Local Deployment

### 1. Set Environment Variables

Create a `.env` file in the project root:

```bash
QWEN_API_KEY=your_api_key_here
QWEN_API_BASE=https://api.qwencloud.com/v1
QWEN_MODEL=qwen-max
PORT=4000
```

Or copy from template:
```bash
cp .env.example .env
# Edit .env with your QwenCloud credentials
```

### 2. Run Locally

```bash
npm install
npm start
```

Access the API at `http://localhost:4000/health`

### 3. Docker: Build & Run Locally

```bash
docker build -t talentcircuit-ai:latest .
docker run -p 4000:4000 --env-file .env talentcircuit-ai:latest
```

## Production Deployment Options

### Option A: QwenCloud Native (Recommended)

1. **Push Docker Image to Registry**
   ```bash
   # Using GitHub Container Registry (GHCR)
   docker tag talentcircuit-ai:latest ghcr.io/ignaciah/talentcircuit-ai:latest
   docker push ghcr.io/ignaciah/talentcircuit-ai:latest
   ```

2. **Deploy via GitHub Actions** (Automated)
   - Requires GitHub secrets configured:
     - `QWEN_API_KEY`: Your QwenCloud API key
     - `QWEN_WORKSPACE_ID`: Your QwenCloud workspace ID
   - Push to `main` branch triggers automatic build & deployment
   - Workflow file: `.github/workflows/deploy.yml`

3. **Manual Deployment via QwenCloud CLI**
   ```bash
   qwen-cli deploy \
     --image ghcr.io/ignaciah/talentcircuit-ai:latest \
     --name talentcircuit-ai \
     --memory 512 \
     --cpu 0.5 \
     --env QWEN_API_KEY=$QWEN_API_KEY \
     --env PORT=4000
   ```

### Option B: Heroku/Render/Railway

The project includes a `Procfile` for platforms like Heroku:

```bash
git push heroku main
```

Set environment variables via platform dashboard:
- `QWEN_API_KEY`
- `QWEN_API_BASE`
- `QWEN_MODEL`

### Option C: Traditional VPS/Cloud (AWS EC2, DigitalOcean, etc.)

1. **Build and push image**
   ```bash
   docker build -t talentcircuit-ai:latest .
   docker tag talentcircuit-ai:latest registry.example.com/talentcircuit-ai:latest
   docker push registry.example.com/talentcircuit-ai:latest
   ```

2. **Pull and run on server**
   ```bash
   docker run -d \
     -p 80:4000 \
     --env-file /etc/talentcircuit/.env \
     --name talentcircuit \
     registry.example.com/talentcircuit-ai:latest
   ```

3. **Set up reverse proxy** (nginx/Apache)
   ```nginx
   server {
     listen 80;
     server_name api.talentcircuit.ai;

     location / {
       proxy_pass http://localhost:4000;
       proxy_set_header X-Real-IP $remote_addr;
       proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
     }
   }
   ```

## API Endpoints

After deployment, verify endpoints:

### Health Check
```bash
curl https://api.talentcircuit.ai/health
```

Expected response:
```json
{
  "status": "ok",
  "service": "talentcircuit-ai",
  "qwenConfigured": true,
  "qwenModel": "qwen-max",
  "qwenApiBase": "https://api.qwencloud.com/v1"
}
```

### Chat Endpoint
```bash
curl -X POST https://api.talentcircuit.ai/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Analyze this resume...",
    "model": "qwen-max"
  }'
```

## GitHub Secrets Setup (for CI/CD)

Configure these in GitHub Settings → Secrets & Variables → Actions:

1. **QWEN_API_KEY**: Your QwenCloud API key
   - Get from: QwenCloud Console → API Keys

2. **QWEN_WORKSPACE_ID**: Your workspace ID
   - Get from: QwenCloud Console → Workspace Settings

3. **Automatic Actions**:
   - Builds and tests on every push to `main`
   - Pushes Docker image to GHCR
   - Deploys to QwenCloud (if deployment command configured)

## Monitoring & Logs

### Local Docker Logs
```bash
docker logs talentcircuit
docker logs -f talentcircuit  # Follow logs
```

### Check Running Container
```bash
docker ps | grep talentcircuit
docker stats talentcircuit  # Resource usage
```

### Common Issues

| Issue | Solution |
|-------|----------|
| `QWEN_API_KEY is not configured` | Set `QWEN_API_KEY` env var before starting |
| `Port 4000 already in use` | Change PORT env var or stop conflicting service |
| `Connection refused` | Verify QwenCloud API endpoint (`QWEN_API_BASE`) |
| `Invalid JSON in request` | Check request body format against API spec |

## Rollback

If deployment fails:

```bash
# Revert to previous Docker image
docker pull ghcr.io/ignaciah/talentcircuit-ai:previous-tag
docker run ... talentcircuit-ai:previous-tag

# Or redeploy from previous commit
git reset --hard <commit-hash>
npm start
```

## Next Steps

1. **Configure QwenCloud Secrets** in GitHub Actions
2. **Verify Health Endpoint** after deployment
3. **Monitor Logs** during first 24 hours
4. **Set up Alerts** for API errors/timeouts
5. **Test Chat Endpoint** with sample candidates
6. **Document Any Custom Configs** for team

## Support

- QwenCloud Docs: https://dashscope.aliyuncs.com/docs
- Project Issues: Check GitHub Issues
- Local Testing: `npm start` then visit `/health`

---

**Last Updated**: 2026-07-17  
**Deployment Status**: ✅ Ready for Production
