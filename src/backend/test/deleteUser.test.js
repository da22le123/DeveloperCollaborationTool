import { test, beforeAll, afterAll, expect } from "vitest";
import bcrypt from "bcrypt";
import { connectToDatabase, User } from "../database/database.js";
import request from "supertest";
import { createServerApp } from "../server.js";

const app = createServerApp();

const createUser = async (
    email,
    username,
    password,
    isAdmin = false,
    isLead = false,
) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    return await User.create({
        email,
        username,
        password: hashedPassword,
        is_admin: isAdmin,
        is_lead: isLead,
    });
};

const logInUser = async (email, password) => {
    const response = await request(app)
        .post("/tokens")
        .send({ email, password })
        .expect(200);

    return response.body.token;
};

const deleteUser = async (userId, token) => {
    await request(app)
        .delete(`/users/${userId}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(204);
};

beforeAll(async () => {
    await connectToDatabase();
});

afterAll(async () => {
    await User.destroy({
        where: {},
        truncate: true,
        cascade: true,
        restartIdentity: true,
    });
});

test("Admin can delete a single user", async () => {
    const admin = await createUser(
        "admin@example.com",
        "AdminUser",
        "adminpass",
        true,
        false,
    );
    const user = await createUser("test@example.com", "TestUser", "testpass");

    const adminToken = await logInUser("admin@example.com", "adminpass");

    await deleteUser(user.id, adminToken);

    const deletedUser = await User.findByPk(user.id);
    expect(deletedUser.username).toBe(`deleted (${user.id})`);
    expect(deletedUser.email).toBeNull();
});

test("Admin can delete multiple users", async () => {
    const admin = await createUser(
        "admin2@example.com",
        "AdminUser",
        "adminpass",
        true,
        false,
    );

    const users = [
        await createUser("user1@example.com", "User1", "password1"),
        await createUser("user2@example.com", "User2", "password2"),
        await createUser("user3@example.com", "User3", "password3"),
    ];

    const adminToken = await logInUser("admin2@example.com", "adminpass");

    for (const user of users) {
        await deleteUser(user.id, adminToken);
    }

    const updatedUsers = await User.findAll({
        where: { id: users.map((user) => user.id) },
    });

    for (const user of updatedUsers) {
        expect(user.username).toMatch(/^deleted \(\d+\)$/);
        expect(user.email).toBeNull();
    }
});

test("Non-admin cannot delete users", async () => {
    const nonAdmin = await createUser(
        "user4@example.com",
        "NormalUser",
        "password",
        false,
        false,
    );
    const user = await createUser("test4@example.com", "TestUser", "testpass");

    const nonAdminToken = await logInUser("user4@example.com", "password");

    await request(app)
        .delete(`/users/${user.id}`)
        .set("Authorization", `Bearer ${nonAdminToken}`)
        .expect(403);

    const unchangedUser = await User.findByPk(user.id);
    expect(unchangedUser.username).toBe("TestUser");
    expect(unchangedUser.email).toBe("test4@example.com");
});
