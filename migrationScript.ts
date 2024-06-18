import mongoose from "mongoose";
import connectDB from "./lib/connectDb";
import Doc from "./model/Doc";

async function migrateToSizeInsteadOfDocSize() {
  await connectDB();

  const docs = await Doc.find({ docSize: { $exists: true } });

  for (const doc of docs) {
    doc.size = doc.docSize;
    await doc.save();
  }

  console.log("Migration completed");
  mongoose.connection.close();
}

migrateToSizeInsteadOfDocSize().catch((err) => {
  console.error("Migration failed:", err);
  mongoose.connection.close();
});
