# REMCOM MVP Project TODO Checklist

---

## 1. Project Foundation Setup

- [ ] Initialize Spring Boot backend project with dependencies:
  - spring-boot-starter-web
  - spring-boot-starter-data-jpa
  - liquibase-core
  - postgresql driver
  - spring-boot-starter-security

- [ ] Configure `application.properties` for PostgreSQL connection

- [ ] Setup Liquibase changelog for initial schema (User table)

- [ ] Create User JPA entity and repository

- [ ] Create simple health check REST controller `/api/ping`

- [ ] Initialize React frontend project with TypeScript

- [ ] Setup Redux store with empty slices for users and records

- [ ] Setup React Router with routes for login, officer, and admin dashboards

- [ ] Setup Material UI theme provider and baseline styles

---

## 2. Data Model Implementation

- [ ] Create Liquibase changelogs for:
  - Record table (WoA and Notice fields)
  - ActionLog table

- [ ] Create JPA Entities:
  - Record (with WoA and Notice attributes)
  - ActionLog

- [ ] Implement repository interfaces for Record and ActionLog

- [ ] Implement service layer for:
  - User management (create, update, deactivate)
  - Record lookup by Driver ID or Vehicle Registration
  - ActionLog creation on record actions

- [ ] Define API DTOs:
  - UserDTO
  - RecordDTO
  - ActionLogDTO

---

## 3. Authentication & Authorization

- [ ] Implement backend login endpoint (username/password)

- [ ] Configure Spring Security:
  - Role-based access control for Officer and Admin
  - Protect APIs accordingly

- [ ] Setup frontend login page with:
  - Form validation
  - Auth API call
  - Token/session storage
  - Role-based redirect and route guards

---

## 4. Manual Data Entry and Lookup UI

- [ ] Create form component for manual input:
  - Driver ID Number or Vehicle Registration (one required)
  - Client-side validation

- [ ] Implement backend lookup API:
  - Accepts driverId or vehicleRegNumber
  - Returns open WoA and Notices with all required fields

- [ ] Display lookup results in frontend:
  - Group by Record Type (WoA / Notice)
  - Show all specified fields
  - Loading and error states handling

---

## 5. Enforcement Actions

- [ ] Backend API to mark WoA as Executed or Notice as Paid
  - Validate action eligibility
  - Update record status
  - Create audit log with before/after states

- [ ] Frontend buttons for marking actions:
  - Display action buttons conditionally
  - Confirmation dialogs
  - Disable buttons if action not allowed or completed

---

## 6. PDF Generation

- [ ] Backend service to generate PDFs for:
  - Payment Receipts
  - Warrant Execution Confirmations
  - Include all headers, body fields, and footers as specified

- [ ] Backend endpoint to serve generated PDFs

- [ ] Frontend to open PDFs in a new browser tab on action completion

---

## 7. Daily XML Export for TRAFMAN

- [ ] Backend service to generate daily XML export file:
  - Includes all acted-on records with required fields

- [ ] Store/export XML file on server

- [ ] Admin UI:
  - Download button/link for daily XML export

---

## 8. Admin Module

- [ ] Backend endpoints for user management:
  - Create users
  - Edit users
  - Deactivate users
  - Reset passwords
  - Assign/change roles

- [ ] Frontend user management UI for Admins

- [ ] Backend API to query audit logs

- [ ] Frontend audit log viewer:
  - Chronological display
  - No filtering required

---

## 9. Error Handling and Validation

- [ ] Client-side validation for all forms and inputs

- [ ] Server-side validation and error handling

- [ ] Global backend error handling middleware to catch and log errors

- [ ] User-friendly error messages on frontend

---

## 10. Testing Plan

- [ ] Unit tests:
  - Backend services, controllers, repositories
  - Frontend components, Redux actions and reducers

- [ ] Integration tests:
  - End-to-end workflow: entry → lookup → action → PDF → XML export

- [ ] Security tests:
  - Role-based access enforcement
  - Input sanitization and OWASP top 10 vulnerabilities

- [ ] Performance tests:
  - Simulate concurrent users and actions

---

## 11. Deployment Preparation

- [ ] Prepare Liquibase migration scripts for production

- [ ] Setup PostgreSQL with secure access and backups

- [ ] Prepare backend deployment scripts and configuration

- [ ] Prepare frontend build and deployment process (static server or CDN)

- [ ] Document deployment steps and environment setup

---

# Optional / Future Enhancements (Out of Scope for MVP)

- Implement session timeouts and 2FA

- Add offline support and data synchronization

- Add audit log filtering and search capabilities

- Improve UI/UX with enhanced accessibility

---

# Notes

- Each task should include proper code comments and documentation.

- Follow best practices for security, data handling, and error logging.

- Maintain consistent coding standards between frontend and backend.

---
