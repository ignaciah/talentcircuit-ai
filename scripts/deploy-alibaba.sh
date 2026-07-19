#!/usr/bin/env bash
set -euo pipefail

IMAGE_NAME="${IMAGE_NAME:-talentcircuit-ai}"
IMAGE_TAG="${IMAGE_TAG:-latest}"
REGISTRY="${REGISTRY:-registry.cn-hangzhou.aliyuncs.com}"
NAMESPACE="${NAMESPACE:-talentcircuit}"
FULL_IMAGE="${REGISTRY}/${NAMESPACE}/${IMAGE_NAME}:${IMAGE_TAG}"
PORT="${PORT:-4000}"

if [[ -z "${ALIYUN_ACCESS_KEY_ID:-}" || -z "${ALIYUN_ACCESS_KEY_SECRET:-}" ]]; then
  echo "Missing ALIYUN_ACCESS_KEY_ID or ALIYUN_ACCESS_KEY_SECRET" >&2
  exit 1
fi

if [[ -z "${ALIYUN_REGION:-}" ]]; then
  echo "Defaulting to cn-hangzhou" >&2
  ALIYUN_REGION="cn-hangzhou"
fi

if ! command -v docker >/dev/null 2>&1; then
  echo "Docker is required" >&2
  exit 1
fi

if [[ "${PUSH_IMAGE:-true}" == "true" ]]; then
  echo "Building image: ${FULL_IMAGE}"
  docker build -t "${FULL_IMAGE}" .
  echo "Logging into Alibaba Container Registry"
  echo "${ALIYUN_ACCESS_KEY_SECRET}" | docker login --username "${ALIYUN_ACCESS_KEY_ID}" --password-stdin "${REGISTRY}"
  echo "Pushing image"
  docker push "${FULL_IMAGE}"
fi

echo "Deployment image ready: ${FULL_IMAGE}"
echo "Run the container with:"
echo "docker run -d -p ${PORT}:4000 --name talentcircuit-ai --env-file .env ${FULL_IMAGE}"
