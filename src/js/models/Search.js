import axios from 'axios';

export default class Search {
  constructor(query){
    this.query = query;
  }

  async getResults() {
    const proxy = 'https://cors-anywhere.herokuapp.com/'
    const key = 'ddb20b9553e549141d955b00a7392b3c';
    try{
      const result = await axios.get(`${proxy}https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
      this.results = result.data.recipes;
    }catch (error) {
      alert(error);
    }
   
  }

}
