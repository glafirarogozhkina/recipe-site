const listContainer = document.getElementById("meals");
const detailContainer = document.getElementById("meal-detail");


const fetchMeals = async () => {
  const res = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood");
  const data = await res.json();
  listContainer.innerHTML = data.meals
    .map(
      (meal) => `
      <div class="card" onclick="showMeal('${meal.idMeal}')">
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <p>${meal.strMeal}</p>
      </div>
    `
    )
    .join("");
};


window.showMeal = async (id) => {
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const data = await res.json();
  const meal = data.meals[0];

  const instructionsArray = meal.strInstructions.split(/\r?\n/).filter(p => p.trim() !== "");
  const shortInstructions = instructionsArray.slice(0, 3).map(p => `<p>${p}</p>`).join("");
  const fullInstructions = instructionsArray.map(p => `<p>${p}</p>`).join("");

  detailContainer.innerHTML = `
    <div class="card2">
      <h3>${meal.strMeal}</h3>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
      <p><strong>Категория:</strong> ${meal.strCategory}</p>
      <p><strong>Страна:</strong> ${meal.strArea}</p>
      <div id="recipe-text">
        <p><strong>Рецепт:</strong></p>
        <div id="recipe-instructions">
          ${shortInstructions}
        </div>
        <button id="toggle-instructions">Показать полностью</button>
      </div>
    </div>
  `;

  const btn = document.getElementById("toggle-instructions");
  const instructionsDiv = document.getElementById("recipe-instructions");
  let expanded = false;

  btn.addEventListener("click", () => {
    expanded = !expanded;
    instructionsDiv.innerHTML = expanded ? fullInstructions : shortInstructions;
    btn.textContent = expanded ? "Скрыть" : "Показать полностью";
  });
};


document.getElementById("theme-toggle").addEventListener("click", function () {
  document.body.classList.toggle("dark-theme");
  document.body.classList.toggle("light-theme");
});


fetchMeals();
