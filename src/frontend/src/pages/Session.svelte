<script>
import { SvelteFlowProvider } from "@xyflow/svelte";

import Editor from "../components/Editor.svelte";
import ReplayHistory from "../components/editor/ReplayHistory.svelte";
import ObjectList from "../components/editor/ObjectList.svelte";
import EditorObjectProvider from "../providers/EditorObjectProvider.svelte";

export let params;

let activeHistory = false;

const onToggleHistory = () => {
    activeHistory = !activeHistory;
};
</script>

<SvelteFlowProvider>
    <EditorObjectProvider>
        <div class="flex w-full">
            <div class="w-96 pr-10">
                <h1 class="text-2xl font-semibold mb-6">Session Name</h1>

                <div class="flex justify-between mb-6">
                    <button class="btn-black px-7">Export</button>
                    <button class="btn-black px-9">Invite members</button>
                </div>

                <ObjectList />

                <div class="flex justify-between">
                    <button class="btn-red px-4">Explore Statistics</button>
                    <button class="btn-black px-7" on:click={onToggleHistory}>
                        {activeHistory ? 'Close History' : 'View History'}
                    </button>
                </div>
            </div>

            <div class="flex-auto border-black border-2">
                <Editor />
            </div>
        </div>
    </EditorObjectProvider>
</SvelteFlowProvider>

<ReplayHistory open={activeHistory} on:closed={onToggleHistory} />

<style>
    .btn-black {
        @apply bg-black text-white py-1.5 hover:border-black;
    }

    .btn-red {
        @apply bg-red-900 text-white py-1.5 hover:border-red-900;
    }
</style>
