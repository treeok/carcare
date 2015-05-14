/**
 * Created by claire on 2015/5/12.
 */
define(['jquery','widget/utils','widget/dialog'],function($,Utils,Dialog){
    var body = '<div id="subscribeDlgs" class="form-container">\
        <div class="subscribe-info">\
           <h4>车型信息</h4>\
           <p><span class="subscribe-brand"></span><span class="subscribe-model"></span><span class="subscribe-style"></span></p>\
           <hr>\
        </div>\
        <div class="subscribe-info">\
           <h4>用户信息</h4>\
           <p>预约手机号码：<span class="subscribe-user"></span></p>\
           <hr>\
        </div></div>';

    var bottom = '<div class="subscribe-info">\
           <button id="subscribeDlgs-cancel" type="button" class="btn btn-primary">返回修改</button>\
           <button id="subscribeDlgs-ok" type="button" class="btn btn-primary">确认</button>\
        </div>';

    $('#phoneCodeButton').click(function(){
        Utils.ajaxGet(rootUrl+'/code.html',function(data){
            $('#phoneCodeButton')[0].src = rootUrl+'/code.html';
        });
    });

    getBrand(rootUrl+'/subscribe/getBrands',{},function(){
        var brandId = $('#brandSub').val();
        getModel(rootUrl+'/subscribe/getAutoModel',{brandId:brandId},function(){
            var modelId = $('#modelSub').val();
            getStyle(rootUrl+'/subscribe/getAutoStyle',{modelId:modelId});
        });
    });

    $('#brandSub').change(function(){
        var brandId = $('#brandSub').val();
        getModel(rootUrl+'/subscribe/getAutoModel',{brandId:brandId},function(){
            var modelId = $('#modelSub').val();
            getStyle(rootUrl+'/subscribe/getAutoStyle',{modelId:modelId});
        });
    });

    $('#modelSub').change(function(){
        var modelId = $('#modelSub').val();
        getStyle(rootUrl+'/subscribe/getAutoStyle',{modelId:modelId});
    });

    $('#registerButton').click(function(){
        var userCon = $('#name'),
            codeCon = $('#phoneCode'),
            mailCon = $('#email');

        $('#subscribe').on('focus', 'input', function () {
            $('#subscribe').find('.tips-container').hide();
        });

        if(userCon.val() == ''){
            $(this).next().show();
            return false;
        }

        if(codeCon.val() == ''){
            $(this).next().find('small:first').show();
            return false;
        }

        if(mailCon.val() == ''){
            $(this).next().show();
            return false;
        }
        var params = {
            name : userCon.val(),
            styleid : $('#styleSub').val(),
            email : mailCon.val(),
            code : codeCon.val()
        };
        var newDialog = new Dialog({
            id: 'subscribeDlg',
            title: '预约信息确认：',
            container: $('header'),
            body: body,
            bottom: bottom,
            afterRender: function () {
                $('#subscribeDlgs').find('.subscribe-brand').text($('#brandSub').find('option:selected').text());
                $('#subscribeDlgs').find('.subscribe-model').text($('#modelSub').find('option:selected').text());
                $('#subscribeDlgs').find('.subscribe-style').text($('#styleSub').find('option:selected').text());
                $('#subscribeDlgs').find('.subscribe-user').text(loginMobile);
                $('#subscribeDlgs-cancel').click(function(){
                    newDialog._close();
                });
                $('#subscribeDlgs-ok').click(function(){
                    Utils.ajaxJson(rootUrl+'/subscribe/doSubscribe',params,function(data){
                        data = JSON.parse(data);
                        if(data.errFlag == 0){
                            alert('已经预约');
                            newDialog._close();
                        }else if(data.errFlag == 1){
                            alert('预约成功！');
                            newDialog._close();
                        }else if(data.errFlag == -2){
                            $(this).next().find('small:last').show();
                            return false;
                        }
                    });
                });
            }
        });


    });

    function getBrand(url,params,callback){
        Utils.ajaxJson(url,params,function(data){
            $('#brandSub').empty();
            data = JSON.parse(data);
            if(data.errFlag == 1){
                var arr = [],
                    html = '';
                for(var i in data.list){
                    arr = arr.concat(data.list[i]);
                }
                for(var j = 0;j < arr.length;j++){
                    var item = arr[j];
                    html += '<option value="'+item.brandId+'">'+item.brandName+'</option>';
                }
                $('#brandSub').append(html);
                callback && callback();
            }
        });
    }

    function getModel(url,params,callback){
        Utils.ajaxJson(url,params,function(data){
            $('#modelSub').empty();
            data = JSON.parse(data);
            if(data.errFlag == 1){
                var html = '';
                for(var j = 0;j < data.items.length;j++){
                    var item = data.items[j];
                    html += '<option value="'+item.modelId+'">'+item.modelName+'</option>';
                }
                $('#modelSub').append(html);
                callback && callback();
            }
        });
    }

    function getStyle(url,params,callback){
        Utils.ajaxJson(url,params,function(data){
            $('#styleSub').empty();
            data = JSON.parse(data);
            if(data.errFlag == 1){
                var arr = [],
                    html = '';
                for(var i in data.list){
                    arr = arr.concat(data.list[i]);
                }
                for(var j = 0;j < arr.length;j++){
                    var item = arr[j];
                    html += '<option value="'+item.styleId+'">'+item.styleName+'</option>';
                }
                $('#styleSub').append(html);
                callback && callback();
            }
        });
    }


});
