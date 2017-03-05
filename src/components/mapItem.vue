<template>
  <a :href="getURL" class="card column" style="min-width:290px" >
    <span class="card-header" v-bind:style="{ backgroundImage: 'url(' + getThumbnail + ')' }">
      <span class="card-title">
        <h3>{{mapInfo.title}}</h3>
      </span>
    </span>
 </a>
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
            return 'http://cityview.baltimorecity.gov/webmap/?webmap=' + this.mapInfo.id;
          }
        }
    }
  }
</script>