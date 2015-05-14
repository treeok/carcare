var rootUrl = 'http://10.8.6.127:8080/carcare-web-homesite';
var static_domain = 'http://localhost:63342/carcare/public';
require.config({
    baseUrl: static_domain+'/script',
    paths: {
        jquery: 'jquery-1.11.1'
    }
});

var mstmpl = function (str, data) {
    if (!data) {
        return false;
    }
    var cache = {};
    var _inner = function (str, data) {
        var fn = !/\W/.test(str) ? cache[str] = cache[str] || this.$_MSTMPL(document.getElementById(str).innerHTML) : new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);};" + "with(obj){p.push('" + str.replace(/[\r\t\n]/g, " ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g, "$1\r").replace(/\t=(.*?)%>/g, "',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'") + "');}return p.join('');");
        return data ? fn(data) : fn;
    };
    return _inner(str, data);
};

require(['jquery','widget/utils'], function ($,Utils) {
    $('#offical-wechart').mouseover(function(){
        $('#offical-wechart-code').show();
    }).mouseleave(function(){
        $('#offical-wechart-code').hide();
    });
    var urlArray = document.URL.split('/'),
        docName = urlArray[urlArray.length-1].split('.')[0];

    if(docName=='login'||docName=='prelogin'){
        require(['include/loginPage'], function (LoginPage) {
        });
    }else if(docName=='register'){
        require(['include/registerPage'], function (RegisterPage) {
        });
    }else if(docName=='forgetPsd'){
        require(['include/forgetPsdPage'], function (ForgetPsdPage) {
        });
    }else if(docName=='orderInfo'){
        $('#header').find('li').each(function(){
            $(this).removeClass('active');
        });
        require(['include/orderPage'], function (OrderPage) {
        });
    }else if(docName=='purchase'){
        $('#header').find('li').each(function(){
            $(this).removeClass('active');
        });
        require(['include/purchasePage'], function (PurchasePage) {

        });
    }else if(docName=='index'){
        $('#header').find('li').each(function(){
            $(this).removeClass('active');
        });
        $('#header').find('li:first').addClass('active');
        /*require(['include/index'], function (Index) {

        });*/
    } else if(docName=='carlist'){
        $('#header').find('li').each(function(){
            $(this).removeClass('active');
        });
        $('#header').find('li').eq(1).addClass('active');
        require(['include/carlistPage'], function (CarlistPage) {

        });
    }else if(docName=='install'){
        $('#header').find('li').each(function(){
            $(this).removeClass('active');
        });
        $('#header').find('li').eq(2).addClass('active');

    }else if(docName=='app'){
        $('#header').find('li').each(function(){
            $(this).removeClass('active');
        });
        $('#header').find('li').eq(3).addClass('active');

    }else if(docName=='orderSuccess'){
        $('#header').find('li').each(function(){
            $(this).removeClass('active');
        });
        $('#order-success-pay').click(function (){
        	$('#alipaysubmit').submit();
        });
    }else if(docName=='subscribe'){
        $('#header').find('li').each(function(){
            $(this).removeClass('active');
        });
        require(['include/subscribePage'], function (SubscribePage) {
        });
    }else if(docName=='checkOrder'){
        $('#header').find('li').each(function(){
            $(this).removeClass('active');
        });
        require(['include/checkOrderPage'], function (checkOrderPage) {
        });
    }else if(docName=='selectModel'){
        $('#header').find('li').each(function(){
            $(this).removeClass('active');
        });
        require(['include/selectModelPage'], function (SelectModelPage) {
        });
    }
});
