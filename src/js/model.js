import {async} from "regenerator-runtime";
import {API_URL, RESULT_PER_PAGE} from "./config";
import {GETJSON} from "./helper";

export const state = {
  // reciepe state feature
  reciepe: {},
  // Search feature
  search: {
    query: "",
    results: [],
    page: 1,
    resultsPerPage: RESULT_PER_PAGE,
  },
};

export const loadReciepe = async function (id) {
  try {
    const data = await GETJSON(`${API_URL}${id}`);

    // console.log(res, data);
    const {recipe} = data.data;
    state.reciepe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceURL: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
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
    console.log(state.search.results);
  } catch (error) {
    alert(error);
    throw error;
  }
};

export const getResultPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage; // 0
  const end = page * state.search.resultsPerPage; // 9
  console.log(start, end);
  return state.search.results.slice(start, end);
};
