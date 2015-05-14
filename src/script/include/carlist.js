/**
 * Created by claire on 2015/5/13.
 */
define(['jquery', 'widget/utils'], function ($, Utils) {
    var content = $('#carlist-content');
    Utils.ajaxJson(rootUrl+'/suit/suitCarList',{},function(data){
        data = JSON.parse(data);
        content.empty();
        if (data.errFlag == 0) {
            var contentHtml = '<div class="spcxlb">';
            for (var i = 0; i < data.list.length; i++) {
                var item = data.list[i];

                //生成carList部分
                contentHtml += '<div id="'+item.spell+'" class="car-fg"></div>';
                contentHtml += '<div class="car-list"><div class="th"><a>'+item.spell+'</a></div>';
                if(item.children.length>0){
                    for(var j = 0;j<item.children.length;j++){
                        var cldItem = item.children[j];
                        contentHtml += '<div class="car-name"><div class="left-title"><div><img src="'+cldItem.brandImg+'" alt=""><span>'+cldItem.brandName+'</span></div></div>';
                        contentHtml += '<table class="table-list"><tbody>';
                        var len = cldItem.children.length;
                        if(len>0){
                            contentHtml+='<tr>';
                            for(var k = 0;k<len;k++){
                                var subCldItem = cldItem.children[k];
                                if(k%5!=0){
                                    contentHtml += '<td border="0"><span class="model" data-toggle="modal" data-target="#myModal'+subCldItem.modelId+'" style="cursor: pointer;" data-id="'+subCldItem.modelId+'" data-OBDImg="'+subCldItem.obdImg+'" data-OBDSite="'+subCldItem.obdSite+'">'+subCldItem.modelName+'</span></td>';
                                }else{
                                    contentHtml += '</tr><tr><td border="0"><span class="model" data-toggle="modal" data-target="#myModal'+subCldItem.modelId+'" style="cursor: pointer;" data-id="'+subCldItem.modelId+'" data-OBDImg="'+subCldItem.obdImg+'" data-OBDSite="'+subCldItem.obdSite+'">'+subCldItem.modelName+'</span></td>';
                                }
                            }
                            contentHtml += '</tr>';
                        }
                        contentHtml += '</tbody></table></div>';
                    }
                }
                contentHtml +='</div>';
            }
            //加载carList部分进入到DOM树
            contentHtml += '</div>';
            content.append(contentHtml);
        }

    });

    content.on('click','.model',function(){
        var modelId = $(this).attr('data-id');
        var modelName = $(this).text();
        var OBDImg = $(this).attr('data-OBDImg');
        var obdSite = $(this).attr('data-obdSite');
        var html = '<div class="modal fade" id="myModal'+modelId+'" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">关闭</span></button><h4 class="modal-title" id="myModalLabel2">'+modelName+'</h4></div><div class="modal-body"><p style="margin-bottom: 20px;">位置描述：'+obdSite+'</p><img src="'+OBDImg+'" width="480" /></div></div></div></div>';
        $('body').append(html);
    });

});

