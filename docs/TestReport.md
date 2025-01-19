# Test Report

## Introduction
This report summarizes the results of the testing on the website. 
The purpose of these tests was to ensure that all functionalities are working as expected.

The testing has been done with the version **2243ec1b** On 18/01/2025.


## **Test Cases**

### **Feature 1: Session Access**

#### **Test Case: Verify session access for invited developers (F1)**
![img](testingImg/developerLogin.png)  
![img](testingImg/availableSessions2.png)  
**Description**:
- Logging in works (as a developer).
- Developer can see a session that he has been invited to.

**Result**: Pass

#### **Test Case: Display a list of accessible sessions (F2)**
![img](testingImg/leadLogin.png)  
![img](testingImg/moreOpenSessions.png)  
**Description**:
- Logging in works.
- One can see only the sessions that he has access to.

**Result**: Pass

#### **Test Case: Prevent unauthorized access (F3)**
![img](testingImg/developerLogin.png)  
![img](testingImg/openSessiondisappeared.png)  
**Description**:
- Logging in works.
- Cannot access the sessions in the dashboard that the user hasn't been invited to.

**Result**: Pass

---

### **Feature 2: Real-Time Collaboration**

#### **Test Case: Add new nodes (F5)**
![img](testingImg/addingNodes.png)  
![img](testingImg/addedNode.png)  
**Description**:
- Nodes are added and displayed correctly.

**Result**: Pass

#### **Test Case: Connect existing nodes (F6)**
![img](testingImg/connectedNodes.png)  
**Description**:
- Nodes are connected as expected, and the connection is displayed.

**Result**: Pass

#### **Test Case: Add custom labels (F7)**
![img](testingImg/labelsChanged.png)  
**Description**:
- Custom labels are applied successfully.

**Result**: Pass

#### **Test Case: Verify real-time activity display (F4)**
![img](img/img.png)
![img](testingImg/addingNode.png)
![img](testingImg/onlineNodeVisible.png)
**Description**:
- Multiple members logged in.
- All members see real-time updates, including user activity.

**Result**: Pass

---

### **Feature 3: Export and Session Management**

#### **Test Case: Export session to GitLab (F9)**
![img](testingImg/loginLeader2.png)
![img](testingImg/exportButton.png)
![img](testingImg/exportButton2.png)
![img](testingImg/exportButton4.png)
![img](testingImg/exportButton3.png)
![img](testingImg/exportedOnGitlab.png)
**Description**:
- Logging in works.
- The session state is saved in the repository in a user-friendly format.

**Result**: Pass

#### **Test Case: Start a new session (F10)**
![img](testingImg/loginLeader.png)
![img](testingImg/createSession.png)
![img](testingImg/createSessionButton.png)
![img](testingImg/availableSessions.png)
**Description**:
- Logging in works.
- The session is created and appears in the session list.

**Result**: Pass

#### **Test Case: Close an ongoing session (F11)**
![img](testingImg/closingSession.png)
![img](testingImg/closedSession.png)

**Description**:
- The session is successfully closed.

**Result**: Pass

#### **Test Case: Prevent changes to closed sessions (F12)**
![img](testingImg/addingNodesDoesNotWork.png)
![img](testingImg/addingNodesDoesNotWorkProof.png) 
**Description**:
- Changes are not allowed.

**Result**: Pass

---

### **Feature 4: Invitations and Member Management**

#### **Test Case: Invite users to a session (F13)**
![img](testingImg/loginLeader.png)
![img](testingImg/inviteUserButton.png)
![img](testingImg/inviteUser.png)
![img](testingImg/sessionAppeared.png)
![img](testingImg/availableSessions3.png)
**Description**:
- Logging in works.
- Invited users appear in the session and gain access.

**Result**: Pass

#### **Test Case: Remove session members (F14)**
![img](testingImg/kickingUserButton.png)
![img](testingImg/noAvailableSessions.png)
**Description**:
- The member is successfully removed.

**Result**: Pass

---

### **Feature 5: Replay and History**

#### **Test Case: View session history (F16)**
![img](testingImg/viewHistoryButton.png)
![img](testingImg/historyOnTheSide.png)
**Description**:
- A list of actions, along with the username are displayed.

**Result**: Pass

#### **Test Case: View past document state (F17)**
![img](testingImg/openHistoryAndAppearsOnSide.png)
![img](testingImg/historySnapshot.png)
**Description**:
- The past state is displayed accurately.

**Result**: Pass

---
### **Feature 6: Statistics**

#### **Test Case: View session statistics (F20)**
![img](testingImg/exploreStatisticsButton.png)
![img](testingImg/statistics.png)
**Description**:
- Collaboration statistics are displayed accurately.

**Result**: Pass

---
### **Feature 7: User Roles and Authentication**

#### **Test Case: Assign leader roles (F21)**
![img](testingImg/adminLogin.png)
![img](testingImg/manageUserButton.png)
![img](testingImg/changeRoleButton.png)
![img](testingImg/changeRoleButtonWorks.png)
**Description**:
- Logging in works as an admin.
- The selected user gains leader permissions.

**Result**: Pass

#### **Test Case: Demote leaders (F22)**
![img](testingImg/adminLogin.png)
![img](testingImg/manageUserButton.png)
![img](testingImg/isLeadButton.png)
![img](testingImg/roleAppered.png)
**Description**:
- Logging in works as an admin.
- The role is changed back to a developer.

**Result**: Pass

#### **Test Case: Modify user accounts (F24)**
![img](testingImg/adminLogin.png)
![img](testingImg/manageUserButton.png)
![img](testingImg/changeEmailButton.png)
![img](testingImg/editingEmailSave.png)
![img](testingImg/editedEmailWorks.png)
**Description**:
- Logging in works as an admin.
- User email is updated.

**Result**: Pass

#### **Test Case: Delete user accounts (F25)**
![img](testingImg/adminLogin.png)
![img](testingImg/manageUserButton.png)
![img](testingImg/deleteUserButton.png)
![img](testingImg/deleteUserAlert.png)
![img](testingImg/userhasBeenDeleted.png)
**Description**:
- Logging in works as an admin.
- The user account is removed.

**Result**: Pass

---

### **Feature 8: Authentication and User Interface**

#### **Test Case: Verify login functionality (F26)**
![img](testingImg/adminLogin.png)
![img](testingImg/sessions.png)
**Description**:
- The login page is accessible.
- The user logs in successfully.

**Result**: Pass

#### **Test Case: Display user roles (F28)**
![img](testingImg/inviteUserButton.png)
![img](testingImg/roleChanged.png) 
**Description**:
- Logging in works.
- The role is displayed clearly on the invite user page.

**Result**: Pass

---

### **Feature 9: Visual Editor Enhancements**

#### **Test Case: Highlight nodes with multiple connections (F29)**
![img](testingImg/viewOpenSession.png)
![img](testingImg/nodeConnectionWorks.png) 
**Description**:
- Nodes can have multiple connections.

**Result**: Pass

#### **Test Case: Stand out nodes with no connections (F30)**
![img](testingImg/viewOpenSession.png)
![img](testingImg/nodeConnectionWorks.png)
![img](testingImg/nodeWithNoConnections.png)
**Description**:
- Nodes with no connections are distinctly styled.

**Result**: Fail

#### **Test Case: Allow multiple connections (F31)**
![img](testingImg/nodeWithManyConnections.png) 
**Description**:
- Nodes support more than 2 connections.

**Result**: Pass

---

## **Conclusion**
The testing process has confirmed that most functionalities are working as expected.
All test cases passed without any issues, indicating that the system meets most of the user requirements.