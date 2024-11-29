import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { loginSchema } from "../schemas.js";

dotenv.config();

const fakeUsers = [
    {
        id: 1,
        username: "test",
        email: "test@gmail.com",
        password:
            "$2b$10$cop4TlRkTMQ63xQPpu/TO..OBM0ypQgbnjMaCmkj82pVFfAzK6nNG", // testpwd1
        is_admin: true,
        is_lead: false,
    },
    {
        id: 2,
        username: "test2",
        email: "test2@gmail.com",
        password:
            "$2b$10$bdQxgFNJWeaPw53lp57tOeLnQ18xE6BICpTK86LdPdNj84OVS/Rvu\n", // testpwd2
        is_admin: false,
        is_lead: false,
    },
];

export const handleLogin = async (req, res, next) => {
    const validatedData = await loginSchema.validate(req.body, {
        abortEarly: false,
    });

    const { email, password } = validatedData;

    const foundUser = fakeUsers.find((user) => user.email === email);
    if (!foundUser) {
        return res.status(401).json({ message: "Invalid credentials!" });
    }

    const match = await bcrypt.compare(password, foundUser.password);
    if (!match)
        return res.status(401).json({ message: "Invalid credentials!" });

    const token = jwt.sign(
        {
            id: foundUser.id,
            username: foundUser.username,
            isAdmin: foundUser.is_admin,
            isLead: foundUser.is_lead,
        },
        process.env.JWT_SECRET,
        { expiresIn: "12h" },
    );
    res.status(200).json({ token });
};
