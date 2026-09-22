# SkyNet — Intelligent Cyber Resilience Platform

<p align="center">
  <img src="frontend/public/skynet_dark.png" alt="SkyNet Logo" width="280" />
</p>

<p align="center">
  <strong>Autonomous Cyber Resilience, Real-Time Threat Detection & Automated Incident Remediation</strong>
</p>

<p align="center">
  <a href="#overview"><img src="https://img.shields.io/badge/Platform-SkyNet-blue?style=flat-square" alt="Platform" /></a>
  <a href="#tech-stack"><img src="https://img.shields.io/badge/Frontend-Next.js%2016-black?style=flat-square&logo=next.js" alt="Next.js" /></a>
  <a href="#tech-stack"><img src="https://img.shields.io/badge/Backend-Go%201.23-00ADD8?style=flat-square&logo=go" alt="Go" /></a>
  <a href="#tech-stack"><img src="https://img.shields.io/badge/Database-PostgreSQL%20%2F%20Supabase-3ECF8E?style=flat-square&logo=supabase" alt="Supabase" /></a>
  <a href="#license"><img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License" /></a>
</p>

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [System Architecture](#system-architecture)
- [Repository Structure](#repository-structure)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [1. Backend Setup (Go)](#1-backend-setup-go)
  - [2. Frontend Setup (Next.js)](#2-frontend-setup-nextjs)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Future Roadmap](#future-roadmap)
- [License](#license)

---

## Overview

Modern organizations face escalating security risks from zero-day threats, credential hijacking, unauthorized privilege escalation, and unexpected operational disruptions. Traditional platforms operate in silos: either focusing exclusively on detection (leaving recovery as a delayed manual effort) or disaster recovery (ignoring real-time threat neutralization).

**SkyNet** bridges this gap. It is an intelligent cyber resilience platform designed to safeguard mission-critical digital infrastructure while guaranteeing service availability. By continuously observing user interactions, network telemetry, and operational environments, SkyNet detects anomalies in real time, evaluates zero-trust scores, prioritizes incidents, and triggers automated remediation before disruptions occur.

---

## Key Features

- **Continuous Monitoring & Telemetry**: Full-spectrum observation across nodes, network traffic, user sessions, and API gateways.
- **Real-Time Threat Detection**: Instant anomaly detection identifying suspicious patterns, privilege escalations, and brute-force behaviors.
- **Behavioral Analysis**: User and entity behavioral analytics (UEBA) modeling baseline actions to flag anomalous activity.
- **Trust Evaluation Engine**: Dynamic zero-trust scoring evaluating identity, session age, IP velocity, and device health to grant or restrict access.
- **Risk Assessment & Scoring**: Probabilistic impact and likelihood scoring prioritizing vulnerabilities and active events.
- **Incident Prioritization**: Automated severity triage minimizing alert fatigue for Security Operations (SecOps) teams.
- **Automated Response Workflows**: Policy-driven containment, automated session revocation, IP filtering, and zero-touch node isolation.
- **Security Event Tracking & Audit**: Immutable audit logging and compliance traces ready for regulatory review.
- **Enterprise Cloud Console**: Modern, high-performance console with project management, command palette, live shell, and backend health diagnostics.

---

## System Architecture

```text
                                  ┌───────────────────────────┐
                                  │   SkyNet Cloud Console    │
                                  │     (Next.js App)         │
                                  └─────────────┬─────────────┘
                                                │
                          HTTPS / OAuth         │   Bearer JWT (HMAC-SHA256)
                       ┌────────────────────────┼────────────────────────┐
                       ▼                        │                        ▼
            ┌───────────────────────┐           │            ┌───────────────────────┐
            │     Supabase Auth     │           │            │    Go API Gateway     │
            │  (OAuth / JWT Issuer) │           │            │       (:8080)         │
            └──────────┬────────────┘           │            └───────────┬───────────┘
                       │                        │                        │
                       ▼                        │                        ▼
            ┌───────────────────────────────────┴────────────────────────────────────┐
            │                         PostgreSQL (Supabase)                          │
            │              - public.organizations  - public.users                    │
            └───────────────────────────────────┬────────────────────────────────────┘
                                                │
                                                ▼
                                    ┌───────────────────────┐
                                    │       AI Engine       │
                                    │ (Behavioral Analytics │
                                    │  & Anomaly Detection) │
                                    └───────────────────────┘
```

---

## Repository Structure

```text
SkyNet/
├── backend/                  # Golang API Gateway & Microservices
│   ├── cmd/                  # Application entry points
│   ├── internal/
│   │   ├── config/           # Environment configuration
│   │   ├── database/         # GORM PostgreSQL connection & pooling
│   │   ├── handler/          # HTTP request handlers (health, user, etc.)
│   │   ├── middleware/       # Auth (JWT verification), CORS, Logger
│   │   ├── model/            # GORM database models (User, Organization)
│   │   ├── repository/       # Data access layer
│   │   ├── router/           # Route setup and HTTP multiplexer
│   │   └── service/          # Core business logic
│   ├── migration/            # SQL migration files
│   ├── pkg/
│   │   └── response/         # Standardized JSON response envelope
│   ├── .env.example          # Backend environment template
│   ├── go.mod                # Go module definition
│   └── main.go               # Server initialization
│
├── frontend/                 # Next.js Web Application & Cloud Console
│   ├── app/
│   │   ├── auth/callback/    # Supabase OAuth redirect handler
│   │   ├── dashboard/        # SkyNet Cloud Console dashboard
│   │   ├── login/            # Authentication login screen
│   │   ├── signup/           # User onboarding & registration
│   │   └── layout.tsx        # Root HTML shell & fonts
│   ├── lib/
│   │   ├── auth/             # AuthContext, API client with JWT attachment
│   │   ├── supabase/         # Supabase client, server, and middleware helpers
│   │   └── types/            # TypeScript interfaces
│   ├── public/               # Logos, icons, and static assets
│   ├── .env.example          # Frontend environment template
│   └── middleware.ts         # Edge session synchronization middleware
│
├── ai-engine/                # Machine learning models & anomaly detection pipeline
├── data/                     # Threat intelligence datasets & test traces
└── README.md                 # Project documentation
```

---

## Tech Stack

| Domain | Technology | Description |
|---|---|---|
| **Frontend** | [Next.js](https://nextjs.org/) (v16) | React Framework with Turbopack and App Router |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | Strict type safety across client and server components |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) & [Lucide](https://lucide.dev/) | Clean enterprise console UI and iconography |
| **Backend Gateway** | [Go (Golang)](https://go.dev/) (v1.23+) | High-throughput, low-latency REST API gateway |
| **ORM** | [GORM](https://gorm.io/) | PostgreSQL object-relational mapping |
| **Authentication** | [Supabase Auth](https://supabase.com/docs/guides/auth) | OAuth (Google, GitHub) + Email/Password + JWT |
| **Database** | [PostgreSQL](https://www.postgresql.org/) | Relational database hosted via Supabase |
| **AI / Analytics** | Python / PyTorch *(In Development)* | Predictive threat modeling and behavioral clustering |

---

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- **Node.js** `v18.0.0` or higher
- **Go** `v1.23.0` or higher
- **Git**
- A **Supabase** account and project

---

### 1. Backend Setup (Go)

1. Open your terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

3. Fill in your Supabase connection parameters in `.env`:
   ```ini
   PORT=8080
   ENV=development
   DB_HOST=aws-0-<region>.pooler.supabase.com
   DB_PORT=5432
   DB_USER=postgres.<project-ref>
   DB_PASSWORD=<your-db-password>
   DB_NAME=postgres
   DB_SSLMODE=require
   SUPABASE_JWT_SECRET=<your-supabase-jwt-secret>
   ```

4. Download dependencies and run the server:
   ```bash
   go mod download
   go run main.go
   ```
   The backend API will start on `http://localhost:8080`.

---

### 2. Frontend Setup (Next.js)

1. In a separate terminal, navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

3. Configure your Supabase public keys and backend API URL:
   ```ini
   NEXT_PUBLIC_SUPABASE_URL=https://<your-project-ref>.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>
   NEXT_PUBLIC_API_URL=http://localhost:8080
   ```

4. Install packages and start the Next.js development server:
   ```bash
   npm install
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## API Endpoints

### Public Endpoints
| Method | Path | Description |
|---|---|---|
| `GET` | `/api/health` | Service health status, database ping, and system timestamp |

### Protected Endpoints (Requires `Authorization: Bearer <Supabase_JWT>`)
| Method | Path | Description |
|---|---|---|
| `GET` | `/api/v1/user/profile` | Verifies JWT, auto-syncs user in PostgreSQL, returns profile & organization |

#### Standard Response Format
```json
{
  "status": "success",
  "data": {
    "id": "c1f7b034-7fa2-432d-8b01-fb10c4d1d932",
    "email": "analyst@skynet.sec",
    "full_name": "SkyNet Operator",
    "role": "admin",
    "organization": {
      "id": "e932b123-...",
      "name": "SkyNet Defense Mesh",
      "slug": "skynet-prod-94021"
    }
  },
  "message": "User profile fetched successfully"
}
```

---

## Database Schema

SkyNet uses a multi-tenant relational schema:

```sql
-- Organizations
CREATE TABLE IF NOT EXISTS public.organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    plan VARCHAR(50) DEFAULT 'free',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Users (Linked with Supabase Auth auth.users)
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY,
    organization_id UUID REFERENCES public.organizations(id) ON DELETE SET NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255),
    avatar_url TEXT,
    role VARCHAR(50) DEFAULT 'member',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## Future Roadmap

- [ ] **eBPF Kernel Probes**: Low-overhead real-time syscall tracing and network socket monitoring.
- [ ] **Predictive Threat Intelligence**: Pre-trained transformer models forecasting lateral movement attempts.
- [ ] **Automated Playbook Builder**: Visual drag-and-drop workflow designer for custom incident triage.
- [ ] **Cross-Cluster Telemetry**: Multi-cloud resilience fabric across AWS, GCP, and on-premises environments.

---

## License

This project is licensed under the [MIT License](LICENSE).
