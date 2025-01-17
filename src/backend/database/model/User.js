import { DataTypes } from "sequelize";

const UserModel = (sequelize) => {
    return sequelize.define(
        "User",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            username: { type: DataTypes.STRING(50), allowNull: true },
            email: {
                type: DataTypes.STRING(100),
                allowNull: true,
                unique: true,
            },
            password: { type: DataTypes.STRING(255), allowNull: true },
            is_admin: { type: DataTypes.BOOLEAN, defaultValue: false },
            is_lead: { type: DataTypes.BOOLEAN, defaultValue: false },
        },
        {
            tableName: "User",
            timestamps: false,
        },
    );
};

export default UserModel;
