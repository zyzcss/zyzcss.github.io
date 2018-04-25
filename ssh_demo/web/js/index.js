$(function() {
    //滚动条事件
    {
        var isScroll=false;
        $(window).scroll(function(){
            var topScroll =$('body').scrollTop();//滚动的距离,距离顶部的距离
            var nav  = $('#mynav');//获取到导航栏id
            var headtab=$('#head-tabs');
            if(topScroll >=150){  //当滚动距离大于px时执行下面的东西
                isScroll=true;
            }else{//当滚动距离小于250的时候执行下面的内容，也就是让导航栏恢复原状
                isScroll=false;
            }
            if(isScroll){
                nav.addClass('mynav');
                nav.css('background','#F0F0F0');
                headtab.css('background','#F0F0F0');
            }else{
                nav.removeClass('mynav');
                headtab.css('background','#FFF');
                nav.css('background','#FFF')
            }
        });
    }
    /*
    banner右侧 移入显示span
     */
    $('.slider-right ul li').on('mouseover',function(){
        $(this).find('div').show();
        var p=$(this).find('p');
        var span=$(this).find('span');
        if(p.html()==''){
            p.html(' UP:'+"aaa"+'<br>'+'点赞数:'+'100');
        }
        p.show();
        span.css('margin-top','8px');
    }).on('mouseout',function(){
        $(this).find('div').hide();
        $(this).find('p').hide();
        $(this).find('span').css('margin-top','95px');
    });
})
	//轮播动画
$(function () {
        var slider=$('#slider img');
        var moveSlider=function(left){
            slider.animate({
                left:left+"px"
            },"slow");
        }
        $('#slider span').html($('#slider>ul>li:first').attr('ti2'));
        var i=1;
        var interval=function(){
            var defaultSlider=$('#slider>ul>li.defaultSlider');
            var span=$('#slider span');
            if(defaultSlider.next().length==1){
                span.html(defaultSlider.next().attr('ti2'));
                i++;
                defaultSlider.removeClass('defaultSlider');
                defaultSlider.next().addClass('defaultSlider');
            }else{
                i=1;
                defaultSlider.removeClass('defaultSlider');
                span.html($('#slider>ul>li:first').attr('ti2'));
                $('#slider>ul>li:first').addClass('defaultSlider');
            }
            var imgLeft=parseInt(slider.css("left"));
            moveSlider(imgLeft>=-1000?imgLeft-500:0);
        }
        var timer=setInterval(function(){
            interval();
        },4000);
        $('#slider>ul>li').on('click',function(){
            clearInterval(timer);
            i=$(this).attr('ti');
            $('#slider span').html($(this).attr('ti2'));
            $('#slider>ul>li.defaultSlider').removeClass('defaultSlider');
            $(this).addClass('defaultSlider');
            moveSlider((i-1)*-500);
            timer=setInterval(function(){
                interval();
            },4000);
        });
	});
		