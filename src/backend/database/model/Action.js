import { DataTypes } from "sequelize";

const ActionModel = (sequelize) => {
    return sequelize.define(
        "Action",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            user_id: { type: DataTypes.INTEGER, allowNull: false },
            session_id: { type: DataTypes.INTEGER, allowNull: false },
            action_data: { type: DataTypes.TEXT },
            creation_date: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            tableName: "Action",
            timestamps: false,
        },
    );
};

export default ActionModel;
