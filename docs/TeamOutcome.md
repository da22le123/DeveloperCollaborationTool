# Team Outcome

## Introduction

This document provides an overview of the progress made during the product development over three sprints. It highlights
the key targets accomplished during each sprint. Each sprint's achievements are presented in detail, showcasing both the
successes and the areas where the team faced challenges. Furthermore, the document evaluates the team's performance,
reflecting on both the positive aspects and the areas for improvement.

## Accomplished Targets

### Sprint 1

During the first sprint, the most important technical parts were set up and a lot of research for different parts of the
final product were made. Admittedly, at this point of the development process, we had barely anything to demo except for
the user authentication, but we had a good idea about how we will continue from this point forwards.

### Sprint 2

Most of the core functionality was implemented during the second sprint:

- We got the entire visual editor working with adding nodes and connecting them together, putting labels on nodes or
  their edges, and deleting any objects in the editor.
- Sockets were set up on the technical level but were not yet used; no real-time collaboration feature was initiated.
- We failed to deliver the full experience of managing sessions. While some of the functionality was implemented on the
  backend, those API requests were not yet used on the frontend.
- GitLab export was fully implemented; it became possible to export the session state into an image and commit it to any
  provided repository.
- The action history development was initiated, both on the backend and frontend. Stuff like retrieving all past actions
  or exposing API endpoints for pushing an action state was implemented during this sprint.
- The administrator became able to appoint and demote leaders.

### Sprint 3

The third sprint was mostly about connecting all the features together and utilizing the technicalities set up in the
previous sprint:

- The session state is successfully replicated between all members of the session.
- A member of the session can see the cursors of all other members together with a tooltip containing their names.
- The action history was fully completed, from successfully tracking all actions in the editor to displaying an entire
  state of the session in the past.
- The development of the statistics (based on the action history) was initiated and finished during this sprint.
- The user management was fully completed with editing and deleting other accounts.
- We got the closed state of the session right; nothing can be done in the editor when the session is not open anymore.

## Evaluation

While the broader plan was correct, the team repeatedly complained about the lack of a detailed plan, as described in
the [notes from Scrum retrospectives](Retrospectives.md). Furthermore, albeit not being the fault of the teamwork, most
members shared the bad trait of finishing tasks the last minute. This became apparent during the last sprint when most
of the work was finished on Thursday and Sunday causing merge conflicts and issues blocking each other.

On the other hand, the teamwork and communication became stronger sprint by sprint. Team members were helping each other
and clearly communicating during Scrum meetings about their progress and issues.
