<script>
import { registerRequest } from "../utils/requests.js";
import { isAdminStore } from "../stores/tokenStore.js";
import { popupMessage, showPopup } from "../stores/popupStore.js";
import page from "page";

let email = "";
let username = "";
let password = "";
let role = "Developer";

if (!$isAdminStore) {
    page("/");
}

const register = async (event) => {
    event.preventDefault();
    try {
        await registerRequest(email, username, password, role);
        popupMessage.set({
            message: "User successfully created",
            type: "success",
        });
        showPopup.set(true);
    } catch (error) {
        console.error(error.message);
        popupMessage.set({ message: "Registration failed", type: "error" });
        showPopup.set(true);
    }
};
</script>

<div class="max-w-md mx-auto bg-white p-6 rounded shadow">
    <h2 class="text-2xl font-semibold text-center mb-6">Register New User</h2>
    <form action="#" on:submit="{register}">
        <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
                    type="email"
                    bind:value={email}
                    id="email"
                    placeholder="Enter email"
                    class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
        </div>
        <div class="mb-4">
            <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
                    type="text"
                    bind:value={username}
                    id="username"
                    placeholder="Enter username"
                    class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
        </div>
        <div class="mb-4">
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
                    type="password"
                    bind:value={password}
                    id="password"
                    placeholder="Enter password"
                    class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
        </div>
        <div class="mb-4">
            <label for="role" class="block text-sm font-medium text-gray-700 mb-1">Select Role</label>
            <select
                    id="role"
                    bind:value="{role}"
                    class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
            >
                <option disabled selected>Dropdown option</option>
                <option>Developer</option>
                <option>Lead</option>
            </select>
        </div>
        <div>
            <button
                    type="submit"
                    class="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300">
                Create
            </button>
        </div>
    </form>
</div>
