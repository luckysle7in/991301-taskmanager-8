export default (caption, amount, isChecked = false) => {
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
    <label for="filter__${captionLowerCase}" class="filter__label">
      ${caption} <span class="filter__${captionLowerCase}-count">${amount}</span></label
    >
  `;
};
