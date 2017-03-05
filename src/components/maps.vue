<template>
  <div class="container" style="margin-top:20px;">
    <p class="content is-large">City of Baltimore: Maps Gallery is a collection of web maps for the community of City of Baltimore. Find the specific map by searching below.</p>
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