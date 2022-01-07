import icons from "url:../../img/icons.svg";

export default class View {
  // rendering the data
  _data;
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markUp = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markUp);
  }
  update(data) {
    this._data = data;
    const newMarkUp = this._generateMarkup();
    const newDOM = document.createRange().createContextualFragment(newMarkUp);
    const newElements = Array.from(newDOM.querySelectorAll("*"));
    const currElements = Array.from(this._parentElement.querySelectorAll("*"));

    // Going through the elements & comparing them with old DOM
    newElements.forEach((newEl, i) => {
      const currEl = currElements[i];

      // Update Changes to TEXT
      if (
        !newEl.isEqualNode(currEl) &&
        newEl.firstChild?.nodeValue.trim() != ""
      ) {
        currEl.textContent = newEl.textContent;
      }

      // Update changes to ATTRIBUTES
      if (!newEl.isEqualNode(currEl)) {
        Array.from(newEl.attributes).forEach((attr) => {
          currEl.setAttribute(attr.name, attr.value);
        });
      }
    });
  }
  _clear() {
    this._parentElement.innerHTML = "";
  }
  renderError(message = this._errorMessage) {
    const markUp = `
         <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div> `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markUp);
  }
  renderMessage(message = this._message) {
    const markUp = `
         <div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div> `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markUp);
  }
  renderSpinner = function () {
    const markUp = `
  <div class="spinner">
    <svg>
        <use href="${icons}#icon-loader"></use>
    </svg>
  </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markUp);
  };
}
