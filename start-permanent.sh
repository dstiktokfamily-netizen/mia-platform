#!/bin/bash
cd /home/dsfamilyroyal/mia-platform/dist
nohup python3 -m http.server 8000 --bind 0.0.0.0 > /tmp/mia-server.log 2>&1 &
echo $! > /tmp/mia-server.pid
echo "Serveur démarré sur port 8000, PID: $(cat /tmp/mia-server.pid)"
sleep 3
nohup cloudflared tunnel --url http://localhost:8000 > /tmp/mia-tunnel.log 2>&1 &
echo $! > /tmp/mia-tunnel.pid
echo "Tunnel démarré, PID: $(cat /tmp/mia-tunnel.pid)"
sleep 10
grep "trycloudflare.com" /tmp/mia-tunnel.log | tail -1
