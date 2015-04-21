/**
 * Created by claire on 2015/4/15.
 */
define(['widget/dialog'],function(Dialog){
    var Confirm = function(text,cb){
        var that = this;
        var opt = {};
        var callBack = cb ||function(){};
        opt.body = '<p class="dia-st-tip">'+text+'</p>';
        opt.title = '提示';
        opt.bottom = '';
        opt.textStyle = '';
        opt.onconfirm = function(){
            callBack();
            that.close();
        };
        Dialog.call(this,opt);
        this.el.addClass('dia-sub-tip');
    };
    Confirm.prototype = Dialog.prototype;
    Confirm.prototype.constructor = Confirm;
    return Confirm;
});