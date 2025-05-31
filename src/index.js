import {connectDB} from "./db/index.js";
import dotenv from "dotenv";
import {app} from "./app.js";

dotenv.config()

connectDB()
.then(() => {
    app.listen(process.env.PORT || 4000, () => {
        console.log("server is running on port 4000")
    })
})
.catch((err) => {
    console.log("database failed to connect to server",err)
})