<template>
  <div id="viewDiv"></div>
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
        view.then(function () {
          var legend = new Legend({
            view: view
          });
          view.ui.add(legend, "bottom-right");
        });

        var searchWidget = new Search({
          view: view
        });

        view.ui.add(searchWidget, {
          position: "top-left",
          index: 0
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
        url: 'https://js.arcgis.com/4.3/'
      });
    } else {
      createMap();
    }
  }
}
</script>
<style scoped>
  @import url('https://js.arcgis.com/4.3/esri/css/main.css');
  #viewDiv {
    height: 100vh;
    width: 100vw;
  }
</style>