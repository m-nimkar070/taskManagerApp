const express = require("express");
const { taskController } = require("../../controllers");
const validate = require("../../middlewares/validate");
const { taskValidation } = require("../../validations");


const router = express.Router();

router.get("/",taskController.getAllTasks);
router.get("/:taskId",validate(taskValidation.getTaskById),taskController.getTaskById);
router.post("/",validate(taskValidation.addNewTask),taskController.addNewTask);
router.patch("/:taskId",validate(taskValidation.getTaskById),taskController.updateTask);
router.delete("/:taskId",validate(taskValidation.getTaskById),taskController.deleteTask);

module.exports = router;