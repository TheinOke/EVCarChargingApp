We are building "VoltPoint" — an EV charging station web app.

STACK
- MERN: MongoDB, Express, React, Node.js
- Styling: Tailwind CSS
- Containerization: Docker + docker-compose (separate services: client, server, mongo)
- API style: REST (no GraphQL)

ARCHITECTURE (non-negotiable — do not deviate without asking)
- Backend: Layered Architecture
  routes -> controllers -> services -> repositories/models -> (Mongo)
  Each layer only talks to the layer directly beneath it. No business logic in controllers.
- Frontend: Feature-Based Architecture
  /src/features/<feature-name>/{components, hooks, api, types}
  No shared "god" folders like /components holding everything.
- Data: MongoDB (NoSQL). Use mock/seed data — no real charging-station API integration yet.

CORE FEATURES (v1 scope — do not add features beyond this without asking)
1. Auth: user signup/login (JWT-based)
2. Dashboard: shows user's car info, current battery %, estimated time to full charge,
   estimated cost to charge
3. Map view: nearby EV charging stations (mock data, static coordinates is fine for v1)
4. (Anything else is out of scope until I say otherwise)

WORKING AGREEMENT
- Do not generate code until I approve the plan for that phase.
- If a requirement is ambiguous, ask me — do not assume and proceed.
- Work in the phases I give you, one at a time. Do not jump ahead to a later phase.
- When you finish a phase, summarize what you built, list assumptions you made,
  and ask me confirming questions before we move to the next phase.
- If you're not sure whether something exists in this codebase (a file, a function,
  a config), say so explicitly instead of guessing.

Confirm you understand this, then ask me any clarifying questions before we start Phase 0.
