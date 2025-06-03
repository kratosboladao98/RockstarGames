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

    // Fecha menu ao clicar em um item (mobile)
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (menu.classList.contains('active')) {
          menu.classList.remove('active');
        }
      });
    });

    const header = document.getElementById('fundomenu'); // Ou o ID/seletor correto do seu header
      let lastScrollTop = 0;

      window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop && scrollTop > header.offsetHeight) {
          // Scroll para baixo e passou da altura do header
          header.classList.add('header-hidden');
        } else {
          // Scroll para cima ou está no topo
          header.classList.remove('header-hidden');
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Para lidar com o scroll no topo ou negativo
      });

      // ... (seu código JS existente, incluindo o do header) ...

// Lógica para o Carrossel
const slidesContainer = document.querySelector('.slides-container');
const slides = Array.from(document.querySelectorAll('.hero-carousel .slide'));
const dotsContainer = document.querySelector('.carousel-dots');
let currentSlideIndex = 0;
let slideInterval;

function createDots() {
  if (!dotsContainer) return; // Verifica se o container de dots existe
  dotsContainer.innerHTML = ''; // Limpa dots existentes
  slides.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    dot.setAttribute('data-slide', index);
    dot.addEventListener('click', () => {
      goToSlide(index);
      resetInterval(); // Reinicia o intervalo ao clicar no dot
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
  // Para o efeito de "deslizar" (slide) horizontalmente, em vez de fade in/out
  // você precisaria ajustar o CSS e o JS. A implementação atual é fade (display block/none)
  // Para deslizar: slidesContainer.style.transform = `translateX(-${index * 100}%)`;
  // E no CSS, .slides-container teria width de (N_SLIDES * 100)% e .slide com width: 100% / N_SLIDES
  // A implementação atual com .slide.active { display: block; } é mais simples para começar.

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
  slideInterval = setInterval(nextSlide, 5000); // Muda a cada 5 segundos
}

function resetInterval() {
  clearInterval(slideInterval);
  startInterval();
}

// Inicialização do Carrossel
if (slides.length > 0) {
  createDots();
  showSlide(currentSlideIndex); // Mostra o primeiro slide
  startInterval(); // Inicia a transição automática

  // Opcional: Pausar ao passar o mouse sobre o carrossel
  const heroCarousel = document.querySelector('.hero-carousel');
  if (heroCarousel) {
      heroCarousel.addEventListener('mouseenter', () => clearInterval(slideInterval));
      heroCarousel.addEventListener('mouseleave', startInterval);
  }
}

  });