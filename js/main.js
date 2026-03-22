// ============================================
// PTC — Pilot Training Center
// Main JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // --- Sticky Navbar ---
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    });
  }

  // --- Mobile Hamburger Toggle ---
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.navbar-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('open');
      document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
    });

    // Close on non-dropdown link click
    navMenu.querySelectorAll('a').forEach(link => {
      if (!link.closest('.nav-has-dropdown') || link.closest('.dropdown')) {
        link.addEventListener('click', () => {
          hamburger.classList.remove('active');
          navMenu.classList.remove('open');
          document.body.style.overflow = '';
          // Close all mobile dropdowns
          navMenu.querySelectorAll('.nav-has-dropdown').forEach(d => d.classList.remove('mobile-open'));
        });
      }
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // --- Desktop Dropdown Hover (with close delay so clicks register) ---
  const closeDelay = 200; // ms before dropdown hides after mouse leaves
  document.querySelectorAll('.nav-has-dropdown').forEach(item => {
    let closeTimer = null;

    const open = () => {
      clearTimeout(closeTimer);
      // Close all others first
      document.querySelectorAll('.nav-has-dropdown').forEach(d => {
        if (d !== item) d.classList.remove('dropdown-open');
      });
      item.classList.add('dropdown-open');
    };

    const close = () => {
      closeTimer = setTimeout(() => {
        item.classList.remove('dropdown-open');
      }, closeDelay);
    };

    item.addEventListener('mouseenter', () => {
      if (window.innerWidth > 768) open();
    });
    item.addEventListener('mouseleave', () => {
      if (window.innerWidth > 768) close();
    });

    // Keep open if mouse enters the dropdown itself
    const dropdown = item.querySelector('.dropdown');
    if (dropdown) {
      dropdown.addEventListener('mouseenter', () => {
        if (window.innerWidth > 768) clearTimeout(closeTimer);
      });
      dropdown.addEventListener('mouseleave', () => {
        if (window.innerWidth > 768) close();
      });
    }
  });

  // --- Mobile Dropdown Toggle ---
  document.querySelectorAll('.nav-has-dropdown > a').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        const parent = trigger.closest('.nav-has-dropdown');
        const wasOpen = parent.classList.contains('mobile-open');
        document.querySelectorAll('.nav-has-dropdown').forEach(d => d.classList.remove('mobile-open'));
        if (!wasOpen) parent.classList.add('mobile-open');
      }
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-has-dropdown')) {
      document.querySelectorAll('.nav-has-dropdown').forEach(d => d.classList.remove('dropdown-open'));
    }
  });

  // --- Active Nav Link (top-level + dropdowns) ---
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
      // Also mark parent dropdown trigger as active
      const parentDropdown = link.closest('.nav-has-dropdown');
      if (parentDropdown) {
        parentDropdown.querySelector(':scope > a').classList.add('active');
      }
    }
  });

  // --- Smooth Scroll for Anchor Links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // --- Scroll Reveal Animation ---
  const revealEls = document.querySelectorAll(
    '.program-card, .feature-block, .fleet-card, .testimonial-card, .rating-step, .step-item, .lender-card, .path-card, .pricing-card, .reason-card, .license-card'
  );

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(28px)';
      el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
      observer.observe(el);
    });
  }

  // --- Contact Form Handler ---
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const orig = btn.textContent;
      btn.textContent = '✓ Message Sent!';
      btn.style.background = '#16a34a';
      btn.style.borderColor = '#16a34a';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = orig;
        btn.style.background = '';
        btn.style.borderColor = '';
        btn.disabled = false;
        contactForm.reset();
      }, 3500);
    });
  }

});
