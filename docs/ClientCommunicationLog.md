# Client Communication Log

## Interview 1 (18.11.2024)

The first meeting with the client was mainly focused on clarifying the initial requirements. A few questions were
planned beforehand (attached below), but as the discussion involved other teams, it does not contain all the questions
asked during the session.

### Questions

1. What problem does the application aim to solve?
2. What is meant by a team? Can members join different teams, or is there only one global team (the organization)?
3. What are team members? What is their responsibility?
4. What is a session?
5. What is an invitation? How do you expect am invitation to look like/be handled?
6. What kind of information about a user should be displayed/known/stored?
7. How is the upload to the Git repository going to be done? Should be done automatically or manually?
8. Should users be able to register on the website on their own or should administrators manage the accounts manually?
9. How can team member access the sessions?
10. What kind of data should be collected to be shown in the charts, heatmaps, etc.?
11. What's a replay? What is meant by "manipulations" that should be stored for the replay?

### Notes

The system's purpose is to have a tool for **mind mapping** (brainstorming) to evaluate ideas with a team or to come up
with new ideas for software. In a way, the tool can be used for a class diagram, not just for ideas.

The product is a website application with a **visual editor**. Team leaders export the result to Git. The document type
does not necessarily have to be Markdown; it can also be a different format (e.g., an image) as long as it is viewable.
The visual editor works with **boxes**, **arrows**, and **labels**. Boxes and arrows can have different styles and
colors. Images and diagrams can be added into the editor as well.

Editing a document is done in a session. A session can have different statuses, such as closed, active, or due. A team
member must be invited to the _active_ session (by a team leader) to modify the document. There are no specific
requirements for **invitations**; however, it would be nice to have a clear list of existing members to invite. Sessions
are limited to 10 members and can be viewed on a dashboard (once the user logs in). A member can only see sessions that
they are invited to.

There are three different roles:

1. **Administrator**. Just one user which is defined beforehand. An administrator appoints new leaders and has access to
   all documents. They might be able to create new user accounts and manage existing ones.
2. **Leaders**. They are in charge of creating and managing sessions, including inviting members to these sessions,
   exporting documents to Git, and making sure that members stick to a subject; basically, they are moderators.
3. **Developers**. Users with this role can participate in active brainstorming sessions only if they are invited to it.

Every action (think of drag and dropping a box) in a document can be played back as a **replay**. This is important to
analyze the whole thought process and to see how developers participate in these sessions. It would be nice if the
latest action can be undone, and it would be perfect if any action can be taken back. However, this is not necessary.
This activity can be analyzed in **charts** and **heatmaps** to know how effective the brainstorming process is.

The client does not want to have a junk of users in the database. Therefore, they would prefer to avoid a registration
page and instead have control over user accounts. This can be either done in the form of the administrator creating a
new account, adding "verified" email addresses to some account list (later used for invitations), or invitations
resulting in a new user account. The choice is up to us. Usernames are used to easily recognize contributions of
developers. There must be a way to protect sessions from being seen by members who are not a part of the team.

The application will be hosted on a private VPS. Whether it will be behind a VPN was not specified.

An extra functionality (nice to have) is having guests adding comments to existing documents without modifying them.

## Email to the client with initial solution proposal (25.11.2024)

### Email content

The email was sent to the client to propose a solution based on the requirements gathered during the first Interview,
and
the written assignment description and to ask for approval of the current version of Functional Design document as well
as the wireframes.

P.S. You can see the current version of the Functional Design document and wireframes in the `docs` folder.

### Response from the client

The client responded with a few questions and concerns regarding the Functional Design document version that was sent to
them. The client missed following information in the document:

* User story for "Providing comments on on screen items."
* User story for "What shapes would resemble."
* An "insight envisioning process." An "activity diagram, chaining the user stories together, and showing the flow of
  the application."
* Data architecture explanation
* Navigation map for the wireframes

The client stated that even though the document is not complete, they are happy with the progress and this version of
the document will do for the Sprint 1.

## Email to the client with questions regarding system implementation (27.11.2024) 

### Email content

During the backlog planning, a few questions arose regarding the system implementation. The email was sent to the client
to clarify these questions.

Questions that were asked in the email: 

1. What devices must application be accessible from? Is desktop the only priority now?
2. Do you want to restrict access to view closed sessions to only leader role?
3. What statistics should be gathered and displayed per user?
4. We decided to implement the replay history in the following way:
5. What clicking on the item of the "Replay History" should do? Is there any desired functionality?
6. What user roles are allowed to view replay history? Ou suggestion is that everyone could do that.
7. Is functionality to manage users restricts to only adding users? 

### Response from the client

To be added.