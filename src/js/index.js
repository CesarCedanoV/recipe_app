import axios from 'axios';

async function getResults(query) {
  const proxy = 'https://cors-anywhere.herokuapp.com/'
  const key = 'ddb20b9553e549141d955b00a7392b3c';
  try{
    const result = await axios.get(`${proxy}https://www.food2fork.com/api/search?key=${key}&q=${query}`);
    const recipes = result.data.recipes;
    console.log(recipes);
  }catch (error) {
    alert(error);
  }
 
}

getResults('lasagna');