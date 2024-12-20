import { toPng } from "html-to-image";

export const imageWidth = 1920;
export const imageHeight = 1080;

export function convertUrl(url) {
    const parts = url
        .replace(/^https?:\/\//, "")
        .replace(/\/-\/.*/, "")
        .split("/");

    if (parts.length === 3 && parts[0] === "gitlab.com") {
        return parts.slice(1).join("%2F");
    }

    throw new Error("Invalid URL format.");
}

export function extractBranch(url) {
    const strippedUrl = url.replace(/\?.*/, "");
    const parts = strippedUrl.match(/(?<=\/-\/tree\/)([^\/]+)/);

    return parts ? parts[0] : "main";
}

export function extractLocation(url) {
    const match = url.match(/(?<=\/-\/tree\/)([^?]+)/);
    if (!match) {
        return "";
    }
    const parts = match[0].split("/");

    if (parts[1]) {
        return `${parts.slice(1).join("/")}/`;
    }

    return "";
}

export async function generateNodeSnapshot(node, viewport) {
    return await toPng(node, {
        backgroundColor: "#FFFFFF",
        width: imageWidth,
        height: imageHeight,
        style: {
            width: `${imageWidth}px`,
            height: `${imageHeight}px`,
            transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
        },
    });
}

export async function stringUpload(contentUrl, name, url, action) {
    const requestBody = {
        branch: extractBranch(url),
        commit_message: `Upload ${name}.png`,
        actions: [
            {
                action: action,
                file_path: `${extractLocation(url)}${name}.png`,
                content: contentUrl.split(",")[1],
                encoding: "base64",
            },
        ],
    };

    return await fetch(
        `https://gitlab.com/api/v4/projects/${convertUrl(url)}/repository/commits`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "PRIVATE-TOKEN": localStorage.getItem("gitlabToken") ?? "",
            },
            body: JSON.stringify(requestBody),
        },
    );
}
