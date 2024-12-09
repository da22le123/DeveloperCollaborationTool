import { Sequelize } from "sequelize";
import UserModel from "./model/User.js";
import SessionModel from "./model/Session.js";
import SessionMemberModel from "./model/SessionMember.js";
import ActionModel from "./model/Action.js";
import * as path from "node:path";

const dbFilePath = path.resolve("./database.sqlite");

// Database configuration
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: dbFilePath, // File path for the SQLite database
    logging: false, // Disable Sequelize logs
});

// Import and initialize models
const User = UserModel(sequelize);
const Session = SessionModel(sequelize);
const SessionMember = SessionMemberModel(sequelize);
const Action = ActionModel(sequelize);

// Define relationships
User.hasMany(Action, { foreignKey: "user_id" });
Action.belongsTo(User, { foreignKey: "user_id" });

Session.hasMany(Action, { foreignKey: "session_id" });
Action.belongsTo(Session, { foreignKey: "session_id" });

Session.belongsToMany(User, {
    through: SessionMember,
    foreignKey: "session_id",
});
User.belongsToMany(Session, { through: SessionMember, foreignKey: "user_id" });

SessionMember.belongsTo(User, { foreignKey: "user_id" });
SessionMember.belongsTo(Session, { foreignKey: "session_id" });

Session.hasMany(SessionMember, { foreignKey: "session_id" });


// method for creating the database file and syncing the schema
const createDatabaseFile = async () => {
    await sequelize.authenticate();
    await sequelize.sync();
};

// Function to connect to the database
const connectToDatabase = async () => {
    try {
        await createDatabaseFile();
    } catch (error) {
        console.error("Error connecting to the database:", error.message);
        throw error;
    }
};

// Function to close the database connection
const closeConnection = async () => {
    try {
        await sequelize.close();
    } catch (error) {
        console.error("Error closing the database connection:", error.message);
        throw error;
    }
};

export {
    sequelize,
    User,
    Session,
    SessionMember,
    Action,
    connectToDatabase,
    closeConnection,
};
