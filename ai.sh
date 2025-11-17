#!/usr/bin/env bash
# Multi-provider AI CLI launcher
# Prerequisites (Debian/Ubuntu):
#   sudo apt update && sudo apt install -y curl jq python3-pip nodejs npm docker.io git
#   pip install google-generativeai anthropic openai perplexity-ai
#   npm i -g openai anthropic
#   curl -fsSL https://ollama.com/install.sh | sh
# Optional local servers:
#   # TabbyML
#   curl -fsSL https://get.tabbyml.com/install.sh | bash
#   tabby start --model TabbyML/Mistral-7B &
#   # Koboldcpp (example build skipped)
# Export required keys:
#   export GEMINI_KEY=... OPENAI_API_KEY=... ANTHROPIC_API_KEY=... PPLX_KEY=... HF_TOKEN=... GOOGLE_PROJECT=... GOOGLE_REGION=us-central1
# Usage: ./ai.sh provider "message"

set -euo pipefail
prov="${1:-}"; shift || true
msg="${*:-Bonjour}"
if [ -z "$prov" ]; then
  echo "Usage: $0 [gemini|openai|anthropic|perplexity|huggingface|vertex|ollama|tabby|kobold] 'message'" >&2
  exit 1
fi
case "$prov" in
  gemini)
    curl -s "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=$GEMINI_KEY" -H "Content-Type: application/json" \
      -d "{\"contents\":[{\"parts\":[{\"text\":\"$msg\"}]}]}" | jq -r '.candidates[0].content.parts[0].text'
    ;;
  openai)
    openai api chat.completions.create -m gpt-4o-mini -g user "$msg" | jq -r '.choices[0].message.content'
    ;;
  anthropic)
    anthropic messages create --model claude-3-5-sonnet --max-tokens 512 --input "$msg" | jq -r '.content[0].text'
    ;;
  perplexity)
    curl -s https://api.perplexity.ai/chat/completions -H "Authorization: Bearer $PPLX_KEY" -H "Content-Type: application/json" \
      -d "{\"model\":\"llama-3.1-sonar-small-128k-chat\",\"messages\":[{\"role\":\"user\",\"content\":\"$msg\"}]}" | jq -r '.choices[0].message.content'
    ;;
  huggingface)
    curl -s -H "Authorization: Bearer $HF_TOKEN" https://api-inference.huggingface.co/models/google/gemma-2b \
      -d "{\"inputs\":\"$msg\"}" | jq -r '.[0].generated_text'
    ;;
  vertex)
    gcloud config set project "$GOOGLE_PROJECT" >/dev/null 2>&1
    gcloud ai language-models predict text --region="${GOOGLE_REGION:-us-central1}" --text-prompt="$msg"
    ;;
  ollama)
    ollama run llama3.2 "$msg"
    ;;
  tabby)
    tabby chat --model TabbyML/Mistral-7B --prompt "$msg"
    ;;
  kobold)
    curl -s http://localhost:5001/v1/completions -H 'Content-Type: application/json' -d "{\"prompt\":\"$msg\"}" | jq -r '.choices[0].text'
    ;;
  *)
    echo "Provider not supported" >&2; exit 2;
    ;;
esac
