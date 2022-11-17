import {createRouter, createWebHistory} from 'vue-router';
import Movies from '../page/Movies'
import MovieDetail from '../page/MovieDetail'
const routes = [
  {path: '/', component: Movies},
  {path: '/movie/:id', component: MovieDetail}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router;