/*
* @Author: Marte
* @Date:   2017-07-24 11:06:00
* @Last Modified by:   Marte
* @Last Modified time: 2017-07-24 14:01:14
*/
/*排序都是从数据库里读数据，显示。这边为了演示效果，直接从仅有的页面数据排序（仅仅从价格输入框排序）*/
$(function(){
    $("input.sortBarPrice").keyup(function() {
        var number=$(this).val();
        if(number.length==0){
            $("div.productUnit").show();
            return;
        }
        number=parseInt(number);
        if(isNaN(number)){
            number=1;
        }
        if(number<=0){
            number=1;
        }
        $(this).val(number);
        var beginPrice=$("input.beginPrice").val();
        var endPrice=$("input.endPrice").val();
        if(!isNaN(beginPrice)&&!isNaN(endPrice)){
            $("div.productUnit").hide();
            $("div.productUnit").each(function(){
                var price=$(this).attr('price');
                price=new Number(price);
                if(price>=beginPrice&&price<=endPrice){
                    $(this).show();
                }
            });
        }
    });
});