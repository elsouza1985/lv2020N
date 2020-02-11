"use strict";

$("#slider1,#slider2").owlCarousel({
  items: 5,
  nav: true,
  autoplay:true,
  navText: ['<i class="fas fa-chevron-left"></i>','<i class="fas fa-chevron-right"></i>'],
  responsiveClass:true,
    responsive:{
        320:{
            items:1,
            nav:true
        },
        600:{
            items:3,
            nav:false
        },
        1024:{
            items:4,
            nav:true
        },
         1280:{
            items:4,
            nav:true
        }
        ,
         1600:{
            items:5,
            nav:true
        }
    }
});
