import bcrypt from "bcrypt";
import { registerSchema, modifyUser } from "../schemas.js";
import { User } from "../database/database.js";
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

    res.status(200).json(await foundUser.save());
};
