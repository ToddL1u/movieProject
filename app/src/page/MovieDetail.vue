<template lang="pug">
div 
  el-card.box-card(v-if="this.movie")
    template(#header)
      .card-header
        router-link(to="/") 
          el-button.button-back(type="primary") Back
        h2 {{this.movie.film}}
        
    div 
      label Genre: 
      span {{this.movie.genre}}
    div
      label Studio: 
      span {{this.movie.studio}}
    div
      label User Rating: 
      span {{this.movie.score}}%
    div
      label Profitability: 
      span {{this.movie.profitability}}%
    div
      label Rotten Tomatoes: 
      span {{this.movie.rotten_tomatoes}}%
    div
      label Worldwide Gross: 
      span {{this.movie.gross}}m
    div
      label Year Release: 
      span {{this.movie.year}}
    el-divider
    Comments(:comments="commentData" @commentHandler="onCommentHalder")
  el-card.box-card(v-else)
    h2 {{this.error}}
    router-link(to="/") 
      el-button.button-back(type="primary") Back
</template>
<script>
import Comments from '../components/Comments.vue'
import axios from 'axios';
export default {
  components: {Comments},
  data: () => {
    return {
      movie: {
        film: "",
        genre: "",
        studio: "",
        score: 0,
        profitability: 1,
        rotten_tomatoes: 0,
        gross: 0,
        year: 0,
      },
      commentData: [],
      error: ""
    };
  },
  created() {
    axios.get(`http://localhost:8888/movie?id=${this.$route.params.id}`).then(res => {
      if(res.data.movie) {
        this.movie = res.data.movie;
        this.movie.profitability = this.movie.profitability.toFixed(2);
      } else {
        this.movie = null;
        this.error = res.data.message;
      }
    })
    axios.get(`http://localhost:8888/comments?movieId=${this.$route.params.id}`).then(res => {
      this.commentData = res.data.comments;
    })
  },
  methods: {
    onCommentHalder(data) {
      let payload = {...data, movieId: this.movie.id};
      axios.post("http://localhost:8888/comment", payload).then(res => {
        payload.id = res.data.id;
        this.commentData.unshift(payload);
      })
    }
  }
};
</script>
<style >
.card-header{
  width: 100%;
}
.card-header .button-back{
  float: right;
}
.box-card label{
  color: gray;
  margin-right: 0.5rem;
}
</style>
