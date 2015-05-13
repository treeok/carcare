/**
 * Created by claire on 2015/4/22.
 */
define(['jquery'],function($){
    var utils = {
        ajaxGet:function(url,param,cb){
        if(typeof param !== 'object'){
                cb = param;
                param = null;
            }
            $.get(url,param,function(data){
                cb&&cb(data);

            });
        },
        ajaxPost:function(url,param,cb){
            $.post(url,param,function(data){
                cb&&cb(data);
            });
        },
        ajaxJson:function(url,param,cb,errCb){
            $.ajax({
                type: 'post',
                url: url,
                data: param,
                success: function(data){
                    cb&&cb(data)
                },
                error: function(data){
                    errCb&&errCb(data)
                }
            });

        },
        telRegx:function(str){
            var reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
            return str.match(reg);
        },
        psdRegx:function(str){
            var reg = /^(?![a-z]+$)(?![A-Z]+$)(?![0-9]+$)[0-9a-zA-Z\W]\S{7,16}$/;
            return str.match(reg);
        },
        mailRegx:function(str){
            var reg = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
            return str.match(reg);
        },
        getCookie:function(name){
            var cookieName = encodeURIComponent(name) + "=",
                cookieStart = document.cookie.indexOf(cookieName),
                cookieValue = null;
            if (cookieStart > -1){
                var cookieEnd = document.cookie.indexOf(";", cookieStart);
                if (cookieEnd == -1){
                    cookieEnd = document.cookie.length;
                }
                cookieValue = decodeURIComponent(document.cookie.substring(cookieStart
                + cookieName.length, cookieEnd));
            }
            return cookieValue;
        }
    };

    return utils;

});