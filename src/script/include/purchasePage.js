/**
 * Created by claire on 2015/4/27.
 */
define(['widget/singlePage', 'widget/utils'], function (SinglePage, Utils) {
    var body = '<div id="purchase" class="form-container">\
           <a><img src="img/standard.png" alt="标准版本" class="img-thumbnail"></a>\
           <a><img src="img/korean.png" alt="韩系" class="img-thumbnail"></a>\
           <a><img src="img/law.png" alt="法系" class="img-thumbnail"></a>\
           <div style="margin: 15px 20px 15px;"><button id="purchase_btn" type="button" class="btn btn-primary">下一步</button></div>\
        </div>';

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
                        var _self = this;
                        $('#purchase').parent().parent().parent().parent().css({
                            marginTop:'96px'
                        });
                        var aLists = $('#purchase').find('a');

                        aLists.each(function(){
                            $(this).click(function(){
                                aLists.find('.img-thumbnail').removeClass('active');
                                $(this).find('img').addClass('active');
                            });
                        });


                    }
                });
            }
        }
    };
    singlePsd.init();
    return singlePsdPage;
});

