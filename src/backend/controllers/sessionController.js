import { sessionSchema } from "../schemas.js";
import { Session, SessionMember, User } from "../database/database.js";
import { sendMessageToSession } from "../socket.js";
import { removeSession } from "./cursorsController.js";

export const addUserToSession = async (req, res) => {
    const { session_id } = req.params;
    const { user_id } = req.body;

    if (!user_id || !session_id) {
        return res
            .status(400)
            .json({ error: "Session ID and User ID are required" });
    }

    const session = await Session.findOne({ where: { id: session_id } });

    if (!session) {
        return res.status(404).json({ error: "Session not found" });
    }

    const user = await User.findOne({ where: { id: user_id } });
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    if (user.is_admin === 1) {
        return res.status(403).json({
            error: "Admins cannot be added to the session, they have permanent access.",
        });
    }

    const existingSessionMember = await SessionMember.findOne({
        where: { session_id, user_id },
    });

    if (existingSessionMember) {
        return res
            .status(409)
            .json({ error: "User is already a member of the session" });
    }
    const sessionMember = await SessionMember.create({
        session_id,
        user_id,
    });

    res.status(201).json(sessionMember);
};

export const removeUserFromSession = async (req, res) => {
    const { session_id } = req.params;
    const { user_id } = req.body;
    if (!user_id || !session_id) {
        return res
            .status(400)
            .json({ error: "Session ID and User ID are required" });
    }

    const session = await Session.findOne({ where: { id: session_id } });
    if (!session) {
        return res.status(404).json({ error: "Session not found" });
    }

    const user = await User.findOne({ where: { id: user_id } });
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    if (req.user.id === user_id) {
        return res
            .status(403)
            .json({ error: "User cannot remove yourself from the session" });
    }

    if (user.is_admin === true) {
        return res
            .status(403)
            .json({ error: "Admins cannot be removed from the session" });
    }

    const removerSessionMember = await SessionMember.findOne({
        where: { session_id, user_id: req.user.id },
    });

    if (!removerSessionMember && !req.user.isAdmin) {
        return res.status(403).json({
            error: "User that requested the removal is not a member of this session",
        });
    }

    const toBeRemovedSessionMember = await SessionMember.findOne({
        where: { session_id, user_id },
    });
    if (!toBeRemovedSessionMember) {
        return res.status(404).json({ error: "User not found" });
    }

    await SessionMember.destroy({
        where: { session_id, user_id },
    });

    res.status(204).send();
};

export const startSession = async (req, res) => {
    const validatedData = await sessionSchema.validate(req.body, {
        abortEarly: false,
    });

    const session = await Session.create({
        name: validatedData.name,
    });

    await SessionMember.create({
        session_id: session.id,
        user_id: req.user.id,
    });

    res.status(201).json(session);
};

export const changeSessionStatus = async (req, res) => {
    const { session_id } = req.params;
    const user_id = req.user.id;

    if (!session_id) {
        return res.status(400).json({ error: "Session ID is required." });
    }

    const session = await Session.findOne({ where: { id: session_id } });
    if (!session) {
        return res.status(404).json({ error: "Session not found." });
    }

    if (!req.user.isAdmin) {
        const sessionMember = await SessionMember.findOne({
            where: { session_id, user_id },
        });
        if (!sessionMember) {
            return res
                .status(403)
                .json({ error: "User is not a member of this session." });
        }
    }

    session.is_open = !session.is_open;

    await session.save();

    if (!session.is_open) {
        sendMessageToSession(session_id, "session_was_closed", null, null);
        removeSession(session_id);
    } else {
        sendMessageToSession(session_id, "session_was_opened", null, null);
    }

    res.status(200).json(session);
};

export const getListOfUsersAndInviteStatuses = async (req, res) => {
    const { session_id } = req.params;

    const session = await Session.findOne({ where: { id: session_id } });
    if (!session) {
        return res.status(404).json({ error: "Session not found." });
    }

    const sessionMembers = await SessionMember.findAll({
        where: { session_id },
    });

    const allUsers = await User.findAll();

    const users = [];

    for (const user of allUsers) {
        const isMember = sessionMembers.find(
            (member) => member.user_id === user.id,
        );
        users.push({
            id: user.id,
            email: user.email,
            username: user.username,
            role: user.is_admin ? "Admin" : user.is_lead ? "Lead" : "Developer",
            isMember: !!isMember,
        });
    }

    res.status(200).json(users);
};
