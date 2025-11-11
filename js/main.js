/**
 * MAIN.JS - Boot Sequence, Typing Effects, and Core Functionality
 * Modern Terminal Portfolio by Vladislav Kondratyev
 */

// ============================================
// BOOT SEQUENCE
// ============================================

function initBootSequence() {
  const bootSequence = document.getElementById('boot-sequence');

  // Only run on home page and only once per session
  if (!bootSequence) return;

  // Check if boot sequence has already run this session
  if (sessionStorage.getItem('bootComplete') === 'true') {
    bootSequence.style.display = 'none';
    return;
  }

  const bootLines = bootSequence.querySelectorAll('.boot-line');
  let currentLine = 0;

  function showNextLine() {
    if (currentLine < bootLines.length) {
      const line = bootLines[currentLine];
      line.classList.add('typing');
      line.style.opacity = '1';

      currentLine++;

      // Show next line after delay
      setTimeout(showNextLine, 400);
    } else {
      // All lines shown, now fade them out and hide boot sequence
      setTimeout(() => {
        bootLines.forEach(line => line.classList.add('fade-out'));

        setTimeout(() => {
          bootSequence.classList.add('hidden');
          sessionStorage.setItem('bootComplete', 'true');

          // Start typing animation for hero title
          initHeroTyping();
        }, 500);
      }, 800);
    }
  }

  // Start boot sequence
  showNextLine();
}

// ============================================
// HERO TYPING EFFECT
// ============================================

function initHeroTyping() {
  const heroTitle = document.getElementById('hero-title');
  const heroSubtitle = document.getElementById('hero-subtitle');

  if (!heroTitle) return;

  const text = heroTitle.textContent;
  heroTitle.textContent = '';
  heroTitle.style.opacity = '1';

  let index = 0;

  function typeCharacter() {
    if (index < text.length) {
      heroTitle.textContent += text.charAt(index);
      index++;
      setTimeout(typeCharacter, 50);
    } else {
      // Typing complete, remove cursor effect and show subtitle
      setTimeout(() => {
        heroTitle.classList.add('complete');
        if (heroSubtitle) {
          heroSubtitle.classList.add('visible');
        }
      }, 500);
    }
  }

  typeCharacter();
}

// ============================================
// MOBILE MENU TOGGLE
// ============================================

function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav');

  if (!menuToggle || !nav) return;

  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
  });

  // Close menu when clicking on a link
  const navLinks = nav.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
      nav.classList.remove('active');
    }
  });
}

// ============================================
// ACTIVE PAGE INDICATOR
// ============================================

function updateActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('nav a');

  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');

    if (linkPage === currentPage ||
        (currentPage === '' && linkPage === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================

function initSmoothScroll() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');

      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        e.preventDefault();

        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ============================================
// KEYBOARD NAVIGATION
// ============================================

function initKeyboardNavigation() {
  document.addEventListener('keydown', (e) => {
    // Alt + H for Home
    if (e.altKey && e.key === 'h') {
      e.preventDefault();
      window.location.href = 'index.html';
    }

    // Alt + A for About
    if (e.altKey && e.key === 'a') {
      e.preventDefault();
      window.location.href = 'about.html';
    }

    // Alt + P for Projects
    if (e.altKey && e.key === 'p') {
      e.preventDefault();
      window.location.href = 'projects.html';
    }

    // Alt + R for Resume
    if (e.altKey && e.key === 'r') {
      e.preventDefault();
      window.location.href = 'resume.html';
    }

    // Alt + C for Contact
    if (e.altKey && e.key === 'c') {
      e.preventDefault();
      window.location.href = 'contact.html';
    }

    // Escape to close any open modals
    if (e.key === 'Escape') {
      const activeModal = document.querySelector('.modal.active');
      if (activeModal) {
        activeModal.classList.remove('active');
      }
    }
  });
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Debounce function for scroll events
function debounce(func, wait = 10) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function for mouse events
function throttle(func, limit = 16) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// ============================================
// PREVENT FOUC (Flash of Unstyled Content)
// ============================================

function preventFOUC() {
  document.body.style.opacity = '0';

  window.addEventListener('load', () => {
    setTimeout(() => {
      document.body.style.transition = 'opacity 0.3s ease';
      document.body.style.opacity = '1';
    }, 100);
  });
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all core functionality
  initBootSequence();
  initMobileMenu();
  updateActiveNavLink();
  initSmoothScroll();
  initKeyboardNavigation();

  // Log a fun message in console
  console.log('%c Welcome to the terminal! ', 'background: #00ff9c; color: #1a1a1a; font-family: monospace; font-size: 16px; padding: 10px;');
  console.log('%c Built with vanilla HTML, CSS, and JavaScript ', 'color: #00ff9c; font-family: monospace; font-size: 12px;');
  console.log('%c By Vladislav Kondratyev ', 'color: #e0e0e0; font-family: monospace; font-size: 12px;');

  // Keyboard shortcuts hint
  console.log('%c Keyboard Shortcuts: ', 'color: #00ff9c; font-family: monospace; font-size: 14px; margin-top: 10px;');
  console.log('Alt + H = Home');
  console.log('Alt + A = About');
  console.log('Alt + P = Projects');
  console.log('Alt + R = Resume');
  console.log('Alt + C = Contact');
  console.log('Esc = Close modals');
});

// ============================================
// EXPORT FOR USE IN OTHER FILES
// ============================================

// Make utility functions available globally
window.portfolioUtils = {
  debounce,
  throttle
};
