import { elements } from './base';

export const getInputValue = () => elements.searchInput.value;

export const clearInputValue = () => {
  elements.searchInput.value = '';
};

export const clearResultsList = () => {
  elements.searchResultsList.innerHTML = '';
  elements.searchResultsPages.innerHTML = '';
};

export const highlightSelected = id => {
  const activeArr = Array.from(document.querySelectorAll('.results__link'));
  activeArr.forEach(el => {
    el.classList.remove('results__link--active');
  });
  document.querySelector(`.results__link[href*="#${id}"`).classList.add('results__link--active');
}

export const limitRecipeTitle = (title, limit = 17) => {
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

// direction: 'prev' or 'next'
const createPaginationButton = (page, direction) => `
<button class="btn-inline results__btn--${direction}" data-goto=${direction === 'prev' ? page - 1 : page +1}>
  <span>Page ${direction === 'prev' ? page - 1 : page +1}</span>
  <svg class="search__icon">
      <use href="img/icons.svg#icon-triangle-${direction === 'prev' ? 'left' : 'right'}"></use>
  </svg
</button>`;

const renderPaginationButtons = (currentPage, numItems, itemPerPage) => {
  const pages = Math.ceil(numItems / itemPerPage);
  let button;
  if (currentPage === 1 && pages > 1){
    button = createPaginationButton(currentPage,'next');
  }else if( currentPage < pages ) {
    button = `
      ${createPaginationButton(currentPage,'next')}
      ${createPaginationButton(currentPage,'prev')}
    `;
  }else if( currentPage === pages && pages > 1) {
    button = createPaginationButton(currentPage,'prev');
  }
  
  elements.searchResultsPages.insertAdjacentHTML('afterbegin', button);
};

export const renderResults = (recipes, itemPerPage = 10, page = 1) => {
  const start = (page - 1) * itemPerPage
  const end = page * itemPerPage;

  recipes.slice(start, end).forEach(renderRecipe);

  renderPaginationButtons(page,recipes.length, itemPerPage);
};