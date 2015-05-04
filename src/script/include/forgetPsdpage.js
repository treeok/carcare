/**
 * Created by claire on 2015/4/27.
 */
require(['widget/singlePage', 'widget/utils'], function (SinglePage, Utils) {
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
            <small class="tips-container text-danger" style="display:none">*验证码不正确</small></div>\
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
                            $('#forgetPsd').find('.form-group').removeClass('has-error');
                        });

                        var userNameCon = $('#forgetPsd_id'),
                            codeCon = $('#forgetPsd_code'),
                            imgCon = $('#forgetPsd_code_img');

                        //获取验证码的图片 接口
                        imgCon[0].src = '/car/code.html';

                        $('#forgetPsd_code_img_change').click(function(){
                            console.log(Utils);
                            Utils.ajaxGet('/car/code.html',function(){
                                imgCon[0].src = '/car/code.html';
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
                                return false;
                            }
                            //确定手机号是否存在，不存在的话，说明手机号不存在
                            Utils.ajaxGet('', '', function () {
                                userNameCon.next().next().show();
                                return false;
                            });

                            //验证验证码
                            if (codeCon.val() == '') {
                                codeCon.next().show();
                                return false;
                            }
                            //确定验证码是否正确
                            Utils.ajaxGet('', '', function () {
                                codeCon.parent().next().next().show();
                                return false;
                            });


                            //验证通过之后，下一步1
                            Utils.ajaxJson('', '', function () {
                                $('#forgetPsd').parent().parent().hide();
                                var registerSuccessStep1 = new SinglePage({
                                    id: 'register_success_step1',
                                    title: '已经短信验证码发送至'+userNameCon.val(),
                                    container: $('header'),
                                    body: _body1,
                                    afterRender: function () {
                                        var _self = this;
                                        $('#registerSucStep1').on('focus', 'input', function () {
                                            $('#registerSucStep1').find('.tips-container').hide();
                                            $('#registerSucStep1').find('.form-group').removeClass('has-error');
                                        });

                                        var codeCon1 = $('#registerSucStep1_code');

                                        $('#forgetPsd_btn_2').click(function () {
                                            if (codeCon1.val() == '') {
                                                codeCon1.next().show();
                                                return false;
                                            }

                                            //确定验证码是否正确
                                            Utils.ajaxGet('', '', function () {
                                                codeCon1.parent().next().next().show();
                                                return false;
                                            });

                                            //验证通过之后，下一步2
                                            Utils.ajaxJson('', '', function () {
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
                                                                return false;
                                                            }
                                                            if (psdConfirmCon2.val() == '') {
                                                                psdConfirmCon2.next().show();
                                                                return false;
                                                            }
                                                            if (psdCon2.val() != psdConfirmCon2.val()) {
                                                                psdConfirmCon2.next().next().show();
                                                                return false;
                                                            }
                                                            Utils.ajaxJson('', '', function () {
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
                                                            }, function () {

                                                            });
                                                        });
                                                    }
                                                });

                                            }, function () {
                                            });
                                        });
                                    }
                                });
                            }, function () {

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
