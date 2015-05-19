/**
 * Created by NCGZ-DZ- on 2015/4/17.
 */
define(function(){
    var _html = '<div id="banner" class="banner" style="margin-top: 97px;">\
            <ul class="banner-lists">\
            <%=content%>\
            </ul>\
            </div>';
    var _banner = function(opt){
        opt = opt || {};
        this.opt = opt;
        var html = mstmpl(_html,{
            prev:opt.prev,
            content:opt.content,
            textStyle:opt.textStyle,
            sliderSpeed:opt.sliderSpeed||100,
            speed:opt.speed
        });
        $(opt.prev).after(html);
        this._el=$('#banner');
        if(!opt.content){
            return false;
        }
        this.init();
    };
    _banner.prototype = {
        init:function(){
            var _self = this;
            this._build();
            //初始化
            this._banner_dots.first().addClass('active');
            this._banner_ul.css({left:0});

            this._banner_dots.each(function(index){
                $(this).click(function(){
                    _self._show(index);
                });
            });

            this._setInterval();
        },
        _setInterval:function(index){
            var _self = this,
                timer;
            clearInterval(this._timer);
            timer = setInterval(function(){
                var _currentIndex = $(_self._banner_dots).index($('.dot.active')),
                    nextIndex = ++_currentIndex;
                if(nextIndex == _self._len){
                    _self._show(0);
                }else{
                    _self._show(nextIndex);
                }
            },_self.opt.speed);
            this._timer = timer;
        },
        _show:function(index){
            var _self = this;
            this._banner_ul.animate({
                left: -(index*100)+'%'
            }, _self.opt.sliderSpeed);
            this._banner_dots.each(function(){
                $(this).removeClass('active');
            });
            this._banner_dots.eq(index).addClass('active');
        },
        _build:function(){
            var banner_ul = this._el.find('>ul'),
                banner_lis,banner_dots,len,maxWidth,maxHeight;
            banner_lis = banner_ul.find('>li');
            len = banner_lis.length;
            //获取第一个匹配元素外部高度和宽度
            maxWidth = this._el.outerWidth();
            maxHeight = this._el.outerHeight();
            if(len==0){
                return false;
            }
            var _dotHtml = '<ol class="dots">';
            banner_lis.each(function(index){
                var _self = $(this),
                    width = _self.outerWidth(),
                    height = _self.outerHeight();
                if(width > maxWidth){
                    maxWidth = width;
                }
                if(height > maxHeight){
                    maxHeight = height;
                }
                $(_self).css({width:(100/len)+'%'});
                index++;
                _dotHtml += '<li class="dot">'+index+'</li>';
            });
            _dotHtml += '</ol>';
            banner_ul.after(_dotHtml);
            banner_dots = this._el.find('.dot');
            this._el.css({width: maxWidth, height: banner_lis.first().outerHeight(), overflow: 'hidden'});
            banner_ul.css({width: len*100+'%',position:'relative',left:0});
            this._banner_ul = banner_ul;
            this._banner_dots = banner_dots;
            this._len = len;
        }
    };

    return _banner;
});