import { Session, SessionMember, User } from "../database/database.js";
import { sendMessageToSession } from "../socket.js";

const cursorsPerActiveSession = new Map(); //holds lists of cursors for each active session

export const cursorUpdateHandler = async (data) => {
    if (!cursorsPerActiveSession.has(Number(data.sessionId))) {
        const sessionIsOpen = await Session.findOne({
            where: {
                id: data.sessionId,
                is_open: true,
            },
        });

        if (sessionIsOpen) {
            cursorsPerActiveSession.set(Number(data.sessionId), new Map());
        }
    }

    if (cursorsPerActiveSession.has(Number(data.sessionId))) {
        const cursorsForThisSession = cursorsPerActiveSession.get(
            Number(data.sessionId),
        );

        if (cursorsForThisSession.has(Number(data.id))) {
            const storedCursor = cursorsForThisSession.get(Number(data.id));
            storedCursor.x = data.x;
            storedCursor.y = data.y;
            sendMessageToSession(
                data.sessionId,
                "cursors",
                Array.from(cursorsForThisSession.values()),
            );
        } else {
            const idHasAccessToSession = await SessionMember.findOne({
                where: {
                    session_id: data.sessionId,
                    user_id: data.id,
                },
            });

            const idIsAdmin = await User.findOne({
                where: {
                    id: data.id,
                    is_admin: true,
                },
            });

            if (idHasAccessToSession || idIsAdmin) {
                const username = await User.findOne({
                    where: {
                        id: data.id,
                    },
                });

                const receivedCursor = {
                    id: data.id,
                    x: data.x,
                    y: data.y,
                    username: username.username,
                    color: stringToColor(username.username),
                };

                cursorsForThisSession.set(Number(data.id), receivedCursor);
                sendMessageToSession(
                    data.sessionId,
                    "cursors",
                    Array.from(cursorsForThisSession.values()),
                );
            }
        }
    }
};

export const removeCursor = (id) => {
    for (const [sessionId, cursors] of cursorsPerActiveSession) {
        if (cursors.has(Number(id))) {
            cursors.delete(Number(id));
            sendMessageToSession(sessionId, "cursors", cursors.values);
        }
    }
};

export const removeSession = (sessionId) => {
    cursorsPerActiveSession.delete(sessionId);
};

const stringToColor = (string) => {
    const colors = [
        "Crimson",
        "DarkGoldenRod",
        "ForestGreen",
        "DodgerBlue",
        "MediumOrchid",
    ];

    let hash = 0;
    for (let i = 0; i < string.length; i++) {
        hash = (hash << 5) - hash + string.charCodeAt(i);
        hash &= hash;
    }

    const index = Math.abs(hash) % colors.length;
    return colors[index];
};
