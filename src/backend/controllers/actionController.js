import { actionSchema } from "../schemas.js";
import { Action, Session, SessionMember, User } from "../database/database.js";

export const handleCreateAction = async (req, res, next) => {
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

    return res.status(201).json(newAction);
};
