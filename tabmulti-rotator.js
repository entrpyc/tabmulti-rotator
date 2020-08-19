function tabMulti(selector, autoplay) {
  if(document.querySelector(selector)) {

    if(autoplay) {
      $.fn.isInViewport = function() {
        var elementTop = $(this).offset().top;
        var elementBottom = elementTop + $(this).outerHeight();
        var viewportTop = $(window).scrollTop();
        var viewportBottom = viewportTop + $(window).height();
        return elementBottom > viewportTop && elementTop < viewportBottom + 150;
        // return viewportTop > elementTop;
      };
      var navIsInView = 0;
  
      $(window).on('scroll resize', function() {
        if($('.btb').isInViewport()) {
          navIsInView = 1;
        }
      })
    }

    var ifSelf = 0;
    var counter = 2;
    $('.nav-item').on('click', function () {
      clearInterval(c);
      ifSelf = 1;
      counter = $(this).attr('nav-item-id').split('slide-')[1]
      $('.nav-item').removeClass('selected');
      $(this).addClass('selected');
      var id = '.content-item[content-item-id=\'' + $(this).attr('nav-item-id') + '\']';
  
      $('.content-item-selector').removeClass('selected');
      $(id).addClass('selected');
      $('.rotate').css('transform', $(this).attr('rotate'))
    })

    if(autoplay) {
      var c = setInterval(function(){
        if(navIsInView) {
          runSwitch();
          clearInterval(c)
        }
      }, 500)
    
      var runSwitch = function() {
        var i = setInterval(function(){
          if(ifSelf) {
            clearInterval(i);
          } else {
            $('.nav-item').removeClass('selected');
            $('.nav-item[nav-item-id="slide-'+ counter +'"]').addClass('selected')
      
            $('.content-item').removeClass('selected');
            $('.content-item[content-item-id=\'slide-' + counter + '\']').addClass('selected');
            // var id = '.content-item[content-item-id=slide-\'' + counter + '\']';
      
            // $('.content-item-selector').removeClass('selected');
            // $(id).addClass('selected');
            $('.rotate').css('transform', $('.nav-item[nav-item-id="slide-'+ counter +'"]').attr('rotate'))
      
            if(counter === $('.nav-item').length) {
              counter = 1;
            } else {
              counter++;
            }
          }
        }, 6500);
        
      }
    }
  
    setTimeout(() => {
      var setHeight = $('.bot-content .list-content .content-item')[0].offsetHeight;
      $('.list-content').height(setHeight);
    }, 400);
  
    $('.nav-item').on('click', function() {
      var id = '.content-item[content-item-id=\'' + $(this).attr('nav-item-id') + '\']';
      var setHeight = $(id)[0].offsetHeight;
      // console.log($(id)[0])
  
      $('.list-content').height(setHeight);
      $('.nav-item').removeClass('selected');
      $(this).addClass('selected');
      $('.content-item').removeClass('selected');
      $(id).addClass('selected');
    })
  }
}

export default tabMulti