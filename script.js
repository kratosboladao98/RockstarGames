window.addEventListener('DOMContentLoaded', () => {
    const intro = document.getElementById('intro');
    const site = document.getElementById('site');

    const alreadyShown = sessionStorage.getItem('introShown');

    if (alreadyShown) {
      intro.style.display = 'none';
      site.classList.remove('hidden');
      site.classList.add('visible');
      document.body.style.overflow = 'auto';
    } else {
      setTimeout(() => {
        intro.style.opacity = '0';
        setTimeout(() => {
          intro.style.display = 'none';
          site.classList.remove('hidden');
          site.classList.add('visible');
          document.body.style.overflow = 'auto';
          sessionStorage.setItem('introShown', 'true');
        }, 1000);
      }, 2500);
    }

    const menuToggle = document.getElementById('menu-toggle');
    const menu = document.querySelector('.menu');

    menuToggle.addEventListener('click', () => {
      menu.classList.toggle('active');
    });

    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (menu.classList.contains('active')) {
          menu.classList.remove('active');
        }
      });
    });

    const header = document.getElementById('fundomenu'); 
      let lastScrollTop = 0;

      window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop && scrollTop > header.offsetHeight) {
          header.classList.add('header-hidden');
        } else {
          header.classList.remove('header-hidden');
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; 
      });



const slidesContainer = document.querySelector('.slides-container');
const slides = Array.from(document.querySelectorAll('.hero-carousel .slide'));
const dotsContainer = document.querySelector('.carousel-dots');
let currentSlideIndex = 0;
let slideInterval;

function createDots() {
  if (!dotsContainer) return; 
  dotsContainer.innerHTML = ''; 
  slides.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    dot.setAttribute('data-slide', index);
    dot.addEventListener('click', () => {
      goToSlide(index);
      resetInterval(); 
    });
    dotsContainer.appendChild(dot);
  });
}

function updateDots() {
  if (!dotsContainer) return;
  const dots = dotsContainer.querySelectorAll('.dot');
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentSlideIndex);
  });
}

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
    
  updateDots();
}

function nextSlide() {
  currentSlideIndex = (currentSlideIndex + 1) % slides.length;
  showSlide(currentSlideIndex);
}

function prevSlide() {
  currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
  showSlide(currentSlideIndex);
}

function goToSlide(index) {
  currentSlideIndex = index;
  showSlide(currentSlideIndex);
}

function startInterval() {
  slideInterval = setInterval(nextSlide, 5000); 
}

function resetInterval() {
  clearInterval(slideInterval);
  startInterval();
}

if (slides.length > 0) {
  createDots();
  showSlide(currentSlideIndex); 
  startInterval(); 

  const heroCarousel = document.querySelector('.hero-carousel');
  if (heroCarousel) {
      heroCarousel.addEventListener('mouseenter', () => clearInterval(slideInterval));
      heroCarousel.addEventListener('mouseleave', startInterval);
  }
}

  });
