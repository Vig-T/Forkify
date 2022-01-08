import * as model from "../js/model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import BookmarksView from "./views/bookmarksView";
import paginationView from "./views/paginationView.js";

import "core-js/stable";
import "regenerator-runtime/runtime";
import bookmarksView from "./views/bookmarksView";

const recipeContainer = document.querySelector(".recipe");

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
// if (module.hot) {
//   module.hot.accept();
// }
const controlrecipe = async function () {
  try {
    // grabbing the hash
    const id = window.location.hash.slice(1);
    // Guard clause
    if (!id) return;
    recipeView.renderSpinner();

    // 0) Update results to mark the selected list
    resultsView.update(model.getResultPage());
    bookmarksView.update(model.state.bookMarks);

    // 1) Loading the recipe
    await model.loadrecipe(id);

    // 2) rendering the recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    // resultsView.renderSpinner();
    // 1) Get Search Query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Load Search Query
    await model.loadSearchResult(query);

    // 3) Render Results
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getResultPage());

    // 4) Pagination View
    // paginationView.render(model.state.search);
    paginationView.render(model.state.search);
  } catch (error) {
    console.log(error);
  }
};
controlSearchResults();

const controlPagination = function (goToPage) {
  // 1) Render NEW Results
  resultsView.render(model.getResultPage(goToPage));

  // 2) Render NEW Pagination View
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // 1) Update the recipe Servings (in state)
  model.updateServings(newServings);

  // 2) Update the view as well
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmarks = function () {
  // 1) Adding & Deleting the BookMarks
  if (!model.state.recipe.bookMarked) model.addBookmarks(model.state.recipe);
  else model.deleteBookmarks(model.state.recipe.id);

  // 2) Update BookMarks
  recipeView.update(model.state.recipe);
  // 3) render BookMarks
  bookmarksView.render(model.state.bookMarks);
};

const init = function () {
  recipeView.addRenderHandler(controlrecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerBookmark(controlAddBookmarks);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();
