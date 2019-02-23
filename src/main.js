import getFilterElement from "./get-filter-element.js";
import getTaskCard from "./get-task-card.js";

const mainFiltersNode = document.getElementById(`main__filter`);
const boardTasksNode = document.getElementById(`board__tasks`);

// Get random number from 0 to MAX
const getRandomNumber = (max) => {
  return Math.floor(Math.random() * max);
};

// Object with content for filters
const filters = [
  {name: `All`, numberOfIssues: getRandomNumber(10), isChecked: true},
  {name: `Overdue`, numberOfIssues: getRandomNumber(10), isChecked: false},
  {name: `Today`, numberOfIssues: getRandomNumber(10), isChecked: false},
  {name: `Favorites`, numberOfIssues: getRandomNumber(10), isChecked: false},
  {name: `Repeating`, numberOfIssues: getRandomNumber(10), isChecked: false},
  {name: `Tags`, numberOfIssues: getRandomNumber(10), isChecked: false},
  {name: `Archive`, numberOfIssues: getRandomNumber(10), isChecked: false}
];

// Get code for the list of the filters
let filtersCode = ``;
filters.forEach((filter) => {
  filtersCode += getFilterElement(
      filter[`name`],
      filter[`numberOfIssues`],
      filter[`isChecked`]
  );
});

// Put all filters to the page
mainFiltersNode.innerHTML = filtersCode;

// Content to generate random tasks
const taskColors = [
  `black`,
  `pink`,
  `yellow`,
  `blue`
];
const taskTypes = [
  ``,
  `repeat`,
  `deadline`
];
const taskIsEdit = [
  false,
  true
];
const taskTitles = [
  `It is example of repeating task. It marks by wave.`,
  `This is card with missing deadline`,
  `This is example of new task, you can add picture, set date and time, add tags.`
];

// Get code for the list of tasks
const getTasksCode = (number) => {
  let tasksCode = ``;
  for (let i = 0; i < number; i++) {
    tasksCode = tasksCode + getTaskCard(
        taskTitles[getRandomNumber(3)],
        taskColors[getRandomNumber(4)],
        taskTypes[getRandomNumber(3)],
        taskIsEdit[getRandomNumber(1)]
    );
  }
  return tasksCode;
};

// Put random tasks to the page, number of the tasks is taken from 'ALL' filter that chosen by default
boardTasksNode.innerHTML = getTasksCode(filters[0][`numberOfIssues`]);

// Show new tasks, if a filter has changes. Number of the tasks is taken from filter that has chosen
const filtersLinks = mainFiltersNode.getElementsByClassName(`filter__label`);
for (let filtersLink of filtersLinks) {

  //Click event for each filter
  filtersLink.addEventListener(`click`, (event) => {
    const tasksNumber = event[`currentTarget`][`children`][0][`innerText`];
    boardTasksNode.innerHTML = '';

    // Put new tasks to the page
    boardTasksNode.innerHTML = getTasksCode(tasksNumber);
  });
}
