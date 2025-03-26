$(function () {
//  "use strict";
  const swiperElements = document.querySelectorAll('.main-swiper');

  swiperElements.forEach(swiperElement => {
    var swiper = new Swiper(swiperElement, {
      //lazy: true,
      speed: 300,

      navigation: {
        nextEl: swiperElement.querySelector(".swiper-button-next"),
        prevEl: swiperElement.querySelector(".swiper-button-prev"),
      },
    });
  });

  // HTML 요소의 높이 변수에 저장
  var contentsElement = document.getElementById('contents');
  var contentsHeight = contentsElement.offsetHeight;
  var style = $('#contents').attr('style');
  $(contentsElement).attr('style', contentsHeight + 'px');

  //Menu to section
  const _singleMenu = document.querySelectorAll('#nav>ul>li>a')
  $(_singleMenu).on('click', function (event) {
    event.preventDefault();
    $('#nav').addClass('fixed');
    var targetId = $(this).attr('href'); 
    $('html, body').animate({
      scrollTop: $(targetId).offset().top
    }, 450);
  });

  //Add,remove fixed class
  var targetElement = document.getElementById('contents');
  var lastScrollTop = 0;

  window.addEventListener('scroll', function () {
    let currentScrollTop = $(this).scrollTop();
    
    if (currentScrollTop > 260) {
      $('#nav').addClass('fixed');
    } else {
      // Scrolling up
      $('#nav').removeClass('fixed');
    }
    lastScrollTop = currentScrollTop;
  });


  //Swiper options
//  var swiperIcons = new Swiper(".swiper.icon", {
//    spaceBetween: 20,
//    grabCursor: true,
//    centeredSlides: true,
//    autoplay: true,
//    slidesPerView: 3,
//    loop: true,
//   });
});
