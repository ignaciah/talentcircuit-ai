# Deployment checklist

## Required environment variables
- QWEN_API_KEY
- QWEN_API_BASE (default: https://api.qwencloud.com/v1)
- QWEN_MODEL (default: qwen-max)
- PORT (default: 4000)

## Startup
- Run: npm start
- Health endpoint: /health

## Notes
- Without QWEN_API_KEY, the app will start but the chat endpoint will return a 503 service error.
- The service expects Node 18+.
