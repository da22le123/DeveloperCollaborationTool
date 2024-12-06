import { DataTypes } from "sequelize";

const SessionModel = (sequelize) => {
    return sequelize.define(
        "Session",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: { type: DataTypes.STRING(100), allowNull: false },
            is_open: { type: DataTypes.BOOLEAN, defaultValue: true },
            last_state: { type: DataTypes.TEXT },
            creation_date: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            tableName: "Session",
            timestamps: false,
        },
    );
};

export default SessionModel;
