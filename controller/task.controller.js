import Task from "../model/task.model.js";

export const createTask = async (req, res) => {
  const { task, status } = req.body;
  const userId = req?.userId;

  try {
    if (!userId) {
      return res.status(404).json("user not found");
    }
    const user = await Task.findOne({ task });

    if (user) {
      return res
        .status(401)
        .json({ status: 401, message: "This task created already!" });
    }

    const newUser = new Task({
      userId,
      task,
      status,
    });
    await newUser.save();
    return res.status(201).json({
      status: 201,
      message: "Task Created successfully!",
      data: newUser,
    });
  } catch (error) {
    console.log("error", error);
  }
};

export const getAllTask = async (req, res) => {
  const userId = req?.userId;

  try {
    if (!userId) {
      return res.status(404).json("user not found");
    }

    const tasks = await Task.find({ userId });

    const groupedTasks = {
      todo: [],
      inProgress: [],
      done: [],
    };

    tasks.forEach((task) => {
      const formattedTask = {
        id: task._id.toString(),
        content: task.task,
      };
      if (groupedTasks[task.status]) {
        groupedTasks[task.status].push(formattedTask);
      } else {
        // If status is not one of 'todo', 'inProgress', or 'done', you can either skip or add dynamically
        groupedTasks[task.status] = [formattedTask];
      }
    });

    return res.status(200).json({
      message: "Retrieve all tasks successfully!",
      data: groupedTasks,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getSingleTask = async (req, res) => {
  const userId = req?.userId;
  const { id } = req.params;

  try {
    if (!userId) {
      return res.status(404).json("user not found");
    }

    const task = await Task.findOne({ _id: id, userId });

    if (!task) {
      return res.status(404).json("task not found");
    }
    const taskDetails = await Task.findById(id);

    return res.status(200).json({
      message: "Retrieve single task successfully!",
      task: taskDetails,
    });
  } catch (error) {
    console.log("error", error);
  }
};

export const UpdateTask = async (req, res) => {
  const userId = req?.userId;
  const { id } = req.params;
  const data = req.body;

  try {
    const task = await Task.findOne({ _id: id, userId });

    if (!task || !userId) {
      return res
        .status(404)
        .json({ status: 404, message: "user or task not found" });
    }
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { ...data },
      { new: true }
    );

    return res.status(200).json({
      status: 200,
      message: "updated task successfully!",
      task: updatedTask,
    });
  } catch (error) {
    console.log("error", error);
  }
};

export const deleteTask = async (req, res) => {
  const userId = req?.userId;
  const { id } = req.params;

  try {
    if (!userId) {
      return res.status(404).json("user not found");
    }
    const task = await Task.findOne({ _id: id, userId });

    if (!task) {
      return res.status(404).json("task not found");
    }
    await Task.findByIdAndDelete(id);

    return res.status(200).json({ message: "deleted task successfully!" });
  } catch (error) {
    console.log("error", error);
  }
};
