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
  return Date.now()
    - Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000
    + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000;
};

// Get random picture
const getPicture = () => {
  return `http://picsum.photos/100/100?r=${Math.random()}`;
};

// Get random repeating days
const getRepeatingDays = () => {
  return {
    Mo: getRandomBoolean(),
    Tu: getRandomBoolean(),
    We: getRandomBoolean(),
    Th: getRandomBoolean(),
    Fr: getRandomBoolean(),
    Sa: getRandomBoolean(),
    Su: getRandomBoolean()
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
    isDone: getRandomBoolean()
  };
};


// Put a few tasks to the booard
export default (tasksNumber, container) => {
  // Remove everything from tasts board
  container.innerHTML = ``;

  // Generate a few tasks
  for (let i = 0; i < tasksNumber; i++) {

    // Generate new data for the task
    const taskData = getTaskData();

    // Create classes for default and edit states
    const taskInstance = new Task(taskData);
    const taskEditInstance = new TaskEdit(taskData);

    // Add default state to the page
    container.appendChild(taskInstance.render());

    // 'Edit' event for the task card
    taskInstance.onEdit = () => {
      taskEditInstance.render();
      container.replaceChild(taskEditInstance.element, taskInstance.element);
      taskInstance.unrender();
    };

    // 'Submit' event for the task card
    taskEditInstance.onSubmit = () => {
      taskInstance.render();
      container.replaceChild(taskInstance.element, taskEditInstance.element);
      taskEditInstance.unrender();
    };

  }
};
