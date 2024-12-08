import yup from "yup";

export const loginSchema = yup.object({
    email: yup.string().email("Email is invalid").required("Email is required"),
    password: yup.string().required("Password is required"),
});

export const registerSchema = yup.object({
    email: yup.string().email("Email is invalid").required("Email is required"),
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
    role: yup
        .string()
        .oneOf(
            ["Developer", "Lead"],
            "Role must be either 'Developer' or 'Lead'",
        )
        .required("Role is required"),
});

export const modifyUser = yup.object({
    email: yup.string().email("Email is invalid"),
    isLead: yup.boolean(),
});

export const sessionSchema = yup.object({
    name: yup.string().required("Session name is required"),
});
