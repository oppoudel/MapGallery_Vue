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
import { loadModules } from "esri-loader";
export default {
  data() {
    return {
      mapTitle: ""
    };
  },
  watch: {
    $route() {}
  },
  methods: {
    createMap() {
      const options = {
        url: "https://js.arcgis.com/4.7/"
      };
      loadModules(
        [
          "esri/views/MapView",
          "esri/WebMap",
          "esri/widgets/Expand",
          "esri/widgets/LayerList",
          "esri/widgets/Search"
        ],
        options
      ).then(([MapView, WebMap, Expand, LayerList, Search]) => {
        const webmap = new WebMap({
          portalItem: {
            id: this.$route.params.mapID
          }
        });
        const view = new MapView({
          map: webmap,
          container: "viewDiv"
        });
        view.constraints = {
          rotationEnabled: false
        };
        view.when(() => {
          this.mapTitle = webmap.portalItem.title;

          const layerList = new LayerList({
            view: view,
            container: document.createElement("div"),
            listItemCreatedFunction: function(event) {
              const item = event.item;
              item.panel = {
                content: "legend",
                open: true
              };
            }
          });

          const layersExpand = new Expand({
            view: view,
            content: layerList.domNode,
            expandIconClass: "esri-icon-layer-list",
            expandTooltip: "Layers"
          });
          view.ui.add(layersExpand, "top-right");
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
    this.createMap();
  }
};
</script>
<style>
@import url("https://js.arcgis.com/4.7/esri/themes/dark/main.css");
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
</style>
