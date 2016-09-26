(function($){
    $.fn.carousel = function(options) {
        options = $.extend({
            displayLi      : 3,
            animationTime  : 700,
            pauseTime      : 3000,
            auto            : true,
            onScroll        : function() {}
        }, options);



        return this.each(function() {

            var $t = $(this);

            var $ul = $t.find('ul.imgSlide');
            var $li = $ul.find('li');
            var item_width = $li.first().outerWidth(true);
            var $prev = $t.find('.prev');
            var $next = $t.find('.next');
            var interval = null;

            //picture caption
            var $ulCaption = $t.find('ul.imgCaption');
            var $liCaption = $ulCaption.find('li');


            switch (options.displayLi) {
                case 1:
                    $t.css('width', '230')
                    break;
                case 2:
                    $t.css('width', '460')
                    break;
                case 3:
                    $t.css('width', '690')
                    break;
                case 4:
                    $t.css('width', '920')
                    break;
                case 5:
                    $t.css('width', '1150')
                    break;
                case 6:
                    $t.css('width', '1380')
                    break;
            }

            var scrollPrev = function() {
                if (!$ul.is(':animated')) {
                    var $li = $ul.find('li');
                    $ul.css('margin-left',-item_width);
                    $li.first().before($li.last());
                    $ul.animate({'margin-left' : 0}, options.animationTime, function(){
                        options.onScroll();
                    });

                    //Caption img
                    var $liCaption = $ulCaption.find('li');
                    $ulCaption.css('margin-left',-item_width);
                    $liCaption.first().before($liCaption.last());
                    $ulCaption.animate({'margin-left' : 0}, options.animationTime, function(){
                        options.onScroll();
                    });

                    clearInterval(interval);
                    if (options.auto) {
                        interval = setTimeout(function() {
                            scrollNext()
                        }, options.pauseTime);
                    }
                }
            };

            var scrollNext = function() {
                var $li = $ul.find('li');
                $ul.not(':animated').animate({'margin-left' : -item_width}, options.animationTime, function(){
                    $li.last().after($li.first());
                    $ul.css({'margin-left' : 0});
                    options.onScroll();
                });

                //Caption img
                var $liCaption = $ulCaption.find('li');
                $ulCaption.not(':animated').animate({'margin-left' : -item_width}, options.animationTime, function(){
                    $liCaption.last().after($liCaption.first());
                    $ulCaption.css({'margin-left' : 0});
                    options.onScroll();
                });

                clearInterval(interval);
                if (options.auto) {
                    interval = setTimeout(function() {
                        scrollNext()
                    }, options.pauseTime);
                }
            };

            $prev.bind('click', scrollPrev);
            $next.bind('click', scrollNext);

            if (options.auto) interval = setTimeout(function() {scrollNext()}, options.pauseTime);
        });
    }
})(jQuery);