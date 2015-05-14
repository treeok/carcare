/**
 * Created by claire on 2015/4/21.
 */
require(['jquery', 'widget/utils'],function($,Utils){
    Utils.ajaxJson(rootUrl+'/switchTime',{},function(data){
        data = JSON.parse(data);
        if(data.errFlag == 0){
            $('#index-entrance-btns').empty();
            $('#index-entrance-btns').append('<button id="index-entrance-purchase" type="button" class="btn btn-primary">立即购买</button>');
            $('#index-entrance-purchase').click(function(){
                window.location.href = rootUrl+'/selectModel.html';
            });
        }else if(data.errFlag == 1){
            $('#index-entrance-btns').empty();
            $('#index-entrance-btns').append('<button id="index-entrance-order" type="button" class="btn btn-primary">免费预约</button>');
            $('#index-entrance-order').click(function(){
                window.location.href = rootUrl+'/subscribe/subscribe.html'
            });
        }

    });

});