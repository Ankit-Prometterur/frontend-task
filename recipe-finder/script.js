const recipeGrid = document.getElementById('recipeGrid');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const sortFilter = document.getElementById('sortFilter');
const noResults = document.getElementById('noResults');

const totalRecipes = document.getElementById('totalRecipes');
const filteredRecipes = document.getElementById('filteredRecipes');

let allRecipes = [];

async function fetchRecipes() {
    const response = await fetch('https://dummyjson.com/recipes');
    const data = await response.json();

    allRecipes = data.recipes.map(recipe => ({
        title: recipe.name,
        ingredients: recipe.ingredients,
        instructions: Array.isArray(recipe.instructions)
            ? recipe.instructions
            : [recipe.instructions],
        image: recipe.image,
        category: recipe.mealType?.[0] || 'General',
        cookingTime: recipe.cookTimeMinutes || 20,
        description: `A tasty ${recipe.name} recipe with ${recipe.ingredients.slice(0, 3).join(', ')} and more.`
    }));

    populateCategories();
    updateStats(allRecipes);
    renderRecipes(allRecipes);
}

function populateCategories() {
    const categories = [...new Set(allRecipes.map(recipe => recipe.category))];

    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

function renderRecipes(recipes) {
    recipeGrid.innerHTML = '';

    if (recipes.length === 0) {
        noResults.style.display = 'block';
        return;
    }

    noResults.style.display = 'none';

    recipes.forEach(recipe => {
        const card = document.createElement('div');
        card.className = 'recipe-card';

        card.innerHTML = `
      <div class="badge">${recipe.category}</div>
      <img src="${recipe.image}" alt="${recipe.title}">

      <div class="recipe-content">
        <h2>${recipe.title}</h2>

        <div class="recipe-info">
          <span><i class="fa-regular fa-clock"></i> ${recipe.cookingTime} mins</span>
          <span>${recipe.ingredients.length} ingredients</span>
        </div>

        <p>${recipe.description}</p>

        <button class="view-btn">View Recipe</button>
      </div>
    `;

        card.addEventListener('click', () => openRecipeModal(recipe));
        recipeGrid.appendChild(card);
    });
}

function filterRecipes() {
    const search = searchInput.value.toLowerCase();
    const category = categoryFilter.value;
    const sort = sortFilter.value;

    let filtered = allRecipes.filter(recipe => {
        const titleMatch = recipe.title.toLowerCase().includes(search);

        const ingredientMatch = recipe.ingredients.some(ingredient =>
            ingredient.toLowerCase().includes(search)
        );

        const categoryMatch = category === 'all' || recipe.category === category;

        return (titleMatch || ingredientMatch) && categoryMatch;
    });

    if (sort === 'time-low') {
        filtered.sort((a, b) => a.cookingTime - b.cookingTime);
    } else if (sort === 'time-high') {
        filtered.sort((a, b) => b.cookingTime - a.cookingTime);
    } else if (sort === 'title') {
        filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    updateStats(filtered);
    renderRecipes(filtered);
}

function updateStats(recipes) {
    totalRecipes.textContent = allRecipes.length;
    filteredRecipes.textContent = recipes.length;
}

const recipeModal = document.getElementById('recipeModal');
const closeModal = document.getElementById('closeModal');

function openRecipeModal(recipe) {
    document.getElementById('modalImage').src = recipe.image;
    document.getElementById('modalTitle').textContent = recipe.title;
    document.getElementById('modalCategory').textContent = recipe.category;
    document.getElementById('modalTime').textContent = `${recipe.cookingTime} mins`;

    const ingredientsList = document.getElementById('ingredientsList');
    ingredientsList.innerHTML = '';

    recipe.ingredients.forEach(item => {
        ingredientsList.innerHTML += `<div class="ingredient-item">${item}</div>`;
    });

    const instructionsList = document.getElementById('instructionsList');
    instructionsList.innerHTML = '';

    recipe.instructions.forEach((step, index) => {
        instructionsList.innerHTML += `
        <div class="step">
        <strong>Step ${index + 1}:</strong> ${step}
        </div>
        `;
    });

    recipeModal.style.display = 'flex';
}


closeModal.addEventListener('click', () => {
    recipeModal.style.display = 'none';
});

recipeModal.addEventListener('click', e => {
    if (e.target === recipeModal) {
        recipeModal.style.display = 'none';
    }
});

searchInput.addEventListener('input', filterRecipes);
categoryFilter.addEventListener('change', filterRecipes);
sortFilter.addEventListener('change', filterRecipes);

fetchRecipes();