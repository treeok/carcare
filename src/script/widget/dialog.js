/**
 * Created by claire 2015/4/15.
 */
define(['jquery'],function($){
    var zIndex = 2000;
    var index = 0;
    var jqWIN = $(window);
    var _html = '<div id="dialog_<%=index%>" class="dialog" style="margin:0;display:none;z-index:<%=zIndex%>;width:<%=width%>px;">\
      <div class="dialog-head">\
        <%if(title){%>\
        <p class="dia-title" style="<%=titleStyle%>"><%=title%></p>\
        <% } else { %>\
        <%=customTitle%> \
        <% } %>\
        <em class="close-ico" id="close_<%=index%>"><img src="img/dlg-close.png"></em>\
      </div>\
      <div class="dialog-con" style="<%=textStyle%>">\
        <form action="">\
		   <p><%=body%></p>\
			<%if(!bottom) {%>\
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
            title:opt.title||'',
            body:opt.body||'',
            bottom:opt.bottom||'',
            index:_index,
            zIndex:zIndex++,
            titleStyle:opt.titleStyle,
            customTitle:opt.customTitle,
            textStyle:opt.textStyle,
            width:opt.width||'400',
            afterRender:opt.afterRender
        });
        $('body').append(html);
        this.el = $('#dialog_'+_index);

        ////没有底部的样式就不需要事件绑定
        //if(!opt.bottom){
        //    this.cancelBtn = $('#dialog_cancel_'+_index);
        //    this.confirmBtn = $('#dialog_confirm_'+_index);
        //}
        this.onshow = opt.onshow||function() {};
        this.onclose = opt.onclose|| function () {};
        this.closeBtn = $('#close_'+_index);
        this._bind()._show();
        //渲染后可以自己定义一些自定义事件
        setTimeout(function(){opt.afterRender&&opt.afterRender();},0)
    };
    _dialog.prototype ={
        _bind: function () {
            var _self = this;
            /*this.cancelBtn && this.cancelBtn.click(function () {
                _self._hide();
            });*/
            this.closeBtn.click(function () {
                _self._close();
            });
            /*this.confirmBtn && this.confirmBtn.click(function () {
                _self.opt.onconfirm();
                return false;
            });*/
            $(window).resize(function () {
                _self._reposition();
            });
            return this;
        },
        _reposition: function () {
            this.el.css({
                top: ((document.body.scrollHeight - document.body.scrollTop) - this.el.height()) / 2 + 136,
                left: (jqWIN.width() - this.el.width()) / 2
            });
        },
        _show: function (d) {
            var _self = this;
            if(!$('body').find('.dialog_bg').length){
                $('body').append('<div class="gray-bg dialog-bg" style="z-index: 1050;height:'+document.body.scrollHeight+'px"></div>');
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
                _self._reposition();
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
