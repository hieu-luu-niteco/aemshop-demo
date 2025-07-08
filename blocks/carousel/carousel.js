export default function decorate(block) {
  // Use default button text since fetchPlaceholders doesn't exist
  const btnNxt = '>>';
  const btnPre = '<<';

  const rows = [...block.children];

  console.log("rows", rows);
  
  if (rows.length === 0) {
    return;
  }

  // Create carousel structure
  const carousel = document.createElement('div');
  carousel.className = 'carousel-container';
  
  const slidesContainer = document.createElement('div');
  slidesContainer.className = 'carousel-slides';
  
  const navigation = document.createElement('div');
  navigation.className = 'carousel-navigation';

  // Process all rows as slides (don't use first/last as buttons)
  rows.forEach((row, index) => {
    row.classList.add('carousel-slide');
    row.setAttribute('data-slide', index);
    
    // Process columns within each slide
    [...row.children].forEach((col, colIndex) => {
      if (colIndex === 0) {
        col.classList.add('slide-image');
      } else if (colIndex === 1) {
        col.classList.add('slide-text');
      }
    });
    
    slidesContainer.appendChild(row);
  });

  // Create navigation buttons
  const prevBtn = document.createElement('button');
  prevBtn.classList.add('carousel-btn', 'carousel-btn-prev');
  prevBtn.innerHTML = `<span class="carousel-btn-text">${btnPre}</span>`;
  prevBtn.setAttribute('aria-label', 'Previous slide');

  const nextBtn = document.createElement('button');
  nextBtn.classList.add('carousel-btn', 'carousel-btn-next');
  nextBtn.innerHTML = `<span class="carousel-btn-text">${btnNxt}</span>`;
  nextBtn.setAttribute('aria-label', 'Next slide');

  // Create dots navigation
  const dotsContainer = document.createElement('div');
  dotsContainer.className = 'carousel-dots';
  
  rows.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.className = 'carousel-dot';
    dot.setAttribute('data-slide', index);
    dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
    if (index === 0) {
      dot.classList.add('active');
    }
    dotsContainer.appendChild(dot);
  });

  // Assemble carousel
  navigation.appendChild(prevBtn);
  navigation.appendChild(nextBtn);
  
  carousel.appendChild(slidesContainer);
  carousel.appendChild(navigation);
  carousel.appendChild(dotsContainer);

  // Replace block content
  block.innerHTML = '';
  block.appendChild(carousel);

  // Carousel state
  let curSlide = 0;
  const maxSlide = rows.length - 1;
  const slides = slidesContainer.querySelectorAll('.carousel-slide');

  // Navigation functions
  function goToSlide(slideIndex) {
    // Update current slide
    curSlide = slideIndex;
    
    // Move slides container
    slidesContainer.style.transform = `translateX(-${curSlide * 100}vw)`;
    
    // Update dots
    const dots = dotsContainer.querySelectorAll('.carousel-dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === curSlide);
    });
    
    // Update button states
    prevBtn.disabled = curSlide === 0;
    nextBtn.disabled = curSlide === maxSlide;
  }

  function nextSlide() {
    if (curSlide < maxSlide) {
      goToSlide(curSlide + 1);
    } else {
      // Loop to first slide
      goToSlide(0);
    }
  }

  function prevSlide() {
    if (curSlide > 0) {
      goToSlide(curSlide - 1);
    } else {
      // Loop to last slide
      goToSlide(maxSlide);
    }
  }

  // Event listeners
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);

  // Dots navigation
  dotsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('carousel-dot')) {
      const slideIndex = parseInt(e.target.getAttribute('data-slide'));
      goToSlide(slideIndex);
    }
  });

  // Keyboard navigation
  block.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
    }
  });

  // Touch/swipe support
  let touchStartX = 0;
  let touchEndX = 0;

  slidesContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  });

  slidesContainer.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].clientX;
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  });

  // Initialize carousel
  goToSlide(0);

  // Auto-advance (optional)
  const autoAdvance = block.dataset.autoAdvance !== 'false';
  const autoAdvanceDelay = parseInt(block.dataset.autoAdvanceDelay) || 5000;
  
  if (autoAdvance && rows.length > 1) {
    let autoTimer = setInterval(nextSlide, autoAdvanceDelay);
    
    // Pause on hover
    block.addEventListener('mouseenter', () => {
      clearInterval(autoTimer);
    });
    
    block.addEventListener('mouseleave', () => {
      autoTimer = setInterval(nextSlide, autoAdvanceDelay);
    });
    
    // Pause when tab is not visible
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        clearInterval(autoTimer);
      } else if (autoAdvance) {
        autoTimer = setInterval(nextSlide, autoAdvanceDelay);
      }
    });
  }

  // Accessibility improvements
  carousel.setAttribute('role', 'region');
  carousel.setAttribute('aria-label', 'Image carousel');
  slidesContainer.setAttribute('aria-live', 'polite');
}