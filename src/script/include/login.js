/**
 * Created by claire on 2015/5/9.
 */
define(['widget/utils'],function(Utils){
    $('#loginPage').on('focus', 'input', function () {
        $('#loginPage').find('.tips-container').hide();
    });

    var userNameCon = $('#login_login_user');
    var psdCon = $('#login_login_psd');

    $('#login_login_btn').click(function(){
        login();
    });

    $('#login_forgetPsd_btn').click(function(){
        window.location.href = rootUrl+'/member/resetpwd.html';
    });

    $('#login_register_btn').click(function(){
        window.location.href = rootUrl+'/member/register.html';
    });

    function login(){
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
                window.location.href = rootUrl+'/index.html';
                $('#header-login-btn').parent().append('<a>'+userNameCon+'</a>');
                $('#header-login-btn').remove();
            }else if(data.errFlag == -1){
                userNameCon.next().show();
                return false;
            }else if(data.errFlag == -2){
                psdCon.next().show();
                return false;
            }else{
                window.location.href = rootUrl+'/404.html';
            }
        });
    }

    $(window).keydown(function (e) {
        if (e.which == 13) {
            login();
        }
    })
});
