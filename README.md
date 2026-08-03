# EduPulse — School ERP System

A full-stack multi-school management system with role-based access control.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Vite, Tailwind CSS v4 |
| Backend | Express 5, Node.js |
| Database | MongoDB (Mongoose 9) |
| Auth | JWT (7-day tokens) |
| Real-time | Socket.IO |
| PDF | PDFKit |

## Roles

| Role | Scope | Can Do |
|------|-------|--------|
| `super_admin` | Platform-wide | Create/delete schools, view all data |
| `admin` | One school | Manage students, teachers, classes, fees, etc. |
| `teacher` | One school | Mark attendance, manage marks, view students |
| `student` | One school | View own data, fees, results, timetable |

---

## Multi-School Architecture — Flow Diagrams

### 1. Role Hierarchy

```
                        ┌──────────────┐
                        │  SUPER ADMIN │  ← Owns the platform
                        │  schoolId:   │     Sees ALL schools
                        │    null      │     Can create/delete schools
                        └──────┬───────┘
                               │ creates
                    ┌──────────┴──────────┐
                    ▼                     ▼
            ┌──────────────┐      ┌──────────────┐
            │   SCHOOL A   │      │   SCHOOL B   │  ← Each school is
            │   code: DPS  │      │   code: KV   │     a separate tenant
            └──────┬───────┘      └──────────────┘
                   │
        ┌──────────┼──────────┐
        ▼          ▼          ▼
   ┌─────────┐ ┌─────────┐ ┌─────────┐
   │  ADMIN  │ │ TEACHER │ │ STUDENT │  ← All scoped to ONE school
   │ schoolId│ │ schoolId│ │ schoolId│
   │ = school│ │ = school│ │ = school│
   └─────────┘ └─────────┘ └─────────┘
```

### 2. Login Flow

```
  ┌─────────────────────┐
  │    LOGIN PAGE        │
  │  ┌───────────────┐  │
  │  │ School Code   │  │  ← Required for admin/teacher/student
  │  │ (e.g., DPS001)│  │     Optional for super_admin
  │  ├───────────────┤  │
  │  │ Email         │  │
  │  ├───────────────┤  │
  │  │ Password      │  │
  │  └───────────────┘  │
  └──────────┬──────────┘
             │
             ▼
  ┌─────────────────────┐     ┌─────────────────────────────────┐
  │  Has schoolCode?    │─YES─▶│  Find School by code            │
  └──────────┬──────────┘     │  Query: { email, schoolId }     │
             │ NO             └───────────────┬─────────────────┘
             ▼                                │
  ┌─────────────────────┐                    │
  │  Is super_admin?    │─YES─┐              │
  │  Query: { email,    │     │              │
  │   role:"super_admin"│     │              │
  └──────────┬──────────┘     │              │
             │ NO             │              │
             ▼                │              │
  ┌─────────────────────┐     │              │
  │  Return error:      │     │              │
  │  "School code is    │     │              │
  │   required"         │     │              │
  └─────────────────────┘     │              │
                              │              │
             ┌────────────────┴──────────────┘
             ▼
  ┌─────────────────────┐
  │  Find User          │
  │  Compare password   │
  └──────────┬──────────┘
             │
             ▼
  ┌─────────────────────┐     ┌─────────────────────────────────┐
  │  Generate JWT       │────▶│  Token contains:                │
  │  { id, role,        │     │  { id: "abc",                  │
  │    schoolId }       │     │    role: "admin",              │
  └──────────┬──────────┘     │    schoolId: "xyz" }           │
             │                └─────────────────────────────────┘
             ▼
  ┌─────────────────────┐     ┌─────────────────────────────────┐
  │  Response:          │────▶│  Navigate based on role:        │
  │  { token, user }    │     │  super_admin → /super-admin/*   │
  └─────────────────────┘     │  admin       → /admin/*         │
                              │  teacher     → /teacher/*       │
                              │  student     → /student/*       │
                              └─────────────────────────────────┘
```

### 3. Request Middleware Flow (Every API call after login)

```
  ┌──────────────────────────────────────────────────────────────────────┐
  │  Client sends: Authorization: Bearer <token>                       │
  └──────────────────────────────┬───────────────────────────────────────┘
                                 │
                                 ▼
                 ┌───────────────────────────────┐
                 │     authMiddleware (protect)    │
                 │  ─────────────────────────────  │
                 │  1. Decode JWT                 │
                 │  2. Find user by id            │
                 │  3. Set req.user               │
                 │  4. Set req.schoolId           │
                 └───────────────┬───────────────┘
                                 │
                                 ▼
                 ┌───────────────────────────────┐
                 │     tenantScope middleware      │
                 │  ─────────────────────────────  │
                 │  Is role == "super_admin"?      │
                 │    YES → skip (see all data)    │
                 │    NO  → Is schoolId present?   │
                 │           YES → proceed         │
                 │           NO  → 400 error       │
                 └───────────────┬───────────────┘
                                 │
                                 ▼
                 ┌───────────────────────────────┐
                 │     authorizeRoles (optional)   │
                 │  ─────────────────────────────  │
                 │  Check if role is allowed       │
                 │  e.g., admin, teacher           │
                 └───────────────┬───────────────┘
                                 │
                                 ▼
                 ┌───────────────────────────────┐
                 │       CONTROLLER               │
                 │  ─────────────────────────────  │
                 │  const schoolId = req.schoolId  │
                 │                                │
                 │  // List query                 │
                 │  Model.find({ schoolId })       │
                 │                                │
                 │  // Create                     │
                 │  Model.create({ ..., schoolId })│
                 │                                │
                 │  // Detail query               │
                 │  Model.findOne({               │
                 │    _id: id,                    │
                 │    schoolId    ← scoped!       │
                 │  })                            │
                 └───────────────────────────────┘
```

### 4. Data Isolation Example

```
  School A (DPS001)                    School B (KV001)
  ┌────────────────────┐               ┌────────────────────┐
  │ Students:          │               │ Students:          │
  │  { name: "Rahul",  │               │  { name: "Rahul",  │
  │    schoolId: A }   │               │    schoolId: B }   │
  │                    │               │                    │
  │  { name: "Priya",  │               │  { name: "Amit",   │
  │    schoolId: A }   │               │    schoolId: B }   │
  └────────────────────┘               └────────────────────┘

  When Admin of DPS queries students:
  → Student.find({ schoolId: A })
  → Returns: Rahul (DPS), Priya (DPS)
  → Does NOT return: Rahul (KV), Amit (KV)

  When Super Admin queries students:
  → Student.find({})  (no filter)
  → Returns: ALL students from ALL schools
```

### 5. Signup Flow

```
  ┌─────────────────────┐
  │   SIGNUP PAGE        │
  │  ┌───────────────┐  │
  │  │ School Code   │  │  ← User enters code to join a school
  │  ├───────────────┤  │
  │  │ Name          │  │
  │  ├───────────────┤  │
  │  │ Email         │  │  ← Same email CAN exist in different schools
  │  ├───────────────┤  │
  │  │ Password      │  │
  │  ├───────────────┤  │
  │  │ Role          │  │  ← admin / teacher / student
  │  └───────────────┘  │
  └──────────┬──────────┘
             │
             ▼
  ┌─────────────────────┐
  │  Find School        │
  │  by code            │
  └──────────┬──────────┘
             │
             ▼
  ┌─────────────────────┐
  │  Check duplicate:   │
  │  User.findOne({     │
  │    email,           │
  │    schoolId         │  ← Unique per school, NOT global
  │  })                 │
  └──────────┬──────────┘
             │
             ▼
  ┌─────────────────────┐
  │  Create User        │
  │  { email, password, │
  │    role, schoolId } │
  └──────────┬──────────┘
             │
             ▼
  ┌─────────────────────┐
  │  If role==student:  │
  │  Create Student     │
  │  profile with       │
  │  schoolId           │
  └─────────────────────┘
```

### 6. Super Admin School Management Flow

```
  ┌─────────────────────┐
  │  SUPER ADMIN         │
  │  Dashboard           │
  └──────────┬──────────┘
             │
             ▼
  ┌─────────────────────┐     ┌─────────────────────────────────┐
  │  Create School       │────▶│  1. Create School record        │
  │  POST /auth/         │     │     { name, code, ... }        │
  │  create-school       │     │                                 │
  │                      │     │  2. Create admin user for that  │
  │  Body:               │     │     school with role "admin"    │
  │  { name, code,       │     │     { email, schoolId }        │
  │    adminEmail,       │     │                                 │
  │    adminName,        │     │  3. Admin can now login with    │
  │    adminPassword }   │     │     schoolCode + email + pass   │
  └─────────────────────┘     └─────────────────────────────────┘
```

### 7. Complete Data Flow Summary

```
  ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
  │  LOGIN   │───▶│  JWT     │───▶│  AUTH    │───▶│  TENANT  │───▶│CONTROLLER│
  │  (code + │    │  TOKEN   │    │ MIDDLEWARE│    │ MIDDLEWARE│    │  (scoped │
  │  email + │    │ (id,role,│    │ (decode, │    │ (schoolId│    │   queries)│
  │  pass)   │    │ schoolId)│    │  find    │    │  check)  │    │          │
  │          │    │          │    │  user)   │    │          │    │          │
  └──────────┘    └──────────┘    └──────────┘    └──────────┘    └──────────┘
       │                                               │                │
       │         ┌─────────────────────────────────────┘                │
       │         │                                                      │
       │         ▼                                                      ▼
       │    ┌──────────┐                                        ┌──────────┐
       │    │ req.user │                                        │ MongoDB  │
       │    │ req.     │                                        │ {schoolId│
       │    │ schoolId │                                        │  in all  │
       │    └──────────┘                                        │  queries}│
       │                                                        └──────────┘
       │
       ▼
  ┌──────────────────────────────────────────────────────┐
  │  SAME EMAIL CAN EXIST IN DIFFERENT SCHOOLS           │
  │                                                      │
  │  john@dps.com (schoolId: DPS) ←→ john@kv.com (KV)   │
  │  Both valid, both can login with their schoolCode    │
  └──────────────────────────────────────────────────────┘
```

### 8. API Endpoints by Role

```
  SUPER ADMIN (no schoolId in token):
  ├── POST   /api/auth/create-school
  ├── GET    /api/auth/schools
  ├── GET    /api/auth/schools/:id
  ├── PUT    /api/auth/schools/:id
  └── DELETE /api/auth/schools/:id

  ADMIN (schoolId scoped):
  ├── GET    /api/settings/school-info  ← sees school code
  ├── GET    /api/settings
  ├── PUT    /api/settings
  ├── GET    /api/dashboard/stats
  ├── POST   /api/students
  ├── GET    /api/students
  ├── POST   /api/teachers
  ├── GET    /api/teachers
  ├── ...    (all school management)
  └── All queries include { schoolId }

  TEACHER (schoolId scoped):
  ├── GET    /api/teacher/dashboard
  ├── GET    /api/teacher/students
  ├── POST   /api/attendance/mark
  ├── ...    (teaching functions)
  └── All queries include { schoolId }

  STUDENT (schoolId scoped):
  ├── GET    /api/student/dashboard
  ├── GET    /api/student/attendance
  ├── GET    /api/student/fees
  ├── ...    (student functions)
  └── All queries include { schoolId }
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB running locally or Atlas URI

### Setup

```bash
# Clone the repo
git clone <repo-url>
cd school_erp

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install

# Set up environment variables
cp server/.env.example server/.env
# Edit server/.env with your MongoDB URI and JWT_SECRET

# Run migration to create default school + super admin
cd server
node src/scripts/migrateSchool.js

# Start server
npm run dev

# Start client (in new terminal)
cd client
npm run dev
```

### Default Credentials (after migration)

| Role | Email | Password | School Code |
|------|-------|----------|-------------|
| Super Admin | superadmin@edupulse.com | admin123 | *(not needed)* |

### Creating a School

1. Login as Super Admin
2. Go to Schools → Create School
3. Enter school name, code (e.g., `DPS001`), and admin credentials
4. The admin can now login with that school code

---

## Project Structure

```
school_erp/
├── server/
│   ├── src/
│   │   ├── config/          # DB connection
│   │   ├── controllers/     # 22 controllers (all school-scoped)
│   │   ├── middleware/       # auth, role, tenant, upload
│   │   ├── models/          # 20 models (all with schoolId)
│   │   ├── routes/          # 24 route files
│   │   ├── scripts/         # Migration scripts
│   │   └── utils/           # Token, audit log, notify
│   └── server.js            # Entry point
├── client/
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── context/         # AuthContext, SidebarContext
│   │   ├── pages/           # All page components
│   │   │   ├── superAdmin/  # Super admin pages
│   │   │   ├── admin/       # Admin pages
│   │   │   ├── teacher/     # Teacher pages
│   │   │   ├── student/     # Student pages
│   │   │   └── auth/        # Login, Signup
│   │   ├── routes/          # ProtectedRoute
│   │   ├── services/        # API, schoolService
│   │   └── data/            # sidebarMenu, pageConfig
│   └── App.jsx              # All routes
└── README.md
```

## Key Files

| File | Purpose |
|------|---------|
| `server/src/middleware/tenantMiddleware.js` | Enforces school scoping |
| `server/src/middleware/authMiddleware.js` | JWT decode, sets `req.schoolId` |
| `server/src/utils/generateToken.js` | JWT with `{ id, role, schoolId }` |
| `server/src/models/School.js` | School model |
| `server/src/models/User.js` | User with `schoolId` + compound index |
| `server/src/scripts/migrateSchool.js` | Creates default school + super admin |
