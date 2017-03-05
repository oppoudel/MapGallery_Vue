<template>
  <div class="columns">
    <div class="column is-three-quarters">
      <div id="viewDiv"></div>
    </div>
    <div class="column">
      <h1>{{$route.params.mapID}}</h1>
    </div>
  </div>
</template>

<script>
import * as esriLoader from 'esri-loader';
export default {
  watch: {
    '$route' (to, from){
      console.log(watching);
    }
  },
  mounted(){
    const createMap= () => {
      esriLoader.dojoRequire(["esri/views/MapView", 
      "esri/WebMap", 
      "esri/widgets/Legend", 
      "esri/widgets/Search" 
      ], (MapView, WebMap, Legend, Search) => {
        const webmap = new WebMap({
          portalItem: {
            id: this.$route.params.mapID
          }
        });
        console.log(webmap);
        const view = new MapView({
          map: webmap,
          container: "viewDiv"
        });
      });
    }
    
    if (!esriLoader.isLoaded()) {
      esriLoader.bootstrap((err) => {
        if (err) {
          console.error(err);
        }
        createMap();
      }, {
        url: 'https://js.arcgis.com/4.2/'
      });
    } else {
      createMap();
    }
  }
}
</script>
<style scoped>
  @import url('https://js.arcgis.com/4.2/esri/css/main.css');
  #viewDiv {
    height: 500px;
    width: 100%;
  }
</style>