/**
 * Created by claire on 2015/4/27.
 */
require(['widget/singlePage','widget/utils'],function(SinglePage,Utils){
    var body = '<div id="register" class="form-container">\
        <div class="form-group">\
            <input id="register_id" type="text" placeholder="请输入手机号码" class="form-control">\
            <small class="tips-container text-danger" style="display:none">*手机号不能为空</small>\
            <small class="tips-container text-danger" style="display:none">*该手机号未注册</small>\
            <small class="tips-container text-danger" style="display:none">*手机号格式不正确</small>\
        </div>\
        <div class="form-group">\
            <div class="input-group">\
                <input id="register_code" type="text" placeholder="请输入收到的验证码" class="form-control">\
                <a id="send_register_code" href="#" class="input-group-addon btn btn-primary active" role="button">获取验证码</a>\
            </div>\
            <small class="tips-container text-danger" style="display:none">*验证码不能为空</small>\
            <small class="tips-container text-danger" style="display:none">*验证码不正确</small>\
        </div>\
        <div class="form-group">\
            <input id="register_password" type="password" placeholder="请输入密码" class="form-control">\
            <small>密码长度8~16位，数字、字母、字符至少包含两种</small>\
            <small class="tips-container text-danger" style="display:none">*密码不能为空</small>\
        </div>\
        <div class="form-group">\
            <input id="register_confirm_password" type="password" placeholder="请输入确认密码" class="form-control">\
            <small class="tips-container text-danger" style="display:none">*确认密码不能为空</small>\
            <small class="tips-container text-danger" style="display:none">*两次输入密码不相同</small>\
        </div>\
        <button id="register_register_btn" type="button" class="btn btn-lg btn-primary btn-block">马上注册</button>\
        <small>点击“立即注册”，即表示您同意并愿意遵守车挣用户协议 和隐私政策</small>\
        </div>';

    var _body = '<div id="registerSuc" class="form-container">\
        <div class="form-group">\
            <img src="" alt="" class="img-rounded">\
            <div>恭喜你，成功注册车挣账号！</div>\
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
                            $('#register').find('.form-group').removeClass('has-error');
                        });

                        var userNameCon = $('#register_id'),
                            codeCon = $('#register_code'),
                            psdCon = $('#register_password'),
                            confirmPsdCon = $('#register_confirm_password');

                        $('#register_register_btn').click(function(){
                            //验证手机号
                            if(userNameCon.val()==''){
                                userNameCon.next().show();
                                userNameCon.parent().addClass('has-error');
                                return false;
                            }
                            if(!userNameCon.val().match(/^1[3|4|5|7|8][0-9]\d{8}$/)){
                                userNameCon.next().next().next().show();
                                return false;
                            }
                            //确定手机号是否存在，不存在的话，说明手机号不存在
                            Utils.ajaxGet('','',function(){
                                userNameCon.next().next().show();
                                return false;
                            });

                            //验证验证码
                            if(codeCon.val()==''){
                                codeCon.parent().next().show();
                                return false;
                            }
                            //确定验证码是否正确
                            Utils.ajaxGet('','',function(){
                                psdCon.parent().next().next().show();
                                return false;
                            });

                            //验证密码
                            if(psdCon.val()==''){
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

                            //验证通过之后，用户注册
                            Utils.ajaxJson('','',function(){
                                singleRegister._hide();
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
                                registerSuccess._show();

                            },function(){

                            });

                        });
                    }
                });
            }
        }
    };
    register.init();
    return singleRegister;

});