import getFiltersCode, {filters} from "./get-filters.js";
import getTasksCode from "./get-tasks.js";

const mainFiltersNode = document.getElementById(`main__filter`);
const boardTasksNode = document.getElementById(`board__tasks`);

// Put all filters to the page
mainFiltersNode.innerHTML = getFiltersCode();

// Put random tasks to the page, number of the tasks is taken from 'ALL' filter that chosen by default
boardTasksNode.innerHTML = getTasksCode(filters[0][`numberOfIssues`]);

// Show new tasks, if a filter has changes. Number of the tasks is taken from filter that has chosen
mainFiltersNode.addEventListener(`click`, (event) => {
  let target = event.target;
  while (target !== mainFiltersNode) {
    if (target.tagName === `LABEL`) {
      boardTasksNode.innerHTML = getTasksCode(target.getAttribute(`data-filter-count`));
    }
    target = target.parentNode;
  }
});
