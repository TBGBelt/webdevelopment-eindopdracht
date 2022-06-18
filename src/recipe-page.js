import axios from "axios";


document.addEventListener('DOMContentLoaded', (event) => {
    const parameters = new URLSearchParams(window.location.search);
    const id = parameters.get('id');
    event.preventDefault();

    async function createRecipe() {
        try {
            const mainURL = "https://api.edamam.com/api/recipes/v2/";
            const response = await axios.get(`${mainURL}${id}`, {
                params: {
                    type: "public",
                    app_id: "c804ae75",
                    app_key: "90f73244f33dbc5fc80f218800eedde6",
                }
            })

            const chosenRecipe = response.data.recipe;
            const showRecipe = document.getElementById("recipe-title");
            const titleRecipe = chosenRecipe.label;
            const clockFace = new Image();
            clockFace.src = require("./assets/icons/time.png");
            const timeRecipe = chosenRecipe.totalTime;

            showRecipe.innerHTML += `
            <h1>${titleRecipe}</h1>
            <img src="${clockFace.src}" alt="time-icon">
            <p>${timeRecipe} min</p>
            `

            chosenRecipe.ingredientLines.map((ingredientLines) => {
                const ingredientList = document.getElementById("ingredient-list");
                ingredientList.innerHTML += `
                <li>${ingredientLines}</li>
                `
            })

            const recipeImage = chosenRecipe.image;
            const recipeImageDiv = document.getElementById("recipe-image")
            recipeImageDiv.innerHTML += `
                <img src="${recipeImage}" alt="placeholder text recipe image">
            `

            const recipeNutrients = chosenRecipe.totalNutrients;
            const totalCalories = Math.round(recipeNutrients.ENERC_KCAL.quantity);
            const totalFat = Math.round(recipeNutrients.FAT.quantity);
            const totalCarb = Math.round(recipeNutrients.CHOCDF.quantity);
            const totalSugar = Math.round(recipeNutrients.SUGAR.quantity);
            const totalProtein = Math.round(recipeNutrients.PROCNT.quantity);
            const totalSodium = Math.round(recipeNutrients.NA.quantity);
            const nutrientsTable = document.getElementById("nutrients-table")

            nutrientsTable.innerHTML +=
                `
                <tr>
                    <td class="recipe-nutrients-items__row-1">${recipeNutrients.ENERC_KCAL.label}</td>
                    <td class="recipe-nutrients-items__row-2">${totalCalories}</td>
                    <td class="recipe-nutrients-items__row-3">${recipeNutrients.ENERC_KCAL.unit}</td>                    
                </tr>
                <tr>
                    <td class="recipe-nutrients-items__row-1">${recipeNutrients.FAT.label}</td>
                    <td class="recipe-nutrients-items__row-2">${totalFat}</td>
                    <td class="recipe-nutrients-items__row-3">${recipeNutrients.FAT.unit}</td>                    
                </tr>
                <tr>
                    <td class="recipe-nutrients-items__row-1">${recipeNutrients.CHOCDF.label}</td>
                    <td class="recipe-nutrients-items__row-2">${totalCarb}</td>
                    <td class="recipe-nutrients-items__row-3">${recipeNutrients.CHOCDF.unit}</td>                    
                </tr>
                <tr>
                    <td class="recipe-nutrients-items__row-1">${recipeNutrients.SUGAR.label}</td>
                    <td class="recipe-nutrients-items__row-2">${totalSugar}</td>
                    <td class="recipe-nutrients-items__row-3">${recipeNutrients.SUGAR.unit}</td>                    
                </tr>
                <tr>
                    <td class="recipe-nutrients-items__row-1">${recipeNutrients.PROCNT.label}</td>
                    <td class="recipe-nutrients-items__row-2">${totalProtein}</td>
                    <td class="recipe-nutrients-items__row-3">${recipeNutrients.PROCNT.unit}</td>                    
                </tr>
                <tr>
                    <td class="recipe-nutrients-items__row-1">${recipeNutrients.NA.label}</td>
                    <td class="recipe-nutrients-items__row-2">${totalSodium}</td>
                    <td class="recipe-nutrients-items__row-3">${recipeNutrients.NA.unit}</td>                    
                </tr>
            `

            chosenRecipe.healthLabels.map((healthlabel) => {
                const healthLabelsIndicator = document.getElementById("health-labels");
                healthLabelsIndicator.innerHTML +=`
                <button class="recipe-page__health-label-item">${healthlabel}</button>
                `
            })
        } catch (e) {
            console.error
        }
    }

    createRecipe();
});