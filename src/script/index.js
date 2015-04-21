/**
 * Created by claire on 2015/4/21.
 */
require(['widget/banner'],function(Banner){
    var _content = '<li style="background-image: url(http://www.bootcss.com/p/unslider/img/sunset.jpg);">\
     <div class="inner">\
     <h1>first one</h1>\
     <p>就是这个不到3kb的插件！没有奇特的特效或无用的标签。</p>\
     <a class="btn" href="#download">下载</a>\
     </div>\
     </li><li style="background-image: url(http://www.bootcss.com/p/unslider/img/wood.jpg);">\
     <div class="inner">\
     <h1>first two</h1>\
     <p>就是这个不到3kb的插件！没有奇特的特效或无用的标签。</p>\
     <a class="btn" href="#download">下载</a>\
     </div>\
     </li><li style="background-image: url(http://www.bootcss.com/p/unslider/img/shop.jpg);">\
     <div class="inner">\
     <h1>first three</h1>\
     <p>就是这个不到3kb的插件！没有奇特的特效或无用的标签。</p>\
     <a class="btn" href="#download">下载</a>\
     </div>\
     </li>';
    //var _dots = '<ol class="dots"><li class="dot">1</li><li class="dot">2</li><li class="dot">3</li></ol>';
    var _prev = $('header');
    new Banner({
        prev:_prev,
        content: _content,
        speed:12000
    });


});