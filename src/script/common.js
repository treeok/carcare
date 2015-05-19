var rootUrl = 'http://10.8.6.120:8888/carcare-web-homesite';
var static_domain = 'http://localhost:63342/carcare/public';
require.config({
    baseUrl: static_domain + '/script',
    paths: {
        jquery: 'jquery.min'
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

$(function () {
    $('#offical-wechart').mouseover(function () {
        $('#offical-wechart-code').show();
    }).mouseleave(function () {
        $('#offical-wechart-code').hide();
    });
    var urlArray = document.URL.split('/'),
        docName = urlArray[urlArray.length - 1].split('.')[0];

    //login
    if (docName == 'login') {
        require(['include/login'], function (Login) {
        });
    }
    else if (docName == 'register') {
        require(['include/register'], function (Register) {
        });
    }
    else if (docName == 'resetpwd') {
        require(['include/resetPwd'], function (ResetPwd) {
        });
    } else if (docName == 'index' || docName == 'loginout') {
        menuDisplay(0);
        require(['include/index'], function (Index) {
        });
    } else if (docName == 'carlist') {
        menuDisplay(1);
        require(['include/carlist'], function (Carlist) {
        });
    } else if (docName == 'install') {
        menuDisplay(2);

    } else if (docName == 'app') {
        menuDisplay(3);

    } else if (docName == 'orderinfo') {
        menuDisplay();
        require(['include/orderInfo'], function (OrderInfo) {
        });
    } else if (docName == 'purchase') {
        menuDisplay();
        require(['include/purchase'], function (Purchase) {
        });
    } else if (docName == 'ordersuccess') {
        menuDisplay();
        $('#order-success-pay').click(function () {
            $('#alipaysubmit').submit();
        });
        $('#check-order-lists').click(function () {
            window.location.href = rootUrl + '/order/orderlist.html';
        });
        $('#order-success-change-order').click(function () {
            window.location.href = rootUrl + '/order/orderlist.html';
        });

    } else if (docName == 'subscribe') {
        menuDisplay();
        require(['include/subscribe'], function (Subscribe) {
        });
    } else if (docName == 'orderlist') {
        menuDisplay();
        require(['include/orderList'], function (OrderList) {
        });
    } else if (docName == 'choicecar') {
        menuDisplay();
        require(['include/choiceCar'], function (ChoiceCar) {
        });
    } else if (docName == 'paysuccess') {
        menuDisplay();
        $('#pay-success-btn').click(function () {
            window.location.href = rootUrl + '/order/orderlist.html';
        });
    } else if (docName == 'question') {
        menuDisplay();
    } else if (docName == 'contact') {
        menuDisplay();
    } else if (docName == 'store') {
        menuDisplay();
        require(['include/store'], function (Store) {
        });
    }

    function menuDisplay(num) {
        var header = $('#header');
        header.find('li').each(function () {
            $(this).removeClass('active');
        });
        if (num != undefined) {
            header.find('li').eq(num).addClass('active');
        }
    }
});
