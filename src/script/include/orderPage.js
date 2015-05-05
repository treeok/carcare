/**
 * Created by claire on 2015/4/27.
 */
require(['widget/singlePage','widget/utils'],function(SinglePage,Utils){
    var body = '<div id="register" class="form-container">\
        <div class="form-group">\
            <label for="register_id" class="col-sm-2 control-label">手机号</label>\
            <div class="col-sm-10"><input id="register_id" type="text" placeholder="请输入手机号码" class="form-control">\
            <small class="tips-container text-danger" style="display:none">*手机号不能为空</small>\
            <small class="tips-container text-danger" style="display:none">*该手机号已注册</small>\
            <small class="tips-container text-danger" style="display:none">*手机号格式不正确</small></div>\
        </div>\
        <div class="form-group">\
            <label for="register_code" class="col-sm-2 control-label">验证码</label>\
            <div class="col-sm-10"><div class="input-group">\
                <input id="register_code" type="text" placeholder="请输入收到的验证码" class="form-control">\
                <a id="send_register_code" href="#" class="input-group-addon btn btn-primary active" type="button">获取验证码</a>\
            </div>\
            <small class="tips-container text-danger" style="display:none">*验证码不能为空</small>\
            <small class="tips-container text-danger" style="display:none">*验证码不正确</small>\
            <small class="tips-container text-danger" style="display:none">*验证码失效</small></div>\
        </div>\
        <div class="form-group">\
            <label for="register_password" class="col-sm-2 control-label">请输入密码</label>\
            <div class="col-sm-10"><input id="register_password" type="password" placeholder="请输入密码" class="form-control">\
            <small class="tips-container text-danger" style="display:none;">密码长度8~16位，数字、字母、字符至少包含两种</small>\
            <small class="tips-container text-danger" style="display:none;">*密码不能为空</small></div>\
        </div>\
        <div class="form-group">\
            <label for="register_confirm_password" class="col-sm-2 control-label">确认密码</label>\
            <div class="col-sm-10"><input id="register_confirm_password" type="password" placeholder="请输入确认密码" class="form-control">\
            <small class="tips-container text-danger" style="display:none">*确认密码不能为空</small>\
            <small class="tips-container text-danger" style="display:none">*两次输入密码不相同</small></div>\
        </div>\
        <div class="form-group">\
            <div class="col-sm-offset-2 col-sm-10">\
                 <button id="register_register_btn" type="button" class="btn btn-primary">马上注册</button>\
            </div>\
        </div>\
        <div class="form-group">\
            <div class="col-sm-offset-2 col-sm-10">\
                 <small>点击“立即注册”，即表示您同意并愿意遵守车挣用户协议 和隐私政策</small>\
            </div>\
        </div>\
        </div>';

    var _body = '<div id="registerSuc" class="form-container">\
        <div class="form-group">\
            <img src="img/ok.png" class="img-rounded">\
            <span>恭喜你，成功注册车挣账号！</span>\
        </div>\
        <button id="register_success_index_btn" type="button" class="btn btn-lg btn-default btn-block">返回首页</button>\
        <button id="register_success_purchase_btn" type="button" class="btn btn-lg btn-default btn-block">购买一台车挣</button>\
        </div>';

    var singleRegister;

    var register = {
        init:function(){
            if(singleRegister){
                singleRegister._show();
            }else{
                singleRegister = new SinglePage({
                    id:'register',
                    title:'注册车挣账号',
                    container:$('header'),
                    body:body,
                    afterRender:function(){
                        var _self = this;
                        $('#register').on('focus','input',function(){
                            $('#register').find('.tips-container').hide();
                            $('#register').find('.col-sm-10').removeClass('has-error');
                        });

                        var userNameCon = $('#register_id'),
                            codeCon = $('#register_code'),
                            psdCon = $('#register_password'),
                            confirmPsdCon = $('#register_confirm_password');

                        $('#send_register_code').click(function(){
                            sendPhoneCode();
                        });

                        $('#register_register_btn').click(function(){
                            //验证手机号
                            if(userNameCon.val()==''){
                                userNameCon.next().show();
                                userNameCon.parent().addClass('has-error');
                                return false;
                            }
                            if(!Utils.telRegx(userNameCon.val())){
                                userNameCon.next().next().next().show();
                                return false;
                            }

                            //验证验证码
                            if(codeCon.val()==''){
                                codeCon.parent().next().show();
                                return false;
                            }

                            //验证密码
                            if(psdCon.val()==''){
                                psdCon.next().next().show();
                                return false;
                            }
                            if(!Utils.telRegx(psdCon.val())){
                                psdCon.next().show();
                                return false;
                            }
                            if(confirmPsdCon.val()==''){
                                confirmPsdCon.next().show();
                                return false;
                            }
                            if(psdCon.val()!=confirmPsdCon.val()){
                                confirmPsdCon.next().next().show();
                                return false;
                            }

                            var params = {
                                tel: userNameCon.val(),
                                password: psdCon.val(),
                                code: codeCon.val()
                            };
                            //验证通过之后，用户注册
                            Utils.ajaxPost('http://10.8.6.127:8080/carcare/member/register.html',params,function(data){
                                data = JSON.parse(data);
                                if(data.errFlag == 0){
                                    $('#register').parent().parent().hide();
                                    var registerSuccess = new SinglePage({
                                        id: 'register_success',
                                        title: '注册车挣账号',
                                        container: $('header'),
                                        body: _body,
                                        afterRender: function () {
                                            $('#register_success_index_btn').click(function () {
                                                window.location.href = 'index.html';
                                            });
                                            $('#register_success_purchase_btn').click(function () {
                                                window.location.href = 'purchase.html';
                                            });
                                        }
                                    });
                                }else if(data.errFlag == -1){
                                    userNameCon.next().next().show();
                                    return false;
                                }else if(data.errFlag == -2){
                                    psdCon.parent().next().next().show();
                                    return false;
                                }else if(data.errFlag == -3){
                                    psdCon.parent().next().next().next().show();
                                    return false;
                                }
                            });

                        });

                        function sendPhoneCode(){
                            if(userNameCon.val()==''){
                                userNameCon.next().show();
                                userNameCon.parent().addClass('has-error');
                                return false;
                            }
                            if(!userNameCon.val().match(/^1[3|4|5|7|8][0-9]\d{8}$/)){
                                userNameCon.next().next().next().show();
                                return false;
                            }
                            $("#send_register_code").attr('disabled',true);
                            $("#send_register_code").text('60秒后点击再次发送');

                            var i =60;
                            var f=setInterval(function(){

                                $("#send_register_code").text(i+'秒后点击再次发送');
                                i--;
                                if(i=='0'){
                                    clearInterval(f);
                                    $("#send_register_code").attr('disabled',false);
                                    $("#send_register_code").text('获取验证码');
                                }
                            },1000);

                            $.ajax({
                                url:"http://10.8.6.13:8080/carcare/member/sendCode.html",
                                type:"post",
                                datatype:"html",
                                data:{"tel":userNameCon.val()},
                                success:function(data){
                                    if(data.errFlag==0){
                                        alert(data.errMsg);
                                    }
                                }
                            });
                        }
                    }
                });
            }
        }
    };
    register.init();
    return singleRegister;

});
