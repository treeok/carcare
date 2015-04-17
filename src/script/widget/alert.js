/**
 * Created by claire on 2015/4/15.
 */
define(['widget/dialog'],function(Dialog){
    var Alert = function(text,cb){
        var that = this;
        var opt = {};
        var cb = cb||function(){};
        opt.body = '<p class="dia-st-tip">'+text+'</p>';
        opt.title = '提示';
        opt.bottom = ' ';
        opt.textStyle = 'padding:40px;';
        opt.onconfirm = function(){
            cb();
            that.close();
        };
        Dialog.call(this,opt);
        this.el.addClass('dia-sub-tip');
    };
    Alert.prototype = Dialog.prototype;
    Alert.prototype.constructor = Alert;
    return Alert;
});