import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';

const state = {};

const controlSearch = async () => {
  const query = searchView.getInputValue();

  if (query) {
    state.search = new Search(query);

    searchView.clearInputValue();
    searchView.clearResultsList();
    renderLoader(elements.searchResults);

    try {
      await state.search.getResults();
      
      clearLoader();
      searchView.renderResults(state.search.results);
    } catch (err) {
      alert("Can't load the recipes!")
      clearLoader();
    }

    
  }

}


const recipe = new Recipe(47746);
recipe.getRecipe(46956);
console.log(recipe)


elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
  });

  elements.searchResultsPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
      const goToPage = parseInt(btn.dataset.goto);
      searchView.clearResultsList();
      searchView.renderResults(state.search.results, 10,goToPage);
    }
  });