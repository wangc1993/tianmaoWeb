/*
* @Author: Marte
* @Date:   2017-08-02 07:43:35
* @Last Modified by:   Marte
* @Last Modified time: 2017-08-02 10:09:06
*/
/*点击不同的订单类型按钮的时候
1. 订单类型按钮状态发生变化
2. 下方的订单数据，只显示当前订单类型，其他订单类型隐藏*/
$(function(){
    $("a[orderStatus]").click(function(){
        var orderStatus = $(this).attr("orderStatus");
        if('all'==orderStatus){
            $("table[orderStatus]").show();
        }
        else{
            $("table[orderStatus]").hide();/*隐藏有orderStatus属性的table*/
            $("table[orderStatus="+orderStatus+"]").show();
        }
        $("div.orderType div").removeClass("selectedOrderType");
        $(this).parent("div").addClass("selectedOrderType");
    });
});