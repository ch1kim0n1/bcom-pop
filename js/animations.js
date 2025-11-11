/**
 * ANIMATIONS.JS - Scroll Reveal, Mouse Glow, and Interactive Effects
 * Modern Terminal Portfolio by Vladislav Kondratyev
 */

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================

function initScrollReveal() {
  const revealElements = document.querySelectorAll(
    '.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-stagger'
  );

  if (revealElements.length === 0) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');

        // Unobserve after revealing (one-time animation)
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(element => {
    observer.observe(element);
  });
}

// ============================================
// MOUSE GLOW EFFECT
// ============================================

function initMouseGlow() {
  const mouseGlow = document.getElementById('mouse-glow');

  if (!mouseGlow) return;

  let mouseX = 0;
  let mouseY = 0;
  let glowX = 0;
  let glowY = 0;
  const speed = 0.15; // Smoothing factor for glow movement

  // Track mouse position
  const handleMouseMove = window.portfolioUtils?.throttle((e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Show glow when mouse moves
    if (mouseGlow.style.opacity === '0' || mouseGlow.style.opacity === '') {
      mouseGlow.style.opacity = '1';
    }
  }, 16);

  document.addEventListener('mousemove', handleMouseMove);

  // Hide glow when mouse leaves window
  document.addEventListener('mouseleave', () => {
    mouseGlow.style.opacity = '0';
  });

  // Smooth animation loop for glow
  function animateGlow() {
    // Smooth interpolation
    glowX += (mouseX - glowX) * speed;
    glowY += (mouseY - glowY) * speed;

    // Update glow position
    mouseGlow.style.left = `${glowX}px`;
    mouseGlow.style.top = `${glowY}px`;

    requestAnimationFrame(animateGlow);
  }

  animateGlow();
}

// ============================================
// PARALLAX EFFECT ON SCROLL
// ============================================

function initParallaxEffect() {
  const parallaxElements = document.querySelectorAll('.parallax');

  if (parallaxElements.length === 0) return;

  const handleScroll = window.portfolioUtils?.debounce(() => {
    const scrolled = window.pageYOffset;

    parallaxElements.forEach(element => {
      const speed = element.dataset.parallaxSpeed || 0.5;
      const yPos = -(scrolled * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  }, 10);

  window.addEventListener('scroll', handleScroll);
}

// ============================================
// CARD TILT EFFECT ON MOUSE MOVE
// ============================================

function initCardTiltEffect() {
  const cards = document.querySelectorAll('.project-card, .card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
  });
}

// ============================================
// LOADING DOTS ANIMATION
// ============================================

function initLoadingDots() {
  const loadingElements = document.querySelectorAll('.loading-dots');

  loadingElements.forEach(element => {
    let dots = 0;
    const baseText = element.textContent;

    setInterval(() => {
      dots = (dots + 1) % 4;
      element.textContent = baseText + '.'.repeat(dots);
    }, 500);
  });
}

// ============================================
// TYPING CURSOR BLINK (for in-page elements)
// ============================================

function initCursorBlink() {
  // Cursor elements are already styled in CSS with animation
  // This function can be used for dynamic cursor creation if needed
  const elementsNeedingCursor = document.querySelectorAll('[data-cursor="true"]');

  elementsNeedingCursor.forEach(element => {
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    element.appendChild(cursor);
  });
}

// ============================================
// FADE IN ON LOAD
// ============================================

function initFadeInOnLoad() {
  const fadeElements = document.querySelectorAll('.fade-in-load');

  if (fadeElements.length === 0) return;

  window.addEventListener('load', () => {
    fadeElements.forEach((element, index) => {
      setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }, index * 100);
    });
  });
}

// ============================================
// PROGRESS BAR ANIMATION
// ============================================

function animateProgressBars() {
  const progressBars = document.querySelectorAll('.progress-fill');

  if (progressBars.length === 0) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progressBar = entry.target;
        const targetWidth = progressBar.dataset.progress || '100%';

        progressBar.style.width = targetWidth;
        observer.unobserve(progressBar);
      }
    });
  }, observerOptions);

  progressBars.forEach(bar => {
    bar.style.width = '0%';
    observer.observe(bar);
  });
}

// ============================================
// TERMINAL TEXT TYPING EFFECT
// ============================================

function typeTerminalText(element, text, speed = 50, callback) {
  let index = 0;
  const originalText = element.textContent;

  element.textContent = '';

  function typeChar() {
    if (index < text.length) {
      element.textContent += text.charAt(index);
      index++;
      setTimeout(typeChar, speed);
    } else if (callback) {
      callback();
    }
  }

  typeChar();
}

// ============================================
// GLITCH TEXT EFFECT
// ============================================

function createGlitchEffect(element, duration = 300) {
  const originalText = element.textContent;
  const characters = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';

  let iterations = 0;
  const maxIterations = duration / 30;

  const interval = setInterval(() => {
    element.textContent = originalText
      .split('')
      .map((char, index) => {
        if (index < iterations) {
          return originalText[index];
        }
        return characters[Math.floor(Math.random() * characters.length)];
      })
      .join('');

    iterations += 1;

    if (iterations >= maxIterations) {
      clearInterval(interval);
      element.textContent = originalText;
    }
  }, 30);
}

// ============================================
// COMMAND LINE PROMPT ANIMATION
// ============================================

function animateCommandPrompt() {
  const commandHeaders = document.querySelectorAll('.command-header');

  commandHeaders.forEach(header => {
    header.style.opacity = '0';

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.animation = 'slideInLeft 0.4s ease forwards';
          }, 100);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    observer.observe(header);
  });
}

// ============================================
// BACKGROUND GRID SPEED CONTROL
// ============================================

function adjustGridSpeedOnScroll() {
  let scrollSpeed = 0;
  let lastScrollTop = 0;

  const handleScroll = window.portfolioUtils?.throttle(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    scrollSpeed = Math.abs(scrollTop - lastScrollTop);
    lastScrollTop = scrollTop;

    // Adjust animation speed based on scroll speed (optional enhancement)
    // document.body.style.setProperty('--grid-speed', `${20 - (scrollSpeed / 10)}s`);
  }, 50);

  window.addEventListener('scroll', handleScroll);
}

// ============================================
// EASTER EGG: KONAMI CODE
// ============================================

function initKonamiCode() {
  const konamiCode = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'b', 'a'
  ];

  let konamiIndex = 0;

  document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
      konamiIndex++;

      if (konamiIndex === konamiCode.length) {
        // Easter egg activated!
        activateEasterEgg();
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }
  });
}

function activateEasterEgg() {
  console.log('%c CHEAT CODE ACTIVATED! ', 'background: #00ff9c; color: #1a1a1a; font-size: 20px; font-weight: bold; padding: 10px;');

  // Create matrix rain effect
  const body = document.body;
  const matrixOverlay = document.createElement('div');
  matrixOverlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 99999;
    pointer-events: none;
    background: rgba(0, 0, 0, 0.8);
  `;

  body.appendChild(matrixOverlay);

  // Simple matrix effect
  let text = '01';
  for (let i = 0; i < 50; i++) {
    const span = document.createElement('span');
    span.textContent = text[Math.floor(Math.random() * text.length)];
    span.style.cssText = `
      position: absolute;
      top: ${Math.random() * 100}%;
      left: ${Math.random() * 100}%;
      color: #00ff9c;
      font-family: monospace;
      font-size: ${Math.random() * 20 + 10}px;
      animation: fall ${Math.random() * 3 + 2}s linear infinite;
    `;
    matrixOverlay.appendChild(span);
  }

  // Remove after 5 seconds
  setTimeout(() => {
    matrixOverlay.style.opacity = '0';
    matrixOverlay.style.transition = 'opacity 1s ease';
    setTimeout(() => matrixOverlay.remove(), 1000);
  }, 5000);
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all animation features
  initScrollReveal();
  initMouseGlow();
  initParallaxEffect();
  initCardTiltEffect();
  initLoadingDots();
  initCursorBlink();
  initFadeInOnLoad();
  animateProgressBars();
  animateCommandPrompt();
  adjustGridSpeedOnScroll();
  initKonamiCode();

  console.log('%c Animations initialized ', 'background: #00ff9c; color: #1a1a1a; font-family: monospace; padding: 5px;');
});

// ============================================
// EXPORT FUNCTIONS FOR USE IN OTHER FILES
// ============================================

window.animationUtils = {
  typeTerminalText,
  createGlitchEffect
};
