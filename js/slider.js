(function($) {
    $.fn.extend({
        slider: function(options) {
            var settings = $.extend({
                speed: 500

            },
            options);
            return this.each(function() {
                var slidercontents = $(this).addClass('image-slider-contents');
                var slider = $('<div/>').addClass('image-slider').attr('id', slidercontents.attr('id'));
                var backbutton = $('<div/>').addClass('image-slider-back');
                var forwardbutton = $('<div/>').addClass('image-slider-forward');
                slidercontents.removeAttr('id');
                slidercontents.before(slider);
                slider.append(backbutton);
                slider.append(slidercontents);
                slider.append(forwardbutton);
                var total = $('> div', slidercontents).length;
                var left = 0;
                var w;
                var width;
                var maxScroll;
            
                function initialize() {
                    var tempElements = $('> div', slidercontents);
                    var allElements = new Array();
                    tempElements.each(function(index, el) {
                        allElements.push($('<div/>').addClass('' + (index + 1) + '').addClass('outer').append(el));

                    });

                    allElements = $(allElements);
                    $('> div', slidercontents).remove();
                    var wrapper = $('<div/>').addClass('contents-wrapper');
                    allElements.each(function(index, el) {

                        wrapper.append($(el));

                    });
                    slidercontents.append(wrapper);
                    var w = $('.outer:eq(0)', slidercontents).outerWidth() + parseFloat($('.outer:eq(0)', slidercontents).css('margin-left')) + parseFloat($('.outer:eq(0)', slidercontents).css('margin-right'));
                    var width = total * w;
                    var maxScroll = width - $('.image-slider-contents').outerWidth();
                    wrapper.css({
                        width: width
                    });


                    
                    
                    $('.outer a').click(function(e) {
                        e.stopPropagation();
                        e.stopImmediatePropagation();


                    });
                    $('.outer').hover(function() {
                        $(this).addClass('active');
                    },
                    function() {
                        $(this).removeClass('active');
                    }).click(
                    function(e) {
                        e.stopPropagation();
                        e.stopImmediatePropagation();
                        var cls = $(this).attr('class').split(' ')[0];
                        var p = $(this).find('div');
                        var img = p.find('img').attr('src');
                        var preview = $('.preview');
                        var l = $('.image-slider').width() / 2 - preview.outerWidth() / 2;
                        var t = (p.offset().top - preview.height());
                        t -= t / 2;
                        preview.css({
                            left: l,
                            top: t
                        });
                        var text = p.find('a').html();
                        preview.find('img').attr('src', img).addClass(cls);
                        preview.find('.label').html(text);
                        preview.fadeIn("slow");


                    });

                    forwardbutton.click(function() {
                        left -= w;
                        if (left + maxScroll >= 0) {
                            $('.contents-wrapper').stop(false, true).animate({
                                left: '-=' + w
                            },
                            settings.speed);

                        }
                        else
                        left += w;

                    });
                    backbutton.click(function() {
                        if (left < 0) {
                            left += w;
                            $('.contents-wrapper').stop(false, true).animate({
                                left: '+=' + w
                            },
                            settings.speed);

                        }

                    });

                }
                initialize();

                function getDimensions(value) {
                    return value + 'px';

                }


            });

        }

    });

})(jQuery);