import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authAdminRouters from "../backend/routes/admin_routes/AuthAdminRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
const databaseurl = process.env.DATABASE_URL;

app.use(cors({
    origin: [process.env.ORIGIN],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials:true
}));

app.use(cookieParser());
app.use(express.json());

app.use("/api/admin/auth",authAdminRouters);




const server = app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});

mongoose.connect(databaseurl).then(() => {

    console.log("Database connected");
 
}).catch((err)=>{
    console.log(err);
});
