<template>
  <div id="delay">
    <p class="title">申请延迟理由：</p>
    <p class="txt">{{delay_reason}}</p>
    <p class="title">补充说明：</p>
    <p class="txt">{{delay_memo}}</p>
    <div class="btn">
      <span @click="btnFun('2')">不同意</span>
      <span @click="btnFun('1')" class="agree">同意</span>
    </div>
    <div class="deny" v-if="disagree">
      <div class="mask">
        <p class="title">选择理由</p>
        <select v-model="select">
          <option value="1">设计师未与本人联系说明原因</option>
          <option value="2">延时申请理由不合理</option>
          <option value="3">其他原因：请手动填写拒绝原因</option>
        </select>
        <p class="txt">补充说明</p>
        <textarea placeholder="您可以详细说明理由~" v-model="content"></textarea>
        <div class="btn">
          <span @click="disagree=false">取消</span>
          <span class="confirm" @click="confirm">确定</span>
        </div>
      </div>
    </div>
    <div class="consent" v-if="isAgree">
      <div class="con">
        <p class="title2">提示</p>
        <p class="text">您的订单将由该设计师继续为您设计</p>
        <p class="txt2">如有疑问，请联系大美客服0755-86337169</p>
        <router-link tag="span" to="/member/designOrder">知道了</router-link>
      </div>
    </div>
  </div>
</template>
<script>
  import { agreeDelay } from './../../common/axios/api'
  export default{
    data(){
      return{
        oid:this.$route.params.oid,
        delay_reason:this.$route.params.reason,
        delay_memo:this.$route.params.memo,
        isAgree:false,
        disagree:false,
        content:'',
        select:1,
        type:'',
      }
    },
    methods:{
      ajaxFun:function(obj){
        agreeDelay(obj).then((data)=>{
          if(data.code==1){
            this.txtFun(data.msg,1500);
            this.$router.go(-1);
          }else{
            this.txtFun(data.msg,1500);
          }
        })
      },
      txtFun: function(str,time) {
        this.$store.state.publicJS.promptBoxMsg = str;
        this.$store.commit('txtPrompt');
        setTimeout(() => {
          this.$store.commit('txtPrompt');
        },time);
      },
      btnFun:function(n){
        if(n=='1'){
          this.type = 1;
          let obj = {oid:this.oid,type:this.type};
          agreeDelay(obj).then((data)=>{
            if(data.code==1){
              this.isAgree=true;
            }else{
              this.txtFun(data.msg,1500);
            }
          })
        }else if(n=='2'){
          this.disagree=true;
        }
      },
      confirm:function(){
        this.type = 2;
        let obj;
        if(this.select!=3){
          obj={oid:this.oid,type:this.type,reason:this.select,memo:this.content};
          this.ajaxFun(obj);
        }else if(this.select==3){
          if(!(/\S/.test(this.content))){
            this.txtFun('请输入您的拒绝理由',1000);
          }else{
              obj = {oid:this.oid,type:this.type,reason:this.select,memo:this.content};
              this.ajaxFun(obj);
          }
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  @import '../../assets/mixin.less';
  #delay{
    width: 100%;
    padding: 0.63rem  0.64rem 0;
    border-top: 1px solid #E3E3E3;
    .title{
      font-size:0.4rem;
      font-weight:400;
      color:rgba(0,0,0,1);
      padding-bottom: 0.35rem;
    }
    .txt{
      font-size:0.35rem;
      font-weight:400;
      color:rgba(106,106,106,1);
      padding-bottom: 0.7rem;
    }
    .btn{
      display: flex;
      justify-content: space-between;
      >span{
        width:2.99rem;
        height:0.87rem;
        background:rgba(255,255,255,1);
        border:1px solid rgba(188,188,188,1);
        text-align: center;
        font-size:0.4rem;
        line-height:0.87rem;
        color:rgba(0,0,0,1);
        border-radius:0.1rem;
      }
      .agree{
        border: 0;
        background: #FE9200;
        color: #fff;
      }
    }
    .consent{
      position: fixed;
      top:0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 999;
      background: rgba(1,1,1,0.5);
      .con{
        width: 7.63rem;
        margin: auto;
        margin-top: 4.85rem;
        background: #fff;
        border-radius: 0.1rem;
        padding-bottom: 0.47rem;
        .title2{
          font-size:0.64rem;
          font-weight:400;
          color:rgba(0,0,0,1);
          text-align: center;
          padding-top: 1.49rem;
          padding-bottom: 0.48rem;
        }
        .text{
          font-size:0.4rem;
          font-weight:400;
          color:rgba(0,0,0,1);
          text-align: center;
          padding-bottom: 0.2rem;
        }
        .txt2{
          color: #818181;
          font-size: 0.32rem;
          text-align: center;
          padding-bottom:0.72rem ;
        }
        >span{
          display: block;
          width:2.99rem;
          height:0.87rem;
          background:rgba(255,255,255,1);
          border:1px solid rgba(188,188,188,1);
          border-radius:0.1rem;
          text-align: center;
          line-height:0.87rem;
          margin: auto;
        }
      }
    }
    .deny{
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 999;
      background: rgba(1,1,1,0.5);
      .mask{
        background: #fff;
        width: 7.63rem;
        margin: auto;
        margin-top: 3.2rem;
        border-radius: 0.1rem;
        .title{
          text-align: center;
          font-size:0.64rem;
          font-weight:400;
          color:rgba(0,0,0,1);
          padding-top: 1.49rem;
        }
        select{
          outline: none;
          display: block;
          width: 6.29rem;
          margin: auto;
          height:1rem;
          line-height:1rem;
          border: 1px solid #BCBCBC;
          //隐藏select的下拉图标
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          padding-left: 0.3rem;
          color: #818181;
          background: url("./image/xiala.png") no-repeat 5.7rem;
          background-size:0.41rem 0.39rem;
        }
        .txt{
          font-size:0.35rem;
          font-weight:400;
          color:rgba(0,0,0,1);
          padding-left: 0.68rem;
          padding-top: 0.47rem;
        }
        textarea{
          display: block;
          position: relative;
          top:-0.5rem;
          width: 6.29rem;
          height: 2.68rem;
          border: 1px solid #BCBCBC;
          margin: auto;
          padding-top: 0.2rem;
          padding-left: 0.3rem;
        }
        .btn{
          padding: 0 0.65rem 1rem;
          >span{
            width: 2.99rem;
            font-size: 0.4rem;
          }
          .confirm{
            border: 0;
            background: #FE9200;
            color: #fff;
          }
        }
      }
    }
  }
</style>
