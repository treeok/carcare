/**
 * Created by claire on 2015/4/27.
 */
define(['widget/singlePage','widget/utils','widget/dialog'],function(SinglePage,Utils,Dialog){
    var body = '<div id="orderInfo" class="form-container">\
        <div class="orderInfo-group" style="margin-bottom: 10px;">\
            <div class="orderInfo-title">收货地址</div>\
            <div id="orderInfo-list" class="orderInfo-body">\
               <div class="radio selected">\
                  <label class="orderInfo-address">\
                     <input type="radio" name="optionsRadios" id="optionsRadios1" value="option1" checked> 史星 上海市万荣路1188弄\
                  </label>\
                  <button type="button" class="btn btn-link">编辑</button>\
                  <button type="button" class="btn btn-link">删除</button>\
               </div>\
            </div>\
            <button id="orderInfo-address-add" type="button" class="btn btn-link">+新增收货地址</button>\
        </div>\
        <div class="orderInfo-group">\
            <div class="orderInfo-title">支付方式</div>\
            <div class="orderInfo-body">\
               <img src="img/alipay.png" />\
            </div>\
        </div>\
        <div class="orderInfo-group">\
            <div class="orderInfo-title">运送方式</div>\
            <div class="orderInfo-body">\
               <img src="img/delivery.png" />\
            </div>\
        </div>\
        <div class="orderInfo-group">\
            <div class="orderInfo-title">商品信息</div>\
            <div class="orderInfo-body">\
               <table class="table"><thead style="background-color: #1e60ae;color: #fff;font-weight: normal;">\
               <th>商品名称</th><th>单价</th><th>数量</th>\
               </thead>\
               <tbody><tr><td style="width: 60%;">\
               <div class="media" style="margin: 15px 0;">\
                 <div class="media-left">\
                   <a href="#">\
                     <img class="media-object" src="img/box.png">\
                   </a>\
                 </div>\
               <div class="media-body">\
               <h4 class="media-heading">车挣盒子标准版</h4>\
               适用于除法系车和韩系车以外的所有车型\
               </div></div></td>\
               <td style="width: 20%;color: red;">￥297.00</td>\
               <td style="width: 20%;">1</td>\
               </tr>\
               </tbody>\
               </table>\
            </div>\
        </div><hr>\
        <div class="orderInfo-group" style="background-color: #f1f1f1;height: 90px;">\
            <div class="pull-right">\
            <table style="margin: 10px 30px;">\
            <tr><th style="width: 80px;text-align: left;height: 20px;">单价</th><td style="width: 80px;text-align: right;">￥297.00</td></tr>\
            <tr><th style="width: 80px;text-align: left;height: 20px;">运费</th><td style="width: 80px;text-align: right;">￥0.00</td></tr>\
            <tr><th style="width: 80px;text-align: left;height: 20px;">总价</th><td style="width: 80px;text-align: right;">￥297.00</td></tr>\
            </table></div>\
        </div>\
         <div class="orderInfo-group" style="background-color: #e7e7e7;height: 50px;">\
            <div class="pull-right" style="margin: 5px 0;">\
            <span style="display: inline-block;margin-right: 10px;">应付金额：<span style="color: red;font-size: 20px;height: 34px;display: inline-block;margin-right: 10px;">￥297.00</span></span><button type="button" class="btn btn-primary">提交订单</button></div>\
        </div>\
        </div>';

    var dlgBody = '<div id="address_dlg" class="form-container">\
        <div class="form-group">\
            <label for="address_dlg_id" class="col-sm-2 control-label">收货人</label>\
            <div class="col-sm-10" style="margin-bottom: 15px;"><input id="address_dlg_id" type="text" placeholder="请输入收货人姓名" class="form-control">\
            <small class="tips-container text-danger" style="display:none">*收货人不能为空</small></div>\
        </div>\
        <div class="form-group">\
            <label for="address_dlg_tel" class="col-sm-2 control-label">手机号码</label>\
            <div class="col-sm-10" style="margin-bottom: 15px;">\
                <input id="address_dlg_tel" type="text" placeholder="请输入手机号码" class="form-control">\
                <small class="tips-container text-danger" style="display:none">*手机号码不能为空</small>\
                <small class="tips-container text-danger" style="display:none">*手机号码格式不正确</small>\
            </div>\
        </div>\
        <div class="form-group">\
            <label for="address_dlg_psd" class="col-sm-2 control-label">收货地址</label>\
            <div class="col-sm-10" style="margin-bottom: 15px;">\
            <select id="province" class="form-control"></select>\
            <select id="city" class="form-control"></select>\
            <select id="county" class="form-control"></select>\
            </div>\
        </div>\
        <div class="form-group">\
            <label for="address_dlg_detail" class="col-sm-2 control-label">详细信息</label>\
            <div class="col-sm-10" style="margin-bottom: 15px;"><input id="address_dlg_detail" type="password" class="form-control">\
            <small class="tips-container text-danger" style="display:none">*详细信息不能为空</small></div>\
        </div>\
        </div>';

    var dlgBottom = '<div class="form-group">\
            <div class="col-sm-offset-2 col-sm-10" style="margin-bottom: 15px;">\
                 <button id="address_dlg_save" type="button" class="btn btn-primary">保存</button>\
                 <button id="address_dlg_cancel" type="button" class="btn btn-default">取消</button>\
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
                    title:'填写订单信息',
                    container:$('header'),
                    body:body,
                    afterRender:function(){
                        var _self = this;
                        $('#orderInfo').parent().css({padding: 0});
                        $('#orderInfo').parent().parent().parent().parent().css({backgroundColor: '#fff',marginTop:'136px'});
                        $('#orderInfo').parent().parent().css({margin: '20px auto'});

                        //用户地址的动态生成
                        Utils.ajaxJson(rootUrl+'/member/login',{tel:'18588732600', password:'123456789q'},function(data){
                            data = JSON.parse(data);
                            if(data.errFlag == 0){
                                Utils.ajaxJson(rootUrl+'/address/list',function(data){
                                    console.log(data);
                                });

                                $('#orderInfo-address-add').click(function(){
                                    var newDialog = new Dialog({
                                        title: '收货信息',
                                        body: dlgBody,
                                        bottom: dlgBottom,
                                        width: '600',
                                        afterRender: function(){
                                            $('#address_dlg').on('focus','input',function(){
                                                $('#address_dlg').find('.tips-container').hide();
                                                $('#address_dlg').find('.col-sm-10').removeClass('has-error');
                                            });

                                            var userNameCon = $('#address_dlg_id'),
                                                telCon = $('#address_dlg_tel'),
                                                psdCon = $('#address_dlg_psd'),
                                                detailCon = $('#address_dlg_detail');

                                            buildSelect(1,0,'province');
                                            buildSelect(2,0,'city');
                                            buildSelect(3,0,'county');

                                            $('#province').change(function(){
                                                $('#city').empty();
                                                var value = $(this).val();
                                                buildSelect(2,value,'city');
                                            });

                                            $('#city').change(function(){
                                                $('#county').empty();
                                                var value = $(this).val();
                                                buildSelect(3,value,'county');
                                            });


                                            $('#address_dlg_save').click(function(){
                                                if(userNameCon.val() == ''){
                                                    userNameCon.next().show();
                                                    userNameCon.parent().addClass('has-error');
                                                    return false;
                                                }
                                                if(telCon.val() == ''){
                                                    telCon.next().show();
                                                    telCon.parent().addClass('has-error');
                                                    return false;
                                                }
                                                if(!Utils.telRegx(telCon.val())){
                                                    telCon.next().next().show();
                                                    telCon.parent().addClass('has-error');
                                                    return false;
                                                }
                                                if(detailCon.val() == ''){
                                                    detailCon.next().show();
                                                    detailCon.parent().addClass('has-error');
                                                    return false;
                                                }

                                                var params = {};

                                                Utils.ajaxJson('',params,function(){

                                                });

                                            });

                                            function buildSelect(levelId,id,contentId){
                                                Utils.ajaxJson(rootUrl+'/address/getCity',{levelId:levelId,id:id},function(data){
                                                    data = JSON.parse(data);
                                                    if(data.errFlag == 1){
                                                        var d = data.list;
                                                        var html = '';
                                                        for(var i = 0;i < d.length;i++){
                                                            var item = d[i];
                                                            html += '<option value="'+item.id+'">'+item.name+'</option>';
                                                         }
                                                        $('#'+contentId).append(html);
                                                    }
                                                });
                                            }


                                        }
                                    });
                                });



                            }
                        });
                    }
                });
            }
        }
    };
    register.init();
    return singleRegister;
});
