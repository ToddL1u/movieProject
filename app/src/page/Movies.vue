<template lang="pug">
div 
  .header
    h1 Movies
    el-form-item
      el-input(type="text" placeholder="search film name" @blur="onFilter" v-model="filterStr")
  .movies
    router-link(:to="'/movie/'+m.id" v-for="(m, index) in filterMovie" :key="m.id") 
      el-card.movie-item {{'#'(index+1)}} {{m.film}}
        el-tag.genre(type="success") {{m.genre}}
      
</template>
<script>
import axios from 'axios';
export default {
  data: () => {
    return {
      movies: [],
      filterStr: ""
    }
  },
  computed: {
    filterMovie() {
      if(this.filterStr.trim().length > 0) {
        return this.movies.filter(m => m.film.toLowerCase().includes(this.filterStr.toLowerCase()));
      }
      return this.movies;
    }
  },
  created() {
    axios.get('http://localhost:8888/movies').then(res => {
      this.movies = res.data.movies;
    }).catch(err => {
      console.log(err);
    })
  },
  methods: {
    onFilter() {
      
    }
  }
};
</script>
<style >
.genre{
  float: right;
}
.movie-item{
  margin-bottom: 0.5rem;
}
.header{
  background: white ;
  padding: 5px;
  position: fixed;
  width: 100%;
  top: 0;
}
.movies{
  margin-top: 180px;
}
</style>
