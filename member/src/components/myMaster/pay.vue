<template>
  <div id="pay">
    <div class="info">
      <div><span>姓名</span><input type="text" placeholder="请输入你的姓名" v-model="name"></div>
      <div><span>手机</span><input type="tel" placeholder="请输入你常用的手机号码" v-model="tel"></div>
      <div>
        <span>验证码</span>
        <input class="code" type="tel" placeholder="请输入验证码" v-model="code">
        <button v-show="show" @click="getCode">获取验证码</button>
        <button v-show="!show">{{count}}s</button>
      </div>
      <div><span>参加人数</span><input type="tel" @input="handleInput" placeholder="请输入参加人数" v-model.number="num"></div>
      <!--<div>-->
        <!--<i class="ali"></i><span>支付宝支付</span>-->
        <!--<input type="radio" id="Alipay" name="pay" v-model="isChe" value="1">-->
        <!--<label for="Alipay"></label>-->
      <!--</div>-->
      <!--<div>-->
        <!--<i class="wx"></i><span>微信支付</span>-->
        <!--<input type="radio" id="wechat" name="pay" v-model="isChe" value="2">-->
        <!--<label for="wechat"></label>-->
      <!--</div>-->
      <div><span>待支付：</span><p>¥<a>{{money}}</a></p></div>
    </div>
    <div class="btnBox">
      <div>取消</div>
      <div class="btn2" @click="submit">提交</div>
    </div>
  </div>
</template>
<script type="text/javascript">
  import { elitegetVf, applyActivity ,activityDetail } from '../../common/axios/api.js';
  export default{
    data(){
      return {
        aid :this.$route.params.aid,
        show: true,
        count: '',
        timer: null,
        name:'',
        tel:'',
        code:'',
        num:"",
        price:''
      }
    },
    computed:{
      money:function(){
        let m = this.num*this.price;
        return m;
      }
    },
    methods:{
      handleInput(e){
        this.num=e.target.value.replace(/[^\d]/g,'');
      },
      getCode(){
        if (!(/^1[3|4|5|7|8]{1}\d{9}$/.test(this.tel))) {
          this.txtPromptFun('请输入联系方式');
          return;
        }
        elitegetVf({mobile:this.tel}).then(data=>{
          if(data.code==1){
            const TIME_COUNT = 60;
            if (!this.timer) {
              this.count = TIME_COUNT;
              this.show = false;
              this.timer = setInterval(() => {
                if (this.count > 0 && this.count <= TIME_COUNT) {
                  this.count--;
                } else {
                  this.show = true;
                  clearInterval(this.timer);
                  this.timer = null;
                }
              }, 1000)
            }
          }
        });
      },
      txtPromptFun: function(str) {
        this.$store.state.publicJS.promptBoxMsg = str;
        this.$store.commit('txtPrompt');
        setTimeout(() => {
          this.$store.commit('txtPrompt');
        },1000);
      },
      submit(){
        if (!(/[a-zA-Z\s\u4e00-\u9fa5]{2,16}/.test(this.name))) {
          this.txtPromptFun('姓名为2-16位且不能为数字');
          return;
        }else if(!(/\S/.test(this.name))) {
          this.txtPromptFun('姓名不能为空');
          return;
        }else if (!(/^1[3|4|5|7|8]{1}\d{9}$/.test(this.tel))) {
          this.txtPromptFun('请输入联系方式');
          return;
        }else if(!(/\S/.test(this.code))){
          this.txtPromptFun('请输入验证码');
          return;
        }else if (this.num < 1) {
          this.txtPromptFun('参加人数不能少于一位');
          return;
        }
        let obj = {
          aid : this.aid,
          name :this.name,
          mobile : this.tel,
          quantity : this.num,
          verify  :this.code
        };
        applyActivity(obj).then(data=>{
          if(data.code==1){
            this.$router.push({ path: '/orderPay',query:{oid:data.oid,'type':'activity_pay','money':data.price}})
          }else {
            this.txtPromptFun(data.msg);
          }
        })
      },
      ajaxFun(){
        activityDetail({aid:this.aid}).then(data=>{
          if(data.code==1){
            this.price = data.info.price;
          }
        })
      }
    },
    created(){
      this.ajaxFun();
    }
  }
</script>
<style lang="less" scoped>
  @import '../../assets/mixin_750.less';
  #pay{
    width: 100%;
    .info{
      >div:first-child{
        border-top: 1px solid #e5e5e5;
      }
      >div{
        width: 100%;
        height: 1.41rem;
        line-height:1.41rem;
        border-bottom: 1px solid #e5e5e5;
        >span{
          display: inline-block;
          padding-left: 0.31rem;
          width: 2rem;
          font-size: 0.32rem;
          color: #1E1E1E;
        }
        >input{
          width: 7.39rem;
          height: 1rem;
          text-align: right;
        }
        .code{
          width: 5rem;
        }
        >input::placeholder{
          text-align: right;
          font-size: 0.32rem;
        }
        >button{
          float: right;
          width: 2.07rem;
          height: 0.81rem;
          font-size: 0.3rem;
          color: #1F4E79;
          border: 1px solid #1F4E79;
          background: #fff;
          border-radius: 0.1rem;
          margin-right: 0.61rem;
          margin-top: 0.3rem;
          outline: none;
        }
        .ali{
          display: inline-block;
          vertical-align: middle;
          margin-left: 0.36rem;
          width: 0.56rem;
          height: 0.56rem;
          background: url("./image/alPay@2x.png") no-repeat ;
          background-size: 100%,100%;
        }
        .wx{
          display: inline-block;
          vertical-align: middle;
          margin-left: 0.36rem;
          width: 0.56rem;
          height: 0.56rem;
          background: url("./image/wxPay@2x.png") no-repeat ;
          background-size: 100%,100%;
        }
        >input[type="radio"]{
          margin-left: 5.25rem;
          width: 0.43rem;
          vertical-align: middle;
          position: absolute;
          clip: rect(0, 0, 0, 0);
        }
        >input[type="radio"] + label::before {
          margin-left: 5.81rem;
          content: "\a0"; /*不换行空格*/
          display: inline-block;
          vertical-align: middle;
          width: 0.43rem;
          height: 0.43rem;
          border-radius: 50%;
          border: 1px solid #989898;
          line-height: 1;
        }
        >input[type="radio"]:checked + label::before {
          width: 0.43rem;
          height: 0.43rem;
          background: url("image/choose_ico@2x.png") no-repeat center #1F4E79;
          background-size:0.36rem,0.24rem;
        }
        >p{
          display: inline-block;
          color: #1F4E79;
          font-size: 0.32rem;
          margin-left: -0.3rem;
          >a{
            color: #1F4E79;
            font-size: 0.48rem;
          }
        }
      }
    }
    .btnBox{
      padding: 0 0.36rem;
      margin-top: 0.89rem;
      display: flex;
      justify-content: space-between;
      >div{
        width: 4.37rem;
        height: 1.01rem;
        line-height:1.01rem;
        text-align: center;
        font-size:0.45rem;
        color: #171717;
        border: 1px solid #989898;
        border-radius: 0.1rem ;
      }
      .btn{
        background: #ECECEC;
        color: #A4A4A4;
      }
      .btn2{
        border: 0;
        background: #1F4E79;
        color: #fff;
      }
    }
  }
</style>
