/* 
   SPARE X TECHNICAL SUPPLIES - MAIN SCRIPT
   Provides clean navigation controls, portfolio category tab switching, and animated metrics.
*/

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking links on mobile
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }

  // Active Navigation Link Highlighter based on current URL path
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && (currentPath.endsWith(href) || (currentPath.endsWith('/') && href === 'index.html'))) {
      link.classList.add('active');
    }
  });

  // Animated Counter for Key Metrics
  const metricElements = document.querySelectorAll('.metric-number[data-count]');
  if (metricElements.length > 0) {
    const observerOptions = { threshold: 0.5 };
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const targetNum = parseInt(el.getAttribute('data-count'), 10);
          const suffix = el.getAttribute('data-suffix') || '';
          let current = 0;
          const step = Math.max(1, Math.floor(targetNum / 20));
          const timer = setInterval(() => {
            current += step;
            if (current >= targetNum) {
              el.innerText = targetNum + suffix;
              clearInterval(timer);
            } else {
              el.innerText = current + suffix;
            }
          }, 40);
          obs.unobserve(el);
        }
      });
    }, observerOptions);

    metricElements.forEach(el => observer.observe(el));
  }

  // Portfolio Category Filtering (Portfolio page)
  const tabButtons = document.querySelectorAll('.tab-btn');
  const categoryCards = document.querySelectorAll('.portfolio-card');

  if (tabButtons.length > 0 && categoryCards.length > 0) {
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.getAttribute('data-category');
        categoryCards.forEach(card => {
          if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }
});
