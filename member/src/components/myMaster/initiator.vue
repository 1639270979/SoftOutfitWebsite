<template>
  <div id="initiator">
    <div class="img"><img src="./image/elite@2x.png" alt=""></div>
    <div class="info">
      <div v-html="info" id="txt">

      </div>
    </div>
    <my-zoom
      :isZoomShow="isZoomShow"
      @update:isZoomShow="val => isZoomShow = val"
      :zoomImgArr='zoomImgArr'
      :zoomIndex='zoomIndex'></my-zoom>
  </div>
</template>
<script type="text/javascript">
  import { eliteIntro } from '../../common/axios/api.js';
  import myZoom from '../public/zoom.vue'
  export default{
    data(){
      return {
        info:'',
        isZoomShow: false,
        zoomImgArr: [],
        zoomIndex: 0,
      }
    },
    components: {
      myZoom
    },
    methods:{
      ajaxFun(){
        eliteIntro().then(data=>{
          if(data.code==1){
            this.info = data.data;
          }
        })
        this.zoom();
      },
      zoom(){
        this.$nextTick(function(){
          let  txt = document.getElementById('txt');
          txt.addEventListener('click',(e) => {
            if (e.target.nodeName == 'IMG') {
              console.log(e.target);
              this.zoomImgArr = [];
              this.isZoomShow = true;
              this.zoomImgArr.push(e.target);

              this.zoomIndex = 0;
            }
          })
        })
      }
    },
    created(){
      this.ajaxFun();
    },
    mounted(){
      setTimeout(()=>{
        this.$nextTick(function(){
          let  txt = document.getElementById('txt');
          let p = txt.getElementsByTagName('p');
          let img,video;
          for (let i = 0;i < p.length;i++) {
            img = p[i].getElementsByTagName('img');
            video = p[i].getElementsByTagName('video');
            p[i].style.overflow = 'hidden';
            for(let j = 0; j <img.length;j++ ){
              img[j].style.height = '100%';
              img[j].style.width = '100%';
            }
            for(let k = 0; k<video.length;k++){
              video[k].style.width = '100%';
            }
          }
        })
      },500)
    }
  }
</script>
<style lang="less" scoped>
  @import '../../assets/mixin_750.less';
  #initiator{
    width: 100%;
    .img{
      width: 7.05rem;
      height:1.67rem;
      margin: 0.97rem auto 1.12rem;
      >img{
        width: 100%;
        height: 100%;
      }
    }
    .info{
      width: 100%;
      padding: 0 0.5rem;
     img{
       width: 100%;
       height: 100%;
     }
    }
  }
</style>
