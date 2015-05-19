/**
 * Created by claire on 2015/4/27.
 */
define(['widget/singlePage', 'widget/utils','widget/alert'], function (SinglePage, Utils,Alert) {
    var body = '<div id="forgetPsd" class="form-container">\
        <div class="form-group">\
            <label for="forgetPsd_id" class="col-sm-2 control-label">手机号</label>\
            <div class="col-sm-10"><input id="forgetPsd_id" type="text" placeholder="手机号" class="form-control">\
            <small class="tips-container text-danger" style="display:none">*手机号不能为空</small>\
            <small class="tips-container text-danger" style="display:none">*该手机号未注册</small>\
            <small class="tips-container text-danger" style="display:none">*手机号格式不正确</small></div>\
        </div>\
        <div class="form-group">\
            <label for="forgetPsd_code" class="col-sm-2 control-label">验证码</label>\
            <div class="col-sm-5">\
                <input id="forgetPsd_code" type="text" placeholder="请输入收到的验证码" class="form-control">\
                <small class="tips-container text-danger" style="display:none">*验证码不能为空</small>\
                <small class="tips-container text-danger" style="display:none">*验证码不正确</small>\
            </div>\
            <div class="col-sm-5">\
                <img id="forgetPsd_code_img" src="http://10.8.6.127:8080/carcare-web-homesite/code.html">\
                <button id="forgetPsd_code_img_change" type="button" class="btn btn-link">看不清？换一张</button>\
            </div>\
        </div>\
        <div class="form-group">\
            <div class="col-sm-offset-2 col-sm-10">\
               <button id="forgetPsd_btn_1" type="button" class="btn btn-primary">下一步</button>\
            </div>\
        </div>\
        </div>';

    var _body1 = '<div id="registerSucStep1" class="form-container">\
        <div class="form-group">\
            <label for="registerSucStep1_code" class="col-sm-2 control-label">手机验证码</label>\
            <div class="col-sm-10"><div class="input-group">\
                <input id="registerSucStep1_code" type="text" placeholder="请输入收到的验证码" class="form-control">\
                <a id="send_registerSucStep1_code" href="#" class="input-group-addon btn btn-primary active" role="button">获取验证码</a>\
            </div>\
            <small class="tips-container text-danger" style="display:none">*验证码不能为空</small>\
            <small class="tips-container text-danger" style="display:none">*验证码不正确</small>\
            <small class="tips-container text-danger" style="display:none">*验证码失效</small></div>\
        </div>\
        <div class="form-group">\
            <div class="col-sm-offset-2 col-sm-10">\
                 <button id="forgetPsd_btn_2" type="button" class="btn btn-primary">下一步</button>\
            </div>\
        </div>\
        </div>';

    var _body2 = '<div id="registerSucStep2" class="form-container">\
       <div class="form-group">\
            <label for="registerSucStep2_password" class="col-sm-2 control-label">新密码</label>\
            <div class="col-sm-10"><input id="registerSucStep2_password" type="password" placeholder="请输入密码" class="form-control">\
            <small class="tips-container text-danger" style="display:none">*密码不能为空</small></div>\
        </div>\
        <div class="form-group">\
            <label for="registerSucStep2_confirm_password" class="col-sm-2 control-label">确认密码</label>\
            <div class="col-sm-10"><input id="registerSucStep2_confirm_password" type="password" placeholder="请输入确认密码" class="form-control">\
            <small class="tips-container text-danger" style="display:none">*确认密码不能为空</small>\
            <small class="tips-container text-danger" style="display:none">*两次输入密码不相同</small></div>\
        </div>\
        <div class="form-group">\
            <div class="col-sm-offset-2 col-sm-10">\
                 <small>密码长度8~16位，数字、字母、字符至少包含两种</small>\
            </div>\
        </div>\
        <div class="form-group">\
            <div class="col-sm-offset-2 col-sm-10">\
                 <button id="forgetPsd_btn_3" type="button" class="btn btn-primary">确定</button>\
            </div>\
        </div>\
        </div>';

    var _body3 = '<div id="registerSucStep3" class="form-container">\
        <div class="form-group">\
            <img src="img/ok.png" class="img-rounded">\
            <span>密码重置成功！</span>\
            <button id="forgetPsd_btn_4" type="button" class="btn btn-primary">重新登录</button>\
        </div>\
        </div>';

    var singlePsdPage;

    var singlePsd = {
        init: function () {
            if (singlePsdPage) {
                singlePsdPage._show();
            } else {
                singlePsdPage = new SinglePage({
                    id: 'forgetPsd',
                    title: '请输入您注册车挣时，输入的手机号：',
                    container: $('header'),
                    body: body,
                    afterRender: function () {
                        var _self = this;
                        $('#forgetPsd').on('focus', 'input', function () {
                            $('#forgetPsd').find('.tips-container').hide();
                            $('#forgetPsd').find('.col-sm-10').removeClass('has-error');
                        });

                        var userNameCon = $('#forgetPsd_id'),
                            codeCon = $('#forgetPsd_code'),
                            imgCon = $('#forgetPsd_code_img');

                        //获取验证码的图片 接口
                        imgCon[0].src = rootUrl+'/code.html';

                        $('#forgetPsd_code_img_change').click(function(){
                            Utils.ajaxGet(rootUrl+'/code.html',function(data){
                                imgCon[0].src = rootUrl+'/code.html';
                            });
                        });

                        $('#forgetPsd_btn_1').click(function () {
                            //验证手机号
                            if (userNameCon.val() == '') {
                                userNameCon.next().show();
                                userNameCon.parent().addClass('has-error');
                                return false;
                            }
                            if (!userNameCon.val().match(/^1[3|4|5|7|8][0-9]\d{8}$/)) {
                                userNameCon.next().next().next().show();
                                userNameCon.parent().addClass('has-error');
                                return false;
                            }

                            //验证验证码
                            if (codeCon.val() == '') {
                                codeCon.next().show();
                                codeCon.parent().addClass('has-error');
                                return false;
                            }

                            //验证通过之后，下一步1
                            Utils.ajaxJson(rootUrl+'/member/checkTelAndCode.html', {tel:userNameCon.val(),code:codeCon.val()}, function (data) {
                                data = JSON.parse(data);
                                if(data.errFlag == 0){
                                    $('#forgetPsd').parent().parent().hide();
                                    var registerSuccessStep1 = new SinglePage({
                                        id: 'register_success_step1',
                                        title: '已经短信验证码发送至'+userNameCon.val().slice(0,3)+'****'+userNameCon.val().slice(7),
                                        container: $('header'),
                                        body: _body1,
                                        afterRender: function () {
                                            var _self = this;
                                            $('#registerSucStep1').on('focus', 'input', function () {
                                                $('#registerSucStep1').find('.tips-container').hide();
                                                $('#registerSucStep1').find('.form-group').removeClass('has-error');
                                            });

                                            var codeCon1 = $('#registerSucStep1_code');
                                            $('#send_registerSucStep1_code').click(function(){
                                                sendPhoneCode();
                                            });
                                            function sendPhoneCode(){
                                                $("#send_registerSucStep1_code").attr('disabled',true);
                                                $("#send_registerSucStep1_code").text('60秒后点击再次发送');

                                                var i =60;
                                                var f=setInterval(function(){

                                                    $("#send_registerSucStep1_code").text(i+'秒后点击再次发送');
                                                    i--;
                                                    if(i=='0'){
                                                        clearInterval(f);
                                                        $("#send_registerSucStep1_code").attr('disabled',false);
                                                        $("#send_registerSucStep1_code").text('获取验证码');
                                                    }
                                                },1000);

                                                $.ajax({
                                                    url: rootUrl+'/member/sendCode.html',
                                                    type:"post",
                                                    datatype:"html",
                                                    data:{"tel":userNameCon.val()},
                                                    success:function(data){

                                                    }
                                                });
                                            }

                                            $('#forgetPsd_btn_2').click(function () {

                                                if (codeCon1.val() == '') {
                                                    codeCon1.next().show();
                                                    codeCon1.parent().parent().addClass('has-error');
                                                    return false;
                                                }


                                                //验证通过之后，下一步2
                                                Utils.ajaxJson(rootUrl+'/member/checkCode.html', {tel:userNameCon.val(),code:codeCon1.val()}, function (data) {
                                                    data = JSON.parse(data);
                                                    if(data.errFlag == 0){
                                                        $('#registerSucStep1').parent().parent().hide();
                                                        var registerSuccessStep2 = new SinglePage({
                                                            id: 'register_success_step2',
                                                            title: '请重新设置你的密码',
                                                            container: $('header'),
                                                            body: _body2,
                                                            afterRender: function () {
                                                                var _self = this;
                                                                $('#registerSucStep2').on('focus', 'input', function () {
                                                                    $('#registerSucStep2').find('.tips-container').hide();
                                                                    $('#registerSucStep2').find('.form-group').removeClass('has-error');
                                                                });

                                                                var psdCon2 = $('#registerSucStep2_password'),
                                                                    psdConfirmCon2 = $('#registerSucStep2_confirm_password');

                                                                $('#forgetPsd_btn_3').click(function () {
                                                                    if (psdCon2.val() == '') {
                                                                        psdCon2.next().show();
                                                                        psdCon2.parent().addClass('has-error');
                                                                        return false;
                                                                    }
                                                                    if (psdConfirmCon2.val() == '') {
                                                                        psdConfirmCon2.next().show();
                                                                        psdConfirmCon2.parent().addClass('has-error');
                                                                        return false;
                                                                    }
                                                                    if (psdCon2.val() != psdConfirmCon2.val()) {
                                                                        psdConfirmCon2.next().next().show();
                                                                        psdConfirmCon2.parent().addClass('has-error');
                                                                        return false;
                                                                    }
                                                                    Utils.ajaxJson(rootUrl+'/member/findBackPwd.html', {tel:userNameCon.val(),password:psdCon2.val()}, function (data) {
                                                                        data = JSON.parse(data);
                                                                        if(data.errFlag == 0){
                                                                            $('#registerSucStep2').parent().parent().hide();
                                                                            var registerSuccessStep3 = new SinglePage({
                                                                                id: 'register_success_step2',
                                                                                title: '提示',
                                                                                container: $('header'),
                                                                                body: _body3,
                                                                                afterRender: function () {
                                                                                    $('#forgetPsd_btn_4').click(function () {
                                                                                        window.location.href = 'login.html';
                                                                                    });
                                                                                }
                                                                            });
                                                                        }else{
                                                                          new Alert('密码修改失败');
                                                                        }

                                                                    });
                                                                });
                                                            }
                                                        });
                                                    }else if(data.errFlag == -2){
                                                        codeCon1.next().next().show();
                                                        codeCon1.parent().parent().addClass('has-error');
                                                        return false;
                                                    }else if(data.errFlag == -3){
                                                        codeCon1.next().next().next().show();
                                                        codeCon1.parent().parent().addClass('has-error');
                                                        return false;
                                                    }
                                                });
                                            });
                                        }
                                    });
                                }else if(data.errFlag == -1){
                                    userNameCon.next().next().show();
                                    userNameCon.parent().addClass('has-error');
                                    return false;
                                }else if(data.errFlag == -2){
                                    codeCon.next().next().show();
                                    codeCon.parent().addClass('has-error');
                                    return false;
                                }


                            });
                        });
                    }
                });
            }
        }
    };
    singlePsd.init();
    return singlePsdPage;
});
