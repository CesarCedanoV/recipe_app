import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import { elements, renderLoader, clearLoader } from './views/base';

const state = {};
window.state = state;

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

const controlRecipe = async () => {
  const id = window.location.hash.replace('#','');
  console.log(id);

  if (id){
    recipeView.clearRecipe();
    renderLoader(elements.recipe);

    if (state.search) searchView.highlightSelected(id);

    state.recipe = new Recipe(id);

    try{
      await state.recipe.getRecipe();
      state.recipe.parseIngredients();
  
      state.recipe.calcTime();
      state.recipe.calcServings();
  
      clearLoader();
      recipeView.renderRecipe(state.recipe);

    }catch (err){
      console.log(err);
      alert('Error processing Recipe');
    }
  } 
};

['hashchange','load'].forEach(event => window.addEventListener(event, controlRecipe));

const controlList = () => {
  if (!state.list) state.list = new List();

  state.recipe.ingredients.forEach(el => {
    const item = state.list.addItem(el.count, el.unit, el.ingredient);
    listView.renderItem(item);
  });
}

elements.shopping.addEventListener('click',e => {
  const id  = e.target.closest('.shopping__item').dataset.itemid;

  if (e.target.matches('.shopping__delete, .shopping__delete *')) {

    state.list.deleteItem(id);

    listView.deleteItem(id);
    
  } else if (e.target.matches('.shopping__count-value')) {
    const val = parseFloat(e.target.value,10)
    state.list.updateCount(id, val);
  }
});

elements.recipe.addEventListener('click', e => {
  if (e.target.matches('.btn-decrease, .btn-decrease *') ) {
    if (state.recipe.servings > 1){
      state.recipe.updateServings('dec');
      recipeView.updateServingsIngredients(state.recipe);
    }
  } else if (e.target.matches('.btn-increase, .btn-increase *') ) {
    state.recipe.updateServings('inc');
    recipeView.updateServingsIngredients(state.recipe);
  } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {  
    controlList();
  }
});



window.l = new List();