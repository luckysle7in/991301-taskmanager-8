import {Component} from "./component.js";

class Filter extends Component {
  constructor(data) {
    super();
    this._title = data.title;
    this._isChecked = data.isChecked;
  }

  get template() {
    const titleLowerCase = this._title;
    return `
      <span>
        <input
          type="radio"
          id="filter__${titleLowerCase}"
          class="filter__input visually-hidden"
          name="filter"
          ${this._isChecked ? `checked` : ``}
        />
        <label
          for="filter__${titleLowerCase}"
          class="filter__label"
          data-filter="${titleLowerCase}"
        >
          ${this._title} <span class="filter__count"></span>
        </label>
      </span>
    `.trim();
  }

  bind() {
  }

  unbind() {
  }

}

export {Filter};
