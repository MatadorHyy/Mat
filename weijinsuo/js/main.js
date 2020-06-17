// 自定义的js脚本  
'use strict'
$(function () {
   // 根据屏幕的宽度判断轮播图显示什么
   function resize() {
       //获取屏幕宽度
       var windowWidth = $(window).width();
       //判断屏幕属于大还是小
       var isSmallScreen = windowWidth < 768;

       //根据大小为界面上的每一张轮播图设置背景
       $('#main_ad > .carousel-inner > .item').each(function (i, item) {
           var $item = $(item);
           var imgSrc = $item.data(isSmallScreen ? 'image-xs' : 'image-lg');
           $item.css('backgroundImage', 'url("' + imgSrc+ '")');
           // 因为我们需要小图时尺寸等比例变化，所以小图时我们使用img方式
           if(isSmallScreen) {
               $item.html('<img src="'+ imgSrc + '" alt="">');
           } else {
               $item.empty();
           }
       });


       var $ulContainer = $('.nav-tabs');
       // 获取所有子元素的宽度和
       //有个初始的padding-left为20，然后再排除其他的一些border的干扰
       var width = 30;
       //遍历所有的子元素
       $ulContainer.children().each(function (index, element) {
           width += element.clientWidth;
           // width += $(element).width();
       });
       // 判断当前ul的宽度是否超出屏幕，如果超过，就显示横向滚动条
       if(width > $(window).width())
       {
           $ulContainer
               .css('width', width)
               .parent().css('overflow-x', 'scroll');
       }else
       {
           $ulContainer.css('width', 'auto');
           $ulContainer.parent().css('overflow-x', 'hidden');
       }
   }
    //让window对象立即触发一下resize
    $(window).on('resize', resize).trigger('resize');

    //初始化tooltips插件
    $('[data-toggle="tooltip"]').tooltip();

    /*
    * 控制标签页的标签容器宽度
    * */
    var $ulContainer = $('.nav-tabs');
    // 获取所有子元素的宽度和
    //有个初始的padding-left为20，然后再排除其他的一些border的干扰
    var width = 30;
    //遍历所有的子元素
    $ulContainer.children().each(function (index, element) {
        width += element.clientWidth;
        // width += $(element).width();
    });
    // 判断当前ul的宽度是否超出屏幕，如果超过，就显示横向滚动条
    if(width > $(window).width())
    {
        $ulContainer
            .css('width', width)
            .parent().css('overflow-x', 'scroll');
    }else
    {
        $ulContainer.css('width', 'auto');
        $ulContainer.parent().css('overflow-x', 'hidden');
    }


    //新闻版块a点击注册事件
    var $newstitle = $('.news-title');
    $('#news .nav-pills a').on('click', function () {
        // 获取当前的点击元素
        var $this = $(this);
        // 获取对应的title值
        var title = $this.data('title');
        //将title值设置到相应的位置
        $newstitle.text(title);
    });



    /*
    *为移动端的轮播图提供手指翻页的功能
     * 1、获取手指在轮播图 元素上的一个滑动方向（左右）
     * 2、根据得到的一个方向选择上一张或者下一张
    */
    //获取界面上的轮播图容器，用类名类获取，如果界面上有相同的轮播图元素，可以共用这段代码
    var $carousel = $('.carousel');
    var startX, endX;
    //设置一个偏移精度
    var offset = 50;
    //手指触摸开始时记录一下手指所在的坐标X
    $carousel.on('touchstart', function (e) {
        startX = e.originalEvent.touches[0].clientX;
    });
    //结束触摸一瞬间，记录最后手指所在的坐标X
    $carousel.on('touchmove', function (e) {
       endX = e.originalEvent.touches[0].clientX;
    });
    //比大小
    $carousel.on('touchend', function (e) {
        var distance = Math.abs(startX - endX);
        if(distance > offset) {
            //有方向变化，根据获得到的方向选择上一张或者下一张
            $(this).carousel(startX > endX ? 'next' : 'prev');
        }
    });
});