/**
 * Created by NCGZ-DZ- on 2015/5/14.
 */
/**
 * Created by claire on 2015/5/11.
 */
define(['jquery', 'widget/utils'], function ($, Utils) {

    buildSelect(1, 0, 'province', function () {
        $('#province-store').val(data.provinceId);
        var val1 = $('#province-store').val();
        buildSelect(2, val1, 'city', function () {
            $('#city-store').val(data.cityId);
            var val2 = $('#city-store').val();
            buildSelect(3, val2, 'county-store', function () {
                $('#county-store').val(data.districtId);
            });
        });
    });
    $('#province-store').change(function () {
        var val1 = $(this).val();
        buildSelect(2, val1, 'city-store', function () {
            var val2 = $('#city-store').val();
            buildSelect(3, val2, 'county-store');
        });
    });
    $('#city-store').change(function () {
        var value = $(this).val();
        buildSelect(3, value, 'county-store');
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


});

