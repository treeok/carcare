/**
 * Created by claire on 2015/4/27.
 */
require(['widget/singlePage','widget/utils'],function(SinglePage,Utils){
    var body = '<div id="login" class="form-container">\
        <div class="form-group">\
            <input id="login_id" type="text" placeholder="手机号" class="form-control">\
            <small class="tips-container text-danger" style="display:none">*手机号不能为空</small>\
            <small class="tips-container text-danger" style="display:none">*该手机号未注册</small>\
            <small class="tips-container text-danger" style="display:none">*手机号格式不正确</small>\
        </div>\
        <div class="form-group">\
            <input id="login_password" type="password" placeholder="密码" class="form-control">\
            <small class="tips-container text-danger" style="display:none">*密码不能为空</small>\
            <small class="tips-container text-danger" style="display:none">*密码输入错误</small>\
        </div>\
        <button id="login_btn" type="submit" class="btn btn-lg btn-primary btn-block">登录</button>\
        <a id="login_forget_pass" class="pull-right" target="_blank" href="">忘记密码？</a>\
        <button id="login_register_btn" type="button" class="btn btn-lg btn-default btn-block">马上注册</button>\
        </div>';

    var singleLogin;

    var login = {
        init:function(){
            if(singleLogin){
                singleLogin._show();
            }
            else{
                singleLogin = new SinglePage({
                    id:'login',
                    title:'登录',
                    container:$('header'),
                    body:body,
                    afterRender:function(){
                        var _self = this;
                        $('#login').on('focus','input',function(){
                            $('#login').find('.tips-container').hide();
                            $('#login').find('.form-group').removeClass('has-error');
                        });

                        var userNameCon = $('#login_id');
                        var psdCon = $('#login_password');

                        $('#login_btn').click(function(){
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

                            //验证密码
                            if(psdCon.val()==''){
                                psdCon.next().show();
                                return false;
                            }
                            //确定密码是否正确
                            Utils.ajaxGet('','',function(){
                                psdCon.next().next().show();
                                return false;
                            });

                            //验证通过之后，用户登录
                            Utils.ajaxJson();

                        });
                        $('#login_register_btn').click(function(){
                            window.location.href = 'register.html';
                        });


                    }
                });
            }
        }
    };
    login.init();
    return singleLogin;

});