<script>
export let active = false;
export let date;
export let username;
</script>

<div class="px-5 py-3 hover:bg-gray-200 transition-colors cursor-pointer" class:bg-gray-200={active}>
    <span class="block font-semibold leading-6">{date}</span>
    <span class="block text-sm text-gray-500">{username}</span>
</div>
