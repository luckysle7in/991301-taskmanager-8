const mainFiltersNode = document.getElementById('main__filter');
const boardTasksNode = document.getElementById('board__tasks');

// Get random number from 0 to MAX
const getRandomNumber = (max) => {
  return Math.floor(Math.random() * max);
}

// Filter element template
const getFilterElement = function (caption, amount, isChecked = false) {
  const captionLowerCase = caption.toLowerCase();
  return `
    <input
      type="radio"
      id="filter__${captionLowerCase}"
      class="filter__input visually-hidden"
      name="filter"
      ${isChecked ? "checked" : ""}
      ${amount == 0 ? "disabled" : ""}
    />
    <label for="filter__${captionLowerCase}" class="filter__label">
      ${caption} <span class="filter__${captionLowerCase}-count">${amount}</span></label
    >
  `;
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

// Put all filters to the page
filters.forEach((filter) => {
  mainFiltersNode.insertAdjacentHTML(`beforeend`,
    getFilterElement(
      filter['name'],
      filter['numberOfIssues'],
      filter['isChecked']
    )
  );
});

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
]

// Template for the taks card
const getTaskCard = function (title, type, color, isEdit = false) {
  return `
  <article class="card ${isEdit ? "card--edit" : ""} card--${color} ${type ? "card--" + type : ""}">
    <form class="card__form" method="get">
      <div class="card__inner">
        <div class="card__control">
          <button type="button" class="card__btn card__btn--edit">
            edit
          </button>
          <button type="button" class="card__btn card__btn--archive">
            archive
          </button>
          <button
            type="button"
            class="card__btn card__btn--favorites card__btn--disabled"
          >
            favorites
          </button>
        </div>

        <div class="card__color-bar">
          <svg class="card__color-bar-wave" width="100%" height="10">
            <use xlink:href="#wave"></use>
          </svg>
        </div>

        <div class="card__textarea-wrap">
          <label>
            <textarea
              class="card__text"
              placeholder="Start typing your text here..."
              name="text"
            >
${title}</textarea
            >
          </label>
        </div>

        <div class="card__settings">
          <div class="card__details">
            <div class="card__dates">
              <button class="card__date-deadline-toggle" type="button">
                date: <span class="card__date-status">no</span>
              </button>

              <fieldset class="card__date-deadline" disabled>
                <label class="card__input-deadline-wrap">
                  <input
                    class="card__date"
                    type="text"
                    placeholder="23 September"
                    name="date"
                  />
                </label>
                <label class="card__input-deadline-wrap">
                  <input
                    class="card__time"
                    type="text"
                    placeholder="11:15 PM"
                    name="time"
                  />
                </label>
              </fieldset>

              <button class="card__repeat-toggle" type="button">
                repeat:<span class="card__repeat-status">no</span>
              </button>

              <fieldset class="card__repeat-days" disabled>
                <div class="card__repeat-days-inner">
                  <input
                    class="visually-hidden card__repeat-day-input"
                    type="checkbox"
                    id="repeat-mo-2"
                    name="repeat"
                    value="mo"
                  />
                  <label class="card__repeat-day" for="repeat-mo-2"
                    >mo</label
                  >
                  <input
                    class="visually-hidden card__repeat-day-input"
                    type="checkbox"
                    id="repeat-tu-2"
                    name="repeat"
                    value="tu"
                    checked
                  />
                  <label class="card__repeat-day" for="repeat-tu-2"
                    >tu</label
                  >
                  <input
                    class="visually-hidden card__repeat-day-input"
                    type="checkbox"
                    id="repeat-we-2"
                    name="repeat"
                    value="we"
                  />
                  <label class="card__repeat-day" for="repeat-we-2"
                    >we</label
                  >
                  <input
                    class="visually-hidden card__repeat-day-input"
                    type="checkbox"
                    id="repeat-th-2"
                    name="repeat"
                    value="th"
                  />
                  <label class="card__repeat-day" for="repeat-th-2"
                    >th</label
                  >
                  <input
                    class="visually-hidden card__repeat-day-input"
                    type="checkbox"
                    id="repeat-fr-2"
                    name="repeat"
                    value="fr"
                    checked
                  />
                  <label class="card__repeat-day" for="repeat-fr-2"
                    >fr</label
                  >
                  <input
                    class="visually-hidden card__repeat-day-input"
                    type="checkbox"
                    name="repeat"
                    value="sa"
                    id="repeat-sa-2"
                  />
                  <label class="card__repeat-day" for="repeat-sa-2"
                    >sa</label
                  >
                  <input
                    class="visually-hidden card__repeat-day-input"
                    type="checkbox"
                    id="repeat-su-2"
                    name="repeat"
                    value="su"
                    checked
                  />
                  <label class="card__repeat-day" for="repeat-su-2"
                    >su</label
                  >
                </div>
              </fieldset>
            </div>

            <div class="card__hashtag">
              <div class="card__hashtag-list">
                <span class="card__hashtag-inner">
                  <input
                    type="hidden"
                    name="hashtag"
                    value="repeat"
                    class="card__hashtag-hidden-input"
                  />
                  <button type="button" class="card__hashtag-name">
                    #repeat
                  </button>
                  <button type="button" class="card__hashtag-delete">
                    delete
                  </button>
                </span>

                <span class="card__hashtag-inner">
                  <input
                    type="hidden"
                    name="hashtag"
                    value="repeat"
                    class="card__hashtag-hidden-input"
                  />
                  <button type="button" class="card__hashtag-name">
                    #cinema
                  </button>
                  <button type="button" class="card__hashtag-delete">
                    delete
                  </button>
                </span>

                <span class="card__hashtag-inner">
                  <input
                    type="hidden"
                    name="hashtag"
                    value="repeat"
                    class="card__hashtag-hidden-input"
                  />
                  <button type="button" class="card__hashtag-name">
                    #entertaiment
                  </button>
                  <button type="button" class="card__hashtag-delete">
                    delete
                  </button>
                </span>
              </div>

              <label>
                <input
                  type="text"
                  class="card__hashtag-input"
                  name="hashtag-input"
                  placeholder="Type new hashtag here"
                />
              </label>
            </div>
          </div>

          <label class="card__img-wrap card__img-wrap--empty">
            <input
              type="file"
              class="card__img-input visually-hidden"
              name="img"
            />
            <img
              src="img/add-photo.svg"
              alt="task picture"
              class="card__img"
            />
          </label>

          <div class="card__colors-inner">
            <h3 class="card__colors-title">Color</h3>
            <div class="card__colors-wrap">
              <input
                type="radio"
                id="color-black-2"
                class="card__color-input card__color-input--black visually-hidden"
                name="color"
                value="black"
              />
              <label
                for="color-black-2"
                class="card__color card__color--black"
                >black</label
              >
              <input
                type="radio"
                id="color-yellow-2"
                class="card__color-input card__color-input--yellow visually-hidden"
                name="color"
                value="yellow"
              />
              <label
                for="color-yellow-2"
                class="card__color card__color--yellow"
                >yellow</label
              >
              <input
                type="radio"
                id="color-blue-2"
                class="card__color-input card__color-input--blue visually-hidden"
                name="color"
                value="blue"
              />
              <label
                for="color-blue-2"
                class="card__color card__color--blue"
                >blue</label
              >
              <input
                type="radio"
                id="color-green-2"
                class="card__color-input card__color-input--green visually-hidden"
                name="color"
                value="green"
              />
              <label
                for="color-green-2"
                class="card__color card__color--green"
                >green</label
              >
              <input
                type="radio"
                id="color-pink-2"
                class="card__color-input card__color-input--pink visually-hidden"
                name="color"
                value="pink"
                checked
              />
              <label
                for="color-pink-2"
                class="card__color card__color--pink"
                >pink</label
              >
            </div>
          </div>
        </div>

        <div class="card__status-btns">
          <button class="card__save" type="submit">save</button>
          <button class="card__delete" type="button">delete</button>
        </div>
      </div>
    </form>
  </article>
  `;
};

// Put random tasks to the page, number of the tasks is taken from 'ALL' filter that chosen by default
for (let i=0; i<filters[0]['numberOfIssues']; i++) {
  boardTasksNode.insertAdjacentHTML(`beforeend`,
    getTaskCard(
      taskTitles[getRandomNumber(3)],
      taskColors[getRandomNumber(4)],
      taskTypes[getRandomNumber(3)],
      taskIsEdit[getRandomNumber(1)]
    )
  );
}

// Show new tasks, if a filter has changes. Number of the tasks is taken from filter that has chosen
const filtersLinks = mainFiltersNode.getElementsByClassName('filter__label');
for (filtersLink of filtersLinks) {

  //Click event for each filter
  filtersLink.addEventListener('click', (event) => {

    const tasksNumber = event['currentTarget']['children'][0]['innerText'];
    boardTasksNode.innerHTML = '';

    // Put new tasks to the page
    for (let i=0; i<tasksNumber; i++) {
      boardTasksNode.insertAdjacentHTML(`beforeend`,
        getTaskCard(
          taskTitles[getRandomNumber(3)],
          taskColors[getRandomNumber(4)],
          taskTypes[getRandomNumber(3)],
          taskIsEdit[getRandomNumber(1)]
        )
      );
    }
  });
}
