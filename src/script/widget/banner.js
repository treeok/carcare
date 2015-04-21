/**
 * Created by NCGZ-DZ- on 2015/4/17.
 */
define(function(){
    var _html = '<div id="banner" class="banner">\
            <div class="banner-lists">\
            <%=content%>\
            </div>\
            </div>';
    var _banner = function(opt){
        opt = opt || {};
        this.opt = opt;
        var html = mstmpl(_html,{
            prev:opt.prev,
            content:opt.content,
            textStyle:opt.textStyle,
            speed:opt.speed||'120000'
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
            //初始化
            this.build();
            this._banner_list.first().addClass('active');
            this._banner_dots.first().addClass('active');

            this._setInterval();
            //点击事件
            this._banner_dots.each(function(index){
                $(this).click(function(){
                    //clearInterval(_self._timer);
                    _self._show(index);
                });
            });
        },
        _setInterval:function(){
            var _self = this,
                timer;
            clearInterval(_self._timer);
            timer = setInterval(function () {
                var _currentIndex = $(_self._banner_list).index($('.banner-list.active')),
                    nextIndex = ++_currentIndex;
                if (nextIndex == _self._len) {
                    _self._show(0);
                } else {
                    _self._show(nextIndex);
                }
            }, _self.opt.speed);
            this._timer = timer;
        },
        _show:function(index){
            this._banner_list.each(function(){
                $(this).removeClass('active');
            });
            this._banner_dots.each(function(){
                $(this).removeClass('active');
            });
            this._banner_list.eq(index).addClass('active');
            this._banner_dots.eq(index).addClass('active');
        },
        build:function(){
            var banner_lists = this._el.find('.banner-lists'),
                banner_list,banner_dots,len,maxWidth,maxHeight;
            banner_list = banner_lists.find('>div');
            len = banner_list.length;
            //获取第一个匹配元素外部高度和宽度
            maxWidth = this._el.outerWidth();
            maxHeight = this._el.outerHeight();
            this._banner_lists = banner_lists;
            this._banner_list = banner_list;
            if(len==0){
                return false;
            }
            var _dotHtml = '<ol class="dots">';
            banner_list.each(function(index){
                var _self = $(this),
                    width = _self.outerWidth(),
                    height = _self.outerHeight();
                if(width > maxWidth){
                    maxWidth = width;
                }
                if(height > maxHeight){
                    maxHeight = height;
                }
                _self.addClass('banner-list');
                //_self.hide();
                index++;
                _dotHtml += '<li class="dot">'+index+'</li>';
            });
            _dotHtml += '</ol>';
            banner_lists.after(_dotHtml);
            this._el.css({width: maxWidth, height: banner_list.first().outerHeight(), overflow: 'hidden'});
            banner_dots = this._el.find('.dots').find('.dot');
            this._banner_dots = banner_dots;
            this._len = len;
        }
    };

    return _banner;
});