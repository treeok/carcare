/**
 * Created by claire on 2015/4/15.
 */
define(['widget/dialog'],function(Dialog){
    var Alert = function(text,cb){
        var that = this;
        var opt = {};
        var cb = cb||function(){};
        opt.width = 300;
        opt.body = '<div class="dia-head-tip text-left" style="margin: 5px 5px;color: #337ab7;text-indent: 10px;font-weight: bold;">提示：</div><hr style="margin: 5px 0;"><div><img src="'+static_domain+'/img/tips.png"><span style="display: inline-block;margin-left: 20px;" class="dia-st-tip">'+text+'</span></div>';
        opt.bottom = '<div style="margin-bottom: 20px;"><button class="btn btn-primary dia-alert-confirm pull-right" style="margin-right: 15px;margin-bottom: 15px;">确定</button></div>';
        Dialog.call(this,opt);
        this.el.addClass('dia-sub-tip');
        this.confirmBtn = $('.dia-alert-confirm');
        this.cancelBtn = $('.dia-alert-cancel');
        this.confirmBtn.click(function () {
            that._close();
        });

    };
    Alert.prototype = Dialog.prototype;
    Alert.prototype.constructor = Alert;
    return Alert;
});