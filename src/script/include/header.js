/**
 * Created by claire on 2015/4/16.
 */
$(function(){
    /*$('#loginBtn').click(function(){
        require(['include/login'],function(Login){
            Login._show();
            console.log(Login);
        });
    });
    $('#registerBtn').click(function(){
        require(['include/register'],function(Register){
            Register._show();
        });
    });*/
    require(['include/login','include/register'],function(Login,Register){
        Login._hide();
        Register._hide();
        $('#loginBtn').click(function () {
            Register._hide();
            Login._show();
            var registerBtn = Login.el.find('#popup_register_btn');
            registerBtn.click(function(){
                Register._show();
                Login._hide();
            });
            console.log(Login.el);
        });
        $('#registerBtn').click(function () {
            Login._hide();
            Register._show();
        });
    });

});
