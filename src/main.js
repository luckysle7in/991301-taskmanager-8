import getFiltersCode, {filters} from "./get-filter-element.js";
import getTasksCode from "./get-task-card.js";

const mainFiltersNode = document.getElementById(`main__filter`);
const boardTasksNode = document.getElementById(`board__tasks`);

// Put all filters to the page
mainFiltersNode.innerHTML = getFiltersCode();

// Put random tasks to the page, number of the tasks is taken from 'ALL' filter that chosen by default
boardTasksNode.innerHTML = getTasksCode(filters[0][`numberOfIssues`]);

// Show new tasks, if a filter has changes. Number of the tasks is taken from filter that has chosen
const filtersLinks = mainFiltersNode.getElementsByClassName(`filter__label`);
for (let filtersLink of filtersLinks) {
  // Click event for each filter
  filtersLink.addEventListener(`click`, (event) => {
    const tasksNumber = event[`currentTarget`][`children`][0][`innerText`];
    boardTasksNode.innerHTML = ``;
    // Put new tasks to the page
    boardTasksNode.innerHTML = getTasksCode(tasksNumber);
  });
}
