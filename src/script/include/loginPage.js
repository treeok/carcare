/**
 * Created by claire on 2015/5/9.
 */
define(['jquery','widget/utils'],function($,Utils){
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
                $('#header-login-btn').parent().append('<a>'+userNameCon+'</a>');
                $('#header-login-btn').remove();
            }else if(data.errFlag == -1){
                userNameCon.next().show();
                return false;
            }else if(data.errFlag == -2){
                psdCon.next().show();
                return false;
            }else{
                window.location.href = rootUrl+'/member/404.html';
            }
        });
    });

    $('#login_forgetPsd_btn').click(function(){
        window.location.href = rootUrl+'/member/forgetPsd.html';
    });

    $('#login_register_btn').click(function(){
        window.location.href = rootUrl+'/member/register.html';
    });
});
