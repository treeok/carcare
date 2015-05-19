/**
 * Created by claire on 2015/5/7.
 */
/**
 * Created by claire 2015/4/15.
 */
define(function(){

    var contentButton = [];
    var contentTop = [];
    var content = [];
    var lastScrollTop = 0;
    var scrollDir = '';
    var itemClass = '';
    var itemHover = '';
    var menuSize = null;
    var stickyHeight = 0;
    var stickyMarginB = 0;
    var currentMarginT = 0;
    var topMargin = 0;
    var jqWIN = $(window);

    jqWIN.scroll(function(event){
        var st = $(this).scrollTop();
        if (st > lastScrollTop){
            scrollDir = 'down';
        } else {
            scrollDir = 'up';
        }
        lastScrollTop = st;
    });

    var _stick = function(opt,target){

        $(target).addClass('stuckMenu');
        var objn = 0;
        if(opt != null) {
            for(var o in opt.parts) {
                if (opt.parts.hasOwnProperty(o)){
                    content[objn] = opt.parts[objn];
                    objn++;
                }
            }
            if(objn == 0) {
                opt.log('error:needs arguments');
            }

            itemClass = opt.itemClass;
            itemHover = opt.itemHover;
            if(opt.topMargin != null) {
                if(opt.topMargin == 'auto') {
                    topMargin = parseInt($('.stuckMenu').css('margin-top'));
                } else {
                    if(isNaN(opt.topMargin) && opt.topMargin.search("px") > 0){
                        topMargin = parseInt(opt.topMargin.replace("px",""));
                    } else if(!isNaN(parseInt(opt.topMargin))) {
                        topMargin = parseInt(opt.topMargin);
                    } else {
                        console.log("incorrect argument, ignored.");
                        topMargin = 0;
                    }
                }
            } else {
                topMargin = 0;
            }
            menuSize = $('.'+itemClass).size();
        }
        stickyHeight = parseInt($(target).height());
        stickyMarginB = parseInt($(target).css('margin-bottom'));
        currentMarginT = parseInt($(target).next().closest('div').css('margin-top'));
        vartop = parseInt($(target).offset().top);

    };
    $(document).on('scroll', function() {
        varscroll = parseInt($(document).scrollTop());
        if(menuSize != null){
            for(var i=0;i < menuSize;i++)
            {
                contentTop[i] = $('#'+content[i]+'').offset().top;
                function bottomView(i) {
                    contentView = $('#'+content[i]+'').height()*.4;
                    testView = contentTop[i] - contentView;
                    //console.log(varscroll);
                    if(varscroll > testView){
                        $('.'+itemClass).removeClass(itemHover);
                        $('.'+itemClass+':eq('+i+')').addClass(itemHover);
                    } else if(varscroll < 50){
                        $('.'+itemClass).removeClass(itemHover);
                        $('.'+itemClass+':eq(0)').addClass(itemHover);
                    }
                }
                if(scrollDir == 'down' && varscroll > contentTop[i]-50 && varscroll < contentTop[i]+50) {
                    $('.'+itemClass).removeClass(itemHover);
                    $('.'+itemClass+':eq('+i+')').addClass(itemHover);
                }
                if(scrollDir == 'up') {
                    bottomView(i);
                }
            }
        }
        if(vartop < varscroll + topMargin){
            $('.stuckMenu').addClass('isStuck');
            $('.stuckMenu').next().closest('div').css({
                'margin-top': stickyHeight + stickyMarginB + currentMarginT + 'px'
            }, 10);
            $('.stuckMenu').css("position","fixed");
            $('.isStuck').css({
                top: '0px'
            }, 10, function(){
            });
        }
        if(varscroll + topMargin < vartop){
            $('.stuckMenu').removeClass('isStuck');
            $('.stuckMenu').next().closest('div').css({
                'margin-top': currentMarginT + 'px'
            }, 10);
            $('.stuckMenu').css("position","relative");
        }
    });

    return _stick;
});

