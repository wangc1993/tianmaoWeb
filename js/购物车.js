/*
* @Author: Marte
* @Date:   2017-07-29 15:13:50
* @Last Modified by:   Marte
* @Last Modified time: 2017-07-31 13:16:32
*/
/*公共函数*/

/*以千进制格式化金额*/
function formatMoney(num){
    num=num.toString().replace(/\$|\,/g,'');
    if(isNaN(num))
        num = "0";
    sign = (num == (num = Math.abs(num)));/*Match.abs()取绝对值*/
    num = Math.floor(num*100+0.50000000001);/*Math.floor返回小于等于 x，且与 x 最接近的整数*/
    cents = num%100;
    num = Math.floor(num/100).toString();
    if(cents<10)
    cents = "0" + cents;
    for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
    num = num.substring(0,num.length-(4*i+3))+','+ num.substring(num.length-(4*i+3));/*substring() 方法用于提取字符串中介于两个指定下标之间的字符*/
    return (((sign)?'':'-') + num + '.' + cents);
}
/*同步创建订单按钮：判断是否有商品被选中，只要有任意商品被选中了，就把结算按钮变为天猫色，并且是可点击状态，否则就是灰色，无法点击*/
function syncCreateOrderButton(){
    var selectAny=false;
    $(".cartProductItemIfSelected").each(function(){
        if("selectit"==$(this).attr("selectit")){
            selectAny=true;
        }
    if(selectAny){
        $("button.createOrderButton").css('background-color', '#c40000');
        $("button.createOrderButton").removeAttr('disabled');
    }else{
        $("button.createOrderButton").css('background-color','#AAAAAA');
        $("button.createOrderButton").attr('disabled','disabled');
    }
    });
}
/*同步“全选”状态，选中和未选中是采用俩个不同的图片，遍历所有商品，看是否全选中，通过切换图片显示是否全选状态*/
function syncSelect(){
    var selectAll=true;
    $(".cartProductItemIfSelected").each(function(){
        if("false"==$(this).attr("selectit")){
            selectAll=false;
        }
    });
    if(selectAll){
        $("img.selectAllItem").attr('src', '../images/site/cartSelected.png');
    }else{
        $("img.selectAllItem").attr('src', '../images/site/cartNotSelected.png');
    }
}
/*选中被选中的商品总数，以及总价格。
通过遍历每种商品是否被选中，累加选中商品的总数和总价格，然后修改上下方的总价格、总数*/
function calcCartSumPriceAndNumber(){
    var totalPrice = 0;
    var totalNumber = 0;
    $("img.cartProductItemIfSelected[selectit='selectit']").each(function(){
        var oiid = $(this).attr("oiid");
        var price =$(".cartProductItemSmallSumPrice[oiid="+oiid+"]").text();
        price = price.replace(/,/g, "");
        price = price.replace(/￥/g, "");
        totalPrice += new Number(price);
        var num =$(".orderItemNumberSetting[oiid="+oiid+"]").val();
        totalNumber += new Number(num);
    });
    $("span.cartSumPrice").html("￥"+formatMoney(totalPrice));
    $("span.cartTitlePrice").html("￥"+formatMoney(totalPrice));
    $("span.cartSumNumber").html(totalNumber);
}
/*根据商品数量、商品价格，同步小计价格，接着调用calcCartSumPriceAndNumber()函数同步商品总数和价格*/
function syncPrice(pid,num,price){
    $(".orderItemNumberSetting[pid="+pid+"]").val(num);
    var cartProductItemSmallSumPrice = formatMoney(num*price);
    $(".cartProductItemSmallSumPrice[pid="+pid+"]").html("￥"+cartProductItemSmallSumPrice);
    calcCartSumPriceAndNumber();
}
/*不同事件的监听*/
$(function(){
    /*选中一种商品*/
    $("img.cartProductItemIfSelected").click(function(){
        var selectit = $(this).attr("selectit")
        if("selectit"==selectit){
            $(this).attr("src","../images/site/cartNotSelected.png");
            $(this).attr("selectit","false")
            $(this).parents("tr.cartProductItemTR").css("background-color","#fff");
        }
        else{
            $(this).attr("src","../images/site/cartSelected.png");
            $(this).attr("selectit","selectit")
            $(this).parents("tr.cartProductItemTR").css("background-color","#FFF8E1");
        }
        syncSelect();
        syncCreateOrderButton();
        calcCartSumPriceAndNumber();
    });
    /*商品全选*/
    $("img.selectAllItem").click(function(){
        var selectit = $(this).attr("selectit")
        if("selectit"==selectit){
            $("img.selectAllItem").attr("src","../images/site/cartNotSelected.png");
            $("img.selectAllItem").attr("selectit","false")
            $(".cartProductItemIfSelected").each(function(){
                $(this).attr("src","../images/site/cartNotSelected.png");
                $(this).attr("selectit","false");
                $(this).parents("tr.cartProductItemTR").css("background-color","#fff");
            });
        }
        else{
            $("img.selectAllItem").attr("src","../images/site/cartSelected.png");
            $("img.selectAllItem").attr("selectit","selectit")
            $(".cartProductItemIfSelected").each(function(){
                $(this).attr("src","../images/site/cartSelected.png");
                $(this).attr("selectit","selectit");
                $(this).parents("tr.cartProductItemTR").css("background-color","#FFF8E1");
            });
        }
        syncCreateOrderButton();
        calcCartSumPriceAndNumber();
    });
    /*增加和减少数量*/
    $(".numberPlus").click(function(){
        var pid=$(this).attr("pid");
        var stock= $("span.orderItemStock[pid="+pid+"]").text();
        var price= $("span.orderItemPromotePrice[pid="+pid+"]").text();
        var num= $(".orderItemNumberSetting[pid="+pid+"]").val();
        num++;
        if(num>stock)
            num = stock;
        syncPrice(pid,num,price);
    });
    $(".numberMinus").click(function(){
        var pid=$(this).attr("pid");
        var stock= $("span.orderItemStock[pid="+pid+"]").text();
        var price= $("span.orderItemPromotePrice[pid="+pid+"]").text();
        var num= $(".orderItemNumberSetting[pid="+pid+"]").val();
        --num;
        if(num<=0)
            num=1;
        syncPrice(pid,num,price);
    });
    /*直接修改数量*/
    $(".orderItemNumberSetting").keyup(function(){
        var pid=$(this).attr("pid");
        var stock= $("span.orderItemStock[pid="+pid+"]").text();
        var price= $("span.orderItemPromotePrice[pid="+pid+"]").text();
        var num= $(".orderItemNumberSetting[pid="+pid+"]").val();
        num = parseInt(num);
        if(isNaN(num))
            num= 1;
        if(num<=0)
            num = 1;
        if(num>stock)
            num = stock;
        syncPrice(pid,num,price);
    });
});