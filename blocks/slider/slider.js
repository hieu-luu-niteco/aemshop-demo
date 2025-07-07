/**
 * Slider Block
 * A dedicated slider component for Adobe Commerce storefronts
 * with navigation, auto-advance, and mobile support
 */

export default function decorate(block) {
  // Configuration
  const config = {
    autoAdvance: true,
    autoAdvanceDelay: 5000, // 5 seconds
    transitionDuration: 600,
    pauseOnHover: true,
    enableKeyboard: true,
    enableTouch: true,
  };

  // Get all slides from block content
  const slides = [...block.children];
  
  if (slides.length === 0) {
    return;
  }

  // Create slider structure
  const slider = document.createElement('div');
  slider.className = 'slider-container';
  
  const slidesContainer = document.createElement('div');
  slidesContainer.className = 'slider-slides';
  
  const navigation = document.createElement('div');
  navigation.className = 'slider-navigation';
  
  const dots = document.createElement('div');
  dots.className = 'slider-dots';

  // Process slides
  slides.forEach((slide, index) => {
    // Create slide wrapper
    const slideWrapper = document.createElement('div');
    slideWrapper.className = 'slider-slide';
    slideWrapper.setAttribute('data-slide', index);
    
    // Move slide content to wrapper
    slideWrapper.appendChild(slide);
    
    // Set first slide as active
    if (index === 0) {
      slideWrapper.classList.add('active');
    }
    
    slidesContainer.appendChild(slideWrapper);
    
    // Create dot navigation
    const dot = document.createElement('button');
    dot.className = 'slider-dot';
    dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
    dot.setAttribute('data-slide', index);
    
    if (index === 0) {
      dot.classList.add('active');
    }
    
    dots.appendChild(dot);
  });

  // Create arrow navigation
  const prevButton = document.createElement('button');
  prevButton.className = 'slider-arrow slider-arrow-prev';
  prevButton.setAttribute('aria-label', 'Previous slide');
  prevButton.innerHTML = '<span class="slider-arrow-icon">‹</span>';
  
  const nextButton = document.createElement('button');
  nextButton.className = 'slider-arrow slider-arrow-next';
  nextButton.setAttribute('aria-label', 'Next slide');
  nextButton.innerHTML = '<span class="slider-arrow-icon">›</span>';

  // Assemble slider
  navigation.appendChild(prevButton);
  navigation.appendChild(nextButton);
  
  slider.appendChild(slidesContainer);
  slider.appendChild(navigation);
  slider.appendChild(dots);

  // Replace block content with slider
  block.innerHTML = '';
  block.appendChild(slider);

  // Slider state
  let currentSlide = 0;
  let isTransitioning = false;
  let autoAdvanceTimer = null;
  let touchStartX = 0;
  let touchEndX = 0;

  // Navigation functions
  function goToSlide(index, direction = 'next') {
    if (isTransitioning || index === currentSlide) return;
    
    isTransitioning = true;
    
    const currentSlideElement = slidesContainer.querySelector('.slider-slide.active');
    const targetSlideElement = slidesContainer.querySelector(`[data-slide="${index}"]`);
    const currentDot = dots.querySelector('.slider-dot.active');
    const targetDot = dots.querySelector(`[data-slide="${index}"]`);
    
    // Add transition classes
    currentSlideElement.classList.add(`slide-out-${direction}`);
    targetSlideElement.classList.add(`slide-in-${direction}`);
    
    // Update active states
    currentSlideElement.classList.remove('active');
    targetSlideElement.classList.add('active');
    currentDot.classList.remove('active');
    targetDot.classList.add('active');
    
    // Update current slide
    currentSlide = index;
    
    // Clean up transition classes after animation
    setTimeout(() => {
      currentSlideElement.classList.remove(`slide-out-${direction}`);
      targetSlideElement.classList.remove(`slide-in-${direction}`);
      isTransitioning = false;
    }, config.transitionDuration);
    
    // Reset auto-advance timer
    resetAutoAdvance();
  }

  function nextSlide() {
    const nextIndex = (currentSlide + 1) % slides.length;
    goToSlide(nextIndex, 'next');
  }

  function prevSlide() {
    const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
    goToSlide(prevIndex, 'prev');
  }

  // Auto-advance functionality
  function startAutoAdvance() {
    if (config.autoAdvance && slides.length > 1) {
      autoAdvanceTimer = setTimeout(nextSlide, config.autoAdvanceDelay);
    }
  }

  function stopAutoAdvance() {
    if (autoAdvanceTimer) {
      clearTimeout(autoAdvanceTimer);
      autoAdvanceTimer = null;
    }
  }

  function resetAutoAdvance() {
    stopAutoAdvance();
    startAutoAdvance();
  }

  // Event listeners
  
  // Dot navigation
  dots.addEventListener('click', (e) => {
    if (e.target.classList.contains('slider-dot')) {
      const targetIndex = parseInt(e.target.getAttribute('data-slide'));
      const direction = targetIndex > currentSlide ? 'next' : 'prev';
      goToSlide(targetIndex, direction);
    }
  });

  // Arrow navigation
  prevButton.addEventListener('click', prevSlide);
  nextButton.addEventListener('click', nextSlide);

  // Keyboard navigation
  if (config.enableKeyboard) {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    });
  }

  // Touch/swipe support
  if (config.enableTouch) {
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
  }

  // Pause on hover
  if (config.pauseOnHover) {
    slider.addEventListener('mouseenter', stopAutoAdvance);
    slider.addEventListener('mouseleave', startAutoAdvance);
  }

  // Visibility API - pause when page is not visible
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopAutoAdvance();
    } else {
      startAutoAdvance();
    }
  });

  // Initialize auto-advance
  startAutoAdvance();

  // Accessibility improvements
  slider.setAttribute('role', 'region');
  slider.setAttribute('aria-label', 'Content slider');
  slidesContainer.setAttribute('aria-live', 'polite');
  
  // Add slide indicators for screen readers
  slides.forEach((_, index) => {
    const slideElement = slidesContainer.querySelector(`[data-slide="${index}"]`);
    slideElement.setAttribute('aria-label', `Slide ${index + 1} of ${slides.length}`);
  });
} 