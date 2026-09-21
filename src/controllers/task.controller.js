import taskModel from "../models/task.model.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = req.user;
    console.log(user);
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "unauthorized",
      });
    }

    const task = await taskModel.create({
      userId: user.id,
      title,
      description,
      status: "pending",
    });

    return res.status(201).json({
      success: true,
      message: "task created successfully",
      data: {
        task,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "unauthorized",
      });
    }

    const allTasks = await taskModel.find();
    return res.status(200).json({
      success: true,
      message: "tasks fetched successfully",
      data: {
        allTasks,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

export const getSingleTask = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "id not found",
      });
    }

    const task = await taskModel.findById(id);
    if (!task) {
      return res.status(400).json({
        success: false,
        message: "task not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "task fetched successfully",
      data: {
        task,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "id not found",
      });
    }

    const deletedTask = await taskModel.findByIdAndDelete(id);
    if (deleteTask) {
      return res.status(200).json({
        success: true,
        message: "task deleted successfully",
        data: {
          deleteTask,
        },
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const {title,description,status} = req.body
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "id not found",
      });
    }

    const updatedTask = await taskModel.findByIdAndUpdate(id,{title,description,status},{new:true})
    return res.status(200).json({
        success:true,
        message:"task updated successfully",
        data:{
            updatedTask
        }
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};
