/**
 * Created by NCGZ-DZ- on 2015/4/17.
 */
define(function(){
    var _html = '<div id="banner" class="banner" style="overflow: hidden;width: 100%;height: <%=height%>">\
            <ul class="banner-ul" style="position: relative;height:  <%=height%>">\
            <%=content%>\
            </ul>\
            </div>';
    /*var _content = '<li style="width: 25%; background-image: url(http://www.bootcss.com/p/unslider/img/sunset.jpg); background-size: 100% 100%;">\
        <div class="inner">\
    <h1>The jQuery slider that just slides.</h1>\
    <p>就是这个不到3kb的插件！没有奇特的特效或无用的标签。</p>\
    <a class="btn" href="#download">下载</a>\
    </div>\
    </li>';
    var _dots = '<ol class="dots"><li class="dot">1</li><li class="dot">2</li><li class="dot">3</li><li class="dot">4</li></ol>';*/
    var _banner = function(opt){
        opt = opt || {};
        this.opt = opt;
        var html = mstmpl(_html,{
            prev:opt.prev,
            content:opt.content,
            //dots:opt.dots,
            textStyle:opt.textStyle,
            height:opt.height||'415'
        });
        $(opt.prev).after(html);
        this.el=$('#banner');
        if(!opt.content){
            return false;
        }
        this.init();
    };
    _banner.prototype = {
        init:function(){
            var _self = this;

            this.build();




        },
        _setTimeInterval:function(){

        },
        build:function(){
            var banner_ul = this.el.find('.banner-ul'),
                banner_lis,len;
            banner_lis = banner_ul.find('>li');
            len = banner_lis.length;
            if(len==0){
                return false;
            }
            var _dotHtml = '<ol class="dots">';
            banner_lis.each(function(){
                var _index = banner_lis.index(this);
                console.log(_index);
                console.log(this);
                $(this).css({
                    width:(100/len)+'%',
                    backgroundSize:'100% 100%'
                });
                _index++;
                _dotHtml += '<li class="dot">'+_index+'</li>';
            });
            _dotHtml += '</ol>';
            banner_ul.after(_dotHtml);
        }
    };

    return _banner;
});