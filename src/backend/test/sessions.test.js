import bcrypt from "bcrypt";
import { test, beforeEach, afterEach, expect } from "vitest";
import {
    connectToDatabase,
    sequelize,
    Session,
    SessionMember,
    User,
} from "../database/database.js";
import request from "supertest";
import { createServerApp } from "../server.js";

const app = createServerApp();

beforeEach(async () => {
    await connectToDatabase();
});

afterEach(async () => {
    await sequelize.drop();
});

const createUser = async (email, username, password, isAdmin, isLead) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        email,
        username,
        password: hashedPassword,
        is_admin: isAdmin,
        is_lead: isLead,
    });

    return user.id;
};

const createSession = async (name) => {
    const session = await Session.create({
        name,
    });

    return session.id;
};

const addUserToSession = async (session_id, user_id) => {
    try {
        await SessionMember.create({
            session_id,
            user_id,
        });
    } catch (error) {
        console.log(error);
    }
};

const loginUser = async (email, password) => {
    return await request(app)
        .post("/tokens")
        .send({ email: email, password: password })
        .expect(200)
        .then(({ body }) => {
            return body.token;
        });
};

test("Getting users & invite statuses while logged in and session exists returns success & correct data", async () => {
    const userId = await createUser(
        "testEmail@gmail.com",
        "testUsername",
        "testPassword",
        true,
        true,
    );
    await createUser(
        "testEmail1@gmail.com",
        "testUsername1",
        "testPassword1",
        false,
        true,
    );
    const token = await loginUser("testEmail@gmail.com", "testPassword");
    const sessionId = await createSession("testSession");
    await addUserToSession(sessionId, userId);

    await request(app)
        .get("/sessions/1/users")
        .set("Authorization", `Bearer ${token}`)
        .expect(200)
        .then(({ body }) => {
            expect(body).toEqual([
                {
                    id: 1,
                    email: "testEmail@gmail.com",
                    username: "testUsername",
                    role: "Admin",
                    isMember: true,
                },
                {
                    id: 2,
                    email: "testEmail1@gmail.com",
                    username: "testUsername1",
                    role: "Lead",
                    isMember: false,
                },
            ]);
        });
});

test("Getting users & invite statuses while not logged in returns 401", async () => {
    const userId = await createUser(
        "testEmail2@gmail.com",
        "testUsername2",
        "testPassword2",
        true,
        true,
    );
    const sessionId = await createSession("testSession");
    await addUserToSession(sessionId, userId);
    await request(app).get("/sessions/1/users").expect(401);
});

test("Getting users & invite statuses while logged in and session does not exist returns 404", async () => {
    await createUser(
        "testEmail3@gmail.com",
        "testUsername3",
        "testPassword3",
        true,
        true,
    );
    const token = await loginUser("testEmail3@gmail.com", "testPassword3");
    await request(app)
        .get("/sessions/10/users")
        .set("Authorization", `Bearer ${token}`)
        .expect(404);
});

test("Creating a session while logged in as admin returns correct session state", async () => {
    const userId = await createUser(
        "test@gmail.com",
        "test",
        "testpwd1",
        true,
        false,
    );
    const sessionId = await createSession("testSession");
    await addUserToSession(sessionId, userId);
    const token = await loginUser("test@gmail.com", "testpwd1");
    await request(app)
        .get("/sessions/1/state")
        .set("Authorization", `Bearer ${token}`)
        .expect(200)
        .then(({ body }) => {
            expect(body).toEqual({
                nodes: [],
                edges: [],
            });
        });
});
