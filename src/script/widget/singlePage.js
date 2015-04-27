/**
 * Created by Claire on 2015/4/27.
 */
define(['jquery'],function($){
    var _html = '<div id="<%=id%>" class="container single-page" style="width: <%=width%>px;">\
     <form action="#" role="form" class="form-<%=id%>"  style="padding: 0 15px;">\
     <h3 class="form-signin-heading text-center"><%=title%></h3>\
      <div style="padding:75px <%=(width/4)%>px"><%=body%></div>\
		</form>\
    </div>';
    var _singlePage = function(opt){
        opt = opt||{};
        this.opt = opt;
        var html = mstmpl(_html,{
            id:opt.id,
            title:opt.title,
            body:opt.body||'',
            width:opt.width||'800',
            container:opt.container,
            afterRender:opt.afterRender
        });
        $(this.opt.container).after(html);
        this.el = $('#'+this.opt.id);

        this._build();
        this._show();
        //渲染后可以自己定义一些自定义事件
        setTimeout(function(){opt.afterRender&&opt.afterRender();},0)
    };
    _singlePage.prototype ={
        _build: function () {
            return this;
        },
        _show: function(){
            this.el.show();
        },
        _hide:function(){
            this.el.hide();
        }
    };

    return _singlePage;
});
