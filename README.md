# EduPulse School ERP — User Guide

A plain-language manual for the people who run a school every day: **school administrators, principals, office staff, teachers and students**. No technical knowledge is needed to follow anything in this guide.

---

## Table of Contents

1. [Welcome to the School Management ERP](#1-welcome-to-the-school-management-erp)
2. [Getting Started](#2-getting-started)
3. [Dashboards](#3-dashboards)
4. [User Roles and Permissions](#4-user-roles-and-permissions)
5. [Modules](#5-modules)
   - [5A. Platform Administration (Super Admin)](#5a-platform-administration-super-admin)
   - [5B. School Administration Modules](#5b-school-administration-modules)
   - [5C. Teacher Portal](#5c-teacher-portal)
   - [5D. Student Portal](#5d-student-portal)
6. [Common Workflows](#6-common-workflows)
7. [Forms and Fields Reference](#7-forms-and-fields-reference)
8. [Search, Filter and Sorting](#8-search-filter-and-sorting)
9. [Validation and Error Messages](#9-validation-and-error-messages)
10. [Reports](#10-reports)
11. [Settings](#11-settings)
12. [Frequently Asked Questions](#12-frequently-asked-questions)
13. [Troubleshooting](#13-troubleshooting)
14. [Known Limitations in the Current Version](#14-known-limitations-in-the-current-version)

---

# 1. Welcome to the School Management ERP

**EduPulse** is a complete school management system that replaces registers, spreadsheets and paper files with one simple online system.

### What does it do?

Instead of keeping information in different places, EduPulse keeps everything together:

| Instead of… | You use… |
|---|---|
| Paper admission forms | The **New Student Admission** wizard |
| Attendance registers | The **Attendance** screen |
| Fee receipt books | The **Fees** module |
| Handwritten report cards | The **Results** module and downloadable **report cards** |
| Notice boards and circulars | The **Notice Board** and **Notifications** |
| Printed timetables | The **Timetable** module |

### Who uses it?

The system supports four kinds of users:

| User | What they typically do |
|---|---|
| **Super Admin** | Sets up schools on the platform |
| **School Admin** (Principal / Office head) | Manages students, teachers, classes, fees, notices, results and settings for their school |
| **Teacher** | Takes attendance, enters marks, views timetables and notices, applies for leave |
| **Student** | Views their own attendance, fees, timetable, subjects, results and applies for leave |

> Parent/guardian details are recorded as part of student information, but there is **no separate parent login** in the current version of the application.

---

# 2. Getting Started

## 2.1 Opening the Application

Open your web browser and go to your school's application address. You will see the **EduPulse welcome page**, which introduces the system.

From this page you can:

- Select **Login** (top right) to sign in to an existing account.
- Select **Get Started** to create a new account.

## 2.2 Logging In

1. Open the application and select **Login**.
2. Enter your **Email Address**.
3. Enter your **School Code** — every school has its own code (for example, `DPS001`). Ask your school administrator for this code. *(Type it in CAPITALS — the box converts letters automatically.)*
4. Enter your **Password**. Select the eye icon to show/hide what you typed.
5. Select **Sign In**.

You will land on your own dashboard depending on your role (see [Dashboards](#3-dashboards)).

**If something goes wrong:**

| Message | What it means | What to do |
|---|---|---|
| *Please fill all fields* | One of the three boxes is empty | Fill in Email, School Code and Password |
| *Login failed* (or another message) | Email, password or school code is incorrect | Check your entries and try again |

> **Note:** There is a *"Forgot password?"* link on the login screen. In the current version this link does not perform any action. If you forget your password, contact your school administrator, who can reset it from their Profile tools or issue you new credentials. *(Self-service password recovery could not be confirmed from the current application.)*

## 2.3 Creating a New Account (Signup)

Anyone can create an account from the **Get Started** button:

1. Select **Create your account**.
2. Enter **Full Name**, **Email Address** and **Password** (at least 6 characters).
3. Optionally enter your **School Code** if you already have one.
4. Select **Create Account**.

You will be signed straight into the application.

> **Important:** Accounts created through this signup page are always created as **student accounts**. Administrator and teacher accounts are created by the Super Admin (for admins) or by the School Admin (for teachers/admin use). If you are a staff member, ask your administrator to set up your account instead of signing up yourself.

Messages you may see during signup:

| Message | What to do |
|---|---|
| *Please fill all fields* | Name, email and password are all required |
| *Password must be at least 6 characters* | Choose a longer password |

## 2.4 What You See After Logging In

Every screen has the same layout:

```
┌────────────────────────────────────────────────────────┐
│  ☰  Page Title                    🌙  🔔(3)  [Avatar R] │ ← Top bar
├───────────┬────────────────────────────────────────────┤
│           │                                            │
│  Sidebar  │            Main work area                  │
│  (menu)   │      (lists, forms, dashboards…)           │
│           │                                            │
│           │                                            │
│  [Your    │                                            │
│  picture] │                                            │
│  [Logout] │                                            │
└───────────┴────────────────────────────────────────────┘
```

- **Sidebar (left):** Your personal menu. Only the items you are allowed to use appear. The current page is highlighted in blue.
- **Hamburger button:** Collapses the sidebar to icons only, or expands it again. On phones/tablets it slides the menu in and out.
- **Top bar:** Shows the page you are on, a moon/sun button to switch between light and dark appearance, a notification bell 🔔 showing unread alerts, and your name and role.
- **Notification bell:** Select it to see recent alerts in a pop-up list. An empty list shows *"No notifications"*.

## 2.5 Moving Around

- Select any menu item in the sidebar to open that module.
- To return to your home screen, select **Dashboard** at the top of the sidebar.
- Use the **Back** arrow or *Back*-style buttons inside pages (for example, in the admission wizard or a student detail page) to return to the previous list.

## 2.6 Logging Out

Scroll to the bottom of the sidebar and select the red **Logout** button. You are returned to the Login page immediately.

> There is **no confirmation step** when logging out — make sure you have saved any work before logging out. Always log out when using a shared computer.

---

# 3. Dashboards

Each role sees a different dashboard — a single screen summarising the most important information without opening each module.

## 3.1 School Admin Dashboard

Open **Dashboard** in the sidebar. You will see:

- **Welcome banner** with the current **Academic Session**, **Total Students** and **Total Teachers**, plus a **↻ Refresh Dashboard** button to reload the latest figures.
- **Four big summary cards:**
  - *Total Students* — everyone enrolled
  - *New Admissions* — recently admitted students
  - *Enquiries* — admission enquiries received
  - *Pending Fees* — total money still owed (shown in ₹)
- **Today-at-a-glance strip:** today's *Attendance* percentage, *Present Students*, *Absent Students*, *Teachers Present*, *Teachers Absent* and *Total Teachers*.
- **Fee collection boxes:** *Total Collection*, *Pending Fees* and *Today's Collection*.
- **Charts:** monthly fee collection, admission trends, students per class, and teacher/attendance analytics. Selecting the attendance analytics card takes you to the Attendance module.
- **Recent Notices** (latest five) with a **View All** shortcut, or **Create Notice** if none exist yet.
- **Recent Activities** — a running list of who did what, and when.
- **Recent Admissions** table (latest five admissions) with **View All** to open the full Students list.

## 3.2 Teacher Dashboard

Open **Dashboard** in the teacher sidebar. You will see:

- A **"Welcome, {your name}"** banner with quick counts: *Students*, *Classes* and *Attendance* percentage.
- Four stat cards: **Students**, **Attendance**, **Classes**, **Notices**.
- **Quick-action shortcuts:** *Attendance* (take today's attendance), *Marks Entry* (type in marks), *Results* (view class performance), *Report Cards* (download PDFs).
- Charts: **Attendance Trend**, **Class Distribution** (select a slice to see class details) and **Overview of Classes**.
- **Today's Schedule** — your next classes with timings.
- **Recent Notices** from the administration.

## 3.3 Student Dashboard

After logging in, a student sees:

- A **welcome banner** with their photo/initials, class, roll number and email.
- Four key cards: **Attendance** (%), **Present Days**, **Fees Status** (*Paid* or *Pending*) and **Subjects**.
- **Attendance Trend** chart and a **Fees Analytics** chart with totals *Paid ₹…* / *Pending ₹…*.
- Extra tiles such as *Class Rank*, *Assignments*, *Upcoming Exams* and *Attendance Streak*.
- An **Attendance Heatmap** and **Attendance Calendar**.
- **Recent Attendance** (recent days with *present / absent / late*) and **Latest Notices** from school.

## 3.4 Platform Dashboard (Super Admin)

Shows counts across **all schools** on the platform: *Total Schools*, *Total Users*, *Total Teachers*, *Total Students*, *Total Classes*, *Active Schools*, *Suspended Schools*, plus a **Recent Schools** list of the latest five registered schools with their codes and status.

---

# 4. User Roles and Permissions

Only four roles exist in the application. Each person sees only the menu for their role, and trying to open another role's page simply returns you to the Login screen.

## 4.1 Super Admin

**Who:** The organisation that owns the platform.

**Can access:** Dashboard, Schools, Users, Profile.

**Can manage:**
- Register new schools together with each school's admin account.
- Browse all schools and their statistics (users, teachers, students, classes).
- View details of every school and its user list.
- Delete schools (permanent).

**Cannot do (current version):** Suspend/activate a school or edit school details — the school detail page is view-only. The **Users** page is a "coming soon" placeholder.

## 4.2 School Admin

**Who:** Principal, vice-principal, office head or administrative staff of one school.

**Can access:** Academic Session, Dashboard, Students, Teachers, Classes, Attendance, Subjects, Notices, Fees, Timetable, Reports, Profile, Results, Settings, Notifications, Audit Logs, Files, Leave Management.

**Can manage:** Everything about their own school — admissions, student records, teacher records, classes, subjects, attendance records, fee records, timetables, notices, notifications, examination results, school settings, documents, leave approvals, and audit trails.

## 4.3 Teacher

**Who:** Teaching staff of the school.

**Can access:** Dashboard, Students, Attendance, Attendance History, Timetable, Notices, Profile, Marks, Results, Report Cards, Leave Requests, Leave History.

**Can manage:**
- Take and save daily class attendance (with bulk marking).
- Enter and save student marks for tests/exams.
- View class results and top performers (read-only).
- Download student report cards as PDF.
- View their teaching timetable, students and notices (read-only).
- Apply for leave and track its approval status.
- Update their own profile, photo and password.

**Cannot do:** Add/edit/delete students, create notices, publish results, or approve leaves.

## 4.4 Student

**Who:** Enrolled students.

**Can access:** Student Dashboard, Student Profile, Student Attendance, Student Fees, Student Notices, Student Timetable, Student Subjects, Student Results, Leave Management.

**Can manage:**
- View their attendance, fees, timetable, subjects and published results.
- Pay pending fees through the fee screen and print receipts.
- Download their timetable and report card as PDF.
- Apply for leave and track approval status.
- Update their own profile, photo and password.

---

# 5. Modules

This section explains every menu item, organised by role.

---

## 5A. Platform Administration (Super Admin)

### Schools

**What is it?** The register of every school on the platform.

**How to get there:** Sidebar → **Schools**.

**What you can do:**

- See every school with its name, code, email, phone, status (*Active* shown green, other values red) and counts of Users, Teachers, Students and Classes.
- Search for a school using the box *"Search by school name, code, or email..."*
- Open a school's detail page with the **view (eye)** or **edit (pencil)** icon.
- Delete a school with the **trash** icon. A warning appears: *"Are you sure you want to delete this school? This action cannot be undone."* Select **OK** to permanently remove the school, or cancel to keep it.

#### Adding a New School

1. Open **Schools** and select **+ Add School**.
2. Under **School Information**, fill in:
   - **School Name** *(required)*
   - **School Code** *(required — this is the code staff will type at login, e.g. DPS001)*
   - **Email** *(required)* and **Phone** *(required)*
   - **Address, City, State, Principal Name** *(optional)*
3. Under **Admin Account**, create the login for the school's administrator:
   - **Admin Name** *(required)*
   - **Admin Email** *(required)*
   - **Admin Password** *(required)*
4. Select **Create School** (shows *Creating...* while saving) or **Cancel** to go back.

**What happens after saving:** You are returned to the Schools list, where the new school appears. Share the School Code and admin credentials with the school — the administrator logs in with the admin email + password + school code. If the code is already used, a message appears: *"School code already exists"* — choose a different code.

### School Detail Page

Selecting a school opens its detail page (read-only):

- Stat cards: **Total Users**, **Teachers**, **Students**, **Classes**.
- **School Information:** name, email, phone, address and status.
- **Users list:** every account belonging to the school with its role shown as a badge (Admin / Teacher / Student).
- **← Back to Schools** returns to the list.

> Editing or suspending schools could not be confirmed from the current application — this page is view-only.

### Users

Sidebar → **Users** shows the **Platform Users** page. In the current version it displays the message *"Platform-wide user management coming soon"*. No user actions are available here yet.

---

## 5B. School Administration Modules

*(All of the following are found in the School Admin sidebar.)*

### 5B.1 Academic Session

**What is it?** Where you define the school years (e.g. 2026-2027) that other records belong to.

**How to get there:** Sidebar → **Academic Session**.

#### Creating a Session

1. Type the session name (e.g. `2026-2027`).
2. Pick the **start date** and **end date**.
3. Select **Create Session**. A confirmation appears: *Session created*.

#### Managing Sessions

The **Session Records** table lists every session with its start/end dates and status. For each row:

- **Activate** — makes that session the active one (only one session is active at a time). Confirmation: *Session activated*.
- **Delete** — a browser pop-up asks *"Delete session?"*. Confirm to remove it (*Session deleted*).

> Set up the academic session **before** admitting students, so records belong to the correct year.

### 5B.2 Students

**What is it?** The master list of every student, with profiles, search, editing and deletion.

**How to get there:** Sidebar → **Students**.

**What you see:**

- Summary cards: *Total Students*, *Active Classes* and other counters.
- Quick filter chips: **All Students**, **Active**, **New Admission**, **Pending Fees**. *(These chips are display-only in the current version — selecting them does not filter the list.)*
- Search box: *"Search by student name..."*
- Class filter dropdown starting with **All Classes**.
- The **Student List** table with columns: **Student**, **Admission No**, **Class**, **Roll No**, **Gender**, **Guardian**, **Status**, **Actions**.
- Page controls: *"Page X of Y"* with **Prev**, page numbers and **Next** (10 students per page).

If nothing matches, the table shows *"No Students Found"*.

#### Row actions (three small buttons)

| Icon | Action |
|---|---|
| 👁 Eye | **View** — opens the full *Student Profile* panel (details below) |
| ✏️ Pencil (blue) | **Edit** — opens the *Edit Student* form (same wizard steps as admission) |
| 🗑 Bin (red) | **Delete** — asks *"Are you sure you want to delete this student? This action cannot be undone."* Select **Cancel** or **Delete** |

#### Viewing a Student (Student Profile panel)

The view panel shows the complete record, grouped into sections:

- **Academic Information** — Academic Session, Admission Number, Admission Date, Class, Section, Medium, House, Transport, Hostel, RTE.
- **Student Information** — Full Name, Gender, Date of Birth, Age, Aadhaar Number, PEN Number, APAAR ID, Religion, Category, Caste, Nationality, Blood Group, Disability, Height, Weight.
- **Contact Information** — Email Address, Mobile Number, Alternate Number, Emergency Contact.
- **Address** — Permanent Address, Local Address, Village / City, District, State, PIN Code.
- **Parents & Guardian Information** — Father Name/Mobile/Occupation/Qualification, Mother details, Guardian Name/Mobile/Relation, WhatsApp.
- **Bank Account Details** — Account Number, Account Holder, Bank Name, Branch, IFSC Code.
- **School Facilities** — Transport, Hostel, RTE (YES/NO), Scholarship.
- **Previous Academic Record** — Previous School, Previous Class, Session, Percentage / Grade.
- **Uploaded Documents** — Student Aadhaar, Birth Certificate, Transfer Certificate, Passport Photo (each shows *Uploaded* or *Not Uploaded*).
- **Student Analytics** — sample figures for attendance, CGPA, pending fees and achievements.

Buttons at the bottom: **Edit Student**, **Print Profile** (opens your browser's print window — allow pop-ups if blocked) and **Close**.

#### Deleting a Student

1. Select the red bin icon on the student's row.
2. Read the confirmation: *"Delete Student — Are you sure you want to delete this student? This action cannot be undone."*
3. Select **Delete** (shows *Deleting...*). Confirmation message: *Student deleted successfully*.

Deletion is permanent — the student disappears from all lists.

### 5B.3 New Student Admission (Add Student)

**What is it?** A 10-step guided wizard that collects everything needed to enrol a student.

**How to get there:** Sidebar → **Students** → **+ Add Student** (top right).

A progress panel on the left shows all ten steps and marks each one *Currently Editing*, *Completed ✓* or *Pending*:

1. **Academic**
2. **Student**
3. **Parents**
4. **Address**
5. **Bank Details**
6. **Previous School**
7. **Facilities**
8. **Documents**
9. **Notes**
10. **Review**

Use **Next** to move forward (the system checks required fields first), **Previous** to go back, and **Cancel** to abandon the entry.

> **Before you start, have ready:** the student's birth certificate and photo files, parents' names and mobile numbers, address, previous school details (if transferring), and bank details (optional).

#### Step 1 — Academic Information

| Field | What should be entered? |
|---|---|
| Admission Number | Left blank — *"Auto-generated on submission"* |
| Admission Date * | The date the student joins |
| Academic Session * | Select the session, e.g. 2026-2027 |
| Admission Type | New / Transfer / Re-Admission |
| Medium | English / Hindi / Kannada |
| Admission Status | Active / Inactive / Transferred (default Active) |
| Current Class * | Select from your school's class list |
| Section * | Sections appear after choosing the class |
| Roll Number | Auto-generated based on class and section |
| House | Red / Blue / Green / Yellow |
| Board | CBSE / ICSE / State Board / IB |
| Stream | Science / Commerce / Arts |

Fields marked \* must be filled before **Next** works. Messages shown: *Admission Date is required*, *Academic Session is required*, *Class is required*, *Section is required*, *Roll Number is required*.

#### Step 2 — Student Information

| Field | Required? | Notes |
|---|---|---|
| Student Name * | Yes | Full name |
| Email * | Yes | Student/guardian email |
| Mobile Number | Optional | Contact number |
| Date of Birth * | Yes | Date picker |
| Gender * | Yes | Male / Female / Other |
| Blood Group | Optional | A+, A-, B+, B-, O+, O-, AB+, AB-, |
| Religion | Optional | Hindu, Muslim, Christian, Sikh, Buddhist, Jain, Other |
| Category | Optional | General, OBC, SC, ST, EWS |
| Caste / Nationality / Birth Place / Mother Tongue | Optional | Typed text (Nationality defaults to Indian) |
| Aadhaar Number / PEN Number / APAAR ID | Optional | Government IDs |

Required-field messages: *Student Name is required*, *Email is required*, *Gender is required*, *Date of Birth is required*.

#### Step 3 — Parent / Guardian Details

| Field | Required? |
|---|---|
| Primary Contact | Choose Father / Mother / Guardian (label of the name field changes accordingly) |
| {Father/Mother/Guardian} Name * | Yes |
| Relationship | Father, Mother, Brother, Sister, Grandfather, Grandmother, Uncle, Aunt, Guardian |
| Mobile Number * | Yes — 10-digit number |
| Email / Qualification / Occupation | Optional |

Required-field messages: *Guardian Name is required*, *Guardian Phone is required*.

#### Step 4 — Address Details

Enter **Current Address** (address line, city, state, country, pincode). Tick *"Permanent Address is same as Current Address"* (already ticked) or untick it to enter a separate permanent address.

#### Step 5 — Bank Details *(optional)*

Account Holder Name, Account Number, Bank Name, Branch Name, IFSC Code (typed in capitals automatically).

#### Step 6 — Previous School Details *(optional)*

School Name, Board, Medium, Last Studied Class, Academic Session, Transfer Certificate No., Percentage / CGPA, Reason For Leaving.

#### Step 7 — School Facilities *(optional)*

Three tick-boxes that unlock extra choices:

- **Transport Required** → choose Route and Pickup Stop.
- **Hostel Required** → choose Hostel Block and Room.
- **Eligible under RTE Quota** → choose Document Status (NA / Pending / Verified / Rejected).

#### Step 8 — Documents Upload

Upload up to six documents (PDF, JPG or PNG):

| Document | Mandatory |
|---|---|
| Student Photo * | Yes |
| Birth Certificate * | Yes |
| Guardian Photo / Aadhaar Card / Transfer Certificate / Previous Marksheet | Optional |

After choosing a file its name appears in green.

#### Step 9 — Notes & Remarks *(optional)*

Future Goal and Admission Remarks. These notes are visible only to school administrators and staff.

#### Step 10 — Review Admission

All entered information is summarised section-by-section (bank account numbers are partially hidden). Scroll through and verify, then select **Complete Admission** (shows *Saving...*).

**What happens after saving:**

- Confirmation message: ***"Student admitted successfully"***
- The **Admission Number** is generated automatically and appears in the Students list.
- You return to the Students page where the new student is listed with status **Active**.

To fix mistakes afterwards, use the pencil (edit) icon on the student's row.

### 5B.4 Teachers

**What is it?** The staff directory — teacher profiles, subjects taught, experience and assigned classes.

**How to get there:** Sidebar → **Teachers**.

**What you see:** stat cards (*Total Teachers*, *Subjects Covered*, *Senior Faculty*, *Avg Experience*), a search box *"Search by teacher name or email..."*, a subject filter (**All Subjects**) and the **Teacher Directory** table: **Teacher** (with ID), **Email**, **Phone**, **Subject**, **Experience**, **Classes**, **Created By**, **Joined**, **Actions** (edit pencil / delete bin). Five teachers per page.

#### Adding a Teacher

1. Select **+ Add Teacher**.
2. Fill in the **Add Teacher** form:
   - **Teacher Name** *(required)*
   - **Email** *(required)*
   - **Phone** *(optional)*
   - **Subject** *(optional — main subject taught, e.g. Mathematics)*
   - **Experience** *(years)*
   - **Assigned Classes** — tick the class-sections this teacher teaches (e.g. *Grade 10 A*). If no classes exist yet you'll see *"No classes found"* — create classes first (see 5B.5).
3. Select **Add Teacher** (shows *Saving...*). Confirmation: *Teacher added successfully*.

#### Editing / Deleting

- **Pencil icon** opens *Edit Teacher* — update name, email, phone, subject, experience and assigned classes, then **Update Teacher**. Confirmation: *Teacher updated successfully*.
- **Bin icon** asks *"Are you sure you want to delete this teacher?"* → **Delete** removes the record permanently (*Teacher deleted successfully*).

### 5B.5 Classes

**What is it?** The list of classes and sections (e.g. *Grade 10 — Section A*) and who teaches each.

**How to get there:** Sidebar → **Classes**.

**What you see:** stat cards (*Total Classes*, *Students*, *Teachers Assigned*, *Avg Students/Class*), a **Students Per Class** bar chart, search box *"Search class..."*, section filter (**All Sections**) and a **Clear Filters** button. Table columns: **Class Name**, **Section**, **Class Teacher**, **Total Students**, **Created By**, **Actions**.

> Tip: one record holds **one class + one section**. For two sections of Grade 10, add *Grade 10 / A* and *Grade 10 / B* separately.

#### Adding a Class

1. Select **+ Add Class**.
2. Enter **Class Name** *(required, e.g. "Grade 10")*, **Section** *(required, e.g. "A")* and choose the **Class Teacher** *(required)*.
3. Select **Create Class**. Confirmation: *Class added successfully*.

#### Editing / Deleting

- Pencil icon → *Edit Class*: rename, change section or reassign the teacher → **Update Class**.
- Bin icon → *"Are you sure you want to delete this class?"* → **Delete**.

Once classes exist, they appear automatically in the admission wizard, subject allocation and timetable screens.

### 5B.6 Subjects

**What is it?** Which subject is taught in which class, and by whom.

**How to get there:** Sidebar → **Subjects**.

**What you see:** stat cards (*Total Subjects*, *Classes*, *Teachers*, *Subjects / Class*), charts (**Subject by Class**, **Teacher Allocation**), search box *"Search Subject..."* (matches name or code), class filter (**All Classes**) and **Clear Filters**. Table columns: **Subject Name**, **Subject Code**, **Class**, **Teacher**, **Created By**, **Actions**.

#### Adding a Subject

1. Select **+ Add Subject**.
2. Enter **Subject Name**, **Subject Code** (e.g. MATH101), select the **Class** and assign the **Teacher**.
3. Select **Add Subject**. Confirmation: *Subject added successfully*.

Editing (pencil) and deletion (bin with confirmation *"Are you sure you want to delete this subject?"*) work the same way as elsewhere.

> Create teachers and classes first — the subject form needs both.

### 5B.7 Attendance

**What is it?** Central attendance records for the whole school, plus a tool to mark a student present/absent/late individually.

**How to get there:** Sidebar → **Attendance**.

**What you see:**

- Five stat cards: **Total Students**, **Present**, **Absent**, **Late**, **Attendance %**.
- Charts: attendance trend over time and class-wise attendance.
- Filters: *"Search Student..."*, **All Classes** dropdown, **All Status** dropdown (*Present / Absent / Late*), a **date picker**, and **Clear Filters**.
- Two action buttons: **+ Mark Attendance** and **Export CSV**.
- The records table: **Student**, **Roll Number**, **Class**, **Date**, **Status** (green/red/yellow pill), **Marked By** — 10 rows per page.

#### Marking Attendance (single student)

1. Select **+ Mark Attendance**.
2. Pick the student from **Select Student** (names show roll numbers too). Their class fills in automatically.
3. Choose the **Date** (defaults to today).
4. Choose the status: **Present** (default), **Absent** or **Late**.
5. Select **Mark Attendance**. Confirmation: *Attendance marked successfully*.

> The admin screen marks **one student at a time**. For a whole classroom at once, teachers use their own Attendance screen (section 5C.3), which supports bulk marking.

#### Exporting Records

Select **Export CSV** to download an Excel-compatible file (`attendance-….csv`) containing Student, RollNumber, Class, Date, Status and MarkedBy for whatever is on screen. If nothing matches the filters you'll see *"No records available to export"*.

### 5B.8 Notices

**What is it?** Announcements shown to students and/or teachers in their portals.

**How to get there:** Sidebar → **Notices**.

**What you see:** stat cards (*Total Notices*, *Public Notices*, *Student Notices*, *Teacher Notices*), quick trackers (*Latest Notice*, *Active Notices*, …), search box *"Search notice..."* and an audience filter (**All Audience** / **Students** / **Teachers**). Table columns: **NOTICE**, **AUDIENCE**, **CREATED BY**, **PUBLISHED**, **ACTIONS**.

#### Publishing a Notice

1. Select **+ Add Notice**.
2. In the **Create Notice** form enter:
   - **Notice Title** *(required)*
   - **Target Audience** — *All Audience*, *Students* or *Teachers*
   - **Description** *(required — the full announcement text)*
3. Select **Publish Notice** (shows *Publishing...*). Confirmation: *Notice added successfully*.

The notice immediately appears on the Notice Board of the chosen audience. Notices can be edited (pencil) or removed (bin → *"Are you sure you want to delete this notice?"*).

> Notices here have no attachments, pinning or priority levels — just title, audience and description.

### 5B.9 Fees

**What is it?** Fee records for every student: what is due, for which month, and whether it is paid.

**How to get there:** Sidebar → **Fees**.

**What you see:**

- Money cards: **Total Fees**, **Collected**, **Pending**, **Records** (count).
- Second strip: **Collection Rate** (%), **Paid Records**, **Pending Records**, **Outstanding Amount**.
- Search box *"Search student..."* (matches name **or roll number**) and status filter **All Status / Paid / Pending**.
- Table: **Student**, **Class**, **Fee Type**, **Amount** (₹), **Month**, **Payment Date**, **Status** (*Paid* green / *Pending* red), **Actions**.

#### Adding a Fee Record

1. Select **+ Add Fee**.
2. Fill in the **Add Fee Record** form:
   - **Student** *(required — pick from the list; entries show name • roll number • class)*
   - **Amount** *(required, in ₹)*
   - **Fee Type** — Tuition, Admission, Transport, Exam, Library, Sports or Other
   - **Month** *(required)* and **Year**
   - **Payment Status** — *Pending* (default) or *Paid*
3. Select **Save Fee**. Confirmation: *Fee added successfully*.

#### Updating a Payment

When money is collected, open the record with the pencil icon, change **Payment Status** to **Paid**, and **Update Fee** (*Fee updated successfully*). The **Payment Date** column then reflects the paid record.

Deleting a fee record uses the usual red-bin confirmation (*"Are you sure you want to delete this fee record?"*).

> The admin fee screen tracks records and amounts. Printable receipts are issued from the **student's** fee screen (section 5D.4). Discounts, due-date reminders and payment modes could not be confirmed from the current application.

### 5B.10 Timetable

**What is it?** Class-wise daily schedules: for each class and weekday, which subject happens in which period, taken by which teacher.

**How to get there:** Sidebar → **Timetable**.

**How it works:** One record = one **Class + one Day + a list of periods**. So a class needs one record per weekday (Monday to Saturday). There is no drag-and-drop board — you build each day's periods in a form.

**What you see:** stat cards (*Total Timetables*, *Classes Covered*, *Teachers Assigned*, *Total Periods*), search box *"Search by class..."*, day filter (**All Days**, Monday–Saturday), and the records table: **Class**, **Day**, **Periods** (each showing time range, subject and teacher), **Period Count**, **Created By**, **Created At**, **Actions**.

#### Creating a Day's Timetable

1. Select **+ Add Timetable**.
2. Choose the **Class** and the **Day**.
3. Under **Class Periods**, select **+ Add Period** for each period of the day. For every period enter:
   - **Start Time** and **End Time** *(both required)*
   - **Subject** *(required)*
   - **Teacher** *(required)*
4. Remove a mistake with the bin icon beside that period.
5. Select **Save Timetable**. Confirmation: *Timetable created successfully*.

Repeat for the remaining days of the week.

#### Maintaining Timetables

- Pencil icon → **Edit Timetable**: adjust times, swap subjects/teachers, add or remove periods → **Update Timetable**.
- Bin icon → *"Are you sure you want to delete this timetable record?"* → **Delete** removes that class-day schedule.

> The application does not warn about double-booked teachers on this screen; check assignments carefully when scheduling.

### 5B.11 Reports

**What is it?** One consolidated analytics page for the school. See [Section 10 — Reports](#10-reports) for details.

**How to get there:** Sidebar → **Reports**.

### 5B.12 Results

**What is it?** Exam results per student: marks subject-by-subject, with automatic percentage, grade and pass/fail calculation, and publishing so students can see them.

**How to get there:** Sidebar → **Results**.

**What you see:** stat cards (*Total Results*, *Published*, *Draft*, *Pass Rate*), three filter boxes (*"Search Student..."*, *"Filter by Class..."*, *"Filter by Exam..."*) and the **Examination Results** table: **Student**, **Exam**, **Class**, **Percentage**, **Grade** (purple pill), **Status** (*Pass* green / fail red), **Published** (*Published* green / *Draft* yellow), **Actions**.

#### Creating a Result

1. Select **+ Create Result**.
2. Choose the **Student** (entries show name • roll number).
3. Type the **Exam Name** (e.g. *Mid Term*, *Final Exam*) and the **Class Name** (e.g. *Class 10-A*).
4. Under **Subjects & Marks Evaluation**, select **+ Add Subject** for each subject and enter:
   - **Subject** (from your Subjects list)
   - **Obtained** marks
   - **Max Marks** (pre-filled at 100 — change if needed)
5. Select **Save Result**.

The record is saved as a **Draft**. Percentages, grades and pass/fail are calculated for you (see the grading scale below).

#### Entering / Correcting Marks

Select **Edit** on a result row. The **Subject Evaluation** table lets you adjust Obtained and Max marks for each subject. As you type, live summary cards update: **Percentage**, **Grade** and **Result Status**. Select **Update Result** to save (*Result updated successfully*).

#### Publishing a Result

Drafts are invisible to students. When you're ready:

1. Select **Publish** on the result row.
2. Confirmation: *Result published successfully*. The badge changes from yellow **Draft** to green **Published**, and the result becomes visible on the student's portal.

> Publishing is immediate (no confirmation dialog) and **cannot be reversed** from the interface — double-check the marks first.

#### Viewing a Result

Select **View** to open the result sheet: student details, summary cards (**Subjects**, **Obtained Marks**, **Total Marks**, **Percentage**), a large **PASS / FAIL** banner, and the **Subject Breakdown** table (subject, code, marks obtained, max marks, grade). Use **Print Result** to print via your browser, or **Close**.

Deleting a result uses the standard confirmation: *"Are you sure you want to delete this result?"*

**Grading scale used by the system:**

| Percentage | Grade |
|---|---|
| 90% and above | A+ |
| 80–89% | A |
| 70–79% | B+ |
| 60–69% | B |
| 50–59% | C |
| 40–49% | D |
| Below 40% | F (Fail) |

Pass = 40% or more overall.

### 5B.13 Notifications

**What is it?** Short alerts pushed to users' notification bell 🔔 (visible at the top of every screen), organised by category and priority.

**How to get there:** Sidebar → **Notifications**.

**What you see:** stat cards (*Total Notices*, *High Priority*, *Last 7 Days*), search box *"Search notices..."*, priority filter (**All Priority** / High / Medium / Low) and the **Notification Center** table.

#### Sending a Notification

1. Select **+ Add Notice**.
2. In **Create Notification** fill in:
   - **Notification Title** *(required)*
   - **Notification Message** *(required)*
   - **Category** — General, Academic, Exam, Fees, Holiday or Emergency
   - **Audience** — All Users, Students, Teachers or Parents
   - **Priority** — Low, Medium or High
   - **Publish Date** and **Expiry Date** *(optional)*
3. Select **Create Notification**. Confirmation: *Notification created successfully*.

Edit with the pencil icon or delete with the bin icon (*"Are you sure you want to permanently delete this notification?"*).

> **Notices vs Notifications:** Use **Notices** for formal announcements pinned to the Notice Board pages; use **Notifications** for short alerts that pop up in the bell.

### 5B.14 Files

**What is it?** A shared storage space for school documents (circulars, forms, scanned certificates, policy PDFs…).

**How to get there:** Sidebar → **Files**.

#### Uploading a File

1. Select **+ Upload File**.
2. Choose the file in the **Upload File** window.
3. Select **Upload** (shows *Uploading...*).

Any file type can be uploaded. The file appears in the **All Files** table with its name, type and upload date.

#### Working with Files

- **Eye icon** — previews the file: images display directly, PDFs open in a built-in viewer, other types offer a **Download File** link.
- **Bin icon** — a browser pop-up asks *"Delete file?"*; confirm to remove it permanently.

### 5B.15 Leave Management

**What is it?** The approval desk for leave applications raised by **students and teachers**.

**How to get there:** Sidebar → **Leave Management**.

**What you see:** stat cards (*Total Requests*, *Pending Requests*, *Approved Requests*, *Rejected Requests*), a **Leave Statistics** bar chart, search box *"Search student or teacher..."*, status filter (**All Requests / Pending / Approved / Rejected**) and the requests table: **User**, **Role**, **Leave Type**, **Dates**, **Duration** ("N Day(s)"), **Status**, **Reason**, **Actions**.

#### Approving or Rejecting Leave

1. Find the pending request (status shown in yellow). Pending rows show green **Approve** and red **Reject** buttons; decided rows show *"Action Completed"*.
2. Select **Approve** or **Reject**.
3. A **Confirm Action** window asks: *"Are you sure you want to approve (or reject) leave request of {name}?"* — select **Confirm** or **Cancel**.
4. The status updates everywhere and the requester sees it in their own leave history.

#### Reading the Reason

Select the blue **View** link in the Reason column to open **Leave Details**: applicant, role, leave type, from/to dates, total days, applied date, current status and the full written reason.

### 5B.16 Audit Logs

**What is it?** An automatic diary of who did what in the system — useful for accountability.

**How to get there:** Sidebar → **Audit Logs**.

**What you see:** *Today's Activities* counter, stat cards (*Total Activities*, *Create Actions*, *Update Actions*, *Delete Actions*), and filters: *"Search..."* box, **Module** dropdown (All Modules, Students, Teachers, Classes, Attendance, Subjects, Fees, Timetable, Notifications) and **Action** dropdown (All Actions, CREATE, UPDATE, DELETE, LOGIN).

The **Activity Logs** table shows: **#**, **Date & Time**, **User** (+ role), **Module**, **Action** (colour-coded) and **Details**. Ten rows per page. Logs are read-only and cannot be edited or deleted.

---

## 5C. Teacher Portal

### 5C.1 Students

**What is it?** The list of students a teacher can view, with quick access to each child's profile and attendance.

**How to get there:** Sidebar → **Students**.

- Search box: *"Search by name, roll no, class or email..."*
- Table **Students List**: **Student**, **Roll No**, **Class**, **Email**, **Actions**.
- Two buttons per student:
  - **Profile** — opens a read-only **Student Profile** window (Name, Roll, Class, Email, Phone).
  - **Attendance** — opens that student's full attendance record (next section).

### 5C.2 A Student's Attendance (view)

Opens from **Students → Attendance**. Shows the student's photo/details, summary cards (**Attendance** %, **Present**, **Absent**, **Late**) and an **Attendance History** table (Date, Day, Status pill). Use **← Back** to return. This page is strictly read-only.

### 5C.3 Taking Daily Attendance

**How to get there:** Sidebar → **Attendance**.

1. Choose the class from **Select Class** (options look like *ClassName - Section*). If the class has no students you'll see *"No students found — No students are assigned to this class yet."*
2. Check the **Attendance Date** (defaults to today; past dates can be selected).
3. Every student starts marked **Present**. Adjust anyone using the buttons on their row:
   - **P** = Present (green)
   - **A** = Absent (red)
   - **L** = Late (yellow)
4. Or use the bulk buttons: **Mark All Present**, **Mark All Absent**, **Mark All Late**.
5. Watch the **Attendance Progress** bar (e.g. 34/35 marked).
6. Select **Save Attendance**. Confirmation: *Attendance saved successfully*.

Stat cards above the list (*Total Students, Present, Absent, Late*) update live as you mark.

### 5C.4 Attendance History

Sidebar → **Attendance History** lists saved attendance records (Student, Status, Date) so teachers can review past days.

### 5C.5 Timetable

Sidebar → **Timetable** shows **My Timetable** — the teacher's personal weekly schedule, Monday–Saturday, with each period's class, subject and timing. Until administration publishes schedules it shows *"No Timetable Assigned — Your schedule will appear here once assigned by administration."* Read-only.

### 5C.6 Notices

Sidebar → **Notices** lists announcements from administration (title, date, full text, posted-by). Teachers receive notices addressed to **Teachers** or **All Audience**. Search by title with *"Search notices..."*. Read-only — only administrators can publish notices.

### 5C.7 Marks

**What is it?** Where teachers type test/exam marks for their class and subject.

**How to get there:** Sidebar → **Marks**.

1. Select the **Class**, **Subject** and **Exam** from the three dropdowns (e.g. Class 10A, Mathematics, Mid Term).
2. The **Student Marks Register** loads with all students and previously saved marks.
3. Type each student's score in the **Marks** box (0–100).
4. Grades and Pass/Fail are calculated automatically as you type (pass mark 35):
   - 90+ = A+, 80+ = A, 70+ = B, 60+ = C, 40+ = D, below 40 = F.
5. Optionally find a student quickly with *"Search Student..."*.
6. Select **Save Marks** (shows *Saving...*). Confirmation: *Marks saved successfully*.

If you press Save without picking class, subject and exam, a reminder appears: *"Please select Class, Subject and Exam Type"*.

> The toolbar buttons *Download Template*, *Upload Excel* and *Import Previous Exam* are display-only in the current version — marks are typed in directly.

### 5C.8 Results

Sidebar → **Results** shows **Results & Analytics** for a chosen class (read-only): average marks, pass/fail percentages, **Pass vs Fail** chart, **Subject Performance** averages, a **Top Performers** table (🏆 rank, student, roll no, percentage) and **Subject Analytics**. Publishing results is done by the administration.

### 5C.9 Report Cards

**How to get there:** Sidebar → **Report Cards**.

1. Choose the class from the dropdown.
2. The **Student Report Cards** list appears (every student shows status *Ready*).
3. Select **Download PDF** on a student's row — the report card downloads as `{StudentName}-report-card.pdf`.

> The *Preview* and *Download All PDFs* buttons are display-only in the current version.

### 5C.10 Leave Requests

**How to get there:** Sidebar → **Leave Management**.

**Applying for leave:**

1. Under **Apply Leave Request**, choose the **Leave Type**: Sick Leave, Casual Leave, Emergency or Other.
2. Pick the **From** and **To** dates.
3. Write the **Reason**.
4. Select **Submit Leave** (shows *Submitting...*). Confirmation: *Leave request submitted successfully*.

Rules enforced: *"Please fill all fields"* if anything is missing; *"To Date cannot be earlier than From Date"* if the dates are reversed.

**Tracking:** The same page shows your **Leave History** — every request with its type, dates, reason and status badge (*pending* yellow, *approved* green, *rejected* red). Submitted requests cannot be edited or cancelled; contact administration for changes.

### 5C.11 Profile

Sidebar → **Profile**. Update your **photo** (camera icon), name, phone, subject and address, then **Save Profile**. Your email cannot be changed here. Change your password any time under **Change Password** (Old Password + New Password → *Change Password*).

---

## 5D. Student Portal

### 5D.1 My Profile

Sidebar → **Student Profile**. Update your photo (camera icon), name, email, class and roll number; review **Parents Information** (Father Name, Mother Name, Guardian Phone) and your **Address**. Select **Save Profile** to store changes. Change passwords under **Change Password**.

### 5D.2 My Attendance

Sidebar → **Student Attendance**.

- Filter with **This Month / Last 3 Months / This Year**.
- Summary cards: **Attendance Rate**, **Present**, **Absent**, **Late**.
- Visual aids: an attendance ring, **Monthly Attendance Trend** line chart, month **calendar** (select a day to see its status) and a 6-month heatmap.
- **Attendance History** table lists every day: Date, Day, Month, Status (*Present* green / *Absent* red / *Late* yellow).

### 5D.3 My Timetable

Sidebar → **Student Timetable** shows your class's weekly schedule.

- Switch between **Weekly View** (grid: time slots × Monday–Saturday; empty slots show *Free Period*) and **Calendar View** (colour-coded cards with room numbers and lunch break).
- Select **Print** for a paper copy or **Download PDF** to save `Class-{YourClass}-Timetable.pdf`.

If the school hasn't published it yet you'll see *"No Timetable Available — Timetable has not been published yet."*

### 5D.4 My Subjects

Sidebar → **Student Subjects** shows each subject card (name, code, class, teacher). Select **View Details** to see subject code, teacher contact, your attendance in that subject and any downloadable resources (**Download** links). **View Teacher** opens the teacher's profile card.

### 5D.5 Checking and Paying Fees

Sidebar → **Student Fees**.

**Checking dues:**

- Cards show **Total Fees**, **Paid**, **Pending** and **Paid %**, plus a monthly trend chart.
- The **Fee Ledger** lists every fee: Month, Fee Type, Amount (₹), Status (*Paid*/​*Pending*), Payment Date.
- Search with *"Search fees..."* or filter by status.

**Paying a pending fee:**

1. Select **Pay Now** on the pending row.
2. The **Fee Payment** screen confirms the Amount, Type and Month.
3. Select **Pay Now** (shows *Processing...*).
4. A *"Payment Successful"* message appears and the fee is marked paid.

**Getting a receipt:** on paid rows select **View Receipt** to open a receipt window with student, month, type, amount, status and date — select **Print** for a hard copy.

> Payments made through the app are recorded as cash payments at the school counter; the screen confirms and records them rather than charging a card online.

### 5D.6 My Results

Sidebar → **Student Results** lists every **published** exam result:

- Summary tiles: *Total Exams*, *Average Score*, *Passed Exams*, *Highest Score*, *Overall Grade*.
- Each result card shows the exam name, class, obtained/total marks, percentage, colour-coded grade, a subject-wise marks table, and *Status: Pass/Fail*.
- Select **View Report Card** for the full formatted report card, then **Download PDF** to save `{YourName}-report-card.pdf`.

Unpublished (draft) results never appear here.

### 5D.7 Applying for Leave

Sidebar → **Leave Management**.

1. Under **Apply Leave**, pick the type: Sick Leave (default), Casual Leave, Emergency or Other.
2. Choose **From** and **To** dates.
3. Write the reason in *"Reason for leave..."*.
4. Select **Apply Leave** (shows *Submitting...*). Confirmation: *Leave applied successfully*.

Your **Leave History** table below shows every request (Type, From, Days, To, Reason, Status — *approved* green / *rejected* red / waiting yellow). Applications cannot be withdrawn from the app; speak to the office.

### 5D.8 Notices

Sidebar → **Student Notices** shows the **Notice Board**: all notices addressed to you, with priority tags (*High* red / *Normal* blue), posting date and publisher. Search with *"Search notices..."*.

---

# 6. Common Workflows

End-to-end recipes for the tasks offices perform most.

## 6.1 Setting Up a New School Year

1. **Academic Session** → create the session (e.g. 2026-2027) and **Activate** it.
2. **Classes** → add every class-section combination and assign class teachers.
3. **Teachers** → add staff and tick their **Assigned Classes**.
4. **Subjects** → map each subject to its class and teacher.
5. **Timetable** → create one record per class per day, adding each period with start/end time, subject and teacher.
6. **Settings** → confirm the school name, logo, contact details and academic year.

## 6.2 Admitting a New Student

1. Collect documents: photo, birth certificate, previous school record, ID copies.
2. **Students** → **+ Add Student**.
3. Complete the ten wizard steps (Academic → Student → Parents → Address → Bank → Previous School → Facilities → Documents → Notes → Review).
4. Verify everything on the **Review** step and select **Complete Admission**.
5. The system generates the **Admission Number** and roll number; the student appears in the Students list as *Active*.
6. **Fees** → add the applicable fee records for the student (amount, type, month/year).
7. The student can now log in (if an account was created for them) and view their profile, timetable and notices.

## 6.3 Recording Daily Attendance

**Teacher route (whole class):**

1. **Attendance** → select class → confirm the date.
2. Set any exceptions with **A** / **L** (everyone defaults to Present) or use **Mark All …** buttons.
3. **Save Attendance**.

**Office route (individual corrections):**

1. **Attendance** (admin) → **+ Mark Attendance** → choose student, date and status → **Mark Attendance**.

Parents/students see the updated record immediately on the student portal.

## 6.4 Collecting Fees

1. At term start, **Fees** → **+ Add Fee** for each student's dues (or update existing records).
2. When a family pays, either:
   - Office: open the record → set **Payment Status** to **Paid** → **Update Fee**; or
   - Student/parent at the counter or portal: **Student Fees → Pay Now** on the pending row.
3. Verify collection on the dashboard (*Collected*, *Pending*, *Collection Rate*) or the Fees page cards.
4. Students download receipts themselves via **View Receipt → Print**.

## 6.5 Conducting Exams and Declaring Results

1. **Teachers** enter marks: **Marks** → choose class, subject, exam → type scores → **Save Marks**.
2. **Administration** records official results: **Results** → **+ Create Result** → pick the student → enter exam name, class and subject-wise marks → **Save Result** (saved as **Draft**).
3. Verify each draft with **View**; correct anything with **Edit**.
4. Publish: select **Publish** on the row — students instantly see the result in their portal.
5. **Teachers** download printed report cards: **Report Cards** → choose class → **Download PDF** per student.

## 6.6 Handling Leave Applications

1. Teacher/student submits leave from their portal (**Leave Management** → apply form).
2. Admin opens **Leave Management**, reviews the reason (**View**) and checks the calendar impact.
3. Select **Approve** or **Reject** → **Confirm**.
4. The requester sees the decision in their leave history immediately.

## 6.7 Communicating with School

1. Formal announcements → **Notices** → **+ Add Notice** → choose audience → **Publish Notice**.
2. Instant bell alerts → **Notifications** → **+ Add Notice** → choose category, audience and priority → **Create Notification**.
3. Everyone sees notices on their Notice Board page; bell alerts appear on the 🔔 icon at the top.

---

# 7. Forms and Fields Reference

Quick reference for the most-used forms.

### Add/Edit Teacher

| Field | What should be entered? |
|---|---|
| Teacher Name | Full name *(required)* |
| Email | Staff email address *(required)* |
| Phone | Contact number |
| Subject | Main subject taught |
| Experience (Years) | Teaching experience in years |
| Assigned Classes | Tick every class-section taught |

### Add Class

| Field | What should be entered? |
|---|---|
| Class Name | e.g. "Grade 10" *(required)* |
| Section | e.g. "A" *(required)* |
| Class Teacher | Pick from the teacher list *(required)* |

### Add Subject

| Field | What should be entered? |
|---|---|
| Subject Name | e.g. "Mathematics" *(required)* |
| Subject Code | Short code, e.g. "MATH101" *(required)* |
| Class | Which class studies it *(required)* |
| Teacher | Who teaches it *(required)* |

### Add Fee Record

| Field | What should be entered? |
|---|---|
| Student | Pick the student (name • roll • class shown) *(required)* |
| Amount | Fee amount in ₹ *(required)* |
| Fee Type | Tuition / Admission / Transport / Exam / Library / Sports / Other |
| Month & Year | Which month the fee belongs to *(month required)* |
| Payment Status | Pending (default) or Paid |

### Create Notice / Create Notification

See sections 5B.8 and 5B.9 for the full field tables.

### Apply Leave (teachers and students)

| Field | What should be entered? |
|---|---|
| Leave Type | Sick Leave / Casual Leave / Emergency / Other |
| From / To Dates | First and last day of leave (To cannot be before From) |
| Reason | Brief explanation for the office |

---

# 8. Search, Filter and Sorting

Almost every list follows the same pattern:

**Searching**

1. Click the search box at the top of the list.
2. Type part of a name (or roll number / email / class, depending on the page — the placeholder text tells you what it matches).
3. The list narrows as you type. Clear the box to see everything again.

**Filtering**

- Dropdown filters narrow by category: class, section, status, day, audience, module or action.
- Combine a search word with filters to zoom in further.
- Pages with a **Clear Filters** button (Classes, Subjects, Attendance) reset every filter at once; on other pages, resetting the dropdowns/search box manually does the same.

**Finding specific people quickly**

| Looking for… | Go to | Search matches |
|---|---|---|
| A student (office) | Students | Student name |
| A student's fees | Fees | Name or roll number |
| A teacher | Teachers | Name or email |
| A subject | Subjects | Subject name or code |
| A class | Classes | Class name, section or teacher name |
| An attendance record | Attendance | Student name (+ class/status/date filters) |
| A notice | Notices / Notifications | Title or description |
| A leave request | Leave Management | Applicant name |

**Sorting/paging:** Lists show a fixed number of rows per page (usually 5–10) with **Prev / Previous**, page-number and **Next / following-page** controls, plus counters like *"Showing X to Y of Z records"*. Move through pages to browse longer lists; sorting by column headers could not be confirmed from the current application.

---

# 9. Validation and Error Messages

Messages you may meet and how to respond.

**Message:** *Please fill all fields*
**Where:** Login, Signup, Leave forms
**Meaning:** One or more required boxes are empty.
**What to do:** Complete every required field and try again.

**Message:** *Password must be at least 6 characters*
**Where:** Signup
**What to do:** Choose a password of 6 or more characters.

**Message:** *Login failed*
**Where:** Login
**Meaning:** The email/password/school-code combination wasn't accepted.
**What to do:** Re-check all three entries; ask the administrator if the problem continues.

**Message:** *Admission Date is required* / *Academic Session is required* / *Class is required* / *Section is required* / *Roll Number is required*
**Where:** Admission wizard, Step 1
**What to do:** Fill the highlighted field, then select **Next**.

**Message:** *Student Name is required* / *Email is required* / *Gender is required* / *Date of Birth is required*
**Where:** Admission wizard, Step 2
**What to do:** Complete these basics of the student's identity before continuing.

**Message:** *Guardian Name is required* / *Guardian Phone is required*
**Where:** Admission wizard, Step 3
**What to do:** Enter the primary guardian's name and mobile number.

**Message:** *Please select Class, Subject and Exam Type*
**Where:** Teacher Marks entry
**What to do:** Choose all three dropdowns before loading/saving marks.

**Message:** *To Date cannot be earlier than From Date*
**Where:** Teacher leave form
**What to do:** Correct the date order.

**Message:** *No records available to export*
**Where:** Attendance export
**Meaning:** The current filters match nothing.
**What to do:** Widen or clear the filters, then export again.

**Message:** *School code already exists*
**Where:** Super Admin creating a school
**What to do:** Choose a different, unique school code.

**Message:** *"…cannot be undone"*
**Where:** Every delete confirmation (students, teachers, classes, subjects, notices, fees, timetables, results, files, schools)
**Meaning:** Deletion is permanent.
**What to do:** Pause and verify you've selected the right record before confirming **Delete**.

**Browser prompts like "Please fill out this field"**
**Meaning:** A required box in forms like Add Teacher / Add Class / Add Subject was skipped.
**What to do:** Fill the highlighted box and submit again.

---

# 10. Reports

The school-wide reporting centre lives at Sidebar → **Reports** (*"Reports & Analytics"*). It is one fixed overview page rather than a set of selectable reports.

### What's on it

| Block | Information shown |
|---|---|
| Six stat cards | **Students**, **Teachers**, **Classes**, **Subjects**, **Total Revenue** (₹), **Collected Revenue** (₹) |
| Attendance chart | Split of all attendance records: *Present*, *Absent*, *Late* |
| Fee collection chart | Money *Paid* vs *Pending* |
| **Class Summary** table | Each class with its student count and strength badge: **High Strength** (>20 students), **Medium Strength** (>10), **Low Strength** (10 or fewer) |
| Bottom cards | **Attendance Records** (total count), **Paid Fees**, **Pending Fees** |

### Filters and exports

There are no date-range or class filters on this page — it reflects the entire school at once. **Export PDF** and **Export Excel** buttons appear in the header but are display-only in the current version; to produce a file today, use the browser's own print function (Ctrl/Cmd + P) or the **Export CSV** button available inside the Attendance module.

### Other places data is reported/downloaded

| Need | Where |
|---|---|
| Attendance spreadsheet | Attendance → **Export CSV** |
| Individual result sheet | Results → **View** → **Print Result** |
| Student report cards (PDF) | Teacher portal → **Report Cards** → **Download PDF** |
| Student's own report card (PDF) | Student portal → Results → **Download PDF** |
| Class timetable (PDF/print) | Student portal → Timetable → **Print** / **Download PDF** |
| Student profile (print) | Students → eye icon → **Print Profile** |
| Fee receipt (print) | Student portal → Fees → **View Receipt** → **Print** |
| Activity trail | Audit Logs (on-screen, filterable) |

---

# 11. Settings

Sidebar → **Settings** (School Admin only).

### Your School Code

A large card shows **Your School Code** with a **Copy Code** button (it flashes *"Copied!"* and confirms *"School code copied!"*). Share this code with teachers and students — they must type it on the login screen along with their email and password.

### School Details Form

| Field | What should be entered? |
|---|---|
| School Logo URL | Paste a web address (https://…) pointing to your logo image — it previews as you paste |
| School Name | Official school name |
| Principal Name | Head of the school |
| Email | Official contact email |
| Phone | Official contact number |
| Academic Year | e.g. 2026-27 |
| Address | Full postal address |

Select **Save Settings** to store them (*Settings updated successfully*). These details brand the school's presence in the system.

> Grading scales, fee rules and other advanced policies could not be confirmed from the current application — the settings page covers the school code and the details above.

### Personal settings (every user)

Under **Profile**, any signed-in user can update their photo, basic details and password (see 5C.11 / 5D.1).

---

# 12. Frequently Asked Questions

**How do I add a new student?**
Open **Students** → **+ Add Student** → complete the ten guided steps → **Complete Admission**. The admission number is generated for you.

**How do I find a student?**
Open **Students**, type the student's name in *"Search by student name..."*, optionally pick a class, and select the student's row (eye icon) to view the full profile.

**How do I update student information?**
Find the student → select the blue pencil icon → correct the details across the wizard steps → **Update Student**.

**How do I remove a student who left the school?**
Find the student → red bin icon → confirm **Delete**. Removal is permanent.

**How do I take class attendance?**
Teachers: **Attendance** → choose class → adjust P/A/L → **Save Attendance**.
Office corrections: admin **Attendance** → **+ Mark Attendance** → pick student/date/status → **Mark Attendance**.

**How do I record a fee payment?**
Admin: **Fees** → find the record (search by name or roll number) → pencil icon → set status to **Paid** → **Update Fee**. Students can also pay from their portal with **Pay Now**.

**How do I publish exam results?**
**Results** → **+ Create Result** → enter marks → **Save Result** → verify the draft → select **Publish**. Students see it immediately.

**Who prepares report cards?**
Teachers download ready-made PDFs from **Report Cards** → **Download PDF**; students can download their own from their Results page.

**How do I announce a holiday?**
Post a **Notice** (audience: All Audience) and/or send a high-priority **Notification** (category: Holiday).

**How do I approve a leave?**
**Leave Management** → find the pending request → **Approve**/**Reject** → **Confirm**.

**How do I check my school's code?**
**Settings** → the **Your School Code** card → **Copy Code**.

**How do I change my password?**
**Profile** → **Change Password** → enter old and new passwords → **Change Password**.

**How do I log out?**
Red **Logout** button at the bottom of the sidebar. (It logs out immediately, without asking twice.)

**Why did the app send me back to the Login page?**
Either your session ended, or the page you opened belongs to a different role. Log in again and use only your own menu.

---

# 13. Troubleshooting

| Problem | What to do |
|---|---|
| Cannot log in | Make sure **all three** boxes are filled: email, **School Code** and password. Codes are usually capital letters+digits (e.g. DPS001). |
| Forgot my password | Ask your school administrator. The *"Forgot password?"* link is not active in the current version. |
| Signed up but expected a staff account | Self-signup always creates **student** accounts. Ask the administrator to arrange the right account. |
| A form won't save | Look for highlighted boxes or a red message — a required field is missing or invalid. Fix it and save again. |
| Student doesn't appear in search | Check spelling; try fewer letters; make sure the class filter is set to **All Classes**. |
| Class dropdown is empty in the admission wizard | Create the class first under **Classes**, then retry. |
| Section dropdown stays disabled | Pick the class first — sections load based on it. |
| "No classes found" when assigning a teacher | No classes exist yet — add them under **Classes**. |
| Timetable missing for a class/day | The schedule record hasn't been created — add it under **Timetable**. |
| Student says results aren't visible | The result may still be a **Draft**. Publish it from **Results**. |
| Print window didn't open (profile/result) | Your browser blocked pop-ups — allow pop-ups for this site and print again. |
| Export CSV says nothing to export | Clear or widen the attendance filters so at least one record matches. |
| Deleted something by mistake | Deletions are permanent — re-create the record (and inform affected staff/students). |
| Wrong-role page bounced me to Login | That's expected protection. Return to your own dashboard and use your menu. |
| Page looks stuck | Select **↻ Refresh Dashboard** (dashboard) or reload the browser page. |

---

# 14. Known Limitations in the Current Version

For transparency, these controls are visible but not yet active, or absent entirely. Don't rely on them:

- *"Forgot password?"* on the Login page does not perform an action.
- Filter chips on the Students page (**All Students / Active / New Admission / Pending Fees**) are display-only.
- Some dashboard/student tiles show fixed sample figures rather than live data (e.g. *Class Rank #5*, *Best Streak 15 Days*, teacher's *Average Attendance 92%*, subject-card attendance bars, *Present Today*/*Pending Fees* dashes on the Students page).
- Reports page: **Export PDF** / **Export Excel** buttons are display-only.
- Teacher Marks: *Download Template*, *Upload Excel*, *Import Previous Exam* are display-only; class/subject/exam choices come from preset lists.
- Teacher Report Cards: *Preview* and *Download All PDFs* buttons are display-only.
- Admin attendance marking is one student at a time (bulk marking is on the teacher screen).
- Fees: no discounts, due-date reminders or printable receipts from the admin screen (receipts print from the student's fee page).
- Results: publishing cannot be reversed; there is no unpublish button.
- Timetable: no automatic clash warnings for double-booked teachers.
- Audit Logs: view/filter only — no export.
- Super Admin: school detail page is view-only; **Users** page is a "coming soon" placeholder.
- No parent login role exists; guardian information is stored within student records.
- Notices support title, audience and description only (no attachments or pinning).

---

*This guide describes the application as it exists today. Menu names, buttons and messages quoted above match the on-screen text, so you can follow along directly in the system.*
