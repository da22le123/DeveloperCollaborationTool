import bcrypt from "bcrypt";
import { registerSchema, modifyUser, userIdSchema } from "../schemas.js";
import { Session, SessionMember, User } from "../database/database.js";
import { Sequelize } from "sequelize";
import { Op } from "sequelize";

export const handleNewUser = async (req, res, next) => {
    const validatedData = await registerSchema.validate(req.body, {
        abortEarly: false,
    });

    const { email, username, password, role } = validatedData;

    let isLead = false;
    let isAdmin = false;

    if (role === "Lead") {
        isLead = true;
    } else if (role === "Developer") {
        isLead = false;
        isAdmin = false;
    }

    const duplicateUser = await User.findOne({ where: { email } });

    if (duplicateUser)
        return res.status(409).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
        email,
        username,
        password: hashedPassword,
        is_admin: isAdmin,
        is_lead: isLead,
    });

    res.status(201).json({ newUser });
};

export const getListOfAllUsers = async (req, res) => {
    const users = await User.findAll({
        attributes: [
            "id",
            "username",
            "email",
            [
                Sequelize.literal(`
                        CASE 
                            WHEN is_admin = 1 THEN 'Admin'
                            WHEN is_lead = 1 THEN 'Lead'
                            ELSE 'Developer'
                        END
                    `),
                "role",
            ],
        ],
    });

    res.status(200).json(users);
};

export const handleModifyUser = async (req, res, next) => {
    const validatedData = await modifyUser.validate(req.body, {
        abortEarly: false,
    });

    const { email, isLead } = validatedData;
    const { id } = req.params;

    const foundUser = await User.findOne({ where: { id } });
    if (!foundUser) return res.status(404).json({ message: "User not found" });

    const isFoundUserAdmin = foundUser.is_admin;
    if (isFoundUserAdmin)
        return res.status(403).json({ message: "Admins cannot be modified" });

    if (email) {
        const existingEmail = await User.findOne({
            where: { email },
            id: { [Op.ne]: id },
        });
        if (existingEmail)
            return res.status(409).json({ message: "Email already exists" });
    }

    if (email) {
        foundUser.email = email;
    }
    if (isLead !== undefined) {
        foundUser.is_lead = isLead;
    }

    try {
        await foundUser.save();
        res.status(200).json(foundUser);
    } catch (error) {
        res.status(503).json({ error: error.message });
    }
};

export const handleGetUser = async (req, res, next) => {
    const { id } = req.params;

    const foundUser = await User.findOne({ where: { id } });

    if (!foundUser) return res.status(404).json({ message: "User not found" });

    const strippedUser = {
        id: foundUser.id,
        username: foundUser.username,
    };

    return res.status(200).json(strippedUser);
};

export const getAvailableSessionsPerUser = async (req, res, next) => {
    const user_id = await userIdSchema.validate(req.user.id, {
        abortEarly: false,
    });

    const include = [];

    if (!req.user.isAdmin) {
        include.push({
            model: SessionMember,
            required: true,
            where: { user_id },
            attributes: [],
        });
    }

    const availableSessions = await Session.findAll({
        include,
        attributes: ["id", "name", "is_open", "last_state", "creation_date"], // Only include fields from Session
    });

    res.status(200).json(availableSessions);
};
