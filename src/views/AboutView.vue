<template>
<div class="container  justify-content-center">
  <div class="row ">
    <div class="col-md-12">
      <h1>What is a Film<span>Nest</span></h1>
      <div id="description">

        <p><strong>FilmNest</strong>, is a movie tracking and collection application that allows you to discover your favorite movies, create watch lists and manage your personal movie collection. With FilmNest you can:
      <br>
      <br>
    <ul>
      <li><strong>Movie Discovery:</strong> FilmNest is a powerful movie discovery platform that lists popular and new movies for you via API.</li><br>
      <li><strong>Personal Collection Management:</strong> You can add or remove the movies you want to watch or have watched to your personal profile with a single click.</li><br>
      <li>
        <strong>Personal Profile:</strong> Each user can easily manage their favorite movies or watch lists by creating a profile that reflects their own movie taste.
      </li>
    </ul>
    <br>


    <strong>MovieNest</strong>, offers a simple and powerful tool for movie lovers; It organizes movies to watch, provides a discovery experience full of movie recommendations, and is the most practical way to manage your personal movie archive.
</p>

      </div>
    </div>
  </div>    
</div>
</template>

<style scoped>

.container {
  margin-top: 40px;
  z-index: -1;
}
.container li {
  text-align: left;
}
h1 {
  color: #fff;
  text-align: center;
}
span {
  color: red;
}
#description {
  width: 600px;
  color: #fff;
  font-size: 18px;
  padding-top: 30px;
}
@media (max-width: 426px) {
  #description {
    width: 100%;
  }
  .container {
    margin-top: 0px;
  }
}
</style>
