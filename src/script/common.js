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
        require(['include/login'], function (Login) {
        });
    }else if(docName=='register'){
        require(['include/register'], function (Register) {
        });
    }else if(docName=='resetpwd'){
        require(['include/resetPwd'], function (ResetPwd) {
        });
    }else if(docName=='orderinfo'){
        $('#header').find('li').each(function(){
            $(this).removeClass('active');
        });
        require(['include/orderInfo'], function (OrderInfo) {
        });
    }else if(docName=='purchase'){
        $('#header').find('li').each(function(){
            $(this).removeClass('active');
        });
        require(['include/purchase'], function (Purchase) {
        });
    }else if(docName=='index'||docName=='loginout'){
        $('#header').find('li').each(function(){
            $(this).removeClass('active');
        });
        $('#header').find('li:first').addClass('active');
        require(['include/index'], function (Index) {
        });
    } else if(docName=='carlist'){
        $('#header').find('li').each(function(){
            $(this).removeClass('active');
        });
        $('#header').find('li').eq(1).addClass('active');
        require(['include/carlist'], function (Carlist) {
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

    }else if(docName=='ordersuccess'){
        $('#header').find('li').each(function(){
            $(this).removeClass('active');
        });
        $('#order-success-pay').click(function (){
        	$('#alipaysubmit').submit();
        });
        $('#check-order-lists').click(function(){
        	window.location.href = rootUrl + '/order/orderlist.html';
        });
        $('#order-success-change-order').click(function(){
        	window.location.href = rootUrl + '/order/orderlist.html';
        });
        
    }else if(docName=='subscribe'){
        $('#header').find('li').each(function(){
            $(this).removeClass('active');
        });
        require(['include/subscribe'], function (Subscribe) {
        });
    }else if(docName=='orderlist'){
        $('#header').find('li').each(function(){
            $(this).removeClass('active');
        });
        require(['include/orderList'], function (OrderList) {
        });
    }else if(docName=='choicecar'){
        $('#header').find('li').each(function(){
            $(this).removeClass('active');
        });
        require(['include/choiceCar'], function (ChoiceCar) {
        });
    }else if(docName=='question'){
        $('#header').find('li').each(function(){
            $(this).removeClass('active');
        });
    }else if(docName=='contact'){
        $('#header').find('li').each(function(){
            $(this).removeClass('active');
        });
    }else if(docName=='store'){
        $('#header').find('li').each(function(){
            $(this).removeClass('active');
        });
        require(['include/store'], function (Store) {
        });
    }else if(docName=='paysuccess'){
        $('#header').find('li').each(function(){
            $(this).removeClass('active');
        });
        $('#pay-success-btn').click(function(){
            window.location.href = rootUrl + '/order/orderlist.html';
        });
    }
});
