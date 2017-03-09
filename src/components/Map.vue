<template>
  <div>
    <section class="nav has-shadow">
        <div class="container">
          <div class="nav-left">
            <router-link to="/"><img src="../assets/EPPIcon1.png" alt="Baltimore Logo" class="is-hidden-mobile"></router-link>
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
  computed: {
    createMap() {
      esriLoader.dojoRequire(["esri/views/MapView", 
      "esri/WebMap", 
      "esri/widgets/Expand",
      "esri/widgets/Legend", 
      "esri/widgets/LayerList",
      "esri/widgets/Search" 
      ], (MapView, WebMap, Expand, Legend, LayerList, Search) => {
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
              view: view,
              container: document.createElement("div")
            });
            const layerList = new LayerList({
              view: view,
              container: document.createElement("div")
            });
            const legendExpand = new Expand({
              view: view,
              content: legend.domNode,
              expandIconClass: "esri-icon-collection",
              expandTooltip: "Legend"
            });
            const layersExpand = new Expand({
              view: view,
              content: layerList.domNode,
              expandIconClass: "esri-icon-layer-list",
              expandTooltip: "Layers"
            });
            view.ui.add(layersExpand,"top-right");
            view.ui.add(legendExpand, "top-right");
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
  @import url('https://js.arcgis.com/4.3/esri/themes/light/main.css');
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
    width: 100%;
  }
  @media (max-width: 700px) {
    .esri-ui-bottom-right, .esri-ui-top-right{
      display: none;
    }
  }
</style>