import express from  "express";
import cookieParser from "cookie-parser"

const app = express();


app.use(cookieParser())
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({limit: "16kb", extended: true}))



import bookRoutes from "./routes/book.routes.js";

app.use("/api", bookRoutes)

export {app}