import { DataTypes } from "sequelize";

const SessionMemberModel = (sequelize) => {
    return sequelize.define(
        "SessionMember",
        {
            session_id: { type: DataTypes.INTEGER, primaryKey: true },
            user_id: { type: DataTypes.INTEGER, primaryKey: true },
            join_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
        },
        {
            tableName: "SessionMember",
            timestamps: false,
        },
    );
};

export default SessionMemberModel;
