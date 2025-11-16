#!/bin/bash

# Script de monitoring permanent pour MIA Platform

while true; do
    # Vérifier si le serveur Python tourne
    if ! ps aux | grep -q "[p]ython3 -m http.server 7777"; then
        echo "[$(date)] Redémarrage du serveur Python..."
        cd /home/dsfamilyroyal/mia-platform/dist
        nohup python3 -m http.server 7777 --bind 0.0.0.0 > /tmp/server-permanent.log 2>&1 &
        echo $! > /tmp/mia-server.pid
    fi
    
    # Vérifier si le tunnel Cloudflare tourne
    if ! ps aux | grep -q "[c]loudflared tunnel"; then
        echo "[$(date)] Redémarrage du tunnel Cloudflare..."
        nohup cloudflared tunnel --url http://localhost:7777 > /tmp/cloudflare-permanent.log 2>&1 &
        echo $! > /tmp/mia-tunnel.pid
        sleep 5
        cat /tmp/cloudflare-permanent.log | grep "trycloudflare.com" | tail -1
    fi
    
    # Attendre 30 secondes avant la prochaine vérification
    sleep 30
done
