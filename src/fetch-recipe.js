import axios from "axios";

async function fetchRecipeData(searchQuery, chosenMealType, chosenCuisine, chosenDiet, chosenTime) {
    try {


        const response = await axios.get("https://api.edamam.com/api/recipes/v2", {
            params: {
                type: "public",
                app_id: "c804ae75",
                app_key: "90f73244f33dbc5fc80f218800eedde6",
                q: searchQuery,
                mealType: chosenMealType ? chosenMealType : null,
                cuisineType: chosenCuisine ? chosenCuisine : null,
                diet: chosenDiet ? chosenDiet : null,
                time: chosenTime ? chosenTime : null,
            }
        })


        const searchResults = response.data.hits;
        console.log(searchResults)
        const resultAmount = searchResults.slice(0, 12);
        const recipeResults = document.getElementById('fetched-recipe-search')
        const clockFace = new Image();
        clockFace.src = require("./assets/icons/time.png")
        recipeResults.replaceChildren()

        resultAmount.map((recipe) => {
            const id = recipe.recipe.uri.split("_")[1];
            const caloriesRounded = Math.round(recipe.recipe.calories);
            recipeResults.innerHTML += `
            <div class="fetched-recipes__card">        
                <img src="${recipe.recipe.image}" alt="${recipe.recipe.label}">
                <a id="recipe-page" href="recipe-page.html?id=${id}" target="_blank" class="recipe-link" >
                <div class="fetched-recipes-card__title">
                   <h5>${recipe.recipe.label}</h5>
                    <div class="fetched-recipes-card__calories-ingredients">
                        <p>${caloriesRounded} calories | ${recipe.recipe.ingredients.length} ingredients</p>
                        <div class="fetched-recipes-card__time">
                            <img src="${clockFace.src}" alt="time">
                            <p>${recipe.recipe.totalTime} min</p>
                        </div>
                    </div>
           
                </div>
                </a>
            </div>
             `
        })
    } catch (e) {
        console.error(e);

    }

}

export default fetchRecipeData;