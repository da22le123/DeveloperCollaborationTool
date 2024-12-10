const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const loginRequest = async (email, password) => {
    const res = await fetch(`${API_BASE_URL}/tokens`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Login failed");
    }

    return res.json();
};

export const registerRequest = async (email, username, password, role) => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_BASE_URL}/users`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, password, role }),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Register failed");
    }

    return res.json();
};
