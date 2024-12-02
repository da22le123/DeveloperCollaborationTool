export const loginRequest = async (email, password) => {
    const res = await fetch("http://localhost:3000/tokens", {
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
