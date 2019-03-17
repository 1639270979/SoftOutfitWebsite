<template>
  <div id="please">
    <div class="list">
      <ul>
        <li>
          <div class="left"><span>&nbsp;</span>您的姓名</div>
          <div class="right"><input type="text" v-model="name" placeholder="请输入您的姓名"></div>
        </li>
        <li>
          <div class="left"><span>&nbsp;</span>联系电话</div>
          <div class="right"><input type="tel" v-model="tel" maxlength="11" placeholder="请输入你常用的手机号码"></div>
        </li>
        <li>
          <div class="left"><span>&nbsp;</span>联系QQ</div>
          <div class="right"><input type="tel" v-model="qq" placeholder="请输入你常用的QQ"></div>
        </li>
        <li>
          <div class="left"><span>&nbsp;</span>房屋所在地</div>
          <div class="right">
            <div class="icon">
              <input id="adr" name="area" class="region-btn" type="text" readonly/>
              <input id="adrVal" type="hidden" name="area_id"/>
              <input id="city" type="hidden" name="city_id"/>
              <span class="icon-right pr"></span>
            </div>
          </div>
        </li>
        <li>
          <div class="left"><span>&nbsp;</span>详细地址</div>
          <div class="right"><input type="text" placeholder="街道、楼牌号等" v-model="adres"></div>
        </li>
        <li class="up">
          <div class="left"><span>&nbsp;</span>平面图</div>
          <div id="box">
            <div id="boxBtn">
              <img src="./image/add.jpg" id="img">
            </div>
          </div>
        </li>
        <li>
          <div class="left">&nbsp;期望软装价格</div>
          <div class="right" @click="statusFun('expectPrice')">
            <div class="icon">
              <span>{{ expectPriceStr }}</span>
              <span class="icon-right"></span>
            </div>
          </div>
        </li>
        <li class="record">
          <div class="left">&nbsp;录音</div>
          <div class="box"
               v-if="!recordEnd"
               @touchstart.prevent="gtouchstart()"
               @touchend.prevent="gtouchend()"><i :class="recording?'ing ing2':'ing'"></i>{{recording?'松开结束':'按住 说你的需求'}}</div>
          <div v-else-if="!isEnd">
            <div class="box"  @click="play()"><i :class="playing?'end end2':'end end3'"></i>播放录音</div> <!-- 继续播放 -->
          </div>
          <div v-else="isEnd">
            <div class="box" @click="play()"><i class="end"></i>播放录音</div>
          </div>
          <span v-if="!recordEnd">{{recording?count:90}}s</span>
          <span v-else class="dele" @click="del()"></span>
        </li>
        <li class="message">
          <div class="left">&nbsp;留言</div>
          <div class="right"><textarea v-model="message" placeholder="您对所需设计空间的想法及概念"></textarea></div>
        </li>
        <li>
          <div class="left">&nbsp;期望软装空间</div>
          <div class="right" @click="statusFun('expectSpace')">
            <div class="icon">
              <span>{{ expectSpaceStr }}</span>
              <span class="icon-right"></span>
            </div>
          </div>
        </li>
        <li>
          <div class="left">&nbsp;期望软装风格</div>
          <div class="right" @click="statusFun('expectStyle')">
            <div class="icon">
              <span>{{ expectStyleStr }}</span>
              <span class="icon-right"></span>
            </div>
          </div>
        </li>
        <li>
          <div class="left"><span></span>目前硬装阶段</div>
          <div class="right" @click="statusFun('hardStatus')">
            <div class="icon">
              <span>{{ hardStatusStr }}</span>
              <span class="icon-right"></span>
            </div>
          </div>
        </li>
        <li style="border-top: 0.2rem solid #F6F6F6;height: 1.75rem">
          <div class="left">&nbsp;效果图类型</div>
          <div class="icon-doubt" @click="clickDoubtFun"><span></span></div>
          <div class="right" @click="statusFun('pic')" style="margin-left: -3.05rem;">
            <div class="icon">
              <span>{{ picStr }}</span>
            </div>
          </div>
        </li>
        <li>
          <div class="left">&nbsp;软装设计费</div>
          <div class="money">¥{{ money }}</div>
        </li>
        <li>
          <div class="left">&nbsp;目前支付</div>
          <div class="money"><span>(设计费30%)&nbsp;&nbsp;</span>¥{{ money * 0.3 }}</div>
        </li>
      </ul>
    </div>
    <div class="read">
      <div class="box">
        <label>
          <input type="checkbox" value="one" v-model="picked">
          <span class="icon-radio"></span>
        </label>
        <div>我已阅读<span class="txt" @click="isPayShow=true">《支付说明》</span></div>
      </div>
    </div>
    <div class="btn-bottom">
      <span class="cancel" @click="cancelFun">取消</span>
      <span @click="confirmFun" :class="picked==''?'action':''">提交</span>
    </div>
    <div class="doubt-mask" v-show="isdoubt">
      <div class="popout">
        <div class="cancel"><span class="icon" @click="clearFun"></span></div>
        <div class="body">
          <!--<div class="left">-->
          <!--<p class="title">选择不需要</p>-->
          <!--<p class="txt">您将收到房屋U3D效果图</p>-->
          <!--<div class="img"><img src="./image/111.jpg"></div>-->
          <!--</div>-->
          <div class="right">
            <p class="title">全景效果图</p>
            <p class="txt">您将收到房屋全景效果图</p>
            <p class="txt">360°环绕全景</p>
            <div class="img"><img src="./image/222.gif"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="payExplain" v-show="isPayShow">
      <div class="mask"></div>
      <div class="popout">
        <div class="top"><div class="icon-close1" @click="isPayShow=false"><span></span></div>大美软装支付说明</div>
        <div class="content">
          <div class="txt">
            <div>嗨！亲爱的大美软装用户，您好！</div>
            <div>　　根据您下的设计订单需求所选的设计师<span>{{ info.name }}</span> 是 <span>{{ info.level }}</span>星设计师</div>
            <div class="d1">　　大美软装的设计师共分为五个星级，五星设计师为最高星级的设计师。由于星级不同，您需要支付给每位设计师的设计费也不同。</div>
            <div>TA的U3D设计费用是：</div>
            <div v-for="(item,key) in expectSpace">　　{{ item.length>2?item:item+'　' }}　　<span>{{info.design_price[1][key]}}</span>&nbsp;元</div>
            <div>TA的全景效果图设计费用是：</div>
            <div v-for="(item,key) in expectSpace">　　{{ item.length>2?item:item+'　' }}　　<span>{{info.pano_price[key]}}</span>&nbsp;元</div>
            <div class="d2">　　您当前所选需要设计的空间是：</div>
            <div><span>　　{{ expectSpaceStr }}</span></div>
            <div>　　您对所需设计空间的想法及概念是：</div>
            <div>{{ message==''?'　　暂无需求':'　　'+message}}</div>
            <div class="d2">　　您选择了 <span>{{ statusObj.pic==1?'不需要':'需要'}}</span> 全景效果图。</div>
            <div class="d2">　　当前您的软装设计费用为：</div>
            <div>　　U3D效果图　　<span>{{ U3DMoney }}</span>&nbsp;元</div>
            <div v-if="statusObj.pic == 2">　　全景效果图　　<span>{{ panoMoney }}</span>&nbsp;元</div>
            <div>　　总计　　　　　<span>{{ money }}</span>&nbsp;元</div>
            <div class="d2">　　目前你需要支付的费用是：</div>
            <div>　　总设计费的30%　<span>{{ money * 0.3}}</span>&nbsp;元</div>
            <div class="d2">　　设计师设计完毕将把方案推送到您的设计订单中，您可以先查看两张效果图，如果您要查看全部方案内容，则需要支付剩余设计费用。</div>
            <div class="d2">　　如果您对方案不满意，可以要求设计师修改，<span>每个订单可以修改2次。</span></div>
          </div>
        </div>
      </div>
    </div>
    <pleasePopup
      :isShow="isShow"
      @update:isShow="val => isShow = val"
      :status="status"
      :expectPrice="expectPrice"
      :expectSpace="expectSpace"
      :expectStyle="expectStyle"
      :hardStatus="hardStatus"
      :statusObj="statusObj"
      :pic = "pic"
      @update:statusObj="val => statusObj = val"></pleasePopup>
    <confirmPrompt @leftBtn="goBackFun"></confirmPrompt>
    <div class="popu" v-if="isUp">
      <div>
        <img src="./image/loading.png" alt="">
      </div>
      <p>正在上传录音，请稍后</p>
    </div>
    <confirmPrompt @rightBtn="deleteFun"></confirmPrompt>
  </div>
</template>
<script>
  import './js/qiniu.min.js';
  import { areaJson,designerDet,designerPlease } from '../../common/axios/api.js';
  import LArea from './js/LArea.js';
  import pleasePopup from './pleasePopup.vue';
//  import './js/jquery-3.3.1.min.js';
  export default {
    data() {
      return {
        info       : {},
        province   : [],
        city       : {},
        area       : {},
        did        : this.$route.params.did,
        status     : 'expectPrice',
        token      : '',
        expectPrice: {},	//期望软装价格
        expectSpace: {},	//期望软装空间
        expectStyle: {},	//期望软装风格
        hardStatus : {},	//目前硬装阶段
        pic        : {},  //效果图类型
        isShow     : false,
        statusObj  : {
          expectPrice: '',	//期望软装价格
          expectSpace: [],	//期望软装空间
          expectStyle: '',	//期望软装风格
          hardStatus : '',	//目前硬装阶段
          pic        :'',   //效果图类型
        },
        name       : '',
        tel        : '',
        qq         : '',
        adres      : '',
        img        : '',
        message    : '',
        isdoubt      : false,
        picked: '',
        isPayShow: false,
        timeOutEvent:'',
        timer: null,
        count:90,
        recording:false,
        recordEnd:false,
        n :1,
        playing:true,
        isEnd:false,
        mp3:'',
        qiniuObj:'',
        mp3Url:'',
        isUp:false
      }
    },
    components: {
      pleasePopup
    },
    methods: {
      ajaxFun: function(obj) {
        designerDet(obj).then(data => {
          this.info = data.info;
          this.expectPrice = data.expectPrice;
          this.expectSpace = data.expectSpace;
          this.expectStyle = data.expectStyle;
          this.hardStatus  = data.hardStatus;
          this.pic = {2:'全景效果图'};
          this.token       = data.token;
          this.upImg();
        })
      },
      areaJson: function() {//获取地址信息
        areaJson().then(data => {
          var cityArr = [];
          var areadataArr = [];
          for (var i = 0; i < data.length; i++) {
            this.province.push({'text':data[i].province_name,'value':data[i].province_id});
            cityArr = [];
            for (var j = 0; j < data[i].city.length; j++) {
              cityArr.push({"text":data[i].city[j].city_name,'value':data[i].city[j].city_id});
              this.city[data[i].province_id] = cityArr;
              for (var k = 0; k < data[i].city[j].area.length; k++) {
                areadataArr.push({'text':data[i].city[j].area[k].area_name,'value':data[i].city[j].area[k].area_id})
                this.area[data[i].city[j].city_id] = areadataArr;
              }
              areadataArr = [];
            }
          }
          var larea = new LArea();
          larea.init({
            'trigger': '#adr',
            'cityVal': '#city',
            'valueTo': '#adrVal',
            'keys': {
              id: 'value',
              name: 'text'
            },
            'type': 2,
            'data': [this.province,this.city,this.area]
          });
        });
      },
      upImg: function() {//七牛云
        var this_ = this;
        var upToken = this.token;
        Qiniu.uploader({
          runtimes: 'html5,flash,html4',				// 上传模式，依次退化
          browse_button: 'boxBtn',					// 上传选择的点选按钮，必需
          uptoken : upToken,							// uptoken是上传凭证，由其他程序生成
          get_new_uptoken: false,						// 设置上传文件的时候是否每次都重新获取新的uptoken
          domain: 'http://public.idmei.cn/',			// bucket域名，下载资源时用到，必需
          container: 'box',							// 上传区域DOM ID，默认是browser_button的父元素
          max_file_size: '100mb',						// 最大文件体积限制
          flash_swf_url: './js/plupload/Moxie.swf',	//引入flash，相对路径
          max_retries: 3,								// 上传失败最大重试次数
          dragdrop: true,								// 开启可拖曳上传
          drop_element: 'box',						// 拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
          chunk_size: '4mb',							// 分块上传时，每块的体积
          auto_start: true,							//选择文件后自动上传，若关闭需要自己绑定事件触发上传
          num:1,										//上传数量
          // filters : [ {
          //    title : 'Image files',
          //    extensions : 'jpg,gif,png,bmp'
          // }],
          init: {
            'Key': function(up, files) {
              //修改文件名
              var name = files.name;
              var info = name.split(".");
              var type = info[info.length - 1];
              var filename = new Date().getTime().toString();
              filename += Math.floor(Math.random() * 100);
              filename = filename + "." + type;

              var key = filename;
              return key;
            },
            'FilesAdded': function(up, files) {
              plupload.each(files, function(file) {
                if(file.type=='image/jpeg'||file.type=='image/jpg'||file.type=='image/png'||file.type=='image/bmp'){
                  up.settings.flag   = files.length > up.settings.num ? false :true;
                  up.settings.file_q = files;
                }else {
                  up.removeFile(file);
                  this_.txtPromptFun('上传的图片格式有误');
                  return false;
                }});
            },
            'BeforeUpload': function(up, file) {
              if(!up.settings.flag){
                for (var i=0; i<up.settings.file_q.length; i++){
                  up.removeFile(up.settings.file_q[i].id)
                }
                this_.txtPromptFun('一次只能上传一张图片',1500);
                up.stop();
                return;
              }
            },
            'UploadProgress': function(up, file) {
            },
            'FileUploaded': function(up, file, info) {
              var res = JSON.parse(info);
              var url;
              if (res.url) {
                url = res.url;
              } else {
                var domain = up.getOption('domain');
                url = domain + encodeURI(res.key);
              }
              document.getElementById('img').setAttribute('src',url);
              this_.img = url;
            },
            'UploadComplete': function(up, file) {
            },
            'Error': function(up, err, errTip) {
              alert(errTip);return;
            }
          }
        });
      },
      statusFun: function(n) {
        this.status = n;
        this.isShow = true;
      },
      cancelFun: function () {//取消
        this.$router.go(-1);
      },
      confirmFun: function() {
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
          }else if (!(/\S/.test(this.qq))) {
            this.txtPromptFun('联系qq不能为空');
            return;
          }else if (document.getElementById('adrVal').value == '') {
            this.txtPromptFun('房屋所在地不能为空');
            return;
          }else if (!(/\S/.test(this.adres))) {
            this.txtPromptFun('详细地址不能为空');
            return;
          }else if (this.img == '') {
            this.txtPromptFun('平面效果图不能为空');
            return;
          }else if (this.statusObj.hardStatus == '') {
            this.txtPromptFun('请选择目前硬装阶段');
            return;
          }
          if(this.mp3!=''){
            this.NativeFun();
          }else{
            this.submitFun('');
          }
        }else {
          this.txtPromptFun('请把支付说明勾选');
        }
      },
      NativeFun:function(){
        this.isUp=true;
        var name = this.mp3;
        var info = name.split(".");
        var type = info[info.length - 1];
        var filename = new Date().getTime().toString();
        filename += Math.floor(Math.random() * 100);
        filename = filename + "." + type;
        window.appModel.postMessage(JSON.stringify({
          'funName'   :'upload',
          'token'     :this.token,
          'key'       :filename,
          'uploadPath':this.mp3
        }))
      },
      submitFun: function(record) {
          this.mp3Url= record;
          let obj = {
            'did':this.did,
            'name':this.name,
            'mobile':this.tel,
            'qq':this.qq,
            'area_id':document.getElementById('adrVal').value,
            'address':this.adres,
            'planer_graph':this.img,
            'expectPrice':this.statusObj.expectPrice,
            'message':this.message,
            'space_arr':this.statusObj.expectSpace,
            'expectStyle':this.statusObj.expectStyle,
            'hard_status':this.statusObj.hardStatus,
            'combo':this.statusObj.pic,
            'record':this.mp3Url
          };
          designerPlease(obj).then(data => {
            if (data.status) {
              this.$router.replace({ path: '/orderPay',query:{oid:data.oid,'type':'design_pay','money':this.money*0.3}})
            }else {
              this.txtPromptFun(data.msg);
            }
          })
      },
      txtPromptFun: function(str) {
        this.$store.state.publicJS.promptBoxMsg = str;
        this.$store.commit('txtPrompt');
        setTimeout(() => {
          this.$store.commit('txtPrompt');
        },1500);
      },
      clickDoubtFun: function() {
        this.isdoubt = true;
      },
      clearFun: function() {
        this.isdoubt = false;
      },
      goBackFun: function() {
        this.$router.go(-1);
      },
      gtouchstart:function (){
        this.longPress()
      },
      gtouchend:function(){// 录音结束
        window.appModel.postMessage(JSON.stringify({
          'funName'   :'recorder',
          'action'    : 'endRecord',
        }));//调用原生录音API
        clearInterval(this.timer);
        this.timer = null;
        this.recordEnd=true;
      },
      longPress:function(){// 开始录音
        window.appModel.postMessage(JSON.stringify({
          'funName':'recorder',
          'action' : 'startRecord'
        }));//调用原生录音API
        this.timeOutEvent = 0;
        if (!this.timer) {
          this.count=90 ;
          this.recording=true;
          this.timer = setInterval(() => {
            if (this.count > 0) {
              this.count--;
            } else {
              this. gtouchend();
            }
          }, 1000)
        }
      },
      play:function(){
        this.isEnd=false;
        if(this.n==2){
          window.appModel.postMessage(JSON.stringify({
            'funName':'player',
            'action' : 'play',
            'mediaPath' : this.mp3
          }));//调用原生播放API
        }else if(this.n==1){
          window.appModel.postMessage(JSON.stringify({'funName':'player', "action":"pauseOrResume",}));//调用原生继续播放
        }
      },
      del:function(){// 删除录音
        if(!this.isEnd &&  this.playing){
          this.txtPromptFun("播放中无法删除录音");
        }else{
          this.$store.state.publicJS.confirmPromptBtnRight = '删除';
          this.$store.state.publicJS.promptBoxMsg = '删除当前录音？';
          this.$store.commit('confirmPrompt');
        }
      },
      deleteFun: function() {		//删除录音
        this.recordEnd = false;
        this.recording = false;
        this.n=1;
        this.mp3='';
      },
    },
    computed: {
      expectPriceStr: function() {
        let str = '';
        if (this.statusObj.expectPrice != '') {
          str = this.expectPrice[this.statusObj.expectPrice];
        }else {
          str = '不限';
          this.statusObj.expectPrice = 1;
        }
        return str;
      },
      expectSpaceStr: function() {
        let str = '';
        let arr = [];
        if (this.statusObj.expectSpace != '') {
          this.statusObj.expectSpace.map((key) => {
            arr.push(this.expectSpace[key]);
          })
        }else {
          for (var i in this.expectSpace) {
            this.statusObj.expectSpace.push(i);
            arr.push(this.expectSpace[i]);
          }
        }
        str = arr.join(',');
        return str;
      },
      expectStyleStr: function() {
        let str = '';
        if (this.statusObj.expectStyle != '') {
          str = this.expectStyle[this.statusObj.expectStyle];
        }else {
          str = '不限';
          this.statusObj.expectStyle = 1;
        }
        return str;
      },
      hardStatusStr: function() {
        let str = '';
        if (this.statusObj.hardStatus != '') {
          str = this.hardStatus[this.statusObj.hardStatus];
        }
        return str;
      },
      picStr: function(){
        let str = '';
        if (this.statusObj.pic != '') {
          str = this.pic[this.statusObj.pic];
        }else{
          str = "全景效果图";
          this.statusObj.pic = 2;
        }
        return str;
      },
      money: function() {
        let num = 0;
        let type = this.statusObj.pic;	//是否需要效果图
        let arr = this.statusObj.expectSpace;
        arr.map((key) => {
          num += this.info.design_price[type][key] / 1;
        });
        return num;
      },
      panoMoney: function() {//全景效果图
        let num = 0;
        let arr = this.statusObj.expectSpace;
        arr.map((key) => {
          num += this.info.pano_price[key] / 1;
        });
        return num;
      },
      U3DMoney: function() {//U3D效果图
        let num = 0;
        let arr = this.statusObj.expectSpace;
        arr.map((key) => {
          num += this.info.design_price[1][key] / 1;
        });
        return num;
      }
    },
    created() {
      this.areaJson();
      let obj = {'did': this.did, 'page': 1, 'pageSize': 1}
      this.ajaxFun(obj);
      var this_ = this;
      window.isSameCity = function () {
        if (this_.info.city_id != document.getElementById('city').value) {
          this_.$store.state.publicJS.confirmPromptBtnLeft = '拒绝';
          this_.$store.state.publicJS.confirmPromptBtnRight = '接受';
          this_.$store.state.publicJS.promptBoxMsg = '与设计师不在同一城市';
          this_.$store.commit('confirmPrompt');
        }
      }
      window.getInfoFromNative = function (returnStr) {//原生调用
        let obj = JSON.parse(returnStr);
        if (obj.funName == 'mediaCallback') {
          if (obj.status == 'recordOk') {//录音成功
            if(obj.time<3000){
              this_.recordEnd = false;
              this_.recording = false;
              this_.n=1;
            }else{
              this_.n=2;
              this_.isEnd=true;
              this_.mp3 = obj.info;
            }
          }else if(obj.status=='paused'){//暂停中
            this_.n=1;
            this_.playing=false;
            this_.isEnd=false;

          }else if(obj.status=='playing'){//播放中
            this_.n=1;
            this_.playing=true;
            this_.isEnd=false;

          } else if(obj.status=='playComplete'){ // 播放完成
            this_.n=2;
            this_.playing=false;
            this_.isEnd=true;

          }else if(obj.status == 'uploadOK'){ // 录音上传成功
            this_.mp3Url ='http://public.idmei.cn/'+obj.info;
            this_.isUp=false;
            this_.submitFun(this_.mp3Url);

          }else if(obj.status=='playError'){ //播放错误
            this_.txtPromptFun(obj.info);

          }else if (obj.status == 'recordError') {//录音出错
            this_.txtPromptFun(obj.info);

          }else if(obj.status == 'uploadError'){// 上传失败
            this_.isUp=false;
            this_.txtPromptFun(obj.info);
          }
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  @import '../../assets/mixin.less';
  @import './css/LArea.min.css';
  .list {
    .rem(margin-bottom,17);
    li {
      position: relative;
      width: 100%;
      height: 1.6rem;
      line-height:1.6rem;
      .rem(padding-right,30);
      .rem(font-size,22);
      color: #666;
      .border(border-top,2,#eee);
      background: #fff;
      overflow: hidden;
      > div {
        float: left;
      }
      &:last-of-type {
        .border(border-bottom,2,#eee);
      }
    }
    .record{
      height: 2.03rem;
      line-height:2.03rem;
      .box{
        width: 4.32rem;
        height: 1.28rem;
        border: 1px solid #E5E5E5;
        margin-top: 0.35rem;
        line-height:1.28rem;
        text-align: center;
        margin-left: 1.72rem;
        text-indent: 0.5rem;
        position: relative;
        .ing{
          display: inline-block;
          position: absolute;
          top: 0;
          left:0.2rem;
          width: 0.9rem;
          height: 1.28rem;
          background: url("./image/recording-ico@2x.png") no-repeat center;
          background-size: 0.57rem,0.57rem;
        }
        .ing2{
          left:0.8rem;
        }
        .end{
          display: inline-block;
          position: absolute;
          top: 0;
          left:0.8rem;
          width: 0.8rem;
          height: 1.28rem;
          background: url("./image/play-ico@2x.png") no-repeat center;
          background-size: 0.57rem,0.57rem;
        }
        .end2{
          background: url("./image/playing.gif") no-repeat center;
          background-size: 0.57rem,0.57rem;
        }
        .end3{
          background: url("./image/playEnd.png") no-repeat center;
          background-size: 0.57rem,0.57rem;
        }
      }
      span{
        float: right;
      }
      .dele{
        display: inline-block;
        width: 0.6rem;
        height: 2rem;
        background: url("./image/delete-ico@2x.png") no-repeat center;
        background-size: 0.44rem,0.47rem;
      }
    }
    .up {
      width: 100%;
      height: 2.93rem;
      line-height:2.93rem;
      background: #fff;
      border-top: 0.2rem solid #F6F6F6;
      #box {
        display: inline-block;
        .rem(width,98);
        .rem(height,98);
        float: right;
        margin-top: 0.61rem;
        vertical-align: middle;
        #boxBtn {
          .rem(width,98);
          .rem(height,98);
        }
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    .left {
      .rem(width,170);
      height: 100%;
      .rem(padding-left,20);
      color: #333;
      span {
        display: inline;
        .rem(margin-right,5);
        color: #d65317;
        vertical-align: middle;
      }
    }
    .icon-doubt {
      position: absolute;
      top:0.06rem;
      left: 2.3rem;
      width: -0.4375rem;
      height: 100%;
      z-index: 2;
      > span {
        display: inline-block;
        .rem(width,25);
        .rem(height,25);
        .rem(margin-top,16);
        background: url(./image/doubt.png) no-repeat;
        background-size: 100% 100%;
      }
    }
    .right {
      position: relative;
      width: 100%;
      height: 100%;
      .rem(margin-left,-170);
      .rem(padding-left,170);
      .icon {
        position: relative;
        float: right;
        height: 100%;
        span:first-child{
          vertical-align: middle;
        }
      }
      #adr {
        display: inline-block;
        .rem(padding-right,20);
        text-align: right;
      }
      #adrVal {
        position: absolute;
        left: -99999px;
      }
      .icon-right {
        display: inline-block;
        .rem(width,13);
        .rem(height,24);
        background: url(./image/back.png) no-repeat;
        background-size: 100% 100%;
        vertical-align: middle;
      }
      .pr {
        position: absolute;
        top:0.6rem;
        right: 0;
      }
    }
    .inp {
      width: 100%;
      height: 100%;
      .rem(padding-left,30);
    }
    input {
      width: 100%;
      height: 100%;
      padding: 0;
      text-align: right;
      .rem(font-size,22);
      border: 0;
      outline: none;
      background: #fff;
    }
    input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
      text-align: right;
    }
    input:-moz-placeholder, textarea:-moz-placeholder {
      text-align: right;

    }
    input::-moz-placeholder, textarea::-moz-placeholder {
      text-align: right;

    }
    input:-ms-input-placeholder, textarea:-ms-input-placeholder {
      text-align: right;

    }
    .btn {
      float: right;
      height: 100%;
      font-size: 0;
      > span {
        display: inline-block;
        .rem(width,100);
        .rem(height,44);
        .rem(margin-left,14);
        .rem(line-height,44);
        .rem(font-size,22);
        color: #fff;
        text-align: center;
        .border-radius(5);
        background: #999;
        vertical-align: middle;
      }
      .action {
        background: #d65317;
      }
    }
    .money {
      float: right;
      .rem(font-size,28);
      color: #d65317;
      span {
        .rem(font-size,24);
        color: #999;
      }
    }
    .message {
      height: 2.03rem;
      line-height: 2.03rem;
      .left {
        float: left;
        .rem(width,94);
      }
      .right {
        width: 100%;
        .rem(margin-top,6);
        .rem(margin-left,-94);
        .rem(padding-left,94);
        line-height: 2.03rem;
        textarea {
          width: 100%;
          height: 0.5rem;
          padding-top: 0.08rem;
          .rem(padding-left,20);
          .rem(font-size,22);
          color: #989898;
          border: 0;
          .border-radius(10);
          resize: none;
          outline: none;
          background: #fff;
        }
      }
    }
  }
  .popu{
    position: fixed;
    z-index: 9999;
    top: 40%;
    left: 1.5rem;
    width: 7rem;
    height: 2.4rem;
    background: #EEE;
    border-radius: 0.2rem;
    >div{
      width: 0.8rem;
      height: 0.8rem;
      margin: auto;
      margin-top: 0.5rem;
      >img{
        width: 100%;
        display: inline-block;
        -webkit-transition-property: -webkit-transform;
        -webkit-transition-duration: 1s;
        -moz-transition-property: -moz-transform;
        -moz-transition-duration: 1s;
        -webkit-animation: rotate 3s linear infinite;
        -moz-animation: rotate 3s linear infinite;
        -o-animation: rotate 3s linear infinite;
        animation: rotate 3s linear infinite;
      }
      @-webkit-keyframes rotate{from{-webkit-transform: rotate(0deg)}
        to{-webkit-transform: rotate(360deg)}
      }
      @-moz-keyframes rotate{from{-moz-transform: rotate(0deg)}
        to{-moz-transform: rotate(359deg)}
      }
      @-o-keyframes rotate{from{-o-transform: rotate(0deg)}
        to{-o-transform: rotate(359deg)}
      }
      @keyframes rotate{from{transform: rotate(0deg)}
        to{transform: rotate(359deg)}
      }
    }
    >p{
      font-size: 0.4rem;
      text-align: center;
      padding-top: 0.2rem;
      color: #000;
    }
  }
  .read {
    .rem(height,32);
    .rem(line-height,32);
    .rem(margin-top,20);
    .rem(margin-bottom,20);
    .rem(font-size,24);
    color: #666;
    text-align: center;
    .box {
      display: inline-block;
      label {
        position: relative;
        float: left;
        .rem(width,30);
        input {
          opacity: 0;
        }
      }
      .icon-radio {
        position: absolute;
        .rem(top,3);
        .rem(left,3);
        .rem(width,24);
        .rem(height,24);
        border: 1px solid #989898;
        border-radius: 50%;
        /*background-image: url(./image/radio_3.png);*/
        /*background-repeat: no-repeat;*/
        /*background-size: 100% 100%;*/
      }
      input:checked+.icon-radio {
        border: 0;
        background-image: url(./image/radio_2.png);
        background-repeat: no-repeat;
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
  .doubt-mask {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 500;
    width: 100%;
    height: 100%;
    background: rgba(102,102,102,.8);
    .popout {
      position: fixed;
      top: 50%;
      left: 50%;
      .rem(width,580);
      .rem(height,350);
      .rem(padding-bottom,19);
      .border-radius(20);
      transform: translate(-50%,-50%);
      background: #fff;
    }
    .cancel {
      width: 100%;
      .rem(height,50);
      .rem(padding-right,20);
      span {
        float: right;
        .rem(width,32);
        .rem(height,32);
        .rem(margin-top,9);
        background: url(./image/cancel.png) no-repeat;
        background-size: 100% 100%;
      }
    }
    .body {
      overflow: hidden;
      > div {
        position: relative;
        /*float: left;*/
        width: 100%;
        .rem(height,280);
        p {
          text-align: center;
        }
        .title {
          .rem(margin-bottom,19);
          .rem(line-height,28);
          .rem(font-size,28);
          color: #d65317;
        }
        .txt {
          .rem(margin-bottom,8);
          .rem(line-height,22);
          .rem(font-size,22);
        }
      }
      .left {
        .rem(padding-left,30);
        .rem(padding-right,13);
        .border(border-right,1,#eee);
        .img {
          .rem(left,37);
        }
      }
      .right {
        .rem(padding-left,15);
        .rem(padding-right,30);
        margin: auto;
        .img {
          left: 29%;
        }
      }
      .img {
        position: absolute;
        .rem(bottom,18);
        .rem(width,231);
        .rem(height,137);
        overflow: hidden;
        img {
          width: 100%;
          .rem(min-height,137);
        }
      }
    }
  }
  .payExplain {
    .mask {
      position: fixed;
      z-index: 500;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(102,102,102,.8);
    }
    .popout {
      position: fixed;
      top: 50%;
      left: 50%;
      z-index: 1000;
      .rem(width,554);
      .rem(height,824);
      .border-radius(10);
      .border(border,2,#d65317);
      transform: translate(-50%,-50%);
      background: #fff;
    }
    .top {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 100;
      width: 100%;
      .rem(height,72);
      .rem(line-height,70);
      .rem(font-size,26);
      color: #333;
      text-align: center;
      .border(border-bottom,2,#eee);
      background: #fff;
    }
    .icon-close1 {
      position: absolute;
      top: 0;
      left: 0;
      .rem(width,100);
      .rem(height,70);
      .rem(line-height,70);
      text-align: center;
      span {
        display: inline-block;
        .rem(width,36);
        .rem(height,36);
        background: url(./image/cancel.png) no-repeat;
        background-size: 100% 100%;
        vertical-align: sub;
      }
    }
    .content {
      width: 100%;
      .rem(height,820);
      .rem(padding-top,87);
      .rem(padding-left,20);
      .rem(padding-right,20);
      .rem(padding-bottom,20);
    }
    .txt {
      width: 100%;
      .rem(height,710);
      .rem(padding-top,12);
      .rem(padding-bottom,12);
      .rem(padding-left,17);
      .rem(padding-right,17);
      .rem(font-size,24);
      color: #666;
      background: #f4f4f4;
      overflow-y: auto;
      > div {
        .rem(line-height,44);
      }
      span {
        color: #f38b00;
      }
    }
    .d1 {
      .rem(margin-bottom,40);
    }
    .d2 {
      .rem(margin-top,50);
    }
  }
</style>
