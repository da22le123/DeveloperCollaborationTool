import bcrypt from "bcrypt";
import { registerSchema } from "../schemas.js";
import { User } from "../database/database.js";

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
