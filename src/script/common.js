var rootUrl = 'http://10.8.6.127:8080/carcare-web-homesite';
//var static_domain = 'http://localhost:63342/carcare/public';
require.config({
    baseUrl:'script',
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
    var urlArray = document.URL.split('/'),
        docName = urlArray[urlArray.length-1].split('.')[0];

    if(docName=='login'||docName=='prelogin'){
        //login.html
        $('#loginPage').on('focus', 'input', function () {
            $('#loginPage').find('.tips-container').hide();
        });

        var userNameCon = $('#login_login_user');
        var psdCon = $('#login_login_psd');

        $('#login_login_btn').click(function(){
            if(userNameCon.val() == ''){
                userNameCon.next().next().show();
                return false;
            }
            if(psdCon.val() == ''){
                psdCon.next().next().show();
                return false;
            }
            var params = {
                tel:userNameCon.val(),
                password:psdCon.val()
            };
            Utils.ajaxJson(rootUrl+'/member/login',params,function(data){
                data = JSON.parse(data);
                if(data.errFlag == 0){
                    window.location.href = 'index.html';
                }else if(data.errFlag == 1){
                    userNameCon.next().show();
                    return false;
                }else if(data.errFlag == 2){
                    psdCon.next().show();
                    return false;
                }else{
                    window.location.href = rootUrl+'/member/404.html';
                }
            });

            /*$.ajax({
                url:rootUrl+'/member/login.html',
                data:params,
                type:'POST',
                success:function(data){
                    alert(data);
                    if(data.errFlag == 0){
                        window.location.href = 'index.html';
                    }else if(data.errFlag == 1){
                        userNameCon.next().show();
                        return false;
                    }else if(data.errFlag == 2){
                        psdCon.next().show();
                        return false;
                    }else{
                        window.location.href = '404.html';
                    }
                },
                error:function(){
                    alert(11);
                }
            });*/
        });

        $('#login_forgetPsd_btn').click(function(){
            window.location.href = rootUrl+'/member/forgetPsd.html';
        });

        $('#login_register_btn').click(function(){
            window.location.href = rootUrl+'/member/register.html';
        });

    }else if(docName=='register'){
        require(['include/registerPage'], function (RegisterPage) {

        });
    }else if(docName=='forgetPsd'){
        require(['include/forgetPsdPage'], function (ForgetPsdPage) {

        });
    }else if(docName=='orderInfo'){
        require(['include/orderPage'], function (OrderPage) {

        });
    }else if(docName=='purchase'){
        require(['include/purchasePage'], function (PurchasePage) {

        });
    }
});
