import {async} from "regenerator-runtime";
import {API_URL} from "./config";
import {GETJSON} from "./helper";

export const state = {
  reciepe: {},
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
    console.log(`${err} ♡ `);
  }
};
