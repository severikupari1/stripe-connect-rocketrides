import mongoose from "mongoose";
const config = {
    // Configuration for MongoDB
    mongoUri: 'mongodb://root:example@mongo:27017/',
    mongoDbName: 'todonow',
};
const MONGODB_URI = config.mongoUri;
const MONGODB_DB_NAME = config.mongoDbName;
// Connect to MongoDB
export const mongooseConnect = mongoose.connect(MONGODB_URI, {
    dbName: MONGODB_DB_NAME,
});
