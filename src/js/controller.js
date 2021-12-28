import * as model from "../js/model.js";
import recipeView from "./views/recipeView.js";

import "core-js/stable";
import "regenerator-runtime/runtime";
import reciepeview from "./views/recipeView.js";

const recipeContainer = document.querySelector(".recipe");

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
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
    alert(err);
  }
};

const init = function () {
  recipeView.addRenderHandler(controlReciepe);
};
init();
