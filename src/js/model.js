import {async} from "regenerator-runtime";
import {API_URL, RESULT_PER_PAGE} from "./config";
import {GETJSON} from "./helper";

export const state = {
  // recipe state feature
  recipe: {},
  // Search feature
  search: {
    query: "",
    results: [],
    page: 1,
    resultsPerPage: RESULT_PER_PAGE,
  },
  bookMarks: [],
};

export const loadrecipe = async function (id) {
  try {
    const data = await GETJSON(`${API_URL}${id}`);

    // console.log(res, data);
    const {recipe} = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceURL: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    if (state.bookMarks.some((bookmark) => bookmark.id === id)) {
      state.recipe.bookMarked = true;
    } else {
      state.recipe.bookMarked = false;
    }
  } catch (err) {
    console.log(`${err} 💥 `);
    throw err;
  }
};

export const loadSearchResult = async function (query) {
  try {
    state.search.query = query;
    const data = await GETJSON(`${API_URL}?search=${query}`);
    state.search.results = data.data.recipes.map((rec) => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });

    // Reverting the page back to 1
    state.search.page = 1;
  } catch (error) {
    alert(error);
    throw error;
  }
};

export const getResultPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage; // 0
  const end = page * state.search.resultsPerPage; // 9
  // console.log(start, end);
  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach((ing) => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });
  state.recipe.servings = newServings;
};

export const addBookmarks = function (recipe) {
  // 1) Add BookMarks
  state.bookMarks.push(recipe);

  // 2) Mark current recipe as BookMarked
  if (recipe.id === state.recipe.id) state.recipe.bookMarked = true;
};

export const deleteBookmarks = function (id) {
  const index = state.bookMarks.findIndex((el) => el.id === id);
  state.bookMarks.slice(index, 1);
  if (id === state.recipe.id) state.recipe.bookMarked = false;
};
