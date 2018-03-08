/*
* @Author: Marte
* @Date:   2017-07-27 11:14:25
* @Last Modified by:   Marte
* @Last Modified time: 2017-07-28 13:12:42
*/
$(function(){
    /*显示缩略图效果*/
    $("img.smallImg").mouseenter(function(){
        var bigImageURL=$(this).attr('bigImageURL');
        $("img.bigImg").attr('src', bigImageURL);
    });
    /*大图片的预加载工作,首先默认的大图片要先加载出来*/
    $("img.bigImg").load(
        function(){
            $("img.smallImg").each(function() {
                var bigImageURL=$(this).attr('bigImageURL');
                img=new Image();
                img.src= bigImageURL;
                img.onload=function(){
                    console.log(bigImageURL);
                    $("div.img4load").append($(img));/*放进一个div中，不然加载的时候是没有的*/
                }
            });
        }
    );

    /*修改价格效果*/
    var stock=66;
    $(".productNumberSetting").keyup(function() {
        var num=$(".productNumberSetting").val();
        num = parseInt(num);
        if(isNaN(num))
            num= 1;
        if(num<=0)
            num = 1;
        if(num>stock)
            num = stock;
        $(".productNumberSetting").val(num);
        /* Act on the event */
    });
    $(".increaseNumber").click(function(){
        var num= $(".productNumberSetting").val();
        num++;
        if(num>stock)
            num = stock;
        $(".productNumberSetting").val(num);
    });
    $(".decreaseNumber").click(function(){
        var num= $(".productNumberSetting").val();
        --num;
        if(num<=0)
            num=1;
        $(".productNumberSetting").val(num);
    });

    /*切换商品详情和评价效果*/
    $("div.productReviewDiv").hide();
    $("a.productDetailTopReviewLink").click(function(){
        $("div.productReviewDiv").show();
        $("div.productDetailDiv").hide();
    });
    $("a.productReviewTopPartSelectedLink").click(function(){
        $("div.productReviewDiv").hide();
        $("div.productDetailDiv").show();
    });

});