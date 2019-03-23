import renderFilters, {filtersData} from "./get-filters.js";
import renderTasks, {getAllTasksData} from "./get-tasks.js";
import {tagsChartConfig, colorsChartConfig} from "./chart.js";
import flatpickr from "flatpickr";
import Chart from 'chart.js';

const moment = require(`moment`);
const mainFiltersNode = document.getElementById(`main__filter`);
const boardTasksNode = document.getElementById(`board__tasks`);
const filters = document.querySelector(`.filter`);
const tagsStatisticNode = document.querySelector(`.statistic__tags`);
const colorsStatisticNode = document.querySelector(`.statistic__colors`);

// Rendering tasks
const tasksData = getAllTasksData(7);
renderTasks(tasksData, boardTasksNode);

// Rendering filters
renderFilters(filtersData, mainFiltersNode);

// Applying filters
const filterTasks = (tasks, filterName) => {
  switch (filterName) {

    case `filter__All`:
      return tasks;

    case `filter__Overdue`:
      return tasks.filter((it) => {
        const tastDate = new Date(it.dueDate);
        return tastDate < Date.now() && tastDate.getTime();
      });

    case `filter__Today`:
      const currentDateStart = new Date();
      currentDateStart.setHours(0);
      currentDateStart.setMinutes(0);
      currentDateStart.setSeconds(0);

      const currentDateFinish = new Date();
      currentDateFinish.setHours(23);
      currentDateFinish.setMinutes(59);
      currentDateFinish.setSeconds(59);

      return tasks.filter((it) => it.dueDate > currentDateStart && it.dueDate < currentDateFinish);

    case `filter__Repeating`:
      return tasks.filter((it) => [...Object.entries(it.repeatingDays)]
          .some((rec) => rec[1]));
  }
  return false;
};

// If filers are changed
filters.onchange = (evt) => {
  const filterName = evt.target.id;
  const filteredTasks = filterTasks(tasksData, filterName);
  renderTasks(filteredTasks, boardTasksNode);
};

// Open statistic
document.getElementById(`control__statistic`).addEventListener(`click`, () => {
  document.querySelector(`.board.container`).classList.add(`visually-hidden`);
  document.querySelector(`.statistic`).classList.remove(`visually-hidden`);

  const dateStart = new Date();
  const dateFinish = new Date();
  dateStart.setDate(dateStart.getDate() - 7);
  dateFinish.setDate(dateFinish.getDate() + 7);

  let chartLeft = null;
  let chartRight = null;

  flatpickr(document.querySelector(`.statistic__period-input`), {
    altInput: true,
    altFormat: `j F`,
    dateFormat: `j F`,
    mode: `range`,
    conjunction: ` – `,
    defaultDate: [moment(dateStart).format(`D MMMM`), moment(dateFinish).format(`D MMMM`)],
    onClose: () => {
      chartLeft = new Chart(tagsStatisticNode, tagsChartConfig);
      chartRight = new Chart(colorsStatisticNode, colorsChartConfig);
    },
  });

  chartLeft = new Chart(tagsStatisticNode, tagsChartConfig);
  chartRight = new Chart(colorsStatisticNode, colorsChartConfig);

  return [chartLeft, chartRight];
});

// Open tasks
document.getElementById(`control__task`).addEventListener(`click`, () => {
  document.querySelector(`.board.container`).classList.remove(`visually-hidden`);
  document.querySelector(`.statistic`).classList.add(`visually-hidden`);
});
