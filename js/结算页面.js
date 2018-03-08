/*
* @Author: Marte
* @Date:   2017-08-03 10:36:28
* @Last Modified by:   Marte
* @Last Modified time: 2017-08-03 11:44:47
*/
$(function(){
    $("img.leaveMessageImg").click(function() {
        $(this).hide();
        $("span.leaveMessageTextareaSpan").show();
        $("div.orderItemSumDiv").css("height","110px");
        /*var height=$("span.leaveMessageTextareaSpan textarea").css('height');;
        height=parseInt(height);
        height=height+50;
        height=height.toString()+"px";
        $("div.orderItemSumDiv").css("height",height);*/
    });
});