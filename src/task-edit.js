import flatpickr from "flatpickr";
import {Component} from "./component.js";
import moment from "moment";

const Color = {
  blue: `card--blue`,
  black: `card--black`,
  yellow: `card--yellow`,
  green: `card--green`,
  pink: `card--pink`,
};

class TaskEdit extends Component {
  constructor(data) {
    super();
    this._title = data.title;
    this._dueDate = data.dueDate;
    this._tags = data.tags;
    this._picture = data.picture;
    this._repeatingDays = data.repeatingDays;
    this._color = data.color;

    this._isFavorite = data.isFavorite;
    this._isDeleted = data.isDeleted;

    this._state.isDate = (new Date(this._dueDate)).getTime() ? true : false;
    this._state.isRepeated = Object.values(data.repeatingDays).includes(true);


    this._onChangeFavorite = this._onChangeFavorite.bind(this);
    this._onSaveFavorite = null;
    this._onSubmitButtonClick = this._onSubmitButtonClick.bind(this);
    this._onSubmit = null;
    this._onDeleteButtonClick = this._onDeleteButtonClick.bind(this);
    this._onDelete = null;
    this._onChangeDate = this._onChangeDate.bind(this);
    this._onChangeRepeated = this._onChangeRepeated.bind(this);
  }

  _processForm(formData) {
    const taskData = {
      title: ``,
      color: ``,
      tags: new Set(),
      dueDate: new Date(0),
      repeatingDays: {
        'mo': false,
        'tu': false,
        'we': false,
        'th': false,
        'fr': false,
        'sa': false,
        'su': false,
      }
    };

    const taskEditMapper = TaskEdit.createMapper(taskData);

    for (const pair of formData.entries()) {
      const [fieldName, fieldValue] = pair;
      if (taskEditMapper[fieldName]) {
        taskEditMapper[fieldName](fieldValue);
      }
    }

    return taskData;
  }

  _onSubmitButtonClick(evt) {
    evt.preventDefault();
    const formData = new FormData(this._element.querySelector(`.card__form`));
    const newData = this._processForm(formData);
    if (typeof this._onSubmit === `function`) {
      this._onSubmit(newData);
    }
    this.update(newData);
  }

  _onDeleteButtonClick() {
    this._isDeleted = true;
    this.unbind();
    if (typeof this._onDelete === `function`) {
      this._onDelete();
    }
  }

  _onChangeDate() {
    this._state.isDate = !this._state.isDate;
    this.unbind();
    this._partialUpdate();
    this.bind();
  }

  _onChangeRepeated() {
    this._state.isRepeated = !this._state.isRepeated;
    this.unbind();
    this._partialUpdate();
    this.bind();
  }

  _onChangeFavorite() {
    this._isFavorite = !this._isFavorite;
    this.unbind();
    if (typeof this._onSaveFavorite === `function`) {
      this._onSaveFavorite(this._isFavorite);
    }
    this._partialUpdate();
    this.bind();
  }

  _partialUpdate() {
    this._element.innerHTML = this.template;
  }

  _isRepeated() {
    return Object.values(this._repeatingDays).some((it) => {
      if (it === true) {
        return true;
      } else {
        return false;
      }
    });
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  set onDelete(fn) {
    this._onDelete = fn;
  }

  set onSaveFavorite(fn) {
    this._onSaveFavorite = fn;
  }

  get template() {
    return `
    <article class="card card--edit ${Color[this._color]} ${this._isRepeated() ? `card--repeat` : ``}">
      <form class="card__form" method="get">
        <div class="card__inner">
          <div class="card__control">
            <button type="button" class="card__btn card__btn--edit">edit</button>
            <button type="button" class="card__btn card__btn--archive">archive</button>
            <button type="button"
              class="card__btn card__btn--favorites ${this._isFavorite ? `` : `card__btn--disabled`}"
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
              <textarea class="card__text" placeholder="Start typing your text here..." name="text">${this._title}</textarea>
            </label>
          </div>

          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <button class="card__date-deadline-toggle" type="button">
                  date: <span class="card__date-status">${this._state.isDate ? `yes` : `no`}</span>
                </button>

                <fieldset class="card__date-deadline" ${!this._state.isDate && `disabled`}>
                  <label class="card__input-deadline-wrap">
                    <input
                      class="card__date"
                      type="text"
                      placeholder="23 September"
                      value="${new Date(this._dueDate).getTime() ? moment(this._dueDate).format(`D MMMM, h:mm a`) : `` }"
                      name="date"
                    />
                  </label>

                  <label class="card__input-deadline-wrap">
                    <input
                      class="card__time"
                      type="text"
                      placeholder="12:00"
                      value="${new Date(this._dueDate).getTime() ? moment(this._dueDate).format(`h:mm a`) : ``}"
                      name="time"
                    />
                  </label>
                </fieldset>

                <button class="card__repeat-toggle" type="button">
                  repeat: <span class="card__repeat-status">${this._state.isRepeated ? `yes` : `no`}</span>
                </button>

                <fieldset class="card__repeat-days" ${!this._state.isRepeated && `disabled`}>
                  <div class="card__repeat-days-inner">
                    <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-mo-5" name="repeat" value="mo" ${this._repeatingDays.mo && `checked`}/>
                    <label class="card__repeat-day" for="repeat-mo-5">mo</label>

                    <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-tu-5" name="repeat" value="tu" ${this._repeatingDays.tu && `checked`} />
                    <label class="card__repeat-day" for="repeat-tu-5">tu</label>

                    <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-we-5" name="repeat" value="we" ${this._repeatingDays.we && `checked`}/>
                    <label class="card__repeat-day" for="repeat-we-5" >w</label>

                    <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-th-5" name="repeat" value="th" ${this._repeatingDays.th && `checked`} />
                    <label class="card__repeat-day" for="repeat-th-5">th</label>

                    <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-fr-5" name="repeat" value="fr" ${this._repeatingDays.fr && `checked`} />
                    <label class="card__repeat-day" for="repeat-fr-5" >fr</label>

                    <input class="visually-hidden card__repeat-day-input" type="checkbox" name="repeat" value="sa" id="repeat-sa-5" ${this._repeatingDays.sa && `checked`} />
                    <label class="card__repeat-day" for="repeat-sa-5">sa</label>

                    <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-su-5" name="repeat" value="su" ${this._repeatingDays.su && `checked`} />
                    <label class="card__repeat-day" for="repeat-su-5" >su</label>
                  </div>
                </fieldset>
              </div>

              <div class="card__hashtag">
                <div class="card__hashtag-list">
                  ${Array.from(this._tags).map((tag) => {
    return `<span class="card__hashtag-inner">
                      <input type="hidden" name="hashtag" value="${tag}" class="card__hashtag-hidden-input" />
                      <button type="button" class="card__hashtag-name">#${tag}</button>
                      <button type="button" class="card__hashtag-delete">delete</button>
                    </span>`;
  }).join(``)}
                </div>

                <label>
                  <input type="text" class="card__hashtag-input" name="hashtag-input" placeholder="Type new hashtag here" />
                </label>
              </div>
            </div>

            <label class="card__img-wrap card__img-wrap--empty">
              <input type="file" class="card__img-input visually-hidden" name="img" />
            </label>

            <div class="card__colors-inner">
              <h3 class="card__colors-title">Color</h3>
              <div class="card__colors-wrap">
                <input type="radio" id="color-black-5" class="card__color-input card__color-input--black visually-hidden" name="color" value="black" ${this._color === `black` ? `checked` : ``} />
                <label for="color-black-5" class="card__color card__color--black">black</label>

                <input type="radio" id="color-yellow-5" class="card__color-input card__color-input--yellow visually-hidden" name="color" value="yellow" ${this._color === `yellow` ? `checked` : ``} />
                <label for="color-yellow-5" class="card__color card__color--yellow">yellow</label>

                <input type="radio" id="color-blue-5" class="card__color-input card__color-input--blue visually-hidden" name="color" value="blue" ${this._color === `blue` ? `checked` : ``} />
                <label for="color-blue-5" class="card__color card__color--blue">blue</label>

                <input type="radio" id="color-green-5" class="card__color-input card__color-input--green visually-hidden" name="color" value="green" ${this._color === `green` ? `checked` : ``} />
                <label for="color-green-5" class="card__color card__color--green">green</label>

                <input type="radio" id="color-pink-5" class="card__color-input card__color-input--pink visually-hidden" name="color" value="pink" ${this._color === `pink` ? `checked` : ``} />
                <label for="color-pink-5" class="card__color card__color--pink">pink</label>
              </div>
            </div>
          </div>

          <div class="card__status-btns">
            <button class="card__save" type="submit">save</button>
            <button class="card__delete" type="button">delete</button>
          </div>
        </div>
      </form>
    </article>`.trim();
  }

  bind() {
    this._element.querySelector(`.card__form`)
        .addEventListener(`submit`, this._onSubmitButtonClick);
    this._element.querySelector(`.card__delete`)
        .addEventListener(`click`, this._onDeleteButtonClick);
    this._element.querySelector(`.card__date-deadline-toggle`)
        .addEventListener(`click`, this._onChangeDate);
    this._element.querySelector(`.card__repeat-toggle`)
        .addEventListener(`click`, this._onChangeRepeated);
    this._element.querySelector(`.card__btn--favorites`)
        .addEventListener(`click`, this._onChangeFavorite);
    if (this._state.isDate) {
      flatpickr(this._element.querySelector(`.card__date`), {altInput: true, altFormat: `j F`, dateFormat: `j F`});
      flatpickr(this._element.querySelector(`.card__time`), {enableTime: true, noCalendar: true, altInput: true, altFormat: `h:i K`, dateFormat: `h:i K`});
    }
  }

  unbind() {
    this._element.querySelector(`.card__form`)
        .removeEventListener(`submit`, this._onSubmitButtonClick);
    this._element.querySelector(`.card__delete`)
        .removeEventListener(`click`, this._onDeleteButtonClick);
    this._element.querySelector(`.card__date-deadline-toggle`)
        .removeEventListener(`click`, this._onChangeDate);
    this._element.querySelector(`.card__repeat-toggle`)
        .removeEventListener(`click`, this._onChangeRepeated);
    this._element.querySelector(`.card__btn--favorites`)
        .removeEventListener(`click`, this._onChangeFavorite);
  }

  update(data) {
    this._title = data.title;
    this._tags = data.tags;
    this._color = data.color;
    this._repeatingDays = data.repeatingDays;
    this._dueDate = data.dueDate;
    if (data.isFavorite === true || data.isFavorite === false) {
      this._isFavorite = data.isFavorite;
    }
  }

  static createMapper(taskData) {
    return {
      hashtag: (fieldValue) => taskData.tags.add(fieldValue),
      text: (fieldValue) => {
        taskData.title = fieldValue;
      },
      color: (fieldValue) => {
        taskData.color = fieldValue;
      },
      repeat: (fieldValue) => {
        taskData.repeatingDays[fieldValue] = true;
      },
      date: () => {
        const fieldDate = new Date(document.querySelector(`.card__date.flatpickr-input`)._flatpickr.selectedDates[0]);
        taskData.dueDate.setDate(fieldDate.getDate());
        taskData.dueDate.setMonth(fieldDate.getMonth());
        taskData.dueDate.setFullYear(fieldDate.getFullYear());
      },
      time: () => {
        const fieldTime = new Date(document.querySelector(`.card__time.flatpickr-input`)._flatpickr.selectedDates[0]);
        taskData.dueDate.setHours(fieldTime.getHours());
        taskData.dueDate.setMinutes(fieldTime.getMinutes());
        taskData.dueDate.setSeconds(0);
      }
    };
  }

}

export {TaskEdit};
