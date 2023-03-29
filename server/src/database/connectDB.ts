import mongoose from "mongoose";
import { Express } from "express";

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    connectTimeoutMS: 30000,
    keepAlive: true,
};

const connectDB = (app: Express, PORT: string | number) => {
    (async () => {
        try {
            mongoose.set("strictQuery", false);
            await mongoose.connect(
                (process.env.MONGO_CONNECT as string) ||
                    "mongodb+srv://interviewer:bryx1TPqeN3eF3wC@cluster0.t3hpann.mongodb.net/?retryWrites=true&w=majority",
                options
            );

            app.listen(PORT, () => {
                console.log(`Server Port: ${PORT}`);
                console.log("Connected to mongoDB with mongoose!");
            });
        } catch (error) {
            console.log("Failed to connect", error);
        }
    })();
};

export default connectDB;
