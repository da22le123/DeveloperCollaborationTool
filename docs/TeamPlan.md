# Team Plan

## Introduction

This document outlines the technicalities important for a smooth delivery of the product for the client. It includes
team definitions, team members' roles and responsibilities, and a plan of an approach for the development in the next
weeks. The product is a tool is designed to streamline the brainstorming process for teams by providing real-time
collaboration features with enhanced functionality, such as session management, Git integration, and role-based
permissions, ensuring an efficient and user-friendly solution.

## Team Members

- Nestoras
- Denys
- Jan
- Kirill
- Ilya
- Yevheniia
- Fedor
- Rokas

Key roles are split in the following manner:

- Client communication: **Ilya**
- Planning: **Jan**
- Technical setup: **Kirill**

Team members are not assigned only to specific features. They are free to work on anything that fits their skill set,
ensuring an effective balancing of the workload.

## Team Collaboration

The team adheres to the Scrum collaboration framework. The application's development is split into three sprints, with
an additional sprint (sprint 0) at the beginning reserved for planning and discussions. Throughout the process, the
Scrum Master plays a key role in hosting meetings, ensuring that the team follows Scrum practices, and helping the team
stay focused on their goals. These are the Scrum Masters for each sprint:

- Sprint 1: **Nestoras**
- Sprint 2: **Yevheniia**
- Sprint 3: **Fedor**

## Team Agreement

### Code of Conduct

1. Attendance
    - Team members must arrive to meetings no more than 5 minutes late unless they have a valid reason and notify at
      least 1 hour before the meeting
    - Team members must notify other team members at least 1 hour in advance if they are unable to be present / on time
2. Communication
    - Team members must respond to messages within 24 hours
    - If asked for an estimated time for a task, team member must either give an estimate or give a time when to ask for
      an estimate again
3. Responsibility
    - Team members must finish their tasks by specified deadlines. If no deadline is assigned to a task, it should be
      completed by the next meeting (noted below) unless discussed with the team beforehand. The exception are tasks
      with a weight of 5 and higher whose deadline is the weight + 1 day
    - If there are any problems with a task, they must be communicated with the team, so the task can be reassigned to
      someone else or redistributed to other team members
    - Team members are responsible for having a task assigned to them between meetings
    - In the event of violation of the rules, the incident is reported to the teacher and punished with a strike

### Meetings

Our team is committed to regular stand-up meetings and updates on progress. Two meetings during the week are strictly
planned. However, if necessary, an online meeting may be scheduled at least 24 hours in advance.

| Weekday | Time and Location | 
|---------|-------------------| 
| Monday  | 15:00, Saxion     | 
| Friday  | 13:15, Saxion     |

### Time Tracking

Time tracking is done via the Excel spreadsheet in the documentation folder. The file is edited once a week on Fridays.
On a Friday meeting (in class), everyone tells how many hours they worked this week. The table is then modified and
committed in an extra pull request in one go. Hours cannot be modified retrospectively for the previous weeks (except
for Friday and the weekend of the previous week).

### Definition of Done

- Pull request must be approved (code-reviewed) by at least one other person in order to be merged
- Pull requests must be net positive (if they cause any problems in one part of the project, they must do a greater good
  in another part)
- Pull requests must pass a CI check (linter+style) before merging
- Pull requests are merged with squash feature enabled only when the following requirements are met:
    - Only one person has worked on the branch
    - No library has been added/updated/removed

## Targets

The team aims to deliver a functional product with the following features:

- Visual editor with real-time collaboration
- Synchronizing the cursor's position of other session members
- Organization of brainstorming sessions
- Session history with viewable past states
- Session statistics of members' activity
- Session invitations
- GitLab export
- Role-based functionality (Administrator, Leader, Developer)
- User management (creating and deleting user accounts)

The following is outside the team's scope:

- Commenting on sessions
- Undoing past actions in the editor
- Re-applying actions in the editor
- Support for images inside the visual editor

## Sprint Planning

Planning for each sprint is done at the beginning of the respective sprint. The rough plan is the following:

- Sprint 1: Research, technical setup (database, editor, development tools), user authentication
- Sprint 2: Session management, visual editor, sockets, cursor synchronization, GitLab export, managing leaders
- Sprint 3: Action history, real-time collaboration, statistics, user management
