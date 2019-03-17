<template>
  <div id="apply">
    <div class="info">
      <div>
        <span>姓名</span><input type="text" placeholder="请输入你的名字" v-model="name">
      </div>
      <div>
        <span>电话</span><input type="tel" placeholder="请输入你常用的手机号" v-model="tel">
      </div>
      <div>
        <span>邮箱</span><input type="text" placeholder="请输入你常用的邮箱" v-model="email">
      </div>
      <div>
        <span>公司名称</span><input type="text" placeholder="请输入你的公司名称" v-model="company">
      </div>
      <div>
        <span>职务</span><input type="text" placeholder="请输入你的职务" v-model="duty">
      </div>
      <div @click="selectFun">
        <span>性别</span><span class="right"></span><span class="select">{{sex}}</span>
      </div>
      <div>
        <span>所在城市</span><span class="right"></span>
        <input id="adr" name="area" type="text" readonly/>
        <input id="city" type="hidden" name="city_id"/>
      </div>
    </div>
    <div class="read">
      <div class="box">
        <label>
          <input type="checkbox" value="one" v-model="picked">
          <span class="icon-radio"></span>
        </label>
        <div>我已阅读<span class="txt" >《申请规则》</span></div>
      </div>
    </div>
    <div class="btn-bottom">
      <span class="cancel" @click="cancelFun">取消</span>
      <span :class="!picked?'action':''" @click="confirmFun">提交</span>
    </div>
    <div class="select-box" v-show="isSelect">
      <div class="mask"></div>
      <div class="popout in">
        <div class="set-box">
          <div class="title">性别</div>
          <div class="popout-list">
            <ul>
              <li @click="sexSelectFun('男','1')" :class="sex=='1'?'action':''">男<span></span></li>
              <li @click="sexSelectFun('女','2')" :class="sex=='2'?'action':''">女<span></span></li>
              <li @click="sexSelectFun('保密','3')" :class="sex=='3'?'action':''">保密<span></span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  import { areaJson ,applyMember} from '../../common/axios/api.js';
  import LArea from './js/LArea.js';
  export default{
      data(){
          return{
            type:this.$route.params.type,
            sexList : {1:'男',2:'女',3:'保密'},
            isAnimation: true,
            isSelect:false,
            province   : [],
            city       : {},
            picked:false,
            name:'',
            tel:'',
            email:'',
            company:'',
            duty:'',
            sex:'男',
            n:1
          }
      },
      methods: {
        selectFun: function() {
          this.isSelect = true;
        },
        sexSelectFun: function(str,n) {
          this.n = n;
          this.sex=str;
          this.isSelect=false;
        },
        areaJson: function() {//获取地址信息
          areaJson().then(data => {
            this.provinceArr = [];
            var cityArr = [];
            for (var i = 0; i < data.length; i++) {
              this.provinceArr.push({'text':data[i].province_name,'value':data[i].province_id});
              cityArr = [];
              for (var j = 0; j < data[i].city.length; j++) {
                cityArr.push({"text":data[i].city[j].city_name,'value':data[i].city[j].city_id});
                this.city[data[i].province_id] = cityArr;
              }
            }
            var larea = new LArea();
            larea.init({
              'trigger': '#adr',
              'cityVal': '#city',
              'provinceVal': '#province',
              'keys': {
                id: 'value',
                name: 'text'
              },
              'type': 2,
              'data': [this.provinceArr,this.city]
            });
          });
        },
        cancelFun: function () {//取消
          this.$router.go(-1);
        },
        confirmFun:function(){
          if (this.picked != '') {
            if (!(/[a-zA-Z\s\u4e00-\u9fa5]{2,16}/.test(this.name))) {
              this.txtPromptFun('姓名为2-16位且不能为数字');
              return;
            }else if(!(/\S/.test(this.name))){
              this.txtPromptFun('姓名不能为空');
              return;
            }else if (!(/^1[3|4|5|7|8]{1}\d{9}$/.test(this.tel))) {
              this.txtPromptFun('联系电话有误');
              return;
            }else if(!(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.email))){
              this.txtPromptFun('邮箱格式有误');
              return;
            }else if (!(/\S/.test(this.company))) {
              this.txtPromptFun('公司名称不能为空');
              return;
            }else if (!(/\S/.test(this.duty))) {
              this.txtPromptFun('职务不能为空');
              return;
            }else if (document.getElementById('city').value == '') {
              this.txtPromptFun('所在地不能为空');
              return;
            }
            this.submitFun();
          }else {
            this.txtPromptFun('请把申请规则勾选');
          }
        },
        submitFun:function(){
          var  area = document.getElementById('city').value;
          let obj = {
            type : this.type,
            name : this.name,
            mobile: this.tel,
            email : this.email,
            company : this.company,
            duty  :this.duty,
            sex : this.n,
            aid : area,
          };
          applyMember(obj).then(data=>{
            if(data.code==1){
              this.txtPromptFun(data.msg);
              setTimeout(()=>{
                this.$router.go(-1);
              },1500)
            }else{
              this.txtPromptFun(data.msg);
            }
          })
        },
        txtPromptFun: function(str) {
          this.$store.state.publicJS.promptBoxMsg = str;
          this.$store.commit('txtPrompt');
          setTimeout(() => {
            this.$store.commit('txtPrompt');
          },1000);
        },
      },
      created() {
        this.areaJson();
        window
      }
  }
</script>
<style lang="less" scoped>
  @import '../../assets/mixin.less';
  @import './css/LArea.min.css';
  #apply{
    width: 100%;
    .info{
      width: 100%;
      padding-bottom: 0.5rem;
      >div:first-child{
        border-top: 1px solid #e5e5e5;
      }
      >div{
        width: 100%;
        height: 1.6rem;
        line-height:1.6rem;
        border-bottom: 1px solid #E5E5E5;
        >span{
          display: inline-block;
          width: 2rem;
          color: #1e1e1e;
          font-size: 0.32rem;
          padding-left: 0.31rem;
        }
        >input{
          width: 75%;
          height: 1rem;
          text-align: right;
        }
       >input::placeholder{
         text-align: right;
       }
        .right{
          float: right;
          width: 0.31rem;
          height: 1.6rem;
          margin-right: 0.9rem;
          background: url(./image/right.png) no-repeat center;
          background-size: 0.21rem 0.39rem;
        }
        .select{
          float: right;
          width: auto;
          margin-right: 0.2rem;
        }
        #adr{
          width: 60%;
          position: relative;
          top:0;
          left: 0.52rem;
          text-align: right;
        }
      }
    }
    .read {
      .rem(height,32);
      .rem(line-height,32);
      .rem(margin-top,20);
      .rem(margin-bottom,20);
      font-size: 0.32rem;
      color: #000;
      text-align: center;
      .box {
        display: inline-block;
        label {
          position: relative;
          float: left;
          .rem(width,45);
          input {
            opacity: 0;
          }
        }
        .icon-radio {
          position: absolute;
          .rem(top,2);
          .rem(left,3);
          /*<!--.rem(width,24);-->*/
          /*<!--.rem(height,24);-->*/
          width: 0.43rem;
          height: 0.43rem;
          border: 1px solid #989898;
          border-radius: 50%;
        }
        input:checked+.icon-radio {
          border: 0;
          background: url(../../../../Hua/img/radio_2.png) no-repeat center;
          background-size: 100% 100%;
        }
        div {
          float: left;
        }
        .txt {
          color: #f38b00;
        }
      }
    }
    .btn-bottom {
      width: 100%;
      margin-top: 0.7rem;
      .rem(margin-bottom,30);
      font-size: 0;
      text-align: center;
      > span {
        display: inline-block;
        width:4.37rem;
        height:1.01rem;
        line-height:1.01rem;
        font-size:0.45rem;
        color: #000;
        .border-radius(5);
        border: 1px solid #989898;
        background: #d65317;
      }
      .cancel {
        .rem(margin-right,38);
        background: #fff;
      }
      .action {
        background: #ECECEC;
        color: #A4A4A4;
      }
    }
    .mask {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 5000;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,.4);
    }
    .popout {
      position: fixed;
      left: 0;
      z-index: 6000;
      width: 100%;
      opacity: 0;
      animation-duration: .5s;
      animation-fill-mode: both;
      &.in {
        animation-name: in;
      }
      &.out {
        animation-name: out;
      }
      > div {
        width: 100%;
        text-align: center;
        background: #dfdfdf;
      }
      .title {
        width: 100%;
        .rem(height,60);
        .rem(line-height,60);
        .rem(font-size,20);
        color: #aaa;
      }
      .popout-list {
        li {
          position: relative;
          width: 100%;
          .rem(height,80);
          .rem(line-height,80);
          .rem(font-size,24);
          color: #333;
          .border(border-top,1,#a6a6a6);
          &.action span {
            position: absolute;
            .rem(top,34);
            .rem(right,20);
            .rem(width,18);
            .rem(height,12);
            background: url(./image/selected.png) no-repeat;
            background-size: 100% 100%;
          }
        }
        .style {
          .rem(height,500);
          overflow-y: auto;
        }
        .close {
          .border(border-bottom,1,#333);
        }
      }
      @keyframes in {
        0% {
          bottom: -50%;
          opacity: 0;
        }
        100% {
          bottom: 0;
          opacity: 1;
        }
      }
      @keyframes out {
        0% {
          bottom: 0%;
          opacity: 1;
        }
        100% {
          bottom: -50%;
          opacity: 0;
        }
      }
    }
  }
</style>
