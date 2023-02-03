import * as mongoose from "mongoose";

const connectDatabase = async (): Promise<void> => {
  mongoose.set("strictQuery", false);

  await mongoose.connect(process.env.DB_LOCAL_URI).then((connection) => {
    console.log(
      `MongoDB Database Connected to Host: ${connection.connection.host}`
    );
  });
};

export { connectDatabase };
