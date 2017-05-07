<template>
  <div>
    <section class="nav">
      <div class="container">
        <div class="nav-left">
          <router-link to="/">
            <img src="../assets/CITY-LOGO.png" alt="Baltimore Logo">
          </router-link>
          <router-link to="/">
            <span class="title is-1 is-hidden-mobile"> City of Baltimore:</span>
            <span class="title is-1">
              <em>
                <small> Maps Gallery</small>
              </em>
            </span>
          </router-link>
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
        <p class="content">For more maps, web mapping applications, and GIS data visit the
          <a href="http://moit.baltimorecity.gov/geographic-information-services"> City of Baltimore EGIS </a> Website,
          <a href="https://data.baltimorecity.gov/">Open Baltimore</a>, or
          <a href="http://cityview.baltimorecity.gov/">CityView</a>. Also, you can stay up to date by following us on
          <a href="https://www.facebook.com/Baltimore-City-Enterprise-GIS-Services-211559173332/"> Facebook
            <span class="icon">
              <i class="fa fa-facebook"> </i>
            </span>
          </a> and
          <a href="https://twitter.com/BaltCityGIS"> Twitter
            <span class="icon">
              <i class="fa fa-twitter"></i>
            </span>
          </a>. Email us for additional maps and comments on:
          <a href="mailto:gis@baltimorecity.gov">gis@baltimorecity.gov</a>
        </p>
        <p>© 2017 City of Baltimore</p>
      </div>
    </footer>
  </div>
</template>
<script>
  import mapItem from './MapItem.vue';
  import axios from 'axios';
  import config from '../config';

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
        const maps = this.maps;
        const filteredMaps = maps.filter(this.filterMaps)
        return filteredMaps;
      }
    },
    methods: {
      filterMaps(map) {
        const strTags = map.tags.join(' ').toLowerCase();
        const lowercaseName = map.title.toLowerCase();
        const selection = strTags + lowercaseName
        const lowercaseQuery = this.filterQuery.toLowerCase();
        return selection.indexOf(lowercaseQuery) > -1;
      }
    },
    created() {
      axios.get(config.getUrl())
        .then(response => {
          this.maps = response.data.results;
        })
        .catch(
        error => console.log(error)
        );
    }
  }
</script>
<style>
.is-medium {
  text-align: center;
}

.control {
  margin-right: 0.5em;
}

.cards {
  display: -webkit-flex;
  display: flex;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-flex-wrap: wrap;
  flex-wrap: wrap;
  padding: 1.5%;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

.card {
  position: relative;
  margin-bottom: 30px;
  background: #fefff9;
  color: #363636;
  text-decoration: none;
  -moz-box-shadow: rgba(0, 0, 0, 0.19) 0 0 2px 0;
  -webkit-box-shadow: rgba(0, 0, 0, 0.19) 0 0 2px 0;
  box-shadow: rgba(0, 0, 0, 0.19) 0 0 2px 0;
  -moz-border-radius: 4px;
  -webkit-border-radius: 4px;
  border-radius: 4px;
  border: 2px solid lightgray;
}

@media (max-width: 700px) {
  .card {
    width: 100%;
  }
  .esri-ui-bottom-right {
    display: none;
  }
}

@media (min-width: 700px) {
  .card {
    margin-right: 20px;
    margin-bottom: 20px;
  }
}

@media (min-width: 1010px) {
  .card {
    max-width: 320px;
    margin-right: 30px;
    margin-bottom: 30px;
  }
}

.card span {
  display: block;
}

.card .card-summary {
  padding: 5% 5% 3% 5%;
}

.card .card-header {
  position: relative;
  height: 175px;
  overflow: hidden;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-color: rgba(255, 255, 255, 0.15);
  background-blend-mode: overlay;
  -moz-border-radius: 4px 4px 0 0;
  -webkit-border-radius: 4px;
  border-radius: 4px 4px 0 0;
}

.card .card-header:hover,
.card .card-header:focus {
  background-color: rgba(255, 255, 255, 0);
}

.card .card-title {
  background: rgba(49, 54, 60, 0.85);
  padding: 3.5% 0 2.5% 0;
  color: white;
  font-family: 'Roboto Condensed', sans-serif;
  text-transform: uppercase;
  position: absolute;
  bottom: 0;
  width: 100%;
}

.card .card-title h3 {
  font-size: 1.2em;
  line-height: 1.2;
  padding: 0 3.5%;
  margin: 0;
}

.card:hover,
.card:focus {
  background: white;
  -moz-box-shadow: rgba(0, 0, 0, 0.45) 0px 0px 20px 0px;
  -webkit-box-shadow: rgba(0, 0, 0, 0.45) 0px 0px 20px 0px;
  box-shadow: rgba(0, 0, 0, 0.45) 0px 0px 20px 0px;
}

.card:hover .card-title,
.card:focus .card-title {
  background: rgba(71, 93, 4, 0.90);
}

* {
  -moz-transition-property: background-color, border-color, box-shadow, color, opacity, text-shadow, -moz-transform;
  -o-transition-property: background-color, border-color, box-shadow, color, opacity, text-shadow, -o-transform;
  -webkit-transition-property: background-color, border-color, box-shadow, color, opacity, text-shadow, -webkit-transform;
  transition-property: background-color, border-color, box-shadow, color, opacity, text-shadow, transform;
  -moz-transition-duration: 0.2s;
  -o-transition-duration: 0.2s;
  -webkit-transition-duration: 0.2s;
  transition-duration: 0.2s;
  -moz-transition-timing-function: linear;
  -o-transition-timing-function: linear;
  -webkit-transition-timing-function: linear;
  transition-timing-function: linear;
}

.footer {
  padding-top: 1.5rem;
}
</style>
