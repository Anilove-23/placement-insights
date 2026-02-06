Got it 👍
Here’s the **clean, copy-paste ready Markdown (`.md`) version** of your PRD.
You can directly save this as `PRD_PlaceWise_AI.md`.

---

```md
# 📘 Product Requirements Document (PRD)

## AI-Based College Placement Tracker

---

## 1. Product Overview

### Product Name
**PlaceWise AI** *(temporary name)*

### Problem Statement
College placement data is scattered across PDFs, Excel sheets, portals, and notices.  
Students lack clear insights into:
- Company trends  
- Required skills  
- Their own placement readiness  

Placement cells lack:
- Unified analytics  
- Predictive insights  
- Easy data management  

### Solution
A centralized placement analytics platform that:
- Aggregates placement data  
- Visualizes trends  
- Analyzes skill gaps  
- Predicts placement probability using AI  

---

## 2. Target Users

### Primary Users
1. Students  
2. Placement Cell / Admin  
3. College Management *(read-only analytics)*  

---

## 3. User Roles & Permissions

| Role | Access |
|---|---|
| Student | View stats, build profile, see predictions |
| Placement Admin | Upload data, manage companies, moderate |
| Super Admin | Full access (users + data) |

---

## 4. Core Features (MVP)

### 4.1 Placement Analytics Dashboard
**For Students & Admins**

Includes:
- Company-wise placement stats  
- Role-wise hiring trends  
- Average / Max / Min CTC  
- Branch-wise placement percentage  

**Frontend:** Graphs & charts  
**Backend:** Aggregated analytics APIs  

---

### 4.2 Student Profile Builder
**For Students**

Fields:
- Name, branch, graduation year  
- CGPA  
- Skills (tags)  
- Internships  
- Projects  
- Certifications  

**Frontend:** Form + editable profile  
**Backend:** Profile CRUD APIs  

---

### 4.3 Skill Gap Analysis
**For Students**

Logic:
- Compare student skills vs role-required skills  
- Highlight missing skills  
- Suggest improvements  

**Frontend:** Skill comparison UI  
**Backend:** Skill-matching logic  

---

### 4.4 Placement Prediction (AI)
**For Students**

**Output:**
- Placement probability (%)  
- Target role suggestions  

**Inputs:**
- CGPA  
- Skills  
- Internships  
- Branch  
- Past placement data  

**Backend:** Prediction logic / model  
**Frontend:** Prediction card + explanation  

---

### 4.5 Placement Timeline
**For Students**

- Company visiting dates  
- Application deadlines  
- Results timeline  

**Frontend:** Timeline UI  
**Backend:** Timeline APIs  

---

### 4.6 Admin Panel
**For Placement Cell**

Functions:
- Add / edit companies  
- Upload placement data (CSV)  
- Approve student profiles  
- View college-level analytics  

**Frontend:** Admin dashboard  
**Backend:** Admin APIs + validation  

---

## 5. Functional Requirements

### Authentication
- JWT-based authentication  
- Role-based access control  

### Data Management
- CSV import/export  
- Data validation  
- Duplicate prevention  

### Performance
- Dashboard APIs response time < 500ms  
- Pagination for large datasets  

---

## 6. Non-Functional Requirements
- Responsive UI (mobile + desktop)  
- Secure APIs with auth middleware  
- Scalable database design  
- Clear API contracts  

---

## 7. Tech Stack (Suggested)

### Frontend
- React  
- Tailwind CSS  
- Chart.js / Recharts  
- Axios  

### Backend
- Node.js  
- Express / NestJS  
- MongoDB or PostgreSQL  
- JWT Authentication  

### AI / Logic
- Rule-based (MVP)  
- ML upgrade (Phase 2)  

---

## 8. API Contract (High Level)

## 8. API Routes

### Auth
POST /auth/login
POST /auth/register
POST /auth/logout
GET /auth/me



---

### Students
GET /students/me
PUT /students/me

Copy code
GET /students/me/prediction
GET /students/me/skill-gap
GET /students/me/timeline



---

### Analytics
GET /analytics/companies
GET /analytics/roles
GET /analytics/branches
GET /analytics/ctc

---

### Companies
GET /companies
POST /companies
PUT /companies/:id
DELETE /companies/:id


---

### Placements
POST /placements/upload
GET /placements



---

### Admin
GET /admin/dashboard
GET /admin/stats
GET /admin/students
PATCH /admin/students/:id/approve



---

### Access Control

| Routes | Roles |
|---|---|
| `/students/me/*` | Student |
| `/analytics/*` | Student, Admin |
| `/companies/*` | Admin |
| `/placements/*` | Admin |
| `/admin/*` | Super Admin |


---

## 9. Frontend ↔ Backend Coordination Rules
1. Backend defines API response structure first  
2. Frontend mocks APIs before backend completion  
3. All enums (roles, branches, skills) are shared  
4. Error format is standardized  

### Standard Error Response
```json
{
  "success": false,
  "message": "Invalid data"
}
````

---

## 10. Milestones

### Phase 1 (Core)

* Authentication
* Dashboard
* Student profile
* CSV upload

### Phase 2 (AI)

* Skill gap logic
* Placement prediction

### Phase 3 (Polish)

* UI refinement
* Performance tuning
* Deployment

---

## 11. Success Metrics

* Students can view placement readiness clearly
* Admins can upload & analyze data easily
* Dashboard insights load instantly
* Predictions include clear explanations

---

## 12. Future Enhancements

* Resume analysis
* Course recommendations
* Multi-college support
* Notifications

