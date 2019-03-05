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

  // Create new arrays of data object, default and edit class states
  const taskData = [];
  const taskComponent = [];
  const editTaskComponent = [];

  // Generate a few tasks
  for (let i = 0; i < tasksNumber; i++) {

    // Generate new data for the task
    taskData[i] = getTaskData();

    // Create classes for default and edit states
    taskComponent[i] = new Task(taskData[i]);
    editTaskComponent[i] = new TaskEdit(taskData[i]);

    // Add default state to the page
    container.appendChild(taskComponent[i].render());

    // 'Edit' event for the task card
    taskComponent[i].onEdit = () => {
      editTaskComponent[i].render();
      container.replaceChild(editTaskComponent[i].element, taskComponent[i].element);
      taskComponent[i].unrender();
    };

    // 'Submit' event for the task card
    editTaskComponent[i].onSubmit = () => {
      taskComponent[i].render();
      container.replaceChild(taskComponent[i].element, editTaskComponent[i].element);
      editTaskComponent[i].unrender();
    };

  }
};
