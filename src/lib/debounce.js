export function createDebounceWithMap() {
    const map = new Map();
    return (id, update, data, delay = 500) => {
        if (map.has(id)) {
            clearTimeout(map.get(id).timer);
        }

        const timer = setTimeout(() => {
            update(data);
            map.delete(id);
        }, delay);

        map.set(id, { timer, data });
    };
}
