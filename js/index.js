function isInViewLoad(element, distance) {
    var distanceHeight = distance || 0;
    var $element = $(element);
    var visible = !!($element.width() || $element.height()) &&
      $element.css('display') !== 'none';
    if (!visible) {
      return false;
    }
    var $win = $(window);
    var windowTop = $win.scrollTop();
    var windowHeight = $win.height();
    var top = $element.offset().top;
    var height = $element.height();
    var getInto = windowTop + windowHeight + distanceHeight >= top //元素即将进入 //底部进入
    var downUpInto = getAllInto = windowTop + windowHeight + distanceHeight >= top + height; //元素完全进入==即this下面元素即将进入.触底
    // var upDownInto = windowTop + distanceHeight >= top + height; //顶端进入
    var upDownOut = top >= windowTop - height - distanceHeight; //顶部离开
    var currentInto = getInto && upDownOut; //当前屏进入
    return {
      getInto: getInto,
      downUpInto: downUpInto,
      upDownOut: upDownOut,
      currentInto: currentInto
    }
  }
  $(window).scroll(function() {
    var element = '.hot-major';////element 指’.className’或'#ID'或其他选择器标签
      var data = isInViewLoad(element, -360);
      if(data.currentInto && !$('.bounceUp').hasClass('bounceInUp')){
        $('.bounceDown').addClass('bounceInDown');
        $('.bounceUp').addClass('bounceInUp');
        console.log('in');
      }else if(!data.currentInto && $('.bounceUp').hasClass('bounceInUp')){
        $('.bounceDown').removeClass('bounceInDown');
        $('.bounceUp').removeClass('bounceInUp');
        console.log('out');
      }
  });