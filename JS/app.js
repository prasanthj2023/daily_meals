function getRandomMeal() {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(response => response.json())
        .then(data => {
            const meal = data.meals[0];
            displayRandomMeal(meal);
        })
        .catch(error => console.error('Error fetching data:', error));
}

function displayRandomMeal(meal) {
    const randomMealSection = document.getElementById('randomMeal');
    randomMealSection.innerHTML = '';

    const mealImage = document.createElement('img');
    mealImage.src = meal.strMealThumb;
    mealImage.alt = meal.strMeal;
    randomMealSection.appendChild(mealImage);

    const mealName = document.createElement('p');
    mealName.textContent = meal.strMeal;
    randomMealSection.appendChild(mealName);

    mealImage.addEventListener('click', function () {
        showIngredientsModal(meal.idMeal);
    });
}

function showIngredientsModal() {
    const modal = document.getElementById('ingredientsModal');
    modal.style.display = 'block';

    const ingredientsListModal = document.getElementById('ingredientsListModal');
    ingredientsListModal.innerHTML = '';

    const mealName = document.getElementById('randomMeal').querySelector('p').textContent;

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
        .then(response => response.json())
        .then(data => {
            const meal = data.meals[0];
            for (let i = 1; i <= 20; i++) {
                const ingredient = meal['strIngredient' + i];
                const measure = meal['strMeasure' + i];

                if (ingredient && ingredient.trim() !== '') {
                    const listItem = document.createElement('li');
                    listItem.textContent = `${measure} ${ingredient}`;
                    ingredientsListModal.appendChild(listItem);
                }
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}

function closeIngredientsModal() {
    const modal = document.getElementById('ingredientsModal');
    modal.style.display = 'none';
}

document.getElementById('searchInput').addEventListener('input', function () {
    const searchQuery = this.value.trim();
    const searchedMealsSection = document.getElementById('searchedMealsSection');
    const randomMealSection = document.getElementById('randomMealSection');

    if (searchQuery !== '') {
        // Perform search
        searchMealCategory(searchQuery);
        searchedMealsSection.style.display = 'block';
        randomMealSection.style.display = 'none';
    } else {
        // Clear search results and show random meal
        searchedMealsSection.style.display = 'none';
        randomMealSection.style.display = 'block';
    }
});

function showIngredientsModal(mealId) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(response => response.json())
        .then(data => {
            const meal = data.meals[0];
            const modal = document.getElementById('ingredientsModal');
            modal.style.display = 'block';

            const ingredientsListModal = document.getElementById('ingredientsListModal');
            const instructionsModal = document.getElementById('instructionsModal');
            ingredientsListModal.innerHTML = '';

            // Display ingredients
            for (let i = 1; i <= 20; i++) {
                const ingredient = meal['strIngredient' + i];
                const measure = meal['strMeasure' + i];

                if (ingredient && ingredient.trim() !== '') {
                    const listItem = document.createElement('li');
                    listItem.textContent = `${measure} ${ingredient}`;
                    ingredientsListModal.appendChild(listItem);
                }
            }

            // Display instructions
            const instructions = meal.strInstructions;
            instructionsModal.textContent = instructions;

        })
        .catch(error => console.error('Error fetching data:', error));
}


function searchMealCategory(category) {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
        .then(response => response.json())
        .then(data => {
            const searchedMeals = document.getElementById('searchedMeals');
            searchedMeals.innerHTML = '';

            // Check if data.meals is not null and is an array
            if (data.meals && Array.isArray(data.meals)) {
                data.meals.forEach(meal => {
                    const mealContainer = document.createElement('div');
                    mealContainer.className = 'meal-container';

                    const mealImage = document.createElement('img');
                    mealImage.src = meal.strMealThumb;
                    mealImage.alt = meal.strMeal;

                    // Attach an event listener to the meal image
                    mealImage.addEventListener('click', function () {
                        showIngredientsModal(meal.idMeal);
                    });

                    const mealName = document.createElement('p');
                    mealName.textContent = meal.strMeal;

                    mealContainer.appendChild(mealImage);
                    mealContainer.appendChild(mealName);
                    searchedMeals.appendChild(mealContainer);
                });
            } else {
                console.error('No meals found for the given category.');
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}

const msg = document.querySelector(".msg");
const sumbitbtn = document.getElementById("submitbtn");

msg.addEventListener("focus", submsg);

function submsg() {
  sumbitbtn.style.display = "block";
  sumbitbtn.style.animation = "slide 0.5s ease-in-out";
}
