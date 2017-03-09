<template>
  <div> 
    <a v-if = "webApplication" :href="getURL" class="card column" style="min-width:290px" >
      <span class="card-header" :style="{ backgroundImage: 'url(' + getThumbnail + ')' }">
        <span class="card-title">
          <h3>{{mapInfo.title}}</h3>
        </span>
      </span>
    </a>
    <router-link :to="getURL" class="card column" style="min-width:290px" v-else>
      <span class="card-header" :style="{ backgroundImage: 'url(' + getThumbnail + ')' }">
        <span class="card-title">
          <h3>{{mapInfo.title}}</h3>
        </span>
      </span>
    </router-link>
  </div>
</template>

<script>
  export default {
    props: ['mapInfo'],
    computed: {
        getThumbnail() {
          return 'https://arcgis.com/sharing/content/items/'+this.mapInfo.id+'/info/'+this.mapInfo.thumbnail;
      },
        getURL(){
          var url = this.mapInfo.url;
          if (url) {
            return url;
          } else {
            return '/map/' + this.mapInfo.id;
          }
        },
        webApplication(){
          if (this.mapInfo.url) return true;
          else return false;
        }
    }
  }
</script>
