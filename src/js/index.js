import Search from './models/Search';
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

    await state.search.getResults();

    clearLoader();
    searchView.renderResults(state.search.results);
  }

}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
  });
