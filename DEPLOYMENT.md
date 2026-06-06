# OpenStack Dev — Production Deployment Reference

## Overview

All projects run on a single VPS (root@69.30.205.18) behind Cloudflare Tunnels.
Each app is self-contained in its own folder with a `docker-compose.yml`.
Code changes go: **local → GitHub → git pull on server → docker compose up --build**.
No Vercel, no SCP, no patching containers directly.

---

## Server Details

| Field | Value |
|---|---|
| Host | 69.30.205.18 |
| User | root |
| SSH Key | `~/.ssh/easybusy_prod` |
| SSH Key type | ed25519 (passphrase-protected) |
| OS | Linux (Debian/Ubuntu) |
| Docker | installed, all apps in Docker |
| Cloudflare Account | irfangitdevops (Account ID: 3c11f16466e6fdf41994ff0d7157702c) |

---

## SSH Access

### From Windows (WSL or PowerShell)

```bash
ssh -i ~/.ssh/easybusy_prod root@69.30.205.18
```

### Avoid repeated passphrase prompts — use ssh-agent

```bash
eval $(ssh-agent -s)
ssh-add ~/.ssh/easybusy_prod
# Enter passphrase once. All subsequent ssh/scp commands use cached key.
```

Add this to `~/.bashrc` (WSL) to auto-start agent on shell open:
```bash
if [ -z "$SSH_AGENT_PID" ]; then
  eval $(ssh-agent -s)
  ssh-add ~/.ssh/easybusy_prod
fi
```

### Key files on local machine

| Key file | Purpose |
|---|---|
| `~/.ssh/easybusy_prod` | Private key — SSH into production server |
| `~/.ssh/easybusy_prod.pub` | Public key — must be in `/root/.ssh/authorized_keys` on server |
| `~/.ssh/id_ed25519` | GitHub SSH key — used for git push/pull |
| `~/.ssh/id_ed25519.pub` | GitHub public key — registered in GitHub → Settings → SSH Keys |

---

## Production Server Layout

```
/root/
├── openstackgit/          ← openstackgit.com (this project)
├── drkumudkumar/          ← drkumudkumar.com
├── cphomesmodern/         ← cphomes project
├── theroyalminthotel/     ← theroyalmint.co.in
├── vedantafarms/          ← vedantafarms.com
├── easybusy-production/   ← easybusy.in (ERP — db + uploads here)
└── sahlaat/               ← sahlaat.co (ride-hailing platform)
```

### Port assignments (127.0.0.1 only — never public)

| App | Container | Host Port |
|---|---|---|
| drkumudkumar.com | drkumudkumar-website | 3100 |
| cphomes | cphomes-app | 3001 |
| vedantafarms.com | vedantafarms | 4321 |
| theroyalminthotel | royal-app | 9090 |
| **openstackgit.com** | **openstackgit-web** | **3200** |
| easy-busy nginx | easy-busy-nginx | 80 (public) |
| easy-busy db | easy-busy-db | 5436 |
| sahlaat booking API | sahlaat-booking-api | 8090 |
| sahlaat admin API | sahlaat-admin-api | 8089 |
| sahlaat driver API | sahlaat-driver-api | 8088 |

---

## Deployment Workflow (Every Project)

### First-time deploy (new project)

```bash
# 1. SSH in
ssh -i ~/.ssh/easybusy_prod root@69.30.205.18

# 2. Clone the repo
cd ~
git clone git@github.com:irfangitdevops/<repo-name>.git <folder-name>
cd <folder-name>

# 3. Create .env from example
cp .env.example .env
nano .env   # fill in real values (Cloudflare tunnel token, etc.)

# 4. Build and start
docker compose up -d --build

# 5. Verify
docker compose ps
docker compose logs -f
```

### Standard code update (subsequent deploys)

```bash
ssh -i ~/.ssh/easybusy_prod root@69.30.205.18
cd ~/openstackgit          # or whichever project
git pull
docker compose up -d --build
docker compose ps
```

### One-liner remote deploy (from local machine)

```bash
ssh -i ~/.ssh/easybusy_prod root@69.30.205.18 \
  "cd ~/openstackgit && git pull && docker compose up -d --build"
```

---

## Cloudflare Tunnel — How It Works

```
Browser → Cloudflare Edge → Encrypted Tunnel → cloudflared container → app container
                                               (on your VPS)
```

The `cloudflared` container runs alongside the app container in the same Docker network.
It connects outbound to Cloudflare using a **token** (or credentials file) — no inbound
firewall ports need to be opened.

### Two tunnel patterns used on this server

#### Pattern A — Token-based (preferred, used by openstackgit, cphomes, drkumudkumar)

`docker-compose.yml`:
```yaml
  cloudflared:
    image: cloudflare/cloudflared:latest
    container_name: openstackgit-cloudflared
    restart: unless-stopped
    command: tunnel --no-autoupdate run --token ${CLOUDFLARE_TUNNEL_TOKEN}
    depends_on:
      web:
        condition: service_healthy
```

`.env` on server:
```
CLOUDFLARE_TUNNEL_TOKEN=eyJhIjoiM2Mx...  ← from Cloudflare Zero Trust
```

#### Pattern B — Credentials file (used by theroyalminthotel, sahlaat)

```yaml
  cloudflared:
    image: cloudflare/cloudflared:latest
    command: tunnel --no-autoupdate --config /etc/cloudflared/config.yml run <TUNNEL-UUID>
    volumes:
      - ./tunnel/config.yml:/etc/cloudflared/config.yml:ro
      - ./tunnel/credentials.json:/etc/cloudflared/credentials.json:ro
```

`tunnel/config.yml`:
```yaml
tunnel: <TUNNEL-UUID>
credentials-file: /etc/cloudflared/credentials.json
ingress:
  - hostname: yourdomain.com
    service: http://app:3000
  - service: http_status:404
```

`tunnel/credentials.json` — downloaded from Cloudflare Zero Trust during tunnel creation.

---

## Creating a New Cloudflare Tunnel (Step by Step)

### Via Cloudflare Zero Trust Dashboard (recommended)

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com) → **Zero Trust** (left sidebar)
2. **Access → Tunnels → Create a tunnel**
3. Choose **Cloudflared** → Next
4. Name it (e.g. `openstackgit`)
5. Choose **Docker** as connector environment
6. Copy the `--token` from the command shown (the long `eyJ...` string)
7. Under **Public Hostnames** tab:
   - Hostname: `openstackgit.com` (or `www.openstackgit.com`)
   - Service: `http://web:3000` ← matches the `web` service name in docker-compose
8. Save

Then on the server, paste the token into `.env`:
```bash
echo "CLOUDFLARE_TUNNEL_TOKEN=eyJ..." > ~/.env.openstackgit
# or directly into the project .env
```

### Via CLI (alternative)

```bash
# Install cloudflared on server
curl -L https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 -o /usr/local/bin/cloudflared
chmod +x /usr/local/bin/cloudflared

# Login (opens browser)
cloudflared tunnel login

# Create tunnel
cloudflared tunnel create openstackgit

# Output: Tunnel credentials written to ~/.cloudflared/<UUID>.json
# Note the UUID

# Configure
cat > ~/.cloudflared/config.yml <<EOF
tunnel: <UUID>
credentials-file: /root/.cloudflared/<UUID>.json
ingress:
  - hostname: openstackgit.com
    service: http://web:3000
  - service: http_status:404
EOF

# Add DNS record
cloudflared tunnel route dns openstackgit openstackgit.com
```

---

## DNS Configuration (Cloudflare Dashboard)

For tunnel-based routing, DNS records are managed automatically by Cloudflare.
You should see a CNAME record like:

| Type | Name | Target | Proxy |
|---|---|---|---|
| CNAME | openstackgit.com | `<UUID>.cfargotunnel.com` | ✅ Proxied |
| CNAME | www | `<UUID>.cfargotunnel.com` | ✅ Proxied |

If records are missing, add them manually or run:
```bash
cloudflared tunnel route dns openstackgit openstackgit.com
cloudflared tunnel route dns openstackgit www.openstackgit.com
```

---

## openstackgit.com Specific Setup

### GitHub repo
- URL: `git@github.com:irfangitdevops/openstackgit.git`
- Branch: `main`
- Visibility: Public

### Server path
```
/root/openstackgit/
```

### `.env` required on server
```bash
# /root/openstackgit/.env
CLOUDFLARE_TUNNEL_TOKEN=<token from Cloudflare Zero Trust → Tunnels → openstackgit>
```

### First-time setup on server
```bash
ssh -i ~/.ssh/easybusy_prod root@69.30.205.18
git clone git@github.com:irfangitdevops/openstackgit.git ~/openstackgit
cd ~/openstackgit
echo "CLOUDFLARE_TUNNEL_TOKEN=YOUR_TOKEN_HERE" > .env
docker compose up -d --build
docker compose ps
```

### Rebuild after code changes
```bash
# From local machine
ssh -i ~/.ssh/easybusy_prod root@69.30.205.18 \
  "cd ~/openstackgit && git pull && docker compose up -d --build"
```

---

## Troubleshooting

### Site not reachable

```bash
# 1. Check containers are up
docker compose ps

# 2. Check app logs
docker compose logs web

# 3. Check tunnel logs
docker compose logs cloudflared

# 4. Test app responds locally
curl http://127.0.0.1:3200

# 5. Check Cloudflare tunnel status
# → Zero Trust → Tunnels → should show "HEALTHY"
```

### Container stuck / not starting

```bash
# Force full rebuild
docker compose down
docker compose up -d --build

# Nuclear option (removes volumes too — don't use for db projects)
docker compose down -v
docker system prune -f
docker compose up -d --build
```

### Tunnel token expired / invalid

1. Go to Cloudflare Zero Trust → Tunnels → openstackgit → Configure → Connectors
2. Delete the old connector and regenerate the token
3. Update `.env` on server: `nano ~/openstackgit/.env`
4. Restart: `docker compose restart cloudflared`

### Git pull fails (SSH key)

```bash
# On server, check which key is used
cat ~/.ssh/config

# If not set, add:
cat >> ~/.ssh/config <<EOF
Host github.com
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519
EOF

# Test
ssh -T git@github.com
```

---

## All Running Containers (as of June 2026)

```
openstackgit-web          openstackgit.com frontend
openstackgit-cloudflared  Cloudflare tunnel for openstackgit.com
easy-busy-backend         ERP backend (NestJS)
easy-busy-frontend        ERP frontend (Next.js)
easy-busy-nginx           Reverse proxy for ERP (port 80)
easy-busy-db              PostgreSQL 15 (port 5436)
easy-busy-redis           Redis (port 6382)
easybusy-cloudflared      Tunnel for easybusy.in
drkumudkumar-website      Doctor portal (port 3100)
drkumudkumar-cloudflared  Tunnel for drkumudkumar.com
cphomes-app               Property listings (port 3001)
cphomes-cloudflared       Tunnel for cphomes domain
royal-app                 Royal Mint Hotel (port 9090)
royal-mongodb             MongoDB for hotel app
royal-cloudflared         Tunnel for theroyalmint.co.in
vedantafarms              Farm website (port 4321)
vedantafarms-tunnel       Tunnel for vedantafarms.com
sahlaat-booking-api       Booking service (port 8090)
sahlaat-admin-api         Admin API (port 8089)
sahlaat-driver-api        Driver API (port 8088)
sahlaat-admin-portal      Admin panel (port 5174)
sahlaat-website           Marketing site
sahlaat-website-tunnel    Tunnel for sahlaat website
sahlaat-cloudflared       Tunnel for sahlaat APIs
sahlaat-postgres          PostgreSQL for Sahlaat
sahlaat-redis             Redis for Sahlaat
```

---

## NEVER DO

- **Never SCP files directly to the server** — always use git
- **Never `docker exec` to edit files** — changes are lost on rebuild
- **Never edit files on the server** — git will diverge
- **Never expose database ports publicly** — all DB ports bind to 127.0.0.1 only
- **Never commit `.env` files** — only `.env.example` goes in git
- **Never use `--force` push to main** — it breaks server `git pull`
