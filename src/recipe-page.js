import fetchRecipeData from "./fetch-recipe";

document.addEventListener('DOMContentLoaded', (event) => {
    const parameters = new URLSearchParams(window.location.search);
    const id = parameters.get('id');
    event.preventDefault();
    fetchRecipeData(id);