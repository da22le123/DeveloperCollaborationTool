import { sessionSchema } from "../schemas.js";
import { Session, SessionMember } from "../database/database.js";

export const validateAndStartSession = async (req, res) => {
    const validatedData = await sessionSchema.validate(req.body, {
        abortEarly: false,
    });

    const session = await Session.create({
        name: validatedData.name,
        last_state: "",
    });

    await SessionMember.create({
        session_id: session.id,
        user_id: req.user.id,
    });

    res.status(201).json(session);
};
