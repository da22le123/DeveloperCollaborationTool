export const verifyLeader = (req, res, next) => {
    if (!req.user.isLead) {
        return res
            .status(403)
            .json({ message: "Permission denied. User is not a leader." });
    }

    next();
};
