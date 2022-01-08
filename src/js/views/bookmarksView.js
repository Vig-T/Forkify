import View from "./view";
import previewView from "./previewView";
import icons from "url:../../img/icons.svg";
import resultsView from "./resultsView";

class BookmarksView extends View {
  _parentElement = document.querySelector(".bookmarks__list");
  _errorMessage = `No bookmarks, yet find a nice recipe & bookmark it ;)`;
  _message = ``;
  _generateMarkup() {
    return this._data
      .map((bookmark) => previewView.render(bookmark, false))
      .join("");
  }
}

export default new BookmarksView();
