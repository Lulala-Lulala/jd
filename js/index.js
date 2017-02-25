window.onload=function(){
    //搜索
    search();

    banner();
    //倒计时
    downTime();
}


function banner(){
        /*
        * 1:图片滚动  （我们使用css3 里面属性  transform:translateX();  又要用定时器
        * 2:点盒子随着滚动起来.
        * 3:移动端 （支持触屏）  图片随着手的移动而移动
        * 4:当滑动的距离小于一定的距离
        *   图片吸附回去
        *   当滑动的距离大于一定的距离，滑动到下一张
        * */

        /*我要获取到banner 获取到width*/
        /*我要获取到ul banner 下面的第一个ul*/
        var jd_banner=document.querySelector(".jd_banner");
        var w=jd_banner.offsetWidth;

        /*获取到ul 图片盒子*/
        var imageBox=jd_banner.querySelector("ul");

        var pointBox=jd_banner.querySelectorAll("ul:nth-child(2) li");

        var index=1;

        /*添加过渡*/
        var addTransition=function(){
            /*添加过渡*/
            imageBox.style.transition="all .3s linear";
            imageBox.style.webkitTransition="all .3s linear";
        };

        /*
        * 改位置
        * */
        var addTranslate=function(w){
            //我要改位置
            imageBox.style.transfrom="translateX("+w+"px)";
            imageBox.style.webkitTransform="translateX("+w+"px)";

        }

        /*删除过渡*/

        var removeTransition=function(){
            imageBox.style.transition="none";
            imageBox.style.webkitTransition="none";
        }
        var timer=setInterval(function(){
                index++;
                /*
                * 添加过渡
                * */
                addTransition();
                /*修改位置*/
                addTranslate(-index*w);
        },4000);
        /*
        *   一个新的事件.过渡结束事件，过渡结束了之后就会触发这个事件.
        * */
        itcast.transitionEnd(imageBox,function(){
            if(index>=9){
                index=1;
                removeTransition();
                addTranslate(-index*w);
            }
            else if(index<=1){
                index=8;
                removeTransition();
                addTranslate(-index*w);
            }
            /*index 1,2,3,4,5,6,7,8*/
            setPoint();
        })
        /*获取到所有的点盒子，先把所有的点盒子上面的 class=now 清掉
        * 然后给当前的轮播图对应的点盒子添加一个now
        * */
        var setPoint=function(){
                for(var i=0;i<pointBox.length;i++){
                    pointBox[i].classList.remove("now");
                }
                pointBox[index-1].classList.add("now");
        }


        /*触屏改变盒子的位置*/
        /*
        * 触屏开始
        *   结束定时器
        *   获取到触摸点
        *
        * 移动时候
        *   获取到结束点
        *   计算出来距离
        * 我的图片随着鼠标的移动而移动
        *   不能出现卡顿的效果，我应该吧过渡去掉
        *  移动结束的时候
        *  判断移动的距离
        *    移动的距离是大于当前盒子的width 的1/3 的时候
        *           我还需要判断是跳转到下一张
        *           还是跳转到上一张.
        *    否则我要吸附回去
        *
        *    继续使用定时，播放图片.
        *
        * */

        var startX=0; //开始的点的位置
        var moveX=0; //移动的点的位置
        var distinctX=0; //移动了的位置.
        //判断当前这个元素是否移动了.
        var isMove=false;
        imageBox.addEventListener("touchstart",function(event){
                console.log("触发开始的时候调用");
                startX=event.touches[0].clientX;
                clearInterval(timer);
        });



        imageBox.addEventListener("touchmove",function(event){

                console.log("移动的时候触发.");
                isMove=true;
                //结束点的位置
                moveX=event.touches[0].clientX;
                //移动的位置.
                distinctX=moveX-startX;
                //图片要随着鼠标的滚动而滚动.
                //不能有过渡
                removeTransition();
                //该位置  当前盒子的当前位置 +移动的位置.
                //
                //-640px  -index*w+distinctX
                addTranslate(-index*w+distinctX);

        });
        imageBox.addEventListener("touchend",function(event){
                 /*判断
                 *
                 * 如果鼠标没有移动也会触发这里
                 * */
                if(isMove && Math.abs(distinctX)>w/3){
                        /*
                        * 判断是上一张，还是下一张.
                        * */
                        if(distinctX>0){
                                index--;
                        }else{
                                index++;
                        }
                        addTransition();
                        addTranslate(-index*w);
                }else{
                    //吸附回去的时候有动画效果.
                     addTransition();
                     addTranslate(-index*w);
                }




             timer=setInterval(function(){
                index++;
                /*
                 * 添加过渡
                 * */
                addTransition();
                /*修改位置*/
                addTranslate(-index*w);
            },4000);


        });
}

/*
* 1：搜索盒子
* */
function search(){
      /*我需要获取到轮播图盒子的高度
      * 我还需要获取到滚动条滚动的高度
      * 获取搜索盒子
      * */
      var jd_banner=document.querySelector(".jd_banner");
      var h=jd_banner.offsetHeight;
      var headerBox=document.querySelector(".jd_header_box");
      /*捕获滚动条滚动的事件*/
      window.onscroll=function(){

            //获取到滚动条滚动的高度
            var top=document.body.scrollTop;
            var opacity=0;
            if(h>top){
                opacity=top/h*0.85;
            }else{
                opacity=0.85;
            }
            headerBox.style.background="rgba(201,21,35,"+opacity+")";
      }
}
/*秒杀倒计时.*/
function downTime(){
    /*
        我要获取服务端的一个倒计时的时间.
    * */
    //5个小时
    var downTime=60*60*5;


    var spans=document.querySelectorAll(".timer>span");


    var timer=window.setInterval(function(){

            if(downTime<=1){
                clearInterval(timer);
                return;
            }
            downTime--;

            var h=Math.floor(downTime/3600);
            var m=Math.floor(downTime%3600/60);
            var s=downTime%60;
            spans[0].innerHTML=Math.floor(h/10);
            spans[1].innerHTML=h%10;
            spans[3].innerHTML=Math.floor(m/10);
            spans[4].innerHTML=m%10;
            spans[6].innerHTML=Math.floor(s/10)
            spans[7].innerHTML=s%10;
    },1000);


}