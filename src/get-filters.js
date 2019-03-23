import {Filter} from "./filter.js";

// Object with content for filters
const filtersData = [
  {title: `All`, isChecked: true},
  {title: `Overdue`, isChecked: false},
  {title: `Today`, isChecked: false},
  // {title: `Favorites`, isChecked: false},
  {title: `Repeating`, isChecked: false},
  // {title: `Tags`, isChecked: false},
  // {title: `Archive`, isChecked: false}
];

// Get code for the list of the filters
export default (filters, container) => {
  for (let i = 0; i < filters.length; i++) {
    const filterInstance = new Filter(filters[i]);
    container.appendChild(filterInstance.render());
  }
};

export {filtersData};
