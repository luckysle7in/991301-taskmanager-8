import moment from "moment";
import {getRandomNumber, getRandomBoolean} from "./random-numbers.js";
import {Task} from "./task.js";
import {TaskEdit} from "./task-edit.js";

// All variants of titles
const taskTitles = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`
];

// Get random title
const getTaskTitle = () => {
  return taskTitles[getRandomNumber(taskTitles.length)];
};

// All variants of tags
const taskTags = [
  `homework`,
  `theory`,
  `practice`,
  `intensive`,
  `keks`,
  `work`,
  `project`,
  `bugfix`
];

// Get up to 3 random tags
const getTaskTags = () => {
  const count = getRandomNumber(4);
  let tags = new Set();
  for (let i = 0; i < count; i++) {
    tags.add(taskTags[getRandomNumber(taskTags.length)]);
  }
  return tags;
};

// All colors variants
const taskColors = [
  `black`,
  `yellow`,
  `blue`,
  `green`,
  `pink`
];

// Get random color
const getTaskColor = () => {
  return taskColors[getRandomNumber(taskColors.length)];
};

// Get random date +-week from now
const getDueDate = () => {
  return moment()
    .add(getRandomNumber(7), `days`)
    .subtract(getRandomNumber(7), `days`)
    .hours(getRandomNumber(20, 8))
    .minutes(0)
    .seconds(0);
};

// Get random picture
const getPicture = () => {
  return `http://picsum.photos/100/100?r=${Math.random()}`;
};

// Get random repeating days
const getRepeatingDays = () => {
  return {
    mo: getRandomBoolean(),
    tu: getRandomBoolean(),
    we: getRandomBoolean(),
    th: getRandomBoolean(),
    fr: getRandomBoolean(),
    sa: getRandomBoolean(),
    su: getRandomBoolean()
  };
};

// Get new object for task
const getTaskData = () => {
  return {
    title: getTaskTitle(),
    dueDate: getDueDate(),
    tags: getTaskTags(),
    picture: getPicture(),
    color: getTaskColor(),
    repeatingDays: getRepeatingDays(),
    isFavorite: getRandomBoolean(),
    isDone: getRandomBoolean(),
    isDeleted: false,
  };
};

const getAllTasksData = (count) => {
  const allTasksData = [];
  for (let i = 0; i < count; i++) {
    allTasksData.push(getTaskData());
  }
  return allTasksData;
};

// Put a few tasks to the booard
export default (tasksData, container) => {
  // Remove everything from tasts board
  container.innerHTML = ``;

  // Generate a few tasks
  for (let i = 0; i < tasksData.length; i++) {

    // Generate new data for the task
    const task = tasksData[i];

    // Create classes for default and edit states
    const taskInstance = new Task(task);
    const taskEditInstance = new TaskEdit(task);
    // console.log(taskData);

    // Add default state to the page
    container.appendChild(taskInstance.render());

    // 'Edit' event for the task card
    taskInstance.onEdit = () => {
      taskEditInstance.render();
      container.replaceChild(taskEditInstance.element, taskInstance.element);
      taskInstance.unrender();
    };

    // 'Submit' event for the task card
    taskEditInstance.onSubmit = (newObject) => {
      task.title = newObject.title;
      task.tags = newObject.tags;
      task.color = newObject.color;
      task.repeatingDays = newObject.repeatingDays;
      task.dueDate = newObject.dueDate;

      taskInstance.update(task);
      taskInstance.render();
      container.replaceChild(taskInstance.element, taskEditInstance.element);
      taskEditInstance.unrender();
    };

    const onSaveFavorite = (isFavorite) => {
      task.isFavorite = isFavorite;
      taskInstance.update(task);
      taskEditInstance.update(task);
    };

    taskEditInstance.onSaveFavorite = onSaveFavorite;

    taskInstance.onSaveFavorite = onSaveFavorite;

    // 'Delete' event for the task card
    taskEditInstance.onDelete = () => {
      task.isDeleted = true;
      container.removeChild(taskEditInstance.element);
      taskEditInstance.unrender();
    };

  }
};

export {getAllTasksData};
