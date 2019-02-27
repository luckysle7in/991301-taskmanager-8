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

// Get code for one filter
const getFilterElement = (caption, amount, isChecked = false) => {
  const captionLowerCase = caption.toLowerCase();
  return `
    <input
      type="radio"
      id="filter__${captionLowerCase}"
      class="filter__input visually-hidden"
      name="filter"
      ${isChecked ? `checked` : ``}
      ${amount === 0 ? `disabled` : ``}
    />
    <label
      for="filter__${captionLowerCase}"
      class="filter__label"
      data-filter="${captionLowerCase}"
      data-filter-count="${amount}"
    >
      ${caption} <span class="filter__${captionLowerCase}-count">${amount}</span>
    </label>
  `;
};

// Get code for the list of the filters
export default () => {
  let filtersCode = ``;
  filters.forEach((filter) => {
    filtersCode += getFilterElement(
        filter[`name`],
        filter[`numberOfIssues`],
        filter[`isChecked`]
    );
  });
  return filtersCode;
};

export {filters};
