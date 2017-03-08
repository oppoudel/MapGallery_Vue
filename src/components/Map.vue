<template>
  <div>
    <section class="nav has-shadow">
        <div class="container">
          <div class="nav-left">
            <router-link to="/"><img src="../assets/EPPIcon1.png" alt="Baltimore Logo"></router-link>
            <router-link to="/"><span class="title is-1"><small>{{mapTitle}}</small> </span> </router-link>
          </div>
        </div>
    </section>
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
    '$route' (){
      
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
        view.then (() => {
          this.mapTitle = webmap.portalItem.title;
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
  mounted() {    
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
  img{
    height: 4rem;
  }
  .title{
    padding-left: 1rem;
  }
  .title:hover, .title:focus{
    color: #00d1b2;
  }
  #viewDiv {
    height: calc(100vh - 5rem);
    width: 100vw;
  }
  @media (max-width: 700px) {
    .esri-ui-bottom-right, .esri-ui-top-right{
      display: none;
    }
  }
</style>