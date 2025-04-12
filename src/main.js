const recipeContainer = document.getElementById('recipe-container');
const recipeDetailsContent = document.getElementById('recipe-details-content');

const apiUrl = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood'; 

async function fetchRecipes() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data && data.meals) {
      displayRecipeList(data.meals);
    } else {
      recipeContainer.innerHTML = '<p>No recipes found.</p>';
    }
  } catch (error) {
    console.error('Error fetching recipes:', error);
    recipeContainer.innerHTML = '<p>Error loading recipes.</p>';
  }
}

function displayRecipeList(recipes) {
  recipeContainer.innerHTML = '';

  recipes.forEach(recipe => {
    const recipeCard = document.createElement('div');
    recipeCard.classList.add('recipe-card');
    recipeCard.innerHTML = `
      <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
      <h3>${recipe.strMeal}</h3>
      <button data-recipe-id="${recipe.idMeal}">View Recipe</button>
    `;
    recipeContainer.appendChild(recipeCard);

    recipeCard.querySelector('button').addEventListener('click', () => {
      displayRecipeDetails(recipe.idMeal);
    });
  });
}

async function displayRecipeDetails(recipeId) {
  try {
    const detailsUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`;
    const response = await fetch(detailsUrl);
    const data = await response.json();

    if (data && data.meals && data.meals[0]) {
      const recipe = data.meals[0];
      recipeDetailsContent.innerHTML = `
        <h2>${recipe.strMeal}</h2>
        <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}" width="200">
        <h3>Ingredients:</h3>
        <ul>
          ${getIngredientsList(recipe)}
        </ul>
        <h3>Instructions:</h3>
        <p>${recipe.strInstructions}</p>
      `;
    } else {
      recipeDetailsContent.innerHTML = '<p>Recipe details not found.</p>';
    }
  } catch (error) {
    console.error('Error fetching recipe details:', error);
    recipeDetailsContent.innerHTML = '<p>Error loading recipe details.</p>';
  }
}

function getIngredientsList(recipe) {
  let ingredientsList = '';
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];

    if (ingredient && ingredient !== null && ingredient !== "") {
      ingredientsList += `<li>${measure} ${ingredient}</li>`;
    } else {
      break;
    }
  }
  return ingredientsList;
}

fetchRecipes();