import fetchRecipeData from "./fetch-recipe";

const submitSearch = () => {
    const searchInput = document.getElementById("searchRecipe");
    const submitSearch = document.getElementById("search-form");
    const mealType = document.getElementById("meal-type");
    const cuisineType = document.getElementById("cuisine");
    const dietType = document.getElementById("diet");
    const timeAmount = document.getElementById("time");

    submitSearch.addEventListener("submit", (e) => {
        e.preventDefault();
        fetchRecipeData(searchInput.value, mealType.value, cuisineType.value, dietType.value, timeAmount.value);
        console.log(searchInput.value, mealType.value, cuisineType.value, dietType.value, timeAmount.value)
    })
}

export default submitSearch