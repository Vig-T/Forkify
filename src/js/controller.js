import * as model from "../js/model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";

import "core-js/stable";
import "regenerator-runtime/runtime";
import reciepeview from "./views/recipeView.js";

const recipeContainer = document.querySelector(".recipe");

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
if (module.hot) {
  module.hot.accept();
}
const controlReciepe = async function () {
  try {
    // grabbing the hash
    const id = window.location.hash.slice(1);
    // Guard clause
    if (!id) return;
    recipeView.renderSpinner();

    // 1) Loading the reciepe
    await model.loadReciepe(id);

    // 2) rendering the reciepe
    recipeView.render(model.state.reciepe);
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

    resultsView.render(model.state.search.results);
  } catch (error) {
    console.log(error);
  }
};
controlSearchResults();
const init = function () {
  recipeView.addRenderHandler(controlReciepe);
  searchView.addHandlerSearch(controlSearchResults);
};
init();
