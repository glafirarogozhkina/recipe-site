(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const r of e.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function n(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?e.credentials="include":t.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function s(t){if(t.ep)return;t.ep=!0;const e=n(t);fetch(t.href,e)}})();const u=document.getElementById("meals"),p=document.getElementById("meal-detail"),m=async()=>{const o=await(await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood")).json();u.innerHTML=o.meals.map(n=>`
      <div class="card" onclick="showMeal('${n.idMeal}')">
        <img src="${n.strMealThumb}" alt="${n.strMeal}">
        <p>${n.strMeal}</p>
      </div>
    `).join("")};window.showMeal=async a=>{const s=(await(await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${a}`)).json()).meals[0],t=s.strInstructions.split(/\r?\n/).filter(i=>i.trim()!==""),e=t.slice(0,3).map(i=>`<p>${i}</p>`).join(""),r=t.map(i=>`<p>${i}</p>`).join("");p.innerHTML=`
    <div class="card2">
      <h3>${s.strMeal}</h3>
      <img src="${s.strMealThumb}" alt="${s.strMeal}">
      <p><strong>Категория:</strong> ${s.strCategory}</p>
      <p><strong>Страна:</strong> ${s.strArea}</p>
      <div id="recipe-text">
        <p><strong>Рецепт:</strong></p>
        <div id="recipe-instructions">
          ${e}
        </div>
        <button id="toggle-instructions">Показать полностью</button>
      </div>
    </div>
  `;const l=document.getElementById("toggle-instructions"),d=document.getElementById("recipe-instructions");let c=!1;l.addEventListener("click",()=>{c=!c,d.innerHTML=c?r:e,l.textContent=c?"Скрыть":"Показать полностью"})};document.getElementById("theme-toggle").addEventListener("click",function(){document.body.classList.toggle("dark-theme"),document.body.classList.toggle("light-theme")});m();
