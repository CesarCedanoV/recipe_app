import axios from 'axios';
import {proxy, key} from '../config';

export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  async getRecipe() {
    try {
      const result = await axios.get(`${proxy}https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`);
      this.title = result.data.recipe.title;
      this.author = result.data.recipe.publisher;
      this.img = result.data.recipe.image_url;
      this.url = result.data.recipe.source_url;
      this.ingredients = result.data.recipe.ingredients;
    } catch (err) {
      alert("Can't not get the Recipe");
      console.log(err);
    }
  }

  calcTime() {
    const numIng = this.ingredients.length;
    const periods = Math.ceil(numIng / 3);
    this.time = periods * 15;
  }

  calcServings() {
    this.servings = 4;
  }

  parseIngredients(){
    const unitsLong = ['tablespoons','tablespoon','ounces','ounce','teaspoons','teaspoon','cups','pounds'];
    const unitsShort = ['tbsp','tbsp', 'oz', 'oz','tsp','tsp','cup','pound'];

    const newIngredients = this.ingredients.map(el => {
      let ingredient = el.toLowerCase();
      unitsLong.forEach((unit,i)=>{
        ingredient = ingredient.replace(unit, unitsShort[i]);
      });

      ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

      const ingSplitted = ingredient.split(' ');
      const unitIndex = ingSplitted.findIndex(word => unitsShort.includes(word));
      
      let objIng;
      if (unitIndex > -1) {
        const ingCount = ingSplitted.slice(0, unitIndex);

        let count
        if (ingCount.length === 1) {
          count = eval(ingSplitted[0].replace('-','+'));
        }else {
          count = eval(ingSplitted.slice(0, unitIndex).join('+'))
        }
        objIng = {
          count,
          unit: ingSplitted[unitIndex],
          ingredient: ingSplitted.slice(unitIndex+1).join(' ')
        }

      }else if (parseInt(ingSplitted[0],10)) {
        objIng = {
          count: parseInt(ingSplitted[0], 10),
          unit: '',
          ingredient: ingSplitted.slice(1).join('')
        }
      }else if (unitIndex === -1) {
        objIng = {
          count: 1,
          unit: '',
          ingredient
        }
      }

      return objIng;
    });

    this.ingredients = newIngredients;
  }
}