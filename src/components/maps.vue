<template>
  <div>
    <section class="nav has-shadow">
        <div class="container">
          <div class="nav-left">
            <router-link to="/"><img src="../assets/EPPIcon1.png" alt="Baltimore Logo"></router-link>
            <router-link to="/"><span class="title is-1 is-hidden-mobile"> City of Baltimore: </span><span class="title is-1"><small> <em>Maps Gallery</em></small> </span> </router-link>
          </div>
        </div>
    </section>
    <div class="container" style="margin-top:20px;">
      <p class="content is-medium">City of Baltimore: Maps Gallery is a collection of web maps for the community of City of Baltimore. Find the specific map by searching below.</p>
      <div class="columns">
        <div class="column is-half is-offset-one-quarter">
          <p class="control has-icon has-icon-right">
            <input type="text" class="input is-large" placeholder="Find a Map" v-model="filterQuery">
            <span class="icon is-medium">
              <i class="fa fa-search"></i>
            </span>
          </p>
        </div>
      </div>
      <div class="cards">
        <app-map-item v-for='map in displayedMaps' :key='map.id' :mapInfo='map'></app-map-item>
      </div>
    </div>
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
  import mapItem from './MapItem.vue';
  import axios from 'axios';

  export default {
    data() {
      return {
        maps: [],
        filterQuery: ''
      }
    },
    components: {
      'app-map-item': mapItem
    },
    computed: {
      displayedMaps() {
        var maps = this.maps;
        var filteredMaps = maps.filter(this.filterMaps)
        return filteredMaps;
      }
    },
    methods: {
      filterMaps(map) {
        var lowercaseName = map.title.toLowerCase();
        var lowercaseQuery = this.filterQuery.toLowerCase();
        return lowercaseName.indexOf(lowercaseQuery) > -1;
      }
    },
    created() {
      axios.get('https://www.arcgis.com/sharing/search?q=group%3A%22fe5dcb4c9a594c4796bee717c16ccc76%22&f=json&num=50&sortField=avgRating&sortOrder=desc')
        .then(response => {
          this.maps = response.data.results;
          console.log(this.maps);
        })
        .catch(
        error => console.log(error)
        );
    }
  }

</script>
<style scoped>
  .control{
    padding-left: 1.5%;
  }
  
</style>