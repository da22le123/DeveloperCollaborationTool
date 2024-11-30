<script>
    import {setToken} from "../stores/tokenStore.js";
    import page from "page"

    let email = "";
    let password = "";

    const login = async (event) => {
        event.preventDefault();
        try{
            const res = await fetch("http://localhost:3000/tokens", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email, password})
            });
            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.message || "Login failed");
            }
            const data = await res.json();
            setToken(data.token);

            page("/");
        } catch(error) {
            console.error(error.message);
        }
    }
</script>

<div class="flex items-center justify-center min-h-screen bg-white">
    <div class="w-80 h-80 bg-white shadow-lg rounded-lg p-6 flex flex-col justify-center">
        <h2 class="text-center text-2xl font-bold text-gray-800 mb-6">Login</h2>
        <form action="#" on:submit="{login}">
            <div class="mb-4">
                <input
                        type="email"
                        bind:value={email}
                        placeholder="Email"
                        required
                        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div class="mb-6">
                <input
                        type="password"
                        bind:value={password}
                        placeholder="Password"
                        required
                        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <button
                    type="submit"
                    class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                Login
            </button>
        </form>
    </div>
</div>