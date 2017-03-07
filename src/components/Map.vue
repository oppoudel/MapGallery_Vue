<template>
  <div>
    <div class="title">{{mapTitle}}</div>
    <div id="viewDiv"></div>
  </div>
</template>

<script>
import * as esriLoader from 'esri-loader';
export default {
  data() {
    return {
      mapTitle: ''
    }
  },
  watch: {
    '$route' (to, from){
      console.log(watching);
    }
  },
  methods: {
    createMap() {
      esriLoader.dojoRequire(["esri/views/MapView", 
      "esri/WebMap", 
      "esri/widgets/Legend", 
      "esri/widgets/LayerList",
      "esri/widgets/Search" 
      ], (MapView, WebMap, Legend, LayerList, Search) => {
        const webmap = new WebMap({
          portalItem: {
            id: this.$route.params.mapID
          }
        });
        const view = new MapView({
          map: webmap,
          container: "viewDiv"
        });
        let self = this;
        view.then (function() {
          self.mapTitle = webmap.portalItem.title;
          const legend = new Legend({
            view: view
          });
          const layerList = new LayerList({
            view: view
          });
          view.ui.add(layerList,"top-right");
          view.ui.add(legend, "bottom-right");
        });
        const searchWidget = new Search({
          view: view
        });

        view.ui.add(searchWidget, {
          position: "top-left",
          index: 0
        });
      });
    }
  },
  created() {    
    if (!esriLoader.isLoaded()) {
      esriLoader.bootstrap((err) => {
        if (err) {
          console.error(err);
        }
        this.createMap();
      }, {
        url: 'https://js.arcgis.com/4.3/'
      });
    } else {
      this.createMap();
    }
  }
}
</script>
<style scoped>
  @import url('https://js.arcgis.com/4.3/esri/css/main.css');
  .title{
    font-size: 2em;
    left: 50%;
    margin: 0 -8em;
    position: absolute;
    text-align: center;
    /*top: 15px;*/
    width: 16em;
    z-index: 5;
    background: #444;
  }
  #viewDiv {
    height: 100vh;
    width: 100vw;
  }
  @media (max-width: 700px) {
    .esri-ui-bottom-right{
      display: none;
    }
  }
</style>