/**
 * Created by Claire on 2015/4/27.
 */
define(['jquery'],function($){
    var index = 0;
    var _html = '<div id="singlePage_<%=index%>" class="single-page">\
     <div class="container">\
     <form action="#" role="form" class="form-<%=id%> form-horizontal"  style="padding: 0 15px;">\
        <div class="form-signin-heading text-left"><img src="img/tip.png"><span><%=title%></span></div>\
        <div style="padding:40px <%=(width/4)%>px"><%=body%></div>\
	 </form>\
     </div></div>';
    var _singlePage = function(opt){
        opt = opt||{};
        var _index = index++;
        this.opt = opt;
        var html = mstmpl(_html,{
            id:opt.id,
            title:opt.title,
            body:opt.body||'',
            index:_index,
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
