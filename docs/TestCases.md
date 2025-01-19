# **Test Plan**

## **Introduction**
This test plan aims to verify that the user requirements are fulfilled in the system. Each requirement is linked to its specific test cases, steps, expected outcomes, and actual results.

---

## **Test Cases**

### **Feature 1: Session Access**

#### **Test Case: Verify session access for invited developers (F1)**
- **Requirement ID**: F1
- **Test Steps**:
  1. Log in as a developer.
  2. Navigate to the dashboard.
  3. Verify the ability to access a session where the user is invited.
- **Expected Result**:
  - The developer can access the session and its content.

#### **Test Case: Display a list of accessible sessions (F2)**
- **Requirement ID**: F2
- **Test Steps**:
  1. Log in as any user.
  2. Navigate to the dashboard.
  3. Verify the display of a list of sessions the user has access to.
- **Expected Result**:
  - All accessible sessions are displayed correctly.

#### **Test Case: Prevent unauthorized access (F3)**
- **Requirement ID**: F3
- **Test Steps**:
  1. Log in as a developer.
  2. Attempt to access a session without having an invitation.
- **Expected Result**:
  - Unauthorized access is denied, the sessions without invitation are not shown.

### **Feature 2: Real-Time Collaboration**

#### **Test Case: Add new nodes (F5)**
- **Requirement ID**: F5
- **Test Steps**:
  1. log in to the website.
  2. Navigate to the session dashboard.
  3. Press "view" on an open session.
  4. Add new nodes to the canvas.
  5. Verify that nodes are added successfully.
- **Expected Result**:
  - Nodes are added and displayed correctly.

#### **Test Case: Connect existing nodes (F6)**
- **Requirement ID**: F6
- **Test Steps**:
  1. Log in to the website.
  2. Navigate to the session dashboard.
  3. Press "view" on an open session.
  4. Connect two existing nodes with a link.
- **Expected Result**:
  - Nodes are connected as expected, and the connection is displayed.

#### **Test Case: Add custom labels (F7)**
- **Requirement ID**: F7
- **Test Steps**:
  1. Log in to the website.
  2. Navigate to the session dashboard.
  3. Press "view" on an open session.
  4. Add custom labels to nodes and connections.
- **Expected Result**:
  - Custom labels are applied successfully.

#### **Test Case: Verify real-time activity display (F4)**
- **Requirement ID**: F4
- **Test Steps**:
  1. Open the session with multiple members logged in.
  2. Perform actions such as adding or moving objects.
  3. Verify all members see these actions in real time.
- **Expected Result**:
  - All members see real-time updates, including user activity.

---

### **Feature 3: Export and Session Management**

#### **Test Case: Export session to GitLab (F9)**
- **Requirement ID**: F9
- **Test Steps**:
  1. Log in to the website.
  2. Navigate to the session dashboard.
  3. Open an active session as an admin.
  4. Export the current session state to GitLab.
- **Expected Result**:
  - The session state is saved in the repository in a user-friendly format.

#### **Test Case: Start a new session (F10)**
- **Requirement ID**: F10
- **Test Steps**:
  1. Log in as a leader.
  2. Press the "create session" button
  2. Fill in the session name and press "create".
- **Expected Result**:
  - The session is created and appears in the session list.

#### **Test Case: Close an ongoing session (F11)**
- **Requirement ID**: F11
- **Test Steps**:
  1. Log in as a leader.
  2. Navigate to the session dashboard.
  3. Close an active session.
- **Expected Result**:
  - The session is successfully closed.

#### **Test Case: Prevent changes to closed sessions (F12)**
- **Requirement ID**: F12
- **Test Steps**:
  1. Log in to the website.
  2. Navigate to the session dashboard.
  3. Open a closed session.
  1. Attempt to make changes.
- **Expected Result**:
  - Changes are not allowed, and an error message is displayed.

---

### **Feature 4: Invitations and Member Management**

#### **Test Case: Invite users to a session (F13)**
- **Requirement ID**: F13
- **Test Steps**:
  1. Log in as a leader.
  2. Navigate to the session dashboard.
  3. Press "view" on an open session.
  4. Navigate to the Invite users page.
  5. Invite users to an active session.
- **Expected Result**:
  - Invited users appear in the session and gain access.

#### **Test Case: Remove session members (F14)**
- **Requirement ID**: F14
- **Test Steps**:
  1. Log in as a leader.
  2. Navigate to the session dashboard.
  3. Press "view" on an open session.
  4. Navigate to the Invite users page.
  2. Press "kick out" button.
- **Expected Result**:
  - The member is successfully removed.

---

### **Feature 5: Replay and History**

#### **Test Case: View session history (F16)**
- **Requirement ID**: F16
- **Test Steps**:
  1. Log in as a leader.
  2. Navigate to the session dashboard.
  3. Press "view" on an open session.
  4. Press the "view history" button.
- **Expected Result**:
  - A list of actions, along with the username and action type, is displayed.

#### **Test Case: View past document state (F17)**
- **Requirement ID**: F17
- **Test Steps**:
  1. Log in as a leader.
  2. Navigate to the session dashboard.
  3. Press "view" on an open session.
  4. Press the "view history" button.
  5. Press on one of the actions.
- **Expected Result**:
  - The past state is displayed accurately.

---

### **Feature 6: Statistics**

#### **Test Case: View session statistics (F20)**
- **Requirement ID**: F20
- **Test Steps**:
  1. Log in to the website.
  2. Navigate to the session dashboard.
  3. Press "view" on an open session.
  4. Press the "explore statistics" button.
  5. Verify the summary of action weights for members.
- **Expected Result**:
  - Collaboration statistics are displayed accurately.

---

### **Feature 7: User Roles and Authentication**

#### **Test Case: Assign leader roles (F21)**
- **Requirement ID**: F21
- **Test Steps**:
  1. Log in as an admin.
  2. Navigate to the "manage users".
  3. Assign the leader role to a user by pressing a checkbox under the "is Lead" column.
- **Expected Result**:
  - The user gains leader permissions.

#### **Test Case: Demote leaders (F22)**
- **Requirement ID**: F22
- **Test Steps**:
  1. Log in as an admin.
  2. Navigate to the "manage users".
  3. Change a leader’s role back to a developer by pressing a checkbox under the "is Lead" column.
- **Expected Result**:
  - The role is updated correctly.


#### **Test Case: Modify user accounts (F24)**
- **Requirement ID**: F24
- **Test Steps**:
  1. Log in as an admin.
  2. Navigate to the "manage users"
  3. Edit user details (email).
- **Expected Result**:
  - User details are updated.

#### **Test Case: Delete user accounts (F25)**
- **Requirement ID**: F25
- **Test Steps**:
  1. Log in as an admin.
  2. Navigate to the "manage users"
  3. Delete a user account.
- **Expected Result**:
  - The user account is removed.

---

### **Feature 8: Authentication and User Interface**

#### **Test Case: Verify login functionality (F26)**
- **Requirement ID**: F26
- **Test Steps**:
  1. Navigate to the login page.
  2. Enter email and password.
  3. Press Login
- **Expected Result**:
  - The user logs in successfully.

#### **Test Case: Display user roles (F28)**
- **Requirement ID**: F28
- **Test Steps**:
  1. Log in as any user.
  2. Verify that the user's role is displayed on every page.
- **Expected Result**:
  - The role is displayed clearly.

---

### **Feature 9: Visual Editor Enhancements**

#### **Test Case: Highlight nodes with multiple connections (F29)**
- **Requirement ID**: F29
- **Test Steps**:
    1. log in to the website.
    2. navigate to the open session
    3. press "view" on an open session.
    4. Add nodes with multiple connections.
- **Expected Result**:
  - Nodes with multiple connections are highlighted.

#### **Test Case: Stand out nodes with no connections (F30)**
- **Requirement ID**: F30
- **Test Steps**:
  1. log in to the website.
  2. navigate to the open session
  3. press "view" on an open session.
  4. Add nodes without connections.
- **Expected Result**:
  - Nodes with no connections are distinctly styled.

#### **Test Case: Allow multiple connections (F31)**
- **Requirement ID**: F31
- **Test Steps**:
  1. log in to the website.
  2. Navigate to the dashboard.
  3. press "view" on an open session.
  4. Create nodes with more than two connections.
- **Expected Result**:
  - Nodes support multiple connections.

---
