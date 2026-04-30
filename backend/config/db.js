// Design Pattern 1: Singleton
// Ensures only ONE MongoDB connection instance exists across the entire backend.
// Without this, each module that calls connectDB() would open a separate connection pool,
// wasting resources and causing inconsistent database state.

const mongoose = require('mongoose');

class DatabaseConnection {
  constructor() {
    if (DatabaseConnection._instance) {
      return DatabaseConnection._instance;
    }
    this.connection = null;
    DatabaseConnection._instance = this;
  }

  async connect() {
    if (this.connection) {
      console.log('MongoDB: reusing existing connection (Singleton)');
      return this.connection;
    }
    try {
      this.connection = await mongoose.connect(process.env.MONGO_URI);
      console.log('MongoDB connected successfully');
      return this.connection;
    } catch (error) {
      console.error('MongoDB connection error:', error.message);
      process.exit(1);
    }
  }

  getConnection() {
    return this.connection;
  }
}

// Export the single shared instance
const dbInstance = new DatabaseConnection();
module.exports = dbInstance;
