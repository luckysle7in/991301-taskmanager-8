import {Component} from "./component.js";
import moment from "moment";

const Color = {
  blue: `card--blue`,
  black: `card--black`,
  yellow: `card--yellow`,
  green: `card--green`,
  pink: `card--pink`,
};

class Task extends Component {
  constructor(data) {
    super();
    this._id = data.id;
    this._title = data.title;
    this._dueDate = data.dueDate;
    this._tags = data.tags;
    this._picture = data.picture;
    this._repeatingDays = data.repeatingDays;
    this._color = data.color;

    this._isFavorite = data.isFavorite;
    this._isDeleted = data.isDeleted;

    this._onChangeFavorite = this._onChangeFavorite.bind(this);
    this._onSaveFavorite = null;
    this._onEditButtonClick = this._onEditButtonClick.bind(this);
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

  _onEditButtonClick() {
    if (typeof this._onEdit === `function`) {
      this._onEdit();
    }
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

  set onEdit(fn) {
    this._onEdit = fn;
  }

  set onSaveFavorite(fn) {
    this._onSaveFavorite = fn;
  }

  get template() {
    return `
    <article class="card ${Color[this._color]} ${this._isRepeated() ? `card--repeat` : ``}">
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
                ${this._dueDate.toString() === (new Date(0)).toString() ? `` : moment(this._dueDate).format(`D MMMM, h:mm a`) }
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
              </div>
            </div>
          </div>
        </div>
      </form>
    </article>`.trim();
  }

  bind() {
    this._element.querySelector(`.card__btn--edit`)
        .addEventListener(`click`, this._onEditButtonClick.bind(this));
    this._element.querySelector(`.card__btn--favorites`)
        .addEventListener(`click`, this._onChangeFavorite);
  }

  unbind() {
    this._element.querySelector(`.card__btn--edit`)
        .removeEventListener(`click`, this._onEditButtonClick.bind(this));
    this._element.querySelector(`.card__btn--favorites`)
        .removeEventListener(`click`, this._onChangeFavorite);
  }

  update(data) {
    this._title = data.title;
    this._tags = data.tags;
    this._color = data.color;
    this._dueDate = data.dueDate;
    this._repeatingDays = data.repeatingDays;
    if (data.isFavorite === true || data.isFavorite === false) {
      this._isFavorite = data.isFavorite;
    }
  }

}

export {Task};
