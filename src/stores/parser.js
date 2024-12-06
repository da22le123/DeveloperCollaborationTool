export function parseJwt(token) {
    if (!token) {
        return;
    }
    const base64url = token.split(".")[1];
    const base64 = base64url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
}
