import app from "./src/app.js"
import { config } from "./src/config/config.js"
import { connectDB } from "./src/config/db.js"

const port = config.PORT || 8000

await connectDB()

app.listen(port, () => {
    console.log(`server running on port ${port}`);
})