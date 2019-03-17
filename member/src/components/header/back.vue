<template>
  <div class="title">
    <p id="back">{{title}}</p>
  </div>
</template>
<script>
  export default{
      props:['title'],
      data(){
          return{

          }
      },
  }
</script>
<style lang="less" scoped>
  .title{
    width: 4rem;
    margin: auto;
    #back{
      width: 4rem;
      margin: auto;
      position: fixed;
      line-height:1.2rem;
      text-align: center;
      font-size: 0.42rem;
      z-index: 9999;
    }
  }
</style>
