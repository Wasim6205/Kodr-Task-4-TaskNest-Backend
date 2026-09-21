import express from "express"
import cookieParser from "cookie-parser"

import userRoutes from "./routes/user.route.js"
import taskRoutes from "./routes/task.route.js"

const app = express()

app.use(cookieParser())
app.use(express.json())

app.use("/api/auth",userRoutes)
app.use("/api/tasks",taskRoutes)

export default app