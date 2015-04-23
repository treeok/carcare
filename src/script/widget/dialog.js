/**
 * Created by claire 2015/4/15.
 */
define(function(){
    var zIndex = 1000;
    var index = 0;
    var jqWIN = $(window);
    var _html = '<div id="dialog_<%=index%>" class="dialog" style="margin:0;display:none;z-index:<%=zIndex%>">\
      <div class="dialog-head">\
        <%if(title){%><p class="dia-title"><%=title%></p><% } %>\
        <em class="close-ico" id="close_<%=index%>">X</em>\
      </div>\
      <div class="dialog-con" style="<%=textStyle%>">\
        <form action="">\
		   <p><%=body%></p>\
			<%if(!bottom) {%>\
				<input id="dialog_confirm_<%=index%>" class="v-btn green-btn" type="submit" value="确定">\
				<input id="dialog_cancel_<%=index%>" class="v-btn" type="reset" value="取消">\
			<% } else {%>\
				<%=bottom%>\
			<% } %>\
		</form>\
      </div>\
    </div>';
    var _dialog = function(opt){
        opt = opt||{};
        this.opt = opt;
        var _index = index++;
        var html = mstmpl(_html,{
            title:opt.title,
            body:opt.body||'',
            bottom:opt.bottom||'',
            index:_index,
            zIndex:zIndex++,
            textStyle:opt.textStyle,
            width:opt.width||'400',
            afterRender:opt.afterRender
        });
        $('body').append(html);
        this.el = $('#dialog_'+_index);

        //没有底部的样式就不需要事件绑定
        if(!opt.bottom){
            this.cancelBtn = $('#dialog_cancel_'+_index);
            this.confirmBtn = $('#dialog_confirm_'+_index);
        }
        this.onshow = opt.onshow||function() {};
        this.onclose = opt.onclose|| function () {};
        this.closeBtn = $('#close_'+_index);
        this._bind();

        //渲染后可以自己定义一些自定义事件
        setTimeout(function(){opt.afterRender&&opt.afterRender();},0)
    };
    _dialog.prototype ={
        _bind: function () {
            var _self = this;
            this.cancelBtn && this.cancelBtn.click(function () {
                _self._hide();
            });
            this.closeBtn.click(function () {
                _self._hide();
            });
            this.confirmBtn && this.confirmBtn.click(function () {
                _self.opt.onconfirm();
                return false;
            });
            $(window).resize(function () {
                _self._reposition();
            });
            return this;
        },
        _reposition: function () {
            this.el.css({
                top: (jqWIN.height() - this.el.height()) / 2 + jqWIN.scrollTop(),
                left: (jqWIN.width() - this.el.width()) / 2
            });
        },
        _show: function (d) {
            if(!$('body').find('.dialog_bg').length){
                $('body').append('<div class="gray-bg dialog-bg" style="z-index: 100;"></div>');
            }
            function bgHeight(){
                var bodyHeight = $(document).height();
                var windowHeight = $(window).height();
                if(windowHeight < bodyHeight){
                    $('body').find('.dialog_bg').height(bodyHeight);
                }else{
                    $('body').find('.dialog_bg').height('100%');
                }
            }
            bgHeight();
            $(window).resize(function(){
                bgHeight();
            });
            this.el.show();
            this._reposition();
            this.onshow(d);
        },
        _hide: function () {
            this.el.hide();
            $('body').find('.dialog-bg').remove();
        },
        _close:function(){
            this.el.remove();
            this.onclose();
            $('body').find('.dialog-bg').remove();
        }
    };

    return _dialog;
});
