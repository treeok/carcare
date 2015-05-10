/**
 * Created by claire on 2015/4/27.
 */
define(['widget/singlePage', 'widget/utils'], function (SinglePage, Utils) {

    var body = '<div id="purchase" class="form-container"><div id="purchase_body" style="margin: 15px 20px 15px;"></div>\
              <div style="margin: 15px 35px 15px;"><button id="purchase_btn" type="button" class="btn btn-primary">下一步</button></div></div>';

    var singlePsdPage;

    var singlePsd = {
        init: function () {
            if (singlePsdPage) {
                singlePsdPage._show();
            } else {
                singlePsdPage = new SinglePage({
                    id: 'purchase',
                    title: '选择版本：',
                    container: $('header'),
                    body: body,
                    afterRender: function () {
                        $.ajax({
                            type: 'post',
                            url: rootUrl+'/purchase',
                            data: {},
                            success: function(data){
                                var html = '';
                                data = JSON.parse(data);
                                for(var i = 0; i<data.length;i++){
                                    var item = data[i];
                                    html += '<a><img data-id="'+data[i].id+'" src="'+data[i].upc+'" alt="'+data[i].specifications+'" class="img-thumbnail"></a>'
                                }
                                $('#purchase_body').append(html);


                                $('#purchase').parent().parent().parent().parent().css({
                                    marginTop:'96px'
                                });
                                var aLists = $('#purchase').find('a');
                                var skuIdVal;
                                aLists.each(function(){
                                    $(this).click(function(){
                                        aLists.find('.img-thumbnail').removeClass('active');
                                        $(this).find('img').addClass('active');
                                        skuIdVal = $(this).find('img').attr('data-id');
                                    });
                                });
                                 
                                $('#purchase_btn').click(function(){
                                	if(skuIdVal == undefined){
                                		alert('请选择版本');
                                	}else{
                                		 window.location.href = 'orderInfo.html?skuId='+skuIdVal+'&quantity=1';
                                	}
                         
                                });
                            }
                        });

                    }
                });
            }
        }
    };
    singlePsd.init();
    return singlePsdPage;

});

