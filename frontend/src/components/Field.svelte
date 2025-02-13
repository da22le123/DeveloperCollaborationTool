<script>
export let value = "";
export let placeholder = "";
export let required = false;

function handleInput(event) {
    value = event.target.value;
}
</script>

<div class="mb-4">
    <input
            class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-grey-500 focus:border-gray-500"
            placeholder={placeholder}
            bind:value={value}
            on:input={handleInput}
            required={required}
    />
</div>
