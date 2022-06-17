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
        console.log(foodSearched)
        const foodFound = foodSearched.parsed[0].food;
        const foodName = foodFound.label;
        const foodWeight = foodSearched.hints[0].measures[0].weight;
        const foodCalories = foodFound.nutrients.ENERC_KCAL;
        const foodFat = Math.round(foodFound.nutrients.FAT);
        const foodCarbs = Math.round(foodFound.nutrients.CHOCDF);

        const ingredientOverview = document.getElementById("calculator-product-info-data");
        ingredientOverview.replaceChildren();

        ingredientOverview.innerHTML += `
            <td>${foodName}</td>
            <td>${foodWeight}</td>
            <td>gram</td>
            `

        const submitServingAmount = document.getElementById("calculator-servings-form__input");
        const addServingButton = document.getElementById("calculator__servings-form");

        addServingButton.addEventListener("submit", (e) => {
            e.preventDefault();

            const caloriesServingTotal = submitServingAmount.value * foodCalories;
            const fatServingTotal = submitServingAmount.value * foodFat;
            const carbsServingTotal = submitServingAmount.value * foodCarbs;

            const servingOverview = document.getElementById("calculator-data-table");
            const row = servingOverview.insertRow(1);
            const cellName = row.insertCell(0);
            const cellCalories = row.insertCell(1);
            const cellFat = row.insertCell(2);
            const cellCarb = row.insertCell(3);
            cellName.innerHTML = foodName;
            cellCalories.innerHTML = caloriesServingTotal;
            cellCalories.className = "serving-calories";
            cellFat.innerHTML = fatServingTotal;
            cellFat.className = "serving-fat"
            cellCarb.innerHTML = carbsServingTotal;
            cellCarb.className = "serving-carbs"


            let servingInfo = document.getElementsByClassName("serving-calories", "serving-fat", "serving-carbs");
            const totalCaloriesArray = []

            for (let i = 0; i < servingInfo.length ; i++) {
                totalCaloriesArray.push(servingInfo[i].innerText);
            }

            const caloriesStringToNum = totalCaloriesArray.map(str => {
                return Number(str);
            })
            const initialValue = 0;
            const totalAllCalories = caloriesStringToNum.reduce(
                (previousValue, currentValue) => previousValue + currentValue, initialValue
            );

            let calculatorTotalCal = document.getElementById("calculator-total-calories", "calculator-total-fat", "calculator-total-carbs");
            calculatorTotalCal.innerHTML = totalAllCalories;

        })



    } catch (e) {
        console.error(e);
    }
} export default fetchFoodInfo;