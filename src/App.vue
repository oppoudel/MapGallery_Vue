<template>
  <div>
    <section class="nav has-shadow">
        <div class="container">
          <div class="nav-left">
            <a href="https://maps.baltimorecity.gov/"><img src="https://maps.baltimorecity.gov/graphics/logo/EPPIcon1.png" alt="Maps"></a>
            <div class="title is-1" >
              City of Baltimore: Maps Gallery
            </div>
          </div>
        </div>
     
    </section>
    <app-maps></app-maps> 
  </div>
</template>

<script>
import maps from './components/maps.vue';
export default {
  components: {
    'app-maps': maps
  }
}
</script>

<style scoped>
  .nav{
    background: #31363c;
  }
  .title{
    margin-top: 20px;
    color: #fff;
  }
  img{
    padding-top: 10px;
  }
</style>
