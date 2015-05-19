/**
 * Created by claire on 2015/4/15.
 */
define(['widget/dialog'],function(Dialog){
    var Confirm = function(text,cb){
        var that = this;
        var opt = {};
        var callBack = cb ||function(){};
        opt.width = 300;
        opt.body = '<div class="dia-head-tip text-left" style="margin: 5px 5px;color: #337ab7;text-indent: 10px;font-weight: bold;">提示：</div><hr style="margin: 5px 0;"><div><img src="'+static_domain+'/img/confirm.png"><span style="display: inline-block;margin-left: 20px;" class="dia-st-tip">'+text+'</span></div>';
        opt.bottom = '<div class="pull-right" style="margin-bottom: 20px;margin-top: 10px;"><button class="btn btn-primary dia-confirm-confirm">确定</button><button class="btn btn-default dia-confirm-cancel" style="margin-left: 5px;margin-right: 15px;">取消</button></div>';
        Dialog.call(this,opt);
        this.el.addClass('dia-sub-tip');
        this.confirmBtn = $('.dia-confirm-confirm');
        this.cancelBtn = $('.dia-confirm-cancel');
        this.confirmBtn.click(function () {
            callBack();
            that._close();
        });
        this.cancelBtn.click(function () {
            that._close();
        });
    };
    Confirm.prototype = Dialog.prototype;
    Confirm.prototype.constructor = Confirm;
    return Confirm;
});