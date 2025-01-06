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



 ### 9.12.2024

Attendees: Jan, Denys, Ilya, Nestoras, Rokas, Yevheniia, Kirill, Fedor

Topic: Progress discussion

- Yevheniia was supposed to work on "delete users" backend logic but switched to setting up a socket connection issue after talking with Jan, as it has higher priority.

- Jan is working on an additional task for adding notes to the editor. This task isn’t finished yet, so he hasn’t picked up a new one.

- Fedor finished the frontend part of the session dashboard. It’s done but not merged, and he hasn’t picked a new task.

- Illya completed the backend part of the session dashboard and resolved Jan’s threads added to merge request. He’s waiting for it to be merged and is now working on adding a button for appointing and demoting leaders on the frontend.

- Rokas finished the backend issue for adding users to a session. He hasn’t picked up a new task yet.

- Nestoras completed the registration frontend page, but there are formatting issues, so the request was not merged. He hasn’t picked a new task yet.

- Denys finished the backend logic for obtaining user data. The merge request for that was not approved yet, and he hasn’t picked a new task.

- Kirill is working on automated testing issue.

### 13.12.2024

Attendees: Jan, Denys, Ilya, Nestoras, Rokas, Yevheniia, Kirill, Fedor

Topic: Progress discussion

- Ilya is still working on the frontend issue for promoting and demoting leaders. He had problems with branches, which caused him to lose added changes.
  He will correct this and finish the task.
- Yevheniia has finished her task of setting up the WebSocket connection and will pick up a new issue.
- Nestor is currently working on a frontend task to implement the logic for the history bar.
- Rokas resolved the threads added by Jan for adding members to a session. He is currently working on a documentation issue, which includes adding an introduction, problem,
  problem analysis, and context research paragraphs in the functional design.
- Jan finished the task of adding nodes to the editor and also refactored API requests on the frontend.
  Additionally, he added clarifications in the team plan and has picked up a new issue for editing nodes.
- Denys completed the issue for creating actions and also finished the task of retrieving all actions.
  He has picked up an issue to retrieve a single action.
- Kirill is still working on the issue regarding automated testing.
- Fedor is still working on a frontend issue to implement the ability to upload a snapshot of the editor to a specified GitLab repository.
  He will finish this soon and pick up a new issue.

### 16.12.2024

Attendees: Jan, Denys, Ilya, Nestoras, Rokas, Yevheniia, Kirill, Fedor

Topic: Progress discussion

- Jan finished the issue for editing nodes and helped others by reviewing their merge requests. He picked up a new task for editing edges.
- Ilya completed the issue about demoting appointed leaders and will pick a new task.
- Yevheniia finished the issue for setting up the room for web sockets. Will address comments left on the merge request review, and after fixing, will pick a new task.
- Fedor resolved issues and is still working on tasks. Will pick a new task once the current work is completed.
- Rokas created the context research for functional design document, which was insufficient. The issue of adding users to sessions still has major problems, and he will focus on fixing that. He also completed the issue of changing the session status. Rokas will continue working on his two previous issues and must ensure his previous merge requests are corrected to meet the sufficient level for merging.
- Kirill: Still working on automatic testing. 
- Denys: Completed the API request for getting a single action on the backend. Will pick a new task.
- Nestor: Finished work on the frontend issue history bar which sends requests for saving actions to the database. He picked up an issue for  fetching the list of actions for the frontend.


**Additional information:**

- Kirill received a verbal warning for the lack of progress on his issue, as per the rules in the team plan.
- Rokas is expected to fix the problems with his previous merge requests to ensure they meet the sufficient level required for merging.



### 20.12.2024

Attendees: Jan, Denys, Ilya, Nestoras, Rokas, Yevheniia, Kirill, Fedor

Topic: Progress discussion

- Jan fixed the functionality for parsing error responses from fetch calls. He also completed the frontend issue for editing edges and already has picked up a new task for deleting nodes and edges.
- Yevheniia finished the issue of setting up rooms for sockets. She encountered issues with the branch, so fixing it took some time before it could be merged. She has not yet picked up a new task.
- Fedor finished the task of implementing the ability to upload a snapshot of the editor to a specified GitLab repository and picked up a new task of tracking the cursor position and streaming it to all other users.
- Kirill finished the automated testing. He hasn't picked a new task yet.
- Rokas was working on fixing the context research. He hasn't picked up a new task yet.
- Denys was reviewing merge requests from other team members and was waiting for Yevheniia to merge her issue because his issue depends on web sockets. Now that it has been merged, he will work on implementing the retrieval of past actions in real-time.
- Illya finished working on the frontend issue for changing the session status. He will pick a new issue.
- Nestor is working on the frontend issue for retrieving all past actions and has reviewed the work of other team members.

**Additional information:**

- After changes to the context research by Rokas, the context research is still insufficient. The task of performing context research will be taken over by another team member.