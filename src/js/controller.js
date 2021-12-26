import * as model from "../js/model.js";
import recipeView from "./views/reciepeView.js";

import "core-js/stable";
import "regenerator-runtime/runtime";

const recipeContainer = document.querySelector(".recipe");

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

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

// whenever the hashchanges run the reciepe function
["HashChange", "load"].forEach((ev) =>
  window.addEventListener(ev, controlReciepe)
);
// window.addEventListener("hashchange", controlReciepe);
// window.addEventListener("load", controlReciepe);
