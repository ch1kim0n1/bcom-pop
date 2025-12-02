/**
 * PROJECTS.JS - Project Card Interactions and Modal Functionality
 * Modern Terminal Portfolio by Vladislav Kondratyev
 */

// ============================================
// PROJECT CARD CLICK HANDLERS
// ============================================

function initProjectCards() {
  const projectCards = document.querySelectorAll('.project-card');
  const modals = {
    email: document.getElementById('email-modal'),
    data: document.getElementById('data-modal'),
    presentation: document.getElementById('presentation-modal'),
    mindcore: document.getElementById('mindcore-modal'),
    songdna: document.getElementById('songdna-modal')
  };

  projectCards.forEach(card => {
    const projectType = card.dataset.project;

    // Click on card
    card.addEventListener('click', (e) => {
      // Don't open modal if clicking the "View Details" button directly
      // (it will be handled by its own handler)
      if (e.target.classList.contains('view-details-btn')) {
        return;
      }

      openModal(projectType, modals);
    });

    // Click on "View Details" button
    const viewDetailsBtn = card.querySelector('.view-details-btn');
    if (viewDetailsBtn) {
      viewDetailsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        openModal(projectType, modals);
      });
    }

    // Add keyboard accessibility
    card.setAttribute('tabindex', '0');
    card.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(projectType, modals);
      }
    });
  });
}

// ============================================
// MODAL FUNCTIONS
// ============================================

function openModal(projectType, modals) {
  const modal = modals[projectType];

  if (!modal) {
    console.error(`Modal for project type "${projectType}" not found`);
    return;
  }

  // Add active class to show modal
  modal.classList.add('active');

  // Prevent body scroll when modal is open
  document.body.style.overflow = 'hidden';

  // Focus on modal for accessibility
  modal.focus();

  // Log for debugging
  console.log(`Opened ${projectType} modal`);
}

function closeModal(modal) {
  modal.classList.remove('active');

  // Restore body scroll
  document.body.style.overflow = '';

  // Log for debugging
  console.log('Closed modal');
}

function initModalCloseFunctionality() {
  const modals = document.querySelectorAll('.modal');

  modals.forEach(modal => {
    // Close button
    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        closeModal(modal);
      });
    }

    // Click outside modal content to close
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });

    // Escape key to close (handled in main.js, but also here for redundancy)
    modal.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeModal(modal);
      }
    });

    // Make modal focusable
    modal.setAttribute('tabindex', '-1');
  });
}

// ============================================
// PROJECT CARD HOVER EFFECTS ENHANCEMENT
// ============================================

function enhanceProjectCardHoverEffects() {
  const projectCards = document.querySelectorAll('.project-card');

  projectCards.forEach(card => {
    const cardTitle = card.querySelector('.project-card-title');

    card.addEventListener('mouseenter', () => {
      // Add glitch effect to title on hover
      if (cardTitle && window.animationUtils?.createGlitchEffect) {
        window.animationUtils.createGlitchEffect(cardTitle, 200);
      }
    });
  });
}

// ============================================
// PROJECT FILTER (if you want to add categories later)
// ============================================

function initProjectFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterButtons.length === 0) return;

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filterValue = button.dataset.filter;

      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // Filter projects
      projectCards.forEach(card => {
        if (filterValue === 'all' || card.dataset.category === filterValue) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

// ============================================
// MODAL CONTENT ANIMATIONS
// ============================================

function animateModalContent() {
  const modals = document.querySelectorAll('.modal');

  modals.forEach(modal => {
    // Observe when modal becomes active
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          if (modal.classList.contains('active')) {
            animateModalElements(modal);
          }
        }
      });
    });

    observer.observe(modal, {
      attributes: true
    });
  });
}

function animateModalElements(modal) {
  const modalHeader = modal.querySelector('.project-modal-header');
  const modalBody = modal.querySelector('.project-modal-body');

  if (modalHeader) {
    modalHeader.style.opacity = '0';
    modalHeader.style.transform = 'translateY(-20px)';

    setTimeout(() => {
      modalHeader.style.transition = 'all 0.4s ease';
      modalHeader.style.opacity = '1';
      modalHeader.style.transform = 'translateY(0)';
    }, 100);
  }

  if (modalBody) {
    modalBody.style.opacity = '0';
    modalBody.style.transform = 'translateY(20px)';

    setTimeout(() => {
      modalBody.style.transition = 'all 0.5s ease';
      modalBody.style.opacity = '1';
      modalBody.style.transform = 'translateY(0)';
    }, 200);
  }
}

// ============================================
// LAZY LOAD PROJECT IMAGES/EMBEDS
// ============================================

function lazyLoadProjectContent() {
  const projectEmbeds = document.querySelectorAll('.project-embed[data-src]');

  if (projectEmbeds.length === 0) return;

  const observerOptions = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const embed = entry.target;
        const src = embed.dataset.src;

        // Load the content
        if (src) {
          const img = document.createElement('img');
          img.src = src;
          img.alt = embed.dataset.alt || 'Project content';
          img.style.maxWidth = '100%';
          img.style.height = 'auto';

          embed.innerHTML = '';
          embed.appendChild(img);
        }

        observer.unobserve(embed);
      }
    });
  }, observerOptions);

  projectEmbeds.forEach(embed => {
    observer.observe(embed);
  });
}

// ============================================
// PROJECT CARD RIPPLE EFFECT
// ============================================

function addRippleEffect() {
  const cards = document.querySelectorAll('.project-card');

  cards.forEach(card => {
    card.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');

      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.style.position = 'absolute';
      ripple.style.borderRadius = '50%';
      ripple.style.background = 'rgba(0, 255, 156, 0.3)';
      ripple.style.transform = 'scale(0)';
      ripple.style.animation = 'ripple 0.6s ease-out';
      ripple.style.pointerEvents = 'none';

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // Add CSS for ripple animation if not already in CSS
  if (!document.getElementById('ripple-style')) {
    const style = document.createElement('style');
    style.id = 'ripple-style';
    style.textContent = `
      @keyframes ripple {
        to {
          transform: scale(2);
          opacity: 0;
        }
      }
      .project-card {
        position: relative;
        overflow: hidden;
      }
    `;
    document.head.appendChild(style);
  }
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // Check if we're on the projects page
  if (document.querySelector('.projects-grid')) {
    initProjectCards();
    initModalCloseFunctionality();
    enhanceProjectCardHoverEffects();
    initProjectFilter();
    animateModalContent();
    lazyLoadProjectContent();
    addRippleEffect();

    console.log('%c Projects page initialized ', 'background: #00ff9c; color: #1a1a1a; font-family: monospace; padding: 5px;');
  }
});

// ============================================
// EXPORT FOR EXTERNAL USE
// ============================================

window.projectUtils = {
  openModal,
  closeModal
};
