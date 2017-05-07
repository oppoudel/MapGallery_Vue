<template>
  <div>
    <section class="nav">
      <div class="container">
        <div class="nav-left">
          <router-link to="/">
            <img src="../assets/CITY-LOGO.png" alt="Baltimore Logo" class="is-hidden-mobile">
          </router-link>
          <router-link to="/">
            <span class="title is-1 mapTitle">
              <small>{{mapTitle}}</small>
            </span>
          </router-link>
        </div>
      </div>
    </section>
    <div id="viewDiv" class="balt-theme"></div>
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
<style>
@import url('https://js.arcgis.com/4.3/esri/themes/dark/main.css');
.mapTitle:hover,
.mapTitle.focus {
  color: #9f9f9f;
}

#viewDiv {
  height: calc(100vh - 7rem);
  width: 100%;
}

table th {
  color: #fff;
}

.esri-expand__container .esri-widget-button {
  width: 42px;
  height: 42px;
}

form input[type="text"]::-webkit-input-placeholder {
  color: #fff !important;
}

.balt-theme .esri-widget,
.balt-theme .esri-widget-button,
.balt-theme .esri-menu,
.balt-theme .esri-popup__main-container,
.balt-theme .esri-popup .esri-pointer-direction,
.balt-theme .esri-button {
  background-color: #42484f;
  color: #fff;
}

.balt-theme .esri-widget-button:focus,
.balt-theme .esri-widget-button:hover,
.balt-theme .esri-menu li:focus,
.balt-theme .esri-menu li:hover {
  background-color: #000;
  color: #fff;
}

.balt-theme .esri-button:focus,
.balt-theme .esri-button:hover {
  color: #fff;
}
</style>
