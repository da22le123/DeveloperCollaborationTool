<script>
import { createEventDispatcher } from "svelte";

export let message;
export let type;
export let isVisible;
import { showPopup } from "../stores/popupStore.js";

const dispatch = createEventDispatcher();

const closePopup = () => {
    showPopup.set(false);
    dispatch("close");
};
</script>

{#if isVisible}
    <div class="fixed top-4 right-4 w-[300px] bg-white shadow-lg rounded-lg p-4 border-2 border-solid flex items-center justify-between z-50
        {type === 'success' ? 'border-green-500 bg-green-50 text-green-800' : ''}
        {type === 'error' ? 'border-red-500 bg-red-50 text-red-800' : ''}
        {type === 'info' ? 'border-blue-500 bg-blue-50 text-blue-800' : ''}">

        <p class="flex-1">{message}</p>

        <button
                on:click={closePopup}
                class="ml-3 text-sm font-semibold bg-transparent border-none text-gray-500 hover:text-gray-700">
            Close
        </button>
    </div>
{/if}

<style>

    @keyframes popup-enter {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes popup-leave {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
</style>
