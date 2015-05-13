/**
 * Created by NCGZ-DZ- on 2015/5/12.
 */

define(['widget/dialog', 'widget/utils'], function (Dialog, Utils) {
    var body1 = '<div id="selectModelLists"></div>';

    var title1 = '<div id="selectModelTitle"><span>已选车型：</span><span class="select-brand"></span></div>';

    var body2 = '<div id="selectStyleLists"></div>';

    var title2 = '<div id="selectStyleTitle"><span>已选车型：</span><span class="select-brand"></span><span class="select-model"></span></div>';

    var body3 = '<div id="confirm-model">\
        <div><h4 style="font-weight: bold;">请确认您当前的车型信息：</h4>\
        <div id="confirm-models"></div><hr></div>\
        <div><h4 style="font-weight: bold;">告知：</h4>\
        <div style="margin-bottom: 50px;"><p>为保证能正常使用车挣盒子，请车型暂时不适配的车主不要选择。</p><p>静待后续车挣通知。否则由此引起车挣无法使用，我们概不负责。</p></div></div>\
        <div style="margin: auto;"><button id="confirm-models-ok" type="button" class="btn btn-primary btn-lg">确认</button>\
        <button id="confirm-models-cancel" type="button" class="btn btn-default btn-lg">取消</button>\
        </div></div>';

    var title3 = '<p style="font-weight: 700;font-size: 16px;font-family: 微软雅黑;color: #333;text-align: left;margin-top: -15px;">车型确认：</p>';

    Utils.ajaxJson('http://10.8.6.127:8080/carcare-web-homesite/subscribe/selectBrands', {}, function (data) {
        data = JSON.parse(data);
        if(data.errFlag == 0){
            var html = '';
            for (var j = 0; j < data.list.length; j++) {
                var item = data.list[j];
                html += '<div class="select-brand-list" data-value="' + item.brandId + '"><img class="car-logo" src="' + item.brandImg + '"><span style="margin-left:15px;display;inline-block;">' + item.brandName + '</span></div>';
            }
            $('#select-brand-lists').append(html);
            callback();
        }
    });

    function callback(){
        $('#select-brand-lists').find('.select-brand-list').each(function(){
            $(this).click(function(){
                $('#select-brand-lists').find('.select-brand-list').each(function(){
                    $(this).removeClass('active');
                });
                $(this).addClass('active');

                var brandId = $(this).attr('data-value');
                var brandName = $(this).find('span').text();

                var newDialog1 = new Dialog({
                    container: $('header'),
                    body: body1,
                    customTitle:title1,
                    width: 700,
                    afterRender: function () {
                        $('#selectModelTitle').find('.select-brand').text(brandName);
                        Utils.ajaxJson('http://10.8.6.127:8080/carcare-web-homesite/subscribe/suitCarModel', {brandId:brandId}, function (data) {
                            data = JSON.parse(data);
                            if(data.errFlag == 0){
                                var html = '';
                                for (var j = 0; j < data.list.length; j++) {
                                    var item = data.list[j];
                                    html += '<div class="select-model-list" data-value="' + item.modelId + '"><span style="margin-left:15px;display;inline-block;">' + item.modelName + '</span></div>';
                                }
                                $('#selectModelLists').append(html);
                                callback1(newDialog1,brandName);
                            }
                        });
                    }
                });
            });
        });
    }

    function callback1(newDialog1,brandName){
        $('#selectModelLists').find('.select-model-list').each(function(){
            $(this).click(function(){
                $('#selectModelLists').find('.select-model-list').each(function(){
                    $(this).removeClass('active');
                });
                $(this).addClass('active');

                var modelId = $(this).attr('data-value');
                var modelName = $(this).find('span').text();
                newDialog1._close();

                var newDialog2 = new Dialog({
                    container: $('header'),
                    body: body2,
                    customTitle:title2,
                    width: 860,
                    afterRender: function () {

                        $('#selectStyleTitle').find('.select-brand').text(brandName);

                        $('#selectStyleTitle').find('.select-model').text(modelName);

                        Utils.ajaxJson('http://10.8.6.127:8080/carcare-web-homesite/subscribe/suitCarStyle', {modelId:modelId}, function (data) {
                            data = JSON.parse(data);
                            if(data.errFlag == 1){
                                var arr = [];
                                var html = '';
                                for(var i in data.list){
                                    arr = arr.concat(data.list[i]);
                                }
                                for (var j = 0; j < arr.length; j++) {
                                    var item = arr[j];
                                    html += '<div class="select-style-list" data-value="' + item.styleId + '"><span style="margin-left:15px;display;inline-block;">' + item.styleName + '</span></div>';
                                }
                                $('#selectStyleLists').append(html);

                                $('#selectStyleLists').find('.select-style-list').each(function(){
                                    $(this).click(function(){
                                        $('#selectStyleLists').find('.select-style-list').each(function(){
                                            $(this).removeClass('active');
                                        });
                                        $(this).addClass('active');
                                        newDialog2._close();
                                        var styleId = $(this).attr('data-value');
                                        var styleName = $(this).find('span').text();
                                        $('#select-model-details').addClass('active').text(brandName+'　'+ modelName +'　'+styleName).attr('data-styleId',styleId);
                                    });
                                });
                            }
                        });

                    }
                });
            });
        });

    }

    $('#select-model-next').click(function(){
        if(!$('#select-model-details').hasClass('active')){
            alert('请选择车型');
        }else{
            var newDialog3 = new Dialog({
                container: $('header'),
                body: body3,
                title: title3,
                width: 700,
                afterRender: function () {
                    $('#confirm-models').text($('#select-model-details').text());
                }
            });
        }
    });

});
