<template lang="pug">
div 
  .header
    h1 Movies
    el-form-item
      el-input(type="text" placeholder="search film name" v-model="filterStr")
  .movies(v-show="filterMovie.length > 0")
    router-link(:to="'/movie/'+m.id" v-for="(m, index) in filterMovie" :key="m.id") 
      el-card.movie-item {{'#'+(index+1)}} {{m.film}}
        el-tag.genre(type="success") {{m.genre}}
  .movies(v-show="filterMovie.length == 0")
    h2 there's none movie matches your search!
      
</template>
<script setup>
import axios from "axios";
import { ref, computed } from "vue";
const filterStr = ref("");
const movies = ref([]);
const filterMovie = computed(() => {
  if (filterStr.value.trim().length > 0) {
    return movies.value.filter((m) =>
      m.film.toLowerCase().includes(filterStr.value.toLowerCase())
    );
  }
  return movies.value;
});

const dataFetch = () => {
  axios
    .get("http://localhost:8888/movies")
    .then((res) => {
      movies.value = res.data.movies;
    })
    .catch((err) => {
      console.log(err);
    });
};
dataFetch();
// return { filterStr, movies, filterMovie };
</script>
<style>
.genre {
  float: right;
}
.movie-item {
  margin-bottom: 0.5rem;
}
.header {
  background: white;
  padding: 5px;
  position: fixed;
  width: 100%;
  top: 0;
}
.movies {
  margin-top: 150px;
  height: calc(100% - 500px);
}
</style>
