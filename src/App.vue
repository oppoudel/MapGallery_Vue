<template>
  <div>
    <section class="nav has-shadow">
        <div class="container">
          <div class="nav-left">
            <router-link to="/"><img class="is-hidden-mobile" src="./assets/EPPIcon1.png" alt="Baltimore Logo"></router-link>
            <router-link to="/"><span class="title is-1"> City of Baltimore: <small> <em>Maps Gallery</em></small> </span> </router-link>
          </div>
        </div>
    </section>
    <router-view></router-view>
    <footer class="footer">
      <div class="container">
        <p class="subtitle is-1">EGIS Maps</p>
        <p class="content">For more maps, web mapping applications, and GIS data visit the <a href="http://moit.baltimorecity.gov/geographic-information-services"> City of Baltimore EGIS </a>          Website, <a href="https://data.baltimorecity.gov/">Open Baltimore</a>, or <a href="http://cityview.baltimorecity.gov/">CityView</a>.
          Also, you can stay up to date by following us on 
          <a href="https://www.facebook.com/Baltimore-City-Enterprise-GIS-Services-211559173332/"> Facebook <span class="icon"> <i class="fa fa-facebook"> </i> </span> </a> and <a href="https://twitter.com/BaltCityGIS"> Twitter <span class="icon"><i class="fa fa-twitter"></i></span></a>. 
          Email us for additional maps and comments on: <a href="mailto:gis@baltimorecity.gov">gis@baltimorecity.gov</a></p>
          <p>© 2017 City of Baltimore</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
 
}
</script>

<style scoped>
  .nav{
    background: #31363c;
  }
  .nav-left{
    align-items: center;
  }
  .title {
    text-align: center;
    color: #fff;
  }
  img{
    padding-top: 10px;
  }
</style>
