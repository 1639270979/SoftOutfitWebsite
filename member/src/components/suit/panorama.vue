<template>
  <div id="panorama">
    <div id="container"></div>
  </div>
</template>
<script>
  import * as THREE from 'three';
  import {
    PhotoSphereViewer,
    PSVNavBar,
    PSVNavBarButton,
    Sphoords
  } from './js/photo-sphere-viewer.js';
  export default{
      data(){
          return{
            img:'../static/image/snow.jpg'
          }
      },
    mounted(){
      window.THREE = THREE;
      var div = document.getElementById('container');
      var PSV = new PhotoSphereViewer({
        panorama: this.img,
        container: div,
        navbar: true,
        autoload:true,
        time_anim:false,
        navber_style:{
          backgroundColor:'rgba(58,67,77,0.7)'
        },
        size: {
          width: '100%',
          height: '300px'
        },
      });
      PSV.toggleFullscreen();
    }
  }
</script>
<style>
  #panorama{
    /*width:100%;*/
    /*height: 375px;*/
  }
  #container{
    /*width: 100%;*/
    /*height:100%;*/
  }
</style>
