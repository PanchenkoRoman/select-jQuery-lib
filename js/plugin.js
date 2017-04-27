(function($){
  jQuery.fn.Slider = function(options){
    options = $.extend({
        slideNow : 0,
        slideCount : $(this).find('ul').children('li').length,
        translateWidth :-$(this).width() * (options.slideNow),
        slideInterval : 2000,
        autoPlay: true,
        arrows: true,
        navBtnId : options.slideNow,
        pagination: true,
        swipeAble: true
    }, options);
    
    var make = function(){
      // здесь переменная this будет содержать отдельный
      // DOM-элемент, к которому и нужно будет применить
      // воздействия плагина
        $(this).find('ul').filter( ':first' ).attr({'id':'slidewrapper'}); 
        var wrapper = $(this); //создаем ссылку на обьект обгортку слайдера

        $('#slidewrapper').css({
            'width': 'calc(100% *' + options.slideCount + ')',
            'transform': 'translate(' + options.translateWidth + 'px, 0)',
            '-webkit-transform': 'translate(' + options.translateWidth + 'px, 0)',
            '-ms-transform': 'translate(' + options.translateWidth + 'px, 0)',
         })

        $('.slide').css({
            'width': 'calc(100% /' + options.slideCount + ')'
        })

        if (options.autoPlay) {
        var switchInterval = setInterval(nextSlide, options.slideInterval);
        $(this).hover(function() {
            clearInterval(switchInterval);
        }, function() {
            switchInterval = setInterval(nextSlide, options.slideInterval);
        });

        if(options.arrows){
            $(this).find('ul').after('<div id="prev-next-btns"><div id="prev-btn"></div><div id="next-btn"></div></div>');
            $('body').on('click', '#next-btn', function(){
                nextSlide();
            });
            $('body').on('click', '#prev-btn', function(){
                prevSlide();
            });
        }

        if(options.swipeAble){
            $(this).on("swipeleft",function(){
                nextSlide();
            });
            $(this).on("swiperight",function(){    
                prevSlide();
            });
        }

        if(options.pagination){
            $(this).find('ul').after('<ul id="nav-btns"><li class="slide-nav-btn"></li></ul>');
            for(var i = 0; i < options.slideCount - 1; i++){
                $('#nav-btns .slide-nav-btn:last-child').after('<li class="slide-nav-btn"></li>');
            }

            /*if(nextSlide() || prevSlide()){
                
            }*/

            $('body').on('click', '.slide-nav-btn', function(){
                options.navBtnId = $(this).index();
                $(this).siblings().removeClass('slide-nav-btn-active');
                $(this).addClass('slide-nav-btn-active');

                if (options.navBtnId + 1 != options.slideNow) {
                    options.translateWidth = -$('#slidewrapper').parents("div").width() * (options.navBtnId);
                    $('#slidewrapper').css({
                        'transform': 'translate(' + options.translateWidth + 'px, 0)',
                        '-webkit-transform': 'translate(' + options.translateWidth + 'px, 0)',
                        '-ms-transform': 'translate(' + options.translateWidth + 'px, 0)',
                    });
                    options.slideNow = options.navBtnId + 1;
                }
            });
        }

    }
        function nextSlide() {
            var slideNum = options.slideNow;

            var num = options.slideNum;    
                    //console.log(options.slideCount);     

                $('.slide-nav-btn').siblings().removeClass('slide-nav-btn-active');
                $('.slide-nav-btn').eq(slideNum).addClass('slide-nav-btn-active');

            if (slideNum >= options.slideCount || slideNum < 0) {
                $(this).find('ul').css('transform', 'translate(0, 0)');
                slideNum = 0;
            } else {
                options.translateWidth = -wrapper.width() * (options.slideNow);
                $('#slidewrapper').css({
                    'transform': 'translate(' + options.translateWidth + 'px, 0)',
                    '-webkit-transform': 'translate(' + options.translateWidth + 'px, 0)',
                    '-ms-transform': 'translate(' + options.translateWidth + 'px, 0)',
                });
                options.slideNow = slideNum++;
            }
            options.slideNow = slideNum++;
        }

        function prevSlide (){
            var slideNum = options.slideNow;
            if (slideNum <= 1 || slideNum > options.slideCount) {
                translateWidth = -wrapper.width() * (options.slideCount - 1);
                $(this).find('ul').css({
                    'transform': 'translate(' + translateWidth + 'px, 0)',
                    '-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
                    '-ms-transform': 'translate(' + translateWidth + 'px, 0)',
                });
                slideNum = options.slideCount;
            } else {
                translateWidth = -wrapper.width() * (slideNum - 2);
                $('#slidewrapper').css({
                    'transform': 'translate(' + translateWidth + 'px, 0)',
                    '-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
                    '-ms-transform': 'translate(' + translateWidth + 'px, 0)',
                });
                options.slideNow = slideNum--;
            }
        options.slideNow = slideNum--;
        }
    };

    return this.each(make); 
  };
})(jQuery);
 

$('#viewport').Slider({
    autoPlay: true,
    arrows: true
});