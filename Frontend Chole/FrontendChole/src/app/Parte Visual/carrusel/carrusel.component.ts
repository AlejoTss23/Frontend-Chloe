import { AfterViewInit, Component } from '@angular/core';
import Swiper from 'swiper';


@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.css']
})
export class CarruselComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    const swiper = new Swiper('.swiper', {
      initialSlide: 3, // Ajusta el índice inicial para que la diapositiva que deseas esté centrada
      centeredSlides: true,
      loop: true,
      speed: 900,
      grabCursor: true,
      allowTouchMove: true,
      effect: 'coverflow',
      coverflowEffect: {
        rotate: -10,
        stretch: -45,
        depth: 90,
        modifier: 1,
        slideShadows: true,
      },
      mousewheel: {
thresholdDelta:50,
sensitivity:1,
      },
      pagination: {
        el: '.swiper-pagination',

      },
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        600: {
          slidesPerView: 3,

        },
        1200: {
          slidesPerView: 5, // Mantener 5 diapositivas visibles en pantallas grandes
        },
      },
    });
    
    this.flipActiveSlide(swiper);
  }

  flipActiveSlide(swiper: Swiper) {
    const slides = document.querySelectorAll('.swiper-slide');

    slides.forEach((slide) => {
      slide.addEventListener('click', () => {
        if (
          slide.classList.contains('swiper-slide-active') &&
          slide.classList.contains('flipped')
        ) {
          slide.classList.remove('flipped');
        }
      });
    });

    swiper.on('slideChangeTransitionStart', () => {
      slides.forEach((slide) => {
        slide.classList.remove('flipped');
      });
      this.addClickListenerToActiveSlide();
    });
  }

  addClickListenerToActiveSlide() {
    const activeSlide = document.querySelector('.swiper-slide-active');
    const button = activeSlide?.querySelector('.button');

    if (activeSlide && button) {
      button.addEventListener('click', (event) => {
        event.stopPropagation();
        activeSlide.classList.add('flipped');
      });
    }
  }
}


