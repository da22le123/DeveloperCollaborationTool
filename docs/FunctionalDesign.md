# Functional Design

# Introduction

## Problem

## Problem analysis

## Context research

# Solution overview

## Solution vision

#### Rights for each role:

Administrator rights:

Leader rights: Replay functionality is the leader+ only.

User rights:

## Scope

## Requirements

### non-functional

### functional

Feature 1: Editor

| ID     | Description                                                                                         | Priority | Source                               | 
|--------|-----------------------------------------------------------------------------------------------------|----------|--------------------------------------|
| U1.1   | As a developer I want to cooperate with other users in real time.                                   | MUST     | Interview 1 & Assignment description |
| S1.1.1 | The system should utilize WebSockets/SocketIO to provide real time cooperation functionality.       | SHOULD   | U1.1                                 |
| U1.2   | As a developer I want to work with the visual editor of objects.                                    | MUST     | Interview 1                          |
| S1.2.1 | The system should provide rectangles, arrows, labels related to other objects.                      | MUST     | U1.2                                 |
| S1.2.2 | The system should provide the ability to add, move, and delete objects.                             | MUST     | U1.2                                 |
| S1.2.3 | The system should provide the ability to connect objects with arrows.                               | MUST     | U1.2                                 |
| S1.2.4 | The system should provide the ability to add labels to objects.                                     | MUST     | U1.2                                 |
| S1.2.5 | The system should provide the ability to change the color of objects.                               | MUST     | U1.2                                 |
| S1.2.6 | The system should provide the ability to change styles of arrows.                                   | MUST     | U1.2                                 |
| S1.2.7 | The system should automatically resize rectangles based on the amount of text content in the label. | MUST     | U1.2                                 |
| S1.2.8 | The system should provide the ability to zoom in and out.                                           | COULD    | U1.2                                 |
| S1.2.9 | The system should provide the ability to add images to the canvas.                                  | COULD    | U1.2                                 |

Feature 2: Git Integration

| ID     | Description                                                                                                            | Priority | Source                               |
|--------|------------------------------------------------------------------------------------------------------------------------|----------|--------------------------------------|
| U2.1   | As a leader I want to save the current state of the project to the Git repository.                                     | MUST     | Interview 1 & Assignment description |
| S2.1.1 | The system should provide the ability for the lead to export the result of the session to the provided Git repository. | MUST     | U2.1                                 |
| S2.1.2 | The system exports the result of the session as the Markdown file or any other viewable/renderable type of a file      | MUST     | Interview 1                          |

Feature 3: Sessions

| ID     | Description                                                                                            | Priority | Source                               |
|--------|--------------------------------------------------------------------------------------------------------|----------|--------------------------------------|
| U3.1   | As a leader I want to create a new session so that I can start a new document.                         | MUST     | Interview 1 & Assignment description |
| S3.1.1 | The system has a button for starting a new session.                                                    | MUST     | U3.1                                 |
| U3.2   | As a leader I want to be able to close active sessions or to set status to active for the closed ones. | MUST     | Interview 1                          |
| S3.2.1 | The system should provide a button to close an active the session.                                     | MUST     | U3.2                                 |
| U3.2.2 | The system should provide a button to make closed session opened.                                      | MUST     | U3.2                                 |
| U3.3   | As a developer I want to be able to access the editor in an active session.                            | MUST     | Interview 1                          |

Feature 4: Invitations

| ID     | Description                                                                                           | Priority | Source                               |
|--------|-------------------------------------------------------------------------------------------------------|----------|--------------------------------------|
| U4.1   | As a leader I want to invite other developers to the session so that they can join the collaboration. | MUST     | Interview 1 & Assignment description |
| S4.1.1 | The system should provide a button on the session's editor page that leads to the invitation page.    | MUST     | U4.1                                 |
| S4.1.2 | The invitation page should list all of the users and provide a button to invite them.                 | MUST     | U4.1                                 |
| S4.1.3 | The invitation page should provide a functionality to search for the users.                           | SHOULD   | U4.1                                 |
| S4.1.4 | The users that was invited can access the session on their session list.                              | MUST     | U4.1                                 |

Feature 5: Replays

| ID     | Description                                                                    | Priority | Source                               |
|--------|--------------------------------------------------------------------------------|----------|--------------------------------------|
| U5.1   | As a leader I want to replay the session to analyse the whole thought process. | MUST     | Interview 1 & Assignment description |
| S5.1.1 | The system should have a list of actions done to the document.                 | MUST     | U5.1                                 |
| U5.2   | As a leader I want to control past actions done to the document.               | SHOULD   | Interview 1                          |
| S5.2.1 | The system should have a button to undo the **last** action.                   | SHOULD   | U5.2                                 |
| S5.2.2 | The system should have a button to undo the action.                            | COULD    | U5.2                                 |
| S5.2.3 | The system should have a button to redo the action.                            | COULD    | U5.2                                 |

Feature 6: Statistics

| ID     | Description                                                                                                                     | Priority | Source                               |
|--------|---------------------------------------------------------------------------------------------------------------------------------|----------|--------------------------------------|
| U6.1   | As a team member I want to see the statistics of the collaboration process to know how effective the brainstorm process is.     | MUST     | Interview 1 & Assignment description |
| S6.1.1 | The system should have a button on the session's editor page that leads to the statistics page.                                 | MUST     | U6.1                                 |
| S6.1.2 | The statistics page should provide the information about the number of actions done to the document in relation to each member. | MUST     | U6.1                                 |
| S6.1.3 | The statistics page should provide heatmaps showing the contributions of each user relative to sessions they have access to.    | COULD    | Assignment description               |

Feature 7: Role based access

| ID     | Description                                                                                                                                        | Priority | Source                               |
|--------|----------------------------------------------------------------------------------------------------------------------------------------------------|----------|--------------------------------------|
| U7.1   | As a team member I want to have different roles such as administrator, lead and user so that I can have different permissions.                     | MUST     | Interview 1 & Assignment description |
| S7.1.1 | The system provides 3 roles: administrator, leader and developer. See the rights for each role here: [Rights for each role](#rights-for-each-role) | MUST     | U7.1                                 |
| U7.2   | As an administrator I want to be able to manage leaders.                                                                                           | MUST     | Interview 1 & Assignment description |
| S7.2.1 | The system has a button to promote a team member to a leader or demote a leader.                                                                   | MUST     | U7.2                                 |

Feature 8: Authentication

| ID | Description | Priority | Source |
|----|-------------|----------|--------|

Feature 9: User management

## Risks and assumptions

# Functional specs

## Business logic: roles, rules and data involved.

## Epics and User Stories ( unrefined )

## Mockups and wireframes (Low-Fidelity)

# System architecture

## Basic architecture with logical components

## Deploy and Component diagram

# Change Log
