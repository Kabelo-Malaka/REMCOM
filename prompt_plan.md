# REMCOM MVP Project Blueprint & Iterative Breakdown

---

## Step 1: Project Foundation Setup

### Chunk 1.1: Backend project setup

* Initialize Spring Boot project with required dependencies: Web, Hibernate, Liquibase, PostgreSQL driver, Security (basic).
* Configure application properties for PostgreSQL connection.
* Setup Liquibase changelog for initial DB schema.
* Setup basic User entity and repository.
* Setup basic REST controller placeholder.

### Chunk 1.2: Frontend project setup

* Initialize React with TypeScript.
* Setup Redux store and initial state.
* Setup routing for Officer and Admin pages.
* Setup Material UI baseline.

---

## Step 2: Data Model Implementation

### Chunk 2.1: Database schema for User, Record, ActionLog

* Create Liquibase changelog scripts for User, Record (with WoA and Notice fields), ActionLog.
* Create JPA Entities for User, Record, ActionLog.
* Implement repository interfaces.

### Chunk 2.2: Backend service and DTOs

* Implement service layer for User management.
* Implement service layer for Record lookup and update.
* Implement service layer for ActionLog creation.
* Define DTOs for frontend-backend communication.

---

## Step 3: Authentication & Authorization

### Chunk 3.1: Basic login/auth

* Implement simple login endpoint.
* Setup Spring Security roles: Officer, Admin.
* Enforce role-based access control on backend endpoints.

### Chunk 3.2: Frontend login page

* Implement login UI.
* Handle login flow with token/session storage.
* Route guards based on roles.

---

## Step 4: Manual Data Entry and Lookup UI

### Chunk 4.1: Data entry form

* Implement form with Driver ID or Vehicle Registration.
* Form validation (only one required).
* Submit to backend lookup API.

### Chunk 4.2: Display lookup results

* Display matched records in a table with fields as specified.
* Show proper grouping and status.
* Handle loading and error states.

---

## Step 5: Enforcement Actions UI & Backend

### Chunk 5.1: Mark WoA as Executed or Notice as Paid

* Implement backend endpoints to mark actions.
* Include audit log creation on every action.
* Prevent editing after submission.

### Chunk 5.2: Frontend action buttons

* Add action buttons to records list.
* Disable buttons if action not applicable or already completed.
* Confirmations before action.

---

## Step 6: PDF Generation for Receipts and Warrants

### Chunk 6.1: Backend PDF generation service

* Implement PDF generation using appropriate library.
* Generate PDFs with required fields and formatting.
* Endpoint to fetch generated PDFs.

### Chunk 6.2: Frontend PDF preview

* Open PDF in new tab upon action completion.

---

## Step 7: Daily XML Export for TRAFMAN

### Chunk 7.1: Backend XML generation

* Generate daily XML export with required fields and format.
* Store export file on server.

### Chunk 7.2: Admin UI to download XML export

* Implement admin page link/button to download the export.

---

## Step 8: Admin Module & Audit Logs

### Chunk 8.1: User management UI & backend

* Admin CRUD for users, roles, password resets.
* Backend endpoints and services.

### Chunk 8.2: Audit log viewer

* Backend audit log query.
* Frontend list display in chronological order.

---

## Step 9: Error Handling and Validation

* Validate inputs client- and server-side.
* Centralized error handling on backend.
* Friendly error messages on UI.

---

## Step 10: Testing and Deployment

* Unit tests for frontend and backend.
* Integration and E2E tests for workflows.
* Performance and security tests.
* Prepare deployment scripts and documentation.

---

# Detailed Breakdown Into Small Implementable Steps

Below, I further break the chunks into smaller actionable steps suitable for coding iterations.

---

### 1.1.1 Initialize Spring Boot project (Maven/Gradle) with:

* spring-boot-starter-web
* spring-boot-starter-data-jpa
* postgresql driver
* liquibase-core
* spring-boot-starter-security (basic)

### 1.1.2 Configure `application.properties` with PostgreSQL DB details.

### 1.1.3 Setup Liquibase changelog for User table.

### 1.1.4 Create User JPA entity and repository.

### 1.1.5 Create a simple REST endpoint `/api/ping` to verify backend is up.

---

### 1.2.1 Initialize React project with TypeScript template.

### 1.2.2 Install redux, react-redux, @reduxjs/toolkit, react-router-dom, @mui/material.

### 1.2.3 Setup basic Redux store with empty slices for users and records.

### 1.2.4 Setup React Router with protected routes for login, officer dashboard, and admin dashboard.

---

### 2.1.1 Create Liquibase scripts for Record and ActionLog tables.

### 2.1.2 Create JPA entities for Record (with fields for WoA and Notice).

### 2.1.3 Create JPA entity for ActionLog.

### 2.1.4 Implement repositories for Record and ActionLog.

---

### 2.2.1 Create UserService with methods to create, find, update users.

### 2.2.2 Create RecordService with lookup by Driver ID or Vehicle Registration.

### 2.2.3 Create ActionLogService to save logs on actions.

### 2.2.4 Define DTOs for API communication: UserDTO, RecordDTO, ActionLogDTO.

---

### 3.1.1 Configure Spring Security with in-memory users for initial testing.

### 3.1.2 Implement JWT or session-based authentication.

### 3.1.3 Secure APIs with role-based access annotations.

---

### 3.2.1 Create Login form component.

### 3.2.2 Implement authentication API call and token storage.

### 3.2.3 Redirect based on user role after login.

---

... and so on for each chunk until the full MVP is covered.

---

# Code-Generation LLM Prompts

Below are example prompt templates for guiding a code-generation LLM step-by-step. Each is in a separate markdown fenced code block with `text` tag for clarity.

---

```text
// Prompt 1: Backend Setup - Spring Boot Project Initialization
You are to generate a Spring Boot project with Maven including dependencies for spring-boot-starter-web, spring-boot-starter-data-jpa, liquibase-core, postgresql driver, and spring-boot-starter-security. Configure the application.properties with PostgreSQL connection details (host, port, dbname, username, password). Create a simple REST controller with endpoint `/api/ping` returning "pong" for health check.
```

---

```text
// Prompt 2: Database Schema Setup - Liquibase changelogs for User table
Generate Liquibase changelog XML file to create a `users` table with columns: UUID (primary key, UUID), username (unique, varchar), password_hash (varchar), role (varchar), active (boolean). Ensure proper constraints and indices. Provide changelog file content.
```

---

```text
// Prompt 3: Backend - User Entity and Repository
Create a JPA entity class User with fields: UUID id, String username, String passwordHash, String role, boolean active. Annotate appropriately. Create a Spring Data JPA repository interface UserRepository with common methods.
```

---

```text
// Prompt 4: Frontend Setup - React with TypeScript, Redux, and MUI baseline
Initialize React app with TypeScript. Setup Redux store with empty slices for user and records. Setup routing with react-router-dom for login, officer dashboard, and admin dashboard pages. Setup Material UI theme provider and basic styling.
```

---

```text
// Prompt 5: Backend Service - UserService for CRUD operations
Implement UserService class with methods to createUser, getUserById, updateUser, deactivateUser, and assignRole. Use UserRepository for DB operations. Include validation to ensure username uniqueness.
```

---

```text
// Prompt 6: Authentication - Spring Security Basic Configuration
Configure Spring Security to use JWT authentication (or session-based if preferred). Create login endpoint accepting username and password and returning auth token. Secure all other endpoints requiring roles Officer or Admin.
```

---

```text
// Prompt 7: Frontend - Login Page and Auth Flow
Create a login form component that captures username and password. On submit, call backend login API, store returned token in localStorage, and redirect user to appropriate dashboard based on role. Implement route guards to prevent unauthorized access.
```

---

```text
// Prompt 8: Manual Data Entry Form Component
Implement a React form component that allows entering either Driver ID or Vehicle Registration Number (one required). Validate input so only one field is mandatory. On submit, call backend lookup API to fetch associated records.
```

---

```text
// Prompt 9: Backend API - Lookup Records by Driver or Vehicle
Create REST endpoint `/api/records/lookup` that accepts either driverId or vehicleRegNumber as query params. Query database for open WoA and Notices linked to input. Return list of matching records with all required fields.
```

---

```text
// Prompt 10: Frontend - Display Lookup Results Table
Display the records returned from lookup in a table showing all required fields, grouped by Record Type. Include buttons to mark WoA as Executed or Notice as Paid where applicable. Disable buttons when action is not allowed.
```

---

```text
// Prompt 11: Backend - Mark Record Action Endpoint
Create endpoint `/api/records/{recordNumber}/action` accepting POST with action type (Executed or Paid). Validate and update record status. Create audit log entry recording user UUID, timestamp, before/after states. Return updated record.
```

---

```text
// Prompt 12: Backend - PDF Generation Service
Implement service that generates PDF receipts for Payment and Warrant execution. Include all specified header and body fields. Provide endpoint `/api/records/{recordNumber}/receipt` returning PDF stream.
```

---

```text
// Prompt 13: Frontend - Open PDF Receipt in New Tab
After marking action, automatically fetch generated PDF from backend and open in a new browser tab for preview.
```

---

```text
// Prompt 14: Backend - Daily XML Export Generation
Create a scheduled or on-demand service that aggregates all records acted on during the day into a single XML file formatted per specification. Provide endpoint for admin to download the XML export file.
```

---

```text
// Prompt 15: Admin Module - User Management UI and Backend
Implement user management CRUD UI for admins. Backend endpoints to create, edit, deactivate users, reset passwords, and assign roles. Ensure role-based access control.
```

---

```text
// Prompt 16: Audit Logging - Backend and Frontend Viewer
Ensure all actions create audit logs with user UUID, timestamp, action type, record number, before and after JSON states. Implement backend query API and frontend audit log viewer page for admins, showing logs chronologically.
```

---

```text
// Prompt 17: Validation and Error Handling
Implement client-side and server-side validation for all inputs. Add global error handling middleware in backend to catch and log errors. Display user-friendly error messages on frontend.
```

---

```text
// Prompt 18: Testing Plan Implementation
Write unit tests for frontend components, redux slices, and backend service methods. Write integration tests for API endpoints. Include security tests for role-based access. Prepare test scripts.
```

---

```text
// Prompt 19: Deployment Setup Documentation
Provide scripts and documentation for deploying backend (Spring Boot app with Liquibase migrations) and frontend (React build) on a web server. Include PostgreSQL setup with secure access and backups.
```

---

# Summary

* The blueprint covers all functional and non-functional requirements.
* Iterative chunks split the work into manageable parts.
* Small steps within chunks are sized for safe implementation with testing.
* Code-generation prompts reflect each step, progressively building the system.
* Each prompt builds on the previous, ensuring integrated, no orphaned code.
