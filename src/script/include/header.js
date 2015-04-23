/**
 * Created by claire on 2015/4/16.
 */
require(['include/login','include/register'],function(Login,Register){
    var loginSingle = new Login(),
        registerSingle = new Register();
    loginSingle._hide();
    registerSingle._hide();
    $('#loginBtn').click(function () {
        registerSingle._hide();
        loginSingle._show();
        var registerBtn = loginSingle.el.find('#popup_register_btn');
         registerBtn.click(function(){
             registerSingle._show();
             loginSingle._hide();
         });
         console.log(loginSingle.el);
    });
    $('#registerBtn').click(function () {
        loginSingle._hide();
        registerSingle._show();
    });
});
