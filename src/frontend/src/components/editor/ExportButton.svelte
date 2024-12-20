<script>
import {
    generateNodeSnapshot,
    imageHeight,
    imageWidth,
    stringUpload,
} from "../../utils/gitlab.js";
import { getNodesBounds, getViewportForBounds, useNodes } from "@xyflow/svelte";
import { showPopupMessage } from "../../stores/popupStore";

export let sessionId;
const nodes = useNodes();

async function handleClick() {
    const nodesBounds = getNodesBounds($nodes);
    const viewport = getViewportForBounds(
        nodesBounds,
        imageWidth,
        imageHeight,
        0.5,
        2.0,
        0.2,
    );
    const viewportDomNode = document.querySelector(".svelte-flow__viewport");

    try {
        if (!localStorage.getItem("gitlabToken")) {
            const token = window.prompt("Enter your GitLab token:");
            localStorage.setItem("gitlabToken", token);
        }

        const url = window.prompt(
            "Enter a link to a repository where you want it to be saved:",
        );

        const snapshot = await generateNodeSnapshot(viewportDomNode, viewport);
        let res = await stringUpload(snapshot, sessionId, url, "create");

        if (res.status === 400) {
            res = await stringUpload(snapshot, sessionId, url, "update");
        }
        if (res.status === 401) {
            localStorage.removeItem("gitlabToken");
            throw new Error("Your token is invalid.");
        }
        if (!res.ok) {
            const resJson = await res.json();
            if (resJson.message) {
                throw new Error(resJson.message);
            }
            throw new Error(resJson.error);
        }

        showPopupMessage("Snapshot successfully uploaded.", "success", 5000);
    } catch (e) {
        console.error(e.message);
        showPopupMessage(`Upload failed: ${e.message}`, "error", 5000);
    }
}
</script>

<button class="bg-black text-white py-1.5 hover:border-black" on:click={handleClick}>Export</button>