require(['jquery','widget/utils'], function ($,Utils) {
    var urlArray = document.URL.split('/'),
        docName = urlArray[urlArray.length-1].split('.')[0];

    if(docName=='login'){
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
            Utils.ajaxPost('http://10.8.6.127:8080/carcare-web-homesite/member/login.html',params,function(data){
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
                    window.location.href = '404.html';
                }
            });
        });

        $('#login_forgetPsd_btn').click(function(){
            window.location.href = 'forgetPsd.html';
        });

        $('#login_register_btn').click(function(){
            window.location.href = 'register.html';
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
    }
});
