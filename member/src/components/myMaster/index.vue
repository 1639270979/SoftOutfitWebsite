<template>
<div id="master">
  <div class="nav" id="index">
      <div @click="topFun(1)"><span :class="n==1?'active':''">我们</span></div>
      <div @click="topFun(2)"><span :class="n==2?'active':''">华英</span></div>
      <div @click="topFun(3)"><span :class="n==3?'active':''">文化/资讯</span></div>
      <div @click="topFun(4)"><span :class="n==4?'active':''">设计驱动</span></div>
      <div @click="topFun(5)"><span :class="n==5?'active':''">翠堤春晓</span></div>
    </div>
  <div class="list"  v-if="n==1">
    <div class="img"><img src="./image/hyh-logo@2x.png" alt=""></div>
    <div class="content">
      “华英会”以“华人设计的创造力”为基点和源动力，关注设计、艺术、品牌、商业、趋势研究、创意价值”等方向，以高品质为立身原则，凝聚搭建顶尖设计师及跨专业多维度的高端资源整合，是设计精英思想交流、转换、传播的平台与精神家园，也是中国领先的设计公司及个体展开国际城际合作的重要渠道。华英会平台通过策划组织一系列专项课题研究、学术交流、生活实验、项目孵化研究及多种形式的专题策展、论文和作品集、记录片、文化沙龙、行业论坛等方式形成成果和推广，并在社会发展的进程中，探讨交流在创意经济和设计发展之间的关系，促进创意经济的社会价值，并进一步的推力当代华人设计综合影响力。
</div>
    <router-link to="/index/myMaster/initiator" class="btn">联合发起人介绍</router-link>
    <p class="title">华英会平台特点</p>
    <div class="content">
      华英会平台是一个收集设计师、艺术家、创造家的精英设计文化社群组织，以室内设计为核心，围绕当下及未来生活而延展出一系列高端群体资源，历经三年的积淀，已逐渐吸引凝聚了一批有抱负追求、有专业素养及美学主张、有趣味的设计者、艺术家、学者及商业品牌聚集于此交流探讨和寻梦。<br><br>
华英会基于对产业的洞见及善于对行业趋势进行深度分析，携手平台互联合作资源，于”华英会体系“之上，以不倦的灵感为设计/艺术/生活/品牌/城市提供多种渠道的思维碰撞，形成不同主题的对话和分享，成为新概念新作品项目的发布平台和助推器、实验场，华英会以此而获得一种转换价值。<br><br>
华英会已逐渐形成链接起”对城市、对设计及业态创新、对当代生活方式“的”再观察、再感受与再探索“，成为设计周、多种形式的艺术节、时尚盛典的发布承载平台。并链接起多项研究渠道和商业空间。<br><br>
这是一个有着自己的价值体系的平台，通过不断的走出去，持续性的与高端阶层交流探索的过程中，形成了自己对设计、艺术、时尚和对趋势的观察，并在此基础上帮助平台会员共同
促进和发展。
    </div>
    <router-link to="/index/myMaster/apply/1" class="btn">申请加入华英会会员</router-link>
    <router-link to="/index/myMaster/apply/2" class="btn" style="background: #E68709; margin-bottom: 0.76rem">华英会品牌材料会员招募</router-link>
    <div class="content">
      华英会平台自2015年12月创办以来，已有近三年的历程，在这三年的历练中，华英会从起步到阶段性的发展过程中，陆续积累了大量的价值资 源和合作渠道，并开始迈入发展的轨道。平台的良好发展离不开一群优秀的志同道合朋友及行业中杰出及优质品牌的关注支持，它的成长与价值的回馈希望可以与您一起分享及携手共进。2018年华英会平台将有选择性的邀请一部分进口及国内一线材料及家具品牌、创新类型产品加盟VIP会员机构，参与分享华英会平台的资源互动和交流，从另一侧面协助会员品牌及产品在设计师群体中拓展综合影响力和更多的市场机会！
    </div>
    <p class="content" style="color: #1F4E79; margin-top: 0.7rem;margin-bottom: 0.95rem">
      【有意参加华英会品牌会员机构，请先提供公司、产品及资质认证说明和代表案例1-2个】
</p>
    <div class="topImg">
      <img src="./image/hyh-2018@2x.png" alt="">
    </div>
    <p class="title" style="text-align: center; padding:0;">华英会这些事</p>
    <div class="list3">
      <div v-for="temp in eventArr">
        <div class="time"><span></span>{{temp.time}}</div>
        <div class="txt imgW" v-html="temp.content">
        </div>
      </div>
    </div>
  </div>
  <div class="list2" v-if="n==2">
    <router-link v-for="item in  designerList" tag="div"  :to="'/index/myMaster/designerDet/'+item.designer_id" class="info">
      <div class="img"><img :src="item.cover" alt=""></div>
      <p class="name">{{item.name}}<span>{{item.company}}</span></p>
      <p class="txt">{{item.intro}}</p>
    </router-link>
    <myLoading :isLoading='isLoading' :isList="isList"></myLoading>
  </div>
  <div class="list2" v-if="n==3">
    <router-link tag="div"
                 :to="'/index/myMaster/newDet/'+item.news_id" class="info" v-for="item in newList">
      <div class="img"><img :src="item.list_pic" alt=""></div>
      <p class="name">{{item.title}}</p>
      <p class="txt">{{item.brief}}</p>
    </router-link>
    <myLoading  :isLoading='isLoading' :isList="isList"></myLoading>
  </div>
  <div class="list2" v-if="n==4">
    <router-link tag="div" :to="'/index/myMaster/drive/'+item.activity_id" class="info" v-for="item in activityList">
      <div class="img"><img :src="item.cover" alt=""></div>
      <p class="name">{{item.activity_name}}<span style="color: #8D8D8D;font-weight: bold;margin-left:0rem">{{item.is_end?'【已结束】':''}}</span></p>
      <p class="txt">地址：{{item.address}}</p>
    </router-link>
    <myLoading  :isLoading='isLoading' :isList="isList"></myLoading>
  </div>
  <div class="list2" v-if="n==5">
    <div class="top" @click="labelFun(m)">
      <div @click="m=1" :class="m==1?'active':''">简介</div>
      <div @click="m=2" :class="m==2?'active':''">设计师品牌</div>
      <div @click="m=3" :class="m==3?'active':''">国际品牌</div>
    </div>
    <div class="content imgW" v-if="m==1" v-html="introduction"></div>
    <div  class="award" v-if="m==2">
      <router-link tag="div" v-for="item in brandList" :to="'/index/shop/det/brand/'+item.brand_id">
        <div class="img2"><img :src="item.logo" alt=""></div>
        <div class="txt"><p>{{item.brand_name}}</p></div>
      </router-link>
    </div>
    <div class="award" v-if="m==3">
      <router-link tag="div" v-for="item in brandList" :to="'/index/shop/det/brand/'+item.brand_id">
        <div class="img2"><img :src="item.logo" alt=""></div>
        <div class="txt"><p>{{item.brand_name}}</p></div>
      </router-link>
    </div>
  </div>
  <myLoading v-if="this.n==5 && this.m!=1" :isLoading='isLoading' :isList="isList"></myLoading>
</div>
</template>
<script type="text/javascript">
  import { eliteSupplier, eliteEvent, designerList ,newsList ,brandList ,activityList} from '../../common/axios/api.js';
  import { iscrollAjax } from '../../common/public/iscroll.js';
  import myLoading from '../loading/Loading.vue';
  export default{
      data(){
        return{
          n:1,
          m:1,
          dsgBanner:'',
          introduction:'',
          eventArr:[],
          page: 1,
          pageSize:15,
          isLoading: true,
          isList:true,
          isData: true,
          designerList:[],
          newList:[],
          brandList:[],
          activityList:[],
          isWx:false
        }
      },
    components: {
      myLoading,
    },
    methods:{
      topFun(n){
        this.n=n;
        if(this.n==1){
          this.imgW();
        }else if(this.n==2){
          this.page=1;
          this.pageSize=15;
          this.isLoading=true;
          this.isList=true;
          this.isData= true;
          this.designerList=[];
          let obj = {'pageSize':this.pageSize,'page':this.page};
          this.listFun(obj);
          this.iscroll();
        }else if(this.n==5){
          this.m=1;
          if(this.m==1){
            eliteSupplier().then(data=>{
              if(data.code==1){
                this.introduction = data.data;
              }
            }).then(()=>{
              this.imgW();
            });
          }
        }else if(this.n == 3){
          this.page=1;
          this.pageSize=15;
          this.isLoading=true;
          this.isList=true;
          this.isData= true;
          this.newList=[];
          let obj = {'pageSize':this.pageSize,'page':this.page};
          this.newlistFun(obj);
          this.iscroll();
        }else if(this.n == 4){
          this.page=1;
          this.pageSize=15;
          this.isLoading=true;
          this.isList=true;
          this.isData= true;
          this.activityList=[];
          let obj = {'pageSize':this.pageSize,'page':this.page};
          this.activitylistFun(obj);
          this.iscroll();
        }
      },
      iscroll(){
        iscrollAjax(() => {
          if (this.isData) {
            this.isData = false;
            if(this.n==2){
              let obj = {'pageSize':this.pageSize,'page':this.page};
              this.listFun(obj);
            }else if(this.n==3){
              let obj = {'pageSize':this.pageSize,'page':this.page};
              this.newlistFun(obj);
            }else if(this.n==5 && this.m==2){
              let obj = {'pageSize':this.pageSize,'page':this.page,'label':1};
              this.brandFun(obj);
            }else if(this.n==5 && this.m==3){
              let obj = {'pageSize':this.pageSize,'page':this.page,'label':2};
              this.brandFun(obj);
            }else if(this.n==4){
              let obj = {'pageSize':this.pageSize,'page':this.page};
              this.activitylistFun(obj);
            }
          }
        });
      },
      ajaxFun(){
        eliteEvent().then(data=>{
          if(data.code==1){
            this.eventArr = data.data;
          }
        });
      },
      listFun(obj){
        designerList(obj).then(data=>{
          if(data.code==1){
            for (var i = 0; i < data.list.length; i++) {
              this.designerList.push(data.list[i]);
            }
            if(this.designerList.length==0){
              this.isList=false;
            }else{
              this.isList=true;
            }
            if (data.list.length < this.pageSize) {
              this.isData = false;
              this.isLoading = false;
              return;
            }else {
              this.isData = true;
              this.isLoading = true;
              this.page ++;
            }
          }
        })
      },
      newlistFun(obj){
        newsList(obj).then(data=>{
          if(data.code==1){
            for(let val in data.list){
                this.newList.push(data.list[val]);
            }
            if(this.newList.length==0){
              this.isList=false;
            }else{
              this.isList=true;
            }
            if (data.list.length < this.pageSize) {
              this.isData = false;
              this.isLoading = false;
              return;
            }else {
              this.isData = true;
              this.isLoading = true;
              this.page ++;
            }
          }
        })
      },
      brandFun(obj){
        brandList(obj).then(data=>{
          if(data.code==1){
            for(let val in data.list){
              this.brandList.push(data.list[val]);
            }
            if(this.brandList.length==0){
              this.isList=false;
            }else{
              this.isList=true;
            }
            if (data.list.length < this.pageSize) {
              this.isData = false;
              this.isLoading = false;
              return;
            }else {
              this.isData = true;
              this.isLoading = true;
              this.page ++;
            }
          }
        })
      },
      labelFun(m){
        this.m=m;
        let obj;
        if(this.m==2){
          this.page=1;
          this.pageSize=15;
          this.isLoading=true;
          this.isList=true;
          this.isData= true;
          this.brandList = [];
          obj = {'pageSize':this.pageSize,'page':this.page,'label':1};
          this.iscroll();
        }else if(this.m==3){
          this.page=1;
          this.pageSize=15;
          this.isLoading=true;
          this.isList=true;
          this.isData= true;
          this.brandList = [];
          obj = {'pageSize':this.pageSize,'page':this.page,'label':2};
          this.iscroll();
        }
        this. brandFun(obj);
      },
      activitylistFun(obj){
        activityList(obj).then(data=>{
          if(data.code==1){
            for(let val in data.list){
                this.activityList.push(data.list[val]);
            }
            if(this.activityList.length==0){
              this.isList=false;
            }else{
              this.isList=true;
            }
            if (data.list.length < this.pageSize) {
              this.isData = false;
              this.isLoading = false;
              return;
            }else {
              this.isData = true;
              this.isLoading = true;
              this.page ++;
            }
          }
        })
      },
      imgW(){
        setTimeout(()=>{
          this.$nextTick(function(){
            let p,img;
            let  txt = document.getElementsByClassName('imgW');
            for(var k =0;k<txt.length;k++){
              p = txt[k].getElementsByTagName('p');
              for (let i = 0;i < p.length;i++) {
                img = p[i].getElementsByTagName('img');
                for(let j = 0; j <img.length;j++ ){
                  img[j].style.height = '100%';
                  img[j].style.width = '100%';
                }
              }
            }
          })
        },500)
      }
    },
    created(){
      this.ajaxFun();
    },
    mounted(){
      this.imgW();
      var ua = navigator.userAgent.toLowerCase();
      if(ua.match(/MicroMessenger/i)=="micromessenger") { //判断是否为微信浏览器
        this.isWx=true;
      }else{
        this.isWx=false;
      }
      this.$nextTick(function(){
        setTimeout(()=>{
          var icon = document.getElementById('index');
          if(this.isWx) {
            icon.setAttribute('style','top:2.7rem');
            var close = document.getElementsByClassName('wxheader')[0].children[0];
            close.onclick=function(){
              icon.setAttribute('style','top:1.2rem');
            };
          }else{
            icon.setAttribute('style','top:1.2rem');
          }

        },500)
      })
    },
  }
</script>
<style lang="less" scoped>
  @import '../../assets/mixin_750.less';
  #master{
    .nav{
      border-bottom: 1px solid #BFBFBF;
      display: flex;
      justify-content: space-between;
      padding:  0 0.52rem;
      position: fixed;
      top:1.2rem;
      left: 0;
      right: 0;
      z-index: 2;
      background: #fff;
      >div{
        /*width: 19%;*/
        padding: 0.33rem 0;
        display: inline-block;
        text-align: center;
        font-size: 0.35rem;
        font-weight: bold;
        color: #262626;
        >span{
          padding: 0.30rem 0;
        }
        .active{
          border-bottom: 2px solid #000000;
        }
      }
    }
    .list{
      padding-top: 1.158rem;
      width: 100%;
      .img{
        width:4.29rem;
        height:3.41rem;
        padding: 0.5rem;
        border: 1px solid #DDDDDD;
        margin:  0.93rem auto 1.04rem;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .content{
        padding: 0 0.68rem;
        font-size:0.32rem;
        line-height:0.5rem;
        color: #000;
      }
      .btn{
        display:block;
        width:8.67rem;
        height:1.16rem;
        margin: auto;
        background: #1F4E79;
        color: #fff;
        line-height: 1.16rem;
        text-align: center;
        font-size:0.4rem;
        margin-top: 0.72rem;
      }
      .title{
        padding: 0.73rem 0.68rem 0.45rem;
        font-size:0.4rem;
        font-weight: bold;
        color: #1F4E79;
      }
      .topImg{
        width: 100%;
        height: 5.21rem;
        margin-bottom: 0.61rem;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .img2{
        width:7.16rem;
        height:2.35rem;
        padding: 0.5rem;
        border: 1px solid #DDDDDD;
        margin:  0.93rem auto 0.57rem;
        img{
          width: 100%;
          height: 100%;
        }
      }
      >.list3{
        width:8.67rem;
        margin: auto;
        border-left: 1px solid #ddd;
        margin-top: 1.37rem;
        >div{
          margin-bottom: 1.04rem;
          .time{
            position: relative;
            padding-left:0.49rem ;
            color: #1F4E79;
            >span{
              position: absolute;
              top: 0.08rem;
              left: -0.15rem;
              width: 0.29rem;
              height: 0.29rem;
              border-radius: 50%;
              border: 1px solid #616161;
              background: #fff;
            }
          }
          .txt{
            padding-left:0.49rem ;
            font-size:0.32rem;
            p{
              width: 8.06rem;
            }
            img{
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
    .list2{
      padding-top: 1.158rem;
      width: 100%;
      .top{
        display: flex;
        padding:0 0.5rem;
        margin-bottom: 0.81rem;
        margin-top: 0.53rem;
        justify-content: space-between;
        >div{
          width: 2.79rem;
          height: 0.72rem;
          line-height:0.72rem;
          text-align: center;
          background: #eee;
          border-radius: 0.1rem;
        }
        .active{
          background: #E68709;
          color: #fff;
        }
      }
      .content{
        padding-top: 0.81rem;
        padding-left: 0.51rem;
        padding-right: 0.64rem;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .award{
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          padding: 0 0.54rem;
          >div{
            width: 4.33rem;
            height: 4.33rem;
            margin-bottom: 0.32rem;
            background: #f6f6f6;
            .img2{
              width: 1.72rem;
              height: 1.72rem;
              margin: auto;
              margin-top: 0.63rem;
              img{
                width: 100%;
                height: 100%;
              }
            }
            .txt{
              margin-top: 0.72rem;
              >p{
                width: 2rem;
                margin: auto;
                hyphens: auto;
                text-align: center;
                color: #282828;
                font-size: 0.29rem;
              }
            }
          }
        }
      .info{
        padding-bottom: 0.64rem;
        .img{
          width: 100%;
          height: 5.08rem;
          margin-bottom: 0.3rem;
          >img{
            width: 100%;
            height: 100%;
          }
        }
        .name{
          padding-left: 0.52rem;
          font-size: 0.4rem;
          font-weight: bold;
          color: #282828;
          margin-bottom: 0.31rem;
          >span{
            font-size: 0.35rem;
            color: #282828;
            margin-left: 0.32rem;
            font-weight: 100;
          }
        }
        .txt{
          padding-left: 0.52rem;
          padding-right: 0.48rem;
          color: #A0A0A0;
          font-size: 0.32rem;
          overflow: hidden;  /** 隐藏超出的内容 **/
          word-break: break-all;
          text-overflow: ellipsis;
          display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
          -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
          -webkit-line-clamp: 2; /** 显示的行数 **/
        }
      }
    }
  }
</style>
