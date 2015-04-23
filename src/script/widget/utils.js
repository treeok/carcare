/**
 * Created by claire on 2015/4/22.
 */
define(function(){
    var utils = {
        ajaxGet:function(url,param,cb){
            $.get(url,param,function(data){
                data = JSON.parse(data);
                if(data.errFlag==0){
                    cb&&cb();
                }else{
                    alert(data.errMsg);
                }
            },'json');
        },
        ajaxPost:function(url,param,cb){
            $.get(url,param,function(data){
                data = JSON.parse(data);
                if(data.errFlag==0){
                    cb&&cb();
                }else{
                    alert(data.errMsg);
                }
            });
        },
        ajaxJson:function(url,param,cb,errCb){
            $.ajax({
                type: 'post',
                url: url,
                data: param,
                dataType: 'json',
                success: cb&&cb(),
                error: errCb&&errCb()
            });

        }
    }

});