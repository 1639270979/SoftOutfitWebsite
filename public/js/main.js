(function(){
    // 悬浮导航栏
    window.onscroll=function(){
        var scrollTop=document.body.scrollTop
                  ||document.documentElement.scrollTop
        console.log(scrollTop);
        if(pin.style.top=="-45px"){
          if(scrollTop>=300){
          //console.log(scrollTop);
          pin.style.animation="pin-nav-wrap 0.5s linear";
          pin.style.top=0;
            //pin.style.top="-45px"; 
            // pin.style.display="none";
          }
        }
        // if(pin.style.top=="0px"){
        //   pin.style.animation="pin-nav-wrap 0.5s linear reverse";
        //   pin.style.top=="-45px";
        // }
    }
})();