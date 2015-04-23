/**
 * Created by claire on 2015/4/22.
 */
define(['widget/dialog','widget/utils'],function(Dialog,Utils){
    var _body = '<div class="check-container" id="popup_register_container">\
            <input type="text" class="global-input" id="popup_register_id" placeholder="输入手机号码">\
			<span class="tips-container" style="display:none">用户名不能为空</span>\
			<span class="tips-container" style="display:none">手机号格式不正确</span>\
          </div><br>\
          <div class="check-container">\
            <input type="password" class="global-input" id="popup_register_password_1" placeholder="输入用户密码">\
			<span class="tips-container" style="display:none">密码不能为空</span>\
          </div><br>\
          <div class="check-container">\
            <input type="password" class="global-input" id="popup_register_password_2" placeholder="再次输入用户密码">\
            <span class="tips-container" style="display:none">密码不能为空</span>\
			<span class="tips-container" style="display:none">密码不相同</span>\
          </div><br>\
          <div class="check-container">\
            <input type="text" class="global-input" id="popup_register_code" placeholder="手机验证码">\
            <input type="button" id="popup_register_send_code" value="发送验证码">\
            <span class="tips-container" style="display:none">验证码不能为空</span>\
          </div>';

    var _bottom = '<input class="v-btn green-btn vert-btn" type="submit" value="注册" id="popup_register_submit">';
    var _errorTip = '<span class="tips-container">{msg}</span>';
    var singleRegister;
    var register = {
        init:function(){
            if(singleRegister){
                singleRegister._show();
            }else{
                singleRegister = new Dialog({
                    title:'用户注册',
                    body:_body,
                    bottom:_bottom,
                    afterRender:function(){
                        $('#popup_register_container').find('input','focus',function(){
                            $('#popup_register_container').find('.tips-container').hide();
                        });
                        $('#popup_register_submit').click(function(){
                            var useNameCon = $('#popup_register_id'),
                                password1Con = $('#popup_register_password_1'),
                                password2Con = $('#popup_register_password_2'),
                                codeCon = $('#popup_register_code'),
                                sendCodeBtn = $('#popup_register_send_code');

                            var useName = useNameCon.val(),
                                password1 = password1Con.val(),
                                password2 = password2Con.val(),
                                code = codeCon.val();


                            if($.trim(useName)==''){
                                useNameCon.nextAll().hide();
                                useNameCon.next().show();
                                return false;
                            }else{
                                useNameCon.nextAll().hide();
                            }
                            if(!useName.match(/^1[3|4|5|7|8][0-9]\d{8}$/)){
                                useNameCon.nextAll().hide();
                                useNameCon.next().next().show();
                                return false;
                            }else{
                                useNameCon.nextAll().hide();
                            }
                            if($.trim(password1)==''){
                                password1Con.nextAll().hide();
                                password1Con.next().show();
                                return false;
                            }else{
                                password1Con.nextAll().hide();
                            }
                            if($.trim(password2)==''){
                                password2Con.nextAll().hide();
                                password2Con.next().show();
                                return false;
                            }else{
                                password2Con.nextAll().hide();
                            }
                            if(password1!=password2){
                                password2Con.nextAll().hide();
                                password2Con.next().next().show();
                                return false;
                            }else{
                                password2Con.nextAll().hide();
                            }
                            if($.trim(code)==''){
                                codeCon.nextAll().hide();
                                codeCon.next().show();
                                return false;
                            }else{
                                codeCon.nextAll().hide();
                            }
                            sendCodeBtn.click(function(){
                                alert(111);
                                sendPhoneCode();
                            });

                            function sendPhoneCode(){
                                if($.trim(useName)==''){
                                    useNameCon.nextAll().hide();
                                    useNameCon.next().show();
                                    return false;
                                }else{
                                    useNameCon.nextAll().hide();
                                }
                                if(!useName.match(/^1[3|4|5|7|8][0-9]\d{8}$/)){
                                    useNameCon.nextAll().hide();
                                    useNameCon.next().next().show();
                                    return false;
                                }else{
                                    useNameCon.nextAll().hide();
                                }

                                sendCodeBtn.attr('disabled',true);
                                sendCodeBtn.val('180秒后点击再次发送');

                                var i =180;
                                var f=setInterval(function(){

                                    sendCodeBtn.val(i+'秒后点击再次发送');
                                    i--;
                                    if(i=='0'){
                                        clearInterval(f);
                                        sendCodeBtn.attr('disabled',false);
                                        sendCodeBtn.val('获取验证码');
                                    }
                                },1000);
                                Utils.ajaxGet();
                            }

                            Utils.ajaxJson();

                        });


                    }
                });
            }

        }
    };
    register.init();
    return singleRegister;
});
