import { Task, validationFields } from "./interfaces";

export function validateTaskFields(task: Task) {
  const result: validationFields = {
    categoryAndIconExist: Boolean(task.category && task.icon),
    titleExist: Boolean(task.title),
    missingSubTaskTitles: [],
  };

  if (Array.isArray(task.subTasks)) {
    task.subTasks.forEach((subTask, index) => {
      if (!subTask.title) {
        result.missingSubTaskTitles.push(index);
      }
    });
  }

  return result;
}
