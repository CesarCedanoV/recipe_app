import { elements } from './base';

export const getInputValue = () => elements.searchInput.value;

export const clearInputValue = () => {
  elements.searchInput.value = '';
};

export const clearResultsList = () => {
  elements.searchResultsList.innerHTML = '';
};

const limitRecipeTitle = (title, limit = 17) => {
  const finalTitle = [];
  if (title.length > limit) {
    title.split(' ').reduce( (acc, cur) => {
      if (acc + cur.length <= limit) {
        finalTitle.push(cur);
      }
      return acc + cur.length;
    }, 0);
    return `${finalTitle.join(' ')} ...`;
  }
  return title;
}

const renderRecipe = recipe => {
  const markup = `
    <li>
      <a class="results__link" href="#${recipe.recipe_id}">
          <figure class="results__fig">
              <img src="${recipe.image_url}" alt=">${recipe.title}">
          </figure>
          <div class="results__data">
              <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
              <p class="results__author">${recipe.publisher}</p>
          </div>
      </a>
    </li>
  `;
  elements.searchResultsList.insertAdjacentHTML('beforeend', markup);
};

export const renderResults = recipes => {
  recipes.forEach(renderRecipe)
};