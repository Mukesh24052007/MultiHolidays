import mongoose from "mongoose";

/**
 * Drops the old non-sparse studentId_1 index if it exists, then lets
 * Mongoose recreate it as sparse via the schema definition.
 * This is a one-time migration guard — once the correct index exists it
 * becomes a no-op.
 */
const fixStudentIdIndex = async () => {
  try {
    const collection = mongoose.connection.collection("users");
    const indexes = await collection.indexes();
    const stale = indexes.find(
      (idx) => idx.name === "studentId_1" && !idx.sparse
    );
    if (stale) {
      await collection.dropIndex("studentId_1");
      console.log("Dropped stale studentId_1 index (was not sparse). Mongoose will recreate it correctly.");
    }
  } catch (err) {
    // Non-fatal — log and continue
    console.warn("Index migration warning:", err.message);
  }
};

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    await fixStudentIdIndex();
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
