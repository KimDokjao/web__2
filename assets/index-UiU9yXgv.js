(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const i of e)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function r(e){const i={};return e.integrity&&(i.integrity=e.integrity),e.referrerPolicy&&(i.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?i.credentials="include":e.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(e){if(e.ep)return;e.ep=!0;const i=r(e);fetch(e.href,i)}})();const o=document.getElementById("recipe-container"),a=document.getElementById("recipe-details-content"),l="https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood";async function d(){try{const t=await(await fetch(l)).json();t&&t.meals?p(t.meals):o.innerHTML="<p>No recipes found.</p>"}catch(s){console.error("Error fetching recipes:",s),o.innerHTML="<p>Error loading recipes.</p>"}}function p(s){o.innerHTML="",s.forEach(t=>{const r=document.createElement("div");r.classList.add("recipe-card"),r.innerHTML=`
      <img src="${t.strMealThumb}" alt="${t.strMeal}">
      <h3>${t.strMeal}</h3>
      <button data-recipe-id="${t.idMeal}">View Recipe</button>
    `,o.appendChild(r),r.querySelector("button").addEventListener("click",()=>{u(t.idMeal)})})}async function u(s){try{const t=`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${s}`,n=await(await fetch(t)).json();if(n&&n.meals&&n.meals[0]){const e=n.meals[0];a.innerHTML=`
        <h2>${e.strMeal}</h2>
        <img src="${e.strMealThumb}" alt="${e.strMeal}" width="200">
        <h3>Ingredients:</h3>
        <ul>
          ${f(e)}
        </ul>
        <h3>Instructions:</h3>
        <p>${e.strInstructions}</p>
      `}else a.innerHTML="<p>Recipe details not found.</p>"}catch(t){console.error("Error fetching recipe details:",t),a.innerHTML="<p>Error loading recipe details.</p>"}}function f(s){let t="";for(let r=1;r<=20;r++){const n=s[`strIngredient${r}`],e=s[`strMeasure${r}`];if(n&&n!==null&&n!=="")t+=`<li>${e} ${n}</li>`;else break}return t}d();
