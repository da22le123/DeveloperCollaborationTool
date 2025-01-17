export const applyAction = (state, action) => {
    if (action.type === "NODE_ADD") {
        return {
            ...state,
            nodes: [...state.nodes, action.data],
        };
    }
    if (action.type === "NODE_DELETE") {
        return {
            ...state,
            nodes: state.nodes.filter((node) => node.id !== action.data.id),
        };
    }
    if (action.type === "NODE_UPDATE") {
        return {
            ...state,
            nodes: state.nodes.map((node) =>
                node.id === action.data.id ? action.data : node,
            ),
        };
    }
    if (action.type === "EDGE_ADD") {
        return {
            ...state,
            edges: [...state.edges, action.data],
        };
    }
    if (action.type === "EDGE_DELETE") {
        return {
            ...state,
            edges: state.edges.filter((edge) => edge.id !== action.data.id),
        };
    }
    if (action.type === "EDGE_UPDATE") {
        return {
            ...state,
            edges: state.edges.map((edge) =>
                edge.id === action.data.id ? action.data : edge,
            ),
        };
    }
    throw new Error("ILLEGAL_ACTION");
};
