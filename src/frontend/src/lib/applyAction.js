export const applyAction = ({ nodes, edges }, action) => {
    if (action.type === "NODE_ADD") {
        if (nodes.find((node) => node.id === action.data.id)) {
            console.warn("Node already exists:", action.data);
            return { edges, nodes };
        }
        return {
            edges,
            nodes: [...nodes, action.data],
        };
    }
    if (action.type === "NODE_DELETE") {
        return {
            edges,
            nodes: nodes.filter((node) => node.id !== action.data.id),
        };
    }
    if (action.type === "NODE_UPDATE") {
        return {
            edges,
            nodes: nodes.map((node) =>
                node.id === action.data.id ? action.data : node,
            ),
        };
    }
    if (action.type === "EDGE_ADD") {
        if (edges.find((edge) => edge.id === action.data.id)) {
            console.warn("Edge already exists:", action.data);
            return { edges, nodes };
        }
        return {
            edges: [...edges, action.data],
            nodes,
        };
    }
    if (action.type === "EDGE_DELETE") {
        return {
            edges: edges.filter((edge) => edge.id !== action.data.id),
            nodes,
        };
    }
    if (action.type === "EDGE_UPDATE") {
        return {
            edges: edges.map((edge) =>
                edge.id === action.data.id ? action.data : edge,
            ),
            nodes,
        };
    }
    throw new Error("ILLEGAL_ACTION");
};
