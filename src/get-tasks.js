import moment from "moment";
import {getRandomNumber, getRandomBoolean} from "./random-numbers.js";
import {Task} from "./task.js";
import {TaskEdit} from "./task-edit.js";
import {api} from "./api.js";

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
      const taskEditInstanceCardInner = taskEditInstance.element.querySelector(`.card__inner`);
      const taskEditInstanceCardSave = taskEditInstance.element.querySelector(`.card__save`);
      const taskEditInstanceCardText = taskEditInstance.element.querySelector(`.card__text`);

      task.title = newObject.title;
      task.tags = newObject.tags;
      task.color = newObject.color;
      task.repeatingDays = newObject.repeatingDays;
      task.dueDate = newObject.dueDate;

      const block = () => {
        taskEditInstanceCardInner.style.borderColor = `black`;
        taskEditInstanceCardSave.disabled = true;
        taskEditInstanceCardText.disabled = true;
        taskEditInstanceCardSave.innerHTML = `Saving...`;
      };
      const unblock = () => {
        taskEditInstanceCardSave.disabled = false;
        taskEditInstanceCardText.disabled = false;
        taskEditInstanceCardSave.innerHTML = `Save`;
      };

      // Updating task
      block();
      api.updateTask({id: task.id, data: task.toRAW()})
        .then(() => {
          unblock();
          taskInstance.update(task);
          taskInstance.render();
          container.replaceChild(taskInstance.element, taskEditInstance.element);
          taskEditInstance.unrender();
        })
        .catch(() => {
          taskEditInstance.shake();
          taskEditInstanceCardInner.style.borderColor = `red`;
          unblock();
        });

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
      const taskEditInstanceCardInner = taskEditInstance.element.querySelector(`.card__inner`);
      const taskEditInstanceCardSave = taskEditInstance.element.querySelector(`.card__save`);
      const taskEditInstanceCardDelete = taskEditInstance.element.querySelector(`.card__delete`);

      const block = () => {
        taskEditInstanceCardSave.disabled = true;
        taskEditInstanceCardDelete.disabled = true;
        taskEditInstanceCardDelete.innerHTML = `Deleting...`;
      };
      const unblock = () => {
        taskEditInstanceCardSave.disabled = false;
        taskEditInstanceCardDelete.disabled = false;
        taskEditInstanceCardDelete.innerHTML = `Delete`;
      };

      // Deleting task
      block();
      api.deleteTask({id: task.id})
        .then(() => {
          unblock();
          task.isDeleted = true;
          container.removeChild(taskEditInstance.element);
          taskEditInstance.unrender();
        })
        .catch(() => {
          taskEditInstance.shake();
          taskEditInstanceCardInner.style.borderColor = `red`;
          unblock();
        });

    };


  }
};

export {getAllTasksData};
