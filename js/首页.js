/*
* @Author: Marte
* @Date:   2017-07-21 09:50:24
* @Last Modified by:   Marte
* @Last Modified time: 2017-08-15 08:39:05
*/

'use strict';
function float_search(dom){
        var right_nav=$(dom);
        $(window).bind('scroll resize',function(){
                if($(window).scrollTop()>750){
                    right_nav.show();
                }else{
                    right_nav.hide();
                }
            })
    }
function float_nav(dom){
        var right_nav=$(dom);
        var nav_height=right_nav.height();
        function right_nav_position(bool){
            var window_height=$(window).height();
            var nav_bottom=(window_height-nav_height)/10;
            if(bool){
                right_nav.stop(true,false).animate({bottom:nav_bottom+$(window).scrollTop()},4000);
                /*scrollTop() 方法返回或设置匹配元素的滚动条的垂直位置*/
            }else{
                right_nav.stop(true,false).animate({bottom:nav_bottom},3000);
            }
            right_nav.show();
        }
        /*if (! +"\v1")
        判断是否为IE浏览器。
        疑惑了好久，为什么这句能判断IE浏览器。
        网上找的答案：
        IE里不能把 "\v" 处理成垂直符，所以在IE里它就是表示"\v"这个字符串。
        所以"\v1"为字符串。
        前面的+号把后面的字符串转换成数字，由于"\v1"在IE里为字符串
        所以 +"\v1" 转换失败，其值为NaN
        所以 !+"\v1"的值为 true
        所以在IE里 if(!+"\v1")*/
        if(!+'\v1' && !window.XMLHttpRequest ){
            $(window).bind('scroll resize',function(){
                if($(window).scrollTop()>750){
                    right_nav_position(true);
                }else{
                    right_nav.hide();
                }
            })
        }else{
            $(window).bind('scroll resize',function(){
                if($(window).scrollTop()>750){
                    right_nav_position();
                }else{
                    right_nav.hide();
                }
            })
        }
    }
float_nav('#float');
float_search('#floatSearchDiv');
$(function(){
    //猫耳朵效果
    $("div.rightmenu span").mouseenter(function() {
        var left=$(this).position().left;
        var top=$(this).position().top;
        var width=$(this).css("width");
        var desLeft=parseInt(left)+parseInt(width)/2;
        $("img#catear").css('left', desLeft);
        $("img#catear").css('top', top-20);
        $("img#catear").fadeIn(500);
        /* Act on the event */
    });
    $("div.rightmenu span").mouseleave(function() {
        $("img#catear").hide();
    });

    /*productsAsideCategory显示和影藏效果*/

    //显示产品列表函数
    function showProductsAsideCategorys(cid){
        $("div.eachCategory[cid="+cid+"]").css('background-color', 'white');
        $("div.eachCategory[cid="+cid+"] a").css('color', '#87cefa');
        $("div.productsAsideCategory[cid="+cid+"]").show();
    }
    //影藏产品列表函数
    function hideProductsAsideCategorys(cid){
        $("div.eachCategory[cid="+cid+"]").css('background-color','#e2e2e3');
        $("div.eachCategory[cid="+cid+"] a").css('color','#000000');
        $("div.productsAsideCategory[cid="+cid+"]").hide();
    }

    //当鼠标移入菜单项的时候，显示对应的产品列表
    $("div.eachCategory").mouseenter(function() {
        var cid=$(this).attr('cid');
        showProductsAsideCategorys(cid);
        /* Act on the event */
    });

    //当鼠标移出菜单项的时候，隐藏对应的产品列表
    $("div.eachCategory").mouseleave(function() {
        var cid=$(this).attr('cid');
        hideProductsAsideCategorys(cid);
        /* Act on the event */
    });

    //当鼠标移入产品列表的时候，显示对应产品列表
    $("div.productsAsideCategory").mouseenter(function(){
            var cid = $(this).attr('cid');
            showProductsAsideCategorys(cid);
    });

    //当鼠标移出产品列表的时候，隐藏对应产品列表
    $("div.productsAsideCategory").mouseleave(function() {
        var cid=$(this).attr('cid');
        hideProductsAsideCategorys(cid);
        /* Act on the event */
    });
});