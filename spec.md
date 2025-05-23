# REMCOM MVP Specification Document

---

## 1. Overview

**Purpose:**
Develop a streamlined web-based enforcement tool enabling roadside officers to manually process Warrants of Arrest (WoAs) and outstanding notices linked to drivers or vehicles, without reliance on ANPR, handheld devices, or mobile scanning. The system supports digital record-keeping, audit logging, and daily export to TRAFMAN.

---

## 2. Functional Requirements

### 2.1 Manual Data Entry Interface

* Input fields:

  * Driver ID Number **OR** Vehicle Registration Number (only one required)
* Upon input, query the centralised database for outstanding WoAs or Notices linked to the entered identifier.

### 2.2 Centralised WoA/Notice Lookup

* Display matched records with these fields:

| Field                | Description                         | Applicable To |
| -------------------- | ----------------------------------- | ------------- |
| Record Type          | “WoA” or “Notice” (for grouping)    | Both          |
| Record Number        | Unique identifier                   | Both          |
| Status               | Open, Executed, Paid, Cancelled     | Both          |
| Linked To            | “Driver” or “Vehicle”               | Both          |
| Date Issued          | Original issuance date              | Both          |
| Issuing Authority    | Municipality or issuing agency name | Both          |
| User Action Required | Indicates if manual action needed   | Both          |

**Notice-specific fields:**

* Offence Code
* Offence Description
* Offence Date/Time
* Offence Location
* Fine Amount
* Due Date

**WoA-specific fields:**

* Court Case Number (if applicable)
* Court Name

### 2.3 Actionable Enforcement Interface

* Allow officers to mark:

  * WoA as Executed
  * Notice as Paid
* Each action automatically records:

  * Officer’s username and UUID (from logged-in session)
  * Automatic timestamp of action
* Editing/updating records after submission is **not** permitted.

### 2.4 Receipt and Warrant Issuance

* Generate printable PDFs that open in a new browser tab for preview.
* PDF content:

**Common header for all receipts:**

* Document Title (“Payment Receipt” or “Warrant Execution Confirmation”)
* Date & Time of action (auto-timestamped)
* Username and UUID of officer
* Issuing Authority (name/logo)
* Record Type and Record Number

**Payment Receipt body:**

* Driver ID or Vehicle Registration
* Offence Description
* Fine Amount Paid
* Date of Offence
* Payment Status: “Paid in full”
* Footer: “This is a system-generated receipt. No signature required.”

**Warrant Execution Receipt body:**

* Driver ID or Vehicle Registration
* Court Case Number (if available)
* Court Name
* Execution Status: “Warrant Executed”
* Footer: “This confirms lawful execution of the above warrant.”

### 2.5 TRAFMAN Daily Export

* Generate daily XML file including:

  * Record Type (WoA or Notice)
  * Action Taken (Paid or Executed)
  * Timestamp
  * Officer UUID
  * Record Number
* Export file available for manual download/upload into TRAFMAN.

### 2.6 Admin and Reconciliation Module

* Skip reconciliation functionality (system is real-time web based).
* Admin landing page provides:

  * User management interface
  * Audit logs viewer (chronological, no filtering)

### 2.7 User Management (Admin Only)

* Create, edit, deactivate user accounts
* Reset passwords
* Assign and change user roles (Officer or Admin)
* Usernames are free-text but unique.

### 2.8 Authentication & Roles

* Roles:

  * Officer: Lookup, mark Paid/Executed, generate PDFs
  * Admin: Officer permissions + audit log viewing + user management
* Role-based access control enforced.
* Actions logged with audit trail.

### 2.9 Audit Logging

* Immutable logs recording:

  * User UUID
  * Timestamp
  * Action type
  * Record number
  * Before and after values (if any)

---

## 3. Non-Functional Requirements

### 3.1 Security

* Enforce HTTPS-only communication.
* Encrypt sensitive data at rest and in transit.
* Comply with OWASP Top 10 security guidelines.
* No advanced authentication features (2FA, session timeouts) for MVP.

### 3.2 Performance

* No offline support for MVP.
* System must handle concurrent access from multiple officers/admins efficiently.

### 3.3 Usability

* Single-page interface for officers combining lookup, results, and action-taking.
* Admins access user management and audit logs directly after login.
* PDFs open in a new tab for preview before printing.

---

## 4. Architecture & Technology Stack

| Layer       | Technology / Frameworks                               |
| ----------- | ----------------------------------------------------- |
| Frontend    | React (TypeScript), Redux, Material UI (MUI)          |
| Backend     | Spring Boot, Hibernate ORM, Liquibase (DB migrations) |
| Database    | PostgreSQL                                            |
| Integration | XML export file generation for TRAFMAN                |

---

## 5. Data Model (High Level)

### Entities and Key Fields:

* **User**

  * UUID (PK), username (unique), password hash, role (Officer/Admin), active status

* **Record** (WoA or Notice)

  * RecordNumber (PK), RecordType, Status, LinkedTo (Driver/Vehicle), DateIssued, IssuingAuthority,
  * Notice fields (offence code, description, date/time, location, fine amount, due date)
  * WoA fields (court case number, court name)

* **ActionLog**

  * ID (PK), UserUUID, Timestamp, ActionType, RecordNumber, BeforeValues (JSON), AfterValues (JSON)

---

## 6. Error Handling Strategy

* Validate all user inputs for format and completeness on client and server sides.
* Display clear error messages on invalid input or system errors.
* Log all errors with context (user, timestamp, operation) for debugging.
* Ensure transaction integrity: partial updates roll back on failure.
* For PDF and XML generation errors, notify user with actionable messages.

---

## 7. Testing Plan

### 7.1 Unit Testing

* Frontend: Components, Redux actions/reducers, utility functions.
* Backend: Service layer, controllers, data repository interactions, XML generation.

### 7.2 Integration Testing

* Verify end-to-end workflows: manual entry → record lookup → action marking → PDF generation → XML export.
* Role-based access control enforcement tests.

### 7.3 User Acceptance Testing (UAT)

* Test officer workflows for usability and correctness.
* Test admin workflows (user management, audit log viewing).
* Validate audit log completeness and immutability.

### 7.4 Security Testing

* Verify HTTPS enforcement.
* Test input validation and protection against common OWASP Top 10 vulnerabilities (SQL injection, XSS, CSRF).

### 7.5 Performance Testing

* Simulate concurrent users performing lookups and updates.

---

## 8. Deployment Notes

* Deploy backend with standard Spring Boot practices, using Liquibase for DB migrations.
* Frontend served via a static web server or CDN with API calls to backend endpoints.
* PostgreSQL configured with secure access and backups.
* Daily XML export stored on server and downloadable via admin interface.

