/**
 * Created by claire on 2015/5/11.
 */
define(['jquery', 'widget/utils', 'widget/dialog'], function ($, Utils, Dialog) {
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
            <select id="province" class="form-control" style="margin-bottom:15px;"></select>\
            <select id="city" class="form-control" style="margin-bottom:15px;"></select>\
            <select id="county" class="form-control"></select>\
            </div>\
        </div>\
    	 <div class="form-group">\
        <label for="address_dlg_default_address" class="col-sm-2 control-label">是否为默认地址</label>\
        <div class="col-sm-10" style="margin-bottom: 15px;">\
        <select id="address_dlg_default_address" class="form-control" style="margin-bottom:15px;"><option value="1">是</option><option value="0">否</option></select>\
        </div>\
        </div>\
        <div class="form-group">\
            <label for="address_dlg_detail" class="col-sm-2 control-label">详细信息</label>\
            <div class="col-sm-10" style="margin-bottom: 15px;"><input id="address_dlg_detail" type="textarea" class="form-control">\
            <small class="tips-container text-danger" style="display:none">*详细信息不能为空</small></div>\
        </div>\
        </div>';

    var dlgBottom = '<div class="form-group">\
            <div class="col-sm-offset-2 col-sm-10" style="margin-bottom: 30px;">\
                 <button id="address_dlg_save" type="button" class="btn btn-primary address-edit">保存</button>\
                 <button id="address_dlg_cancel" type="button" class="btn btn-default address-cancel">取消</button>\
            </div>\
        </div>';

    getOrderList(1, 5);
    $('#order-pagination').on('click', 'li', function () {
        var value = $(this).text();
        var lastvalue = $('#order-pagination').find('li:last a span').text();
        if (!isNaN(value)) {
            $('#order-pagination').find('li').each(function () {
                $(this).removeClass('active');
            });
            $(this).addClass('active');
            getOrderList(value, 5);
        } else if (value == '»') {
            var that = this;
            var val;
            $('#order-pagination').find('li').each(function () {
                if ($(this).hasClass('active')) {
                    val = $(this).text();
                    $(that).next().addClass('active');
                }
                $(this).removeClass('active');
            });
            getOrderList(Number(val) + 1, 5);
        } else {
            var that = this;
            var val;
            $('#order-pagination').find('li').each(function () {
                if ($(this).hasClass('active')) {
                    val = $(this).text();
                    $(that).prev().addClass('active');
                }
                $(this).removeClass('active');
            });
            getOrderList(Number(val) - 1, 5);
        }
    });
    getAddressList();

    //新增地址
    $('#check-order-add-address').click(function () {
        var newDialog1 = new Dialog({
            title: '新增收货信息',
            body: dlgBody,
            bottom: dlgBottom,
            width: '600',
            afterRender: function () {
                $('#address_dlg').on('focus', 'input', function () {
                    $('#address_dlg').find('.tips-container').hide();
                    $('#address_dlg').find('.col-sm-10').removeClass('has-error');
                });

                var userNameCon = $('#address_dlg_id'),
                    telCon = $('#address_dlg_tel'),
                    detailCon = $('#address_dlg_detail');

                buildSelect(1, 0, 'province', function () {
                    var val1 = $('#province').val();
                    buildSelect(2, val1, 'city', function () {
                        var val2 = $('#city').val();
                        buildSelect(3, val2, 'county');
                    });
                });
                $('#province').change(function () {
                    var val1 = $(this).val();
                    buildSelect(2, val1, 'city', function () {
                        var val2 = $('#city').val();
                        buildSelect(3, val2, 'county');
                    });
                });
                $('#city').change(function () {
                    var value = $(this).val();
                    buildSelect(3, value, 'county');
                });

                $('#address_dlg_save').click(function () {
                    if (userNameCon.val() == '') {
                        userNameCon.next().show();
                        userNameCon.parent().addClass('has-error');
                        return false;
                    }
                    if (telCon.val() == '') {
                        telCon.next().show();
                        telCon.parent().addClass('has-error');
                        return false;
                    }
                    if (!Utils.telRegx(telCon.val())) {
                        telCon.next().next().show();
                        telCon.parent().addClass('has-error');
                        return false;
                    }
                    if (detailCon.val() == '') {
                        detailCon.next().show();
                        detailCon.parent().addClass('has-error');
                        return false;
                    }

                    var params = {
                        name: userNameCon.val(),
                        mobile: telCon.val(),
                        provinceId: $('#province').val(),
                        province: $('#province').find('option:selected').text(),
                        cityId: $('#city').val(),
                        city: $('#city').find('option:selected').text(),
                        districtId: $('#county').val(),
                        district: $('#county').find('option:selected').text(),
                        defaultAddress: $('#address_dlg_default_address').val(),
                        street: $('#address_dlg_detail').val()
                    };

                    Utils.ajaxJson(rootUrl + '/address/add', params, function (data) {
                        data = JSON.parse(data);
                        if (data.errFlag == 0) {
                            alert('地址添加成功');
                            getAddressList();
                            newDialog1._close();
                        } else {
                            alert('地址添加错误');
                        }
                    });
                });
                $('#address_dlg_cancel').click(function () {
                    newDialog1._close();
                });
            }
        });
    });

    //编辑收货地址
    $('#check-order-address-lists').on('click', '.check-order-address-edit', function () {
        var id = $(this).parent().parent().attr('data-id');
        var newDialog = new Dialog({
            title: '编辑收货信息',
            body: dlgBody,
            bottom: dlgBottom,
            width: '600',
            afterRender: function () {
                $('#address_dlg').on('focus', 'input', function () {
                    $('#address_dlg').find('.tips-container').hide();
                    $('#address_dlg').find('.col-sm-10').removeClass('has-error');
                });
                var userNameCon = $('#address_dlg_id'),
                    telCon = $('#address_dlg_tel'),
                    detailCon = $('#address_dlg_detail');
                Utils.ajaxJson(rootUrl + '/address/findAddressById', {id: id}, function (data) {
                    data = JSON.parse(data);
                    newDialog._show();
                    userNameCon.val(data.name);
                    telCon.val(data.mobile);
                    buildSelect(1, 0, 'province', function () {
                        $('#province').val(data.provinceId);
                        var val1 = $('#province').val();
                        buildSelect(2, val1, 'city', function () {
                            $('#city').val(data.cityId);
                            var val2 = $('#city').val();
                            buildSelect(3, val2, 'county', function () {
                                $('#county').val(data.districtId);
                            });
                        });
                    });
                    $('#province').change(function () {
                        var val1 = $(this).val();
                        buildSelect(2, val1, 'city', function () {
                            var val2 = $('#city').val();
                            buildSelect(3, val2, 'county');
                        });
                    });
                    $('#city').change(function () {
                        var value = $(this).val();
                        buildSelect(3, value, 'county');
                    });
                    if (data.defaultAddress == 1) {
                        $('#address_dlg_default_address').find('option:first').attr('selected', 'selected');
                    } else {
                        $('#address_dlg_default_address').find('option:last').attr('selected', 'selected');
                    }
                    $('#address_dlg_detail').val(data.street);

                    $('#address_dlg_save').click(function () {
                        if (userNameCon.val() == '') {
                            userNameCon.next().show();
                            userNameCon.parent().addClass('has-error');
                            return false;
                        }
                        if (telCon.val() == '') {
                            telCon.next().show();
                            telCon.parent().addClass('has-error');
                            return false;
                        }
                        if (!Utils.telRegx(telCon.val())) {
                            telCon.next().next().show();
                            telCon.parent().addClass('has-error');
                            return false;
                        }
                        if (detailCon.val() == '') {
                            detailCon.next().show();
                            detailCon.parent().addClass('has-error');
                            return false;
                        }

                        var params = {
                            name: userNameCon.val(),
                            mobile: telCon.val(),
                            provinceId: $('#province').val(),
                            province: $('#province').find('option:selected').text(),
                            cityId: $('#city').val(),
                            city: $('#city').find('option:selected').text(),
                            districtId: $('#county').val(),
                            district: $('#county').find('option:selected').text(),
                            defaultAddress: $('#address_dlg_default_address').val(),
                            street: $('#address_dlg_detail').val(),
                            id: id
                        };

                        Utils.ajaxJson(rootUrl + '/address/update', params, function (data) {
                            data = JSON.parse(data);
                            if (data.errFlag == 0) {
                                alert('地址修改成功');
                                getAddressList();
                                newDialog._close();
                            } else {
                                alert('地址修改失败');
                            }

                        });

                    });
                    $('#address_dlg_cancel').click(function () {
                        newDialog._close();
                    });
                });
            }
        });
    });

    //删除收货地址
    $('#check-order-address-lists').on('click', '.check-order-address-delete', function () {
        var id = $(this).parent().parent().attr('data-id');
        console.log(id);
        Utils.ajaxJson(rootUrl + '/address/delete', {id: id}, function (data) {
            data = JSON.parse(data);
            if (data.errFlag == 0) {
                alert('删除成功');
                getAddressList();
            }
        });
    });

    function buildSelect(levelId, id, contentId, callback) {
        Utils.ajaxJson(rootUrl + '/address/getCity', {
            levelId: levelId,
            id: id
        }, function (data) {
            data = JSON.parse(data);
            $('#' + contentId).empty();
            if (data.errFlag == 1) {
                var d = data.list;
                var html = '';
                for (var i = 0; i < d.length; i++) {
                    var item = d[i];
                    html += '<option value="' + item.id + '">' + item.name + '</option>';
                }
                $('#' + contentId).append(html);
                callback && callback();
            }
        });
    }

    function getAddressList() {
        Utils.ajaxJson(rootUrl + '/address/list', {}, function (data) {
            data = JSON.parse(data);
            $('#check-order-address-lists').empty();
            var html = '';
            for (var i = 0; i < data.length; i++) {
                var item = data[i];
                if (item.defaultAddress == 1) {
                    html += '<div class="check-order-list default" data-id="' + item.id + '">';
                } else {
                    html += '<div class="check-order-list" data-id="' + item.id + '">';
                }
                html += '<p>\
            <span class="check-order-list-province" data-value="' + item.provinceId + '">' + item.province + '</span>\
            <span class="check-order-list-city" data-value="' + item.cityId + '">' + item.city + '</span>\
            <span class="check-order-list-name">(' + item.name + '收)</span>\
            </p>\
            <hr style="margin-top: 10px;margin-bottom: 10px;">\
            <small>\
            <span class="check-order-list-county" data-value="' + item.districtId + '">' + item.district + '</span>\
            <span class="check-order-list-detail-address">' + item.street + '</span>\
            <span class="check-order-list-mobile">' + item.mobile + '</span>\
            </small>\
            <div style="margin:15px 0;">\
            <a type="button" class="btn btn-link check-order-address-edit" style="padding: 0;">编辑</a>\
            <a type="button" class="btn btn-link check-order-address-delete" style="padding: 0;margin-left:15px;">删除</a>\
            </div>\
            </div>';
            }
            $('#check-order-address-lists').append(html);


        });
    }

    function getOrderList(pageNum, pageSize) {
        Utils.ajaxJson(rootUrl + '/order/order-list.html', {page: pageNum, limit: pageSize}, function (data) {
            data = JSON.parse(data);
            $('#order-lists').empty();
            $('#order-pagination').empty();

            var html = '', pagehtml = '<li><a href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>';
            var allPage = data.totalPages;

            for (var j = 1; j < allPage + 1; j++) {
                if (data.page == j) {
                    pagehtml += '<li class="active"><a href="#"><span>' + j + '</span></a></li>';
                } else {
                    pagehtml += '<li><a href="#"><span>' + j + '</span></a></li>';
                }
            }
            pagehtml += '<li href="#" aria-label="Next"><a href="#"><span aria-hidden="true">&raquo;</span></a></li>';

            $('#order-pagination').append(pagehtml);

            for (var i = 0; i < data.items.length; i++) {
                var item = data.items[i];
                html += '<div style="border:1px solid #daf3ff;margin-top:15px;" data-id="' + item.id + '">\
                        <div style="background-color:#eaf8ff;padding:10px 0;">\
                        <span class="check-order-order-no" style="margin-left:30px;">订单号：' + item.order.code + '</span>\
                        <span class="check-order-date" style="margin-left:15px;">' + item.order.createTime + '</span>\
                        <span class="check-order-express pull-right" style="margin-right:30px;">' + item.order.logisticsProviderName + ':' + item.order.transCode + '</span>\
                        </div>\
                        <table class="text-center">\
                    <tbody><tr><td style="width:70%;">\
                    <div style="padding:15px;" class="media">\
                    <div class="media-left"><a><img src="' + item.orderLines[0].upc + '"></a></div>\
                    <div class="media-body">\
                    <h4 class="media-heading">' + item.orderLines[0].productName + '</h4>\
                    <p>￥' + item.orderLines[0].price + '元</p>\
                    </div>\
                    </div>\
                    </td>\
                    <td style="width:10%;border-left:1px solid #daf3ff;"><span style="padding:15px;display；inline-block;">' + item.order.status + '</span></td>\
                    <td style="width:10%;border-left:1px solid #daf3ff;"><span style="padding:15px;display；inline-block;">￥' + item.order.total + '</span></td>\
                    <td style="width:10%;border-left:1px solid #daf3ff;">\
                    <div style="padding:15px;">';
                if (item.order.financialStatus != 3) {
                    html += '<button type="button" class="btn btn-primary check-order-order-pay">立即付款</button>';
                }
                html += '<button type="button" class="btn btn-link btn-default check-order-order-cancel">取消订单</button></div></td></tr></tbody></table></div>';
            }

            $('#order-lists').append(html);
            if (data.firstPage) {
                $('#order-pagination').find('li:first').addClass('disabled');
            }
            if (data.lastPage) {
                $('#order-pagination').find('li:last').addClass('disabled');
            }
        });
    }
});

