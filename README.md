## Installation
docker compose up -d

## apiService
node, express
set up connectionPool as a middleware for db connection,
there're 4 api in this serivce,
1. url: movies, action: get, to fetch movie list with name, id and genre
2. url: movie, action: get, to fetch movie detail with movie id
3. url: comments, action: get, query: id, to fetch whole comments related to a movie with certain movie id
4. url: comment, action: post, params: {movieId, username, comment}, to post a comment to a certain movie

## app
vue
site url: http://localhost:8081
the movies will be loading automatilly, user can use filter input to filter movies,
if the filter doesn't match any movie, will display "there's none movie matches your search!",
click movie item can link to movie detail page, if user redirect to movie detail with random movie id, 
page will display error message.

## db
mysql
movie database which consistes two tables, movies and comments,
the movie data has been pre-generated in database