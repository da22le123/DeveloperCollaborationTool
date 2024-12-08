# Scrum Log

## Sprint 0

### 14.11.2024

Attendees: Jan, Denys, Nestoras, Ilya, Kirill

Topic: Initial setup, deciding on future plans

### 15.11.2024

Attendees: Jan, Denys, Nestoras, Ilya, Yevheniia

Topic: Initial questions for the client, discussing requirements, delegating first administrative tasks

### 18.11.2024

Attendees: Jan, Denys, Ilya, Yevheniia, Kirill

Topic: Compiling questions for the client, talking to the client

### 19.11.2024

Attendees: Jan, Denys, Nestoras, Yevheniia, Kirill

Topic: Discussing requirements from the client, deciding on the technical stack, delegating tasks

### 22.11.2024

Attendees: Jan, Denys, Ilya, Yevheniia, Kirill, Fedor

Topics:

- Welcoming a new team member: Fedor
- Discussing the setup of the project (by Kirill)
- Going through the database design (by Yevheniia)
- Discussing the technical stack for the database (SQLite vs PostgreSQL)
- Reviewing the user and system requirements (by Ilya, Nestoras, and Jan)
- Updated the hour log

### 25.11.2024

Attendees: Jan, Denys, Nestoras, Yevhennia, Kirill, Rokas, Fedor, Ilya

Topic:

- Welcoming a new team member: Rokas
- Yevhennia created DB design, commited and approved.
- Jan, Ilya, Fedor were working on backlog, not finished yet.
- Wireframes finalised by Denys waiting to be approved, worked on documentation
- Kirill reviewed wireframes, DB design

### 29.11.2024

Attendees: Jan, Denys, Ilya, Nestoras, Rokas, Yevheniia, Kirill, Fedor

Topic: Discussion of the work done so far, and new issue assignments among members.

- Denys worked on the backend login functionality, implemented it fully and waits for approval.
- Jan finished the whole backlog, now researches possible technologies that can be used for rendering different kind of
  objects in the document.
- Ilya worked with Jan on the backlog and communicates with client to fully understand what the client needs to be
  built. Will assign a task to himself.
- Rokas will be assigned with his first issue after the meeting.
- Kirill researched gitlab integration, will assign issue to himself after meeting.
- Nestoras works on the frontend part of login.
- Yevheniia worked on the database setup and now waits for approval and fixes possible issues (Issue #47). Her next task
  is researching on webSocket (issue #21).
- Fedor worked with Jan and Ilya on issue.

### 2.12.2024

Attendees: Jan, Denys, Ilya, Nestoras, Rokas, Yevheniia, Kirill, Fedor

Topic: Progress discussion

- Rokas added business logic for creating new session, waiting for merge, and will now add business logic for adding
  users session.
- Jan researches what kind of library we use for rendering editor data. Research is done he is waiting for a team
  discussion for final decision and assign a new task.
- Ilya works backend session dashboard feature, work in progress
- Fedor frontend session dashboard feature, work in progress
- Nestoras finished login page, and login handling in frontend, waiting for merge approval and new issue to be assigned.
- Yevheniia researches webSocket, work in progress.
- Kirill waits for new task to be assigned, helped Denys with his task.
- Denys finished the creation of new user feature, waiting for new issue.

### 6.12.2024

Attendees: Jan, Denys, Ilya, Nestoras, Rokas, Yevheniia, Kirill, Fedor

Topic: Progress discussion

- Denys created business logic for modifying users, already merged, will work API request for obtaining user.
- Kirill created pipelines for linters which will help review pull requests, now implements automated testing.
- Jan worked on session page with editor, will pick up an issue related to the editor.
- Ilya was revewing merge requests, and worked session dashboard backend creation.
- Fedor is working on frontend session dashboard, task will be finished later today.
- Rokas created logic for creating sessions, merged,now will create logic for adding users to a session.
- Nestoras is working on frontend of adding new user. Almost done a bug related to the popup message that appears after the creation must be fixed.
- Yevhennia finished research for websockets, now will work on backend logic for deleting users