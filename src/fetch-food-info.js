import axios from "axios";

async function fetchFoodInfo (ingredient) {
    try {

        const response = await axios.get("https://api.edamam.com/api/food-database/v2/parser", {
            params: {
                app_id: "931dac1a",
                app_key: "58ec23312b4a3e36553f8c0dafcbd892",
                ingr: ingredient,
            }
            })

            const foodSearched = response.data;

            // const ingredientName =
            const ingredientOverview = document.getElementById(calculator-product-info-data);
            ingredientOverview.replaceChildren();
            ingredientOverview.innerHTML += `
            
            `

    } catch (e) {
        console.error(e);
    }
} export default fetchFoodInfo;