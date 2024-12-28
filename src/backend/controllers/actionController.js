import { actionSchema } from "../schemas.js";
import { Action, Session, SessionMember, User } from "../database/database.js";
import { getSocket } from "../socket.js";

export const handleCreateAction = async (req, res, next) => {
    const socket = getSocket();
    const validatedData = await actionSchema.validate(req.body, {
        abortEarly: false,
    });

    const { session_id, action_data } = validatedData;
    const userId = req.user.id;

    const sessionExists = await Session.findOne({ where: { id: session_id } });

    if (!sessionExists)
        return res.status(404).json({ message: "Session not found" });

    const userPartOfSession = await SessionMember.findOne({
        where: { session_id, user_id: userId },
    });

    if (!userPartOfSession)
        return res.status(403).json({ message: "Forbidden" });

    const newAction = await Action.create({
        user_id: userId,
        session_id,
        action_data,
    });

    await Session.update(
        { last_state: action_data },
        { where: { id: session_id } },
    );

    if (socket) {
        socket.emit("new_action", {
            id: newAction.id,
            user_id: newAction.user_id,
            session_id: newAction.session_id,
            action_data: newAction.action_data,
            creation_date: newAction.creation_date,
        });
    }

    return res.status(201).json(newAction);
};

export const handleGetActions = async (req, res, next) => {
    const { session_id } = req.query;
    const userId = req.user.id;

    const sessionExists = await Session.findOne({ where: { id: session_id } });

    if (!sessionExists)
        return res.status(404).json({ message: "Session not found" });

    const userPartOfSession = await SessionMember.findOne({
        where: { session_id, user_id: userId },
    });

    if (!userPartOfSession)
        return res.status(403).json({ message: "Forbidden" });

    const actions = await Action.findAll({
        where: {
            session_id,
        },
        include: [
            {
                model: User,
                attributes: ["id", "username"],
            },
        ],
    });

    return res.status(200).json(actions);
};

export const handleGetAction = async (req, res, next) => {
    const { session_id } = req.query;
    const { id } = req.params;
    const userId = req.user.id;

    const sessionExists = await Session.findOne({ where: { id: session_id } });

    if (!sessionExists)
        return res.status(404).json({ message: "Session not found" });

    const userPartOfSession = await SessionMember.findOne({
        where: { session_id, user_id: userId },
    });

    if (!userPartOfSession)
        return res.status(403).json({ message: "Forbidden" });

    const action = await Action.findOne({
        where: {
            id,
            session_id,
        },
    });

    if (!action) return res.status(404).json({ message: "Action not found" });

    return res.status(200).json(action);
};
