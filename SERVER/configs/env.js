const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost:27017/IMP_TESTD';
const PORT = process.env.PORT || 3000;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';
const JWT_SECRET = process.env.JWT_SECRET || "SECERET";

module.exports = {
    DATABASE_URL,
    PORT,
    JWT_EXPIRES_IN,
    JWT_SECRET
};