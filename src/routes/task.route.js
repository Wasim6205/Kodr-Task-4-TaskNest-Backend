import express from "express"
import { createTask, getAllTasks, getSingleTask, updateTask } from "../controllers/task.controller.js"
import { authMiddleware } from "../middleware/authMiddleware.js"

const router = express.Router()

router.post("/",authMiddleware,createTask)
router.get("/",authMiddleware,getAllTasks)
router.get("/:id",authMiddleware,getSingleTask)
router.delete("/:id",authMiddleware,getSingleTask)
router.put("/:id",authMiddleware,updateTask)

export default router