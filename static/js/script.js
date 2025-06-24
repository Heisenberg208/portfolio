// Custom JavaScript for Portfolio Website

document.addEventListener('DOMContentLoaded', function() {
  // Initialize animations and interactions
  initializeAnimations();
  initializeContactForm();
  initializeNavigation();
  initializeScrollEffects();
});

// Animation initialization
function initializeAnimations() {
  // Add loading class to body
  document.body.classList.add('loading');
  
  // Animate skill cards on scroll
  const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              // @ts-ignore
              entry.target.style.opacity = '1';
              // @ts-ignore
              entry.target.style.transform = 'translateY(0)';
          }
      });
  }, observerOptions);
  
  // Observe elements for animation
  const animatedElements = document.querySelectorAll('.skill-card, .experience-card, .project-card');
  animatedElements.forEach(el => {
      // @ts-ignore
      el.style.opacity = '0';
      // @ts-ignore
      el.style.transform = 'translateY(20px)';
      // @ts-ignore
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
  });
}

// Contact form handling
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
      contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();
  
        // @ts-ignore
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
  
        if (!validateForm(name, email, subject, message)) return;
  
        try {
          // @ts-ignore
          const response = await fetch(this.action, {
            method: 'POST',
            headers: {
              'Accept': 'application/json'
            },
            body: formData
          });
  
          if (response.ok) {
            showSubmissionMessage();
            // @ts-ignore
            this.reset();
          } else {
            showAlert('Oops! Something went wrong. Please try again later.', 'danger');
          }
        } catch (error) {
          showAlert('Network error. Please check your connection.', 'danger');
        }
      });
    }
  }
  

// Form validation
function validateForm(name, email, subject, message) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!name.trim()) {
      showAlert('Please enter your name.', 'danger');
      return false;
  }
  
  if (!email.trim() || !emailRegex.test(email)) {
      showAlert('Please enter a valid email address.', 'danger');
      return false;
  }
  
  if (!subject.trim()) {
      showAlert('Please enter a subject.', 'danger');
      return false;
  }
  
  if (!message.trim()) {
      showAlert('Please enter your message.', 'danger');
      return false;
  }
  
  return true;
}

// Show submission message
function showSubmissionMessage() {
  showAlert('Thank you for your message! I\'ll get back to you soon.', 'success');
}

// Show alert messages
function showAlert(message, type) {
  // Remove existing alerts
  const existingAlerts = document.querySelectorAll('.custom-alert');
  existingAlerts.forEach(alert => alert.remove());
  
  // Create new alert
  const alertDiv = document.createElement('div');
  alertDiv.className = `alert alert-${type} alert-dismissible fade show custom-alert`;
  alertDiv.innerHTML = `
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `;
  
  // Insert alert at the top of the form
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
      contactForm.insertBefore(alertDiv, contactForm.firstChild);
      
      // Auto-dismiss after 5 seconds
      setTimeout(() => {
          if (alertDiv) {
              alertDiv.remove();
          }
      }, 5000);
  }
}

// Navigation handling
function initializeNavigation() {
  // Active navigation highlighting
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  
  navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPath || (currentPath === '/' && href === '/')) {
          link.classList.add('active');
      }
  });
  
  // Smooth scroll for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(link => {
      link.addEventListener('click', function(e) {
          e.preventDefault();
          const targetId = this.getAttribute('href').substring(1);
          const targetElement = document.getElementById(targetId);
          
          if (targetElement) {
              targetElement.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
              });
          }
      });
  });
}

// Scroll effects
function initializeScrollEffects() {
  // Navbar background change on scroll
  const navbar = document.querySelector('.navbar');
  
  window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
          // @ts-ignore
          navbar.classList.add('scrolled');
      } else {
          // @ts-ignore
          navbar.classList.remove('scrolled');
      }
  });
  
  // Back to top button
  createBackToTopButton();
}

// Create back to top button
function createBackToTopButton() {
  const backToTopBtn = document.createElement('button');
  backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  backToTopBtn.className = 'btn btn-primary back-to-top-btn';
  backToTopBtn.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      display: none;
      z-index: 1000;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      transition: all 0.3s ease;
  `;
  
  document.body.appendChild(backToTopBtn);
  
  // Show/hide button based on scroll position
  window.addEventListener('scroll', function() {
      if (window.scrollY > 300) {
          backToTopBtn.style.display = 'block';
      } else {
          backToTopBtn.style.display = 'none';
      }
  });
  
  // Scroll to top functionality
  backToTopBtn.addEventListener('click', function() {
      window.scrollTo({
          top: 0,
          behavior: 'smooth'
      });
  });
}

// Typing effect for hero section
function initializeTypingEffect() {
  const typingElement = document.querySelector('.typing-effect');
  if (typingElement) {
      const texts = ['AI/ML Engineer', 'Python Developer', 'Problem Solver', 'Tech Enthusiast'];
      let currentIndex = 0;
      let currentText = '';
      let isDeleting = false;
      
      function type() {
          const fullText = texts[currentIndex];
          
          if (isDeleting) {
              currentText = fullText.substring(0, currentText.length - 1);
          } else {
              currentText = fullText.substring(0, currentText.length + 1);
          }
          
          // @ts-ignore
          typingElement.textContent = currentText;
          
          let typeSpeed = isDeleting ? 50 : 100;
          
          if (!isDeleting && currentText === fullText) {
              typeSpeed = 2000; // Pause at end
              isDeleting = true;
          } else if (isDeleting && currentText === '') {
              isDeleting = false;
              currentIndex = (currentIndex + 1) % texts.length;
              typeSpeed = 500; // Pause before starting new text
          }
          
          setTimeout(type, typeSpeed);
      }
      
      type();
  }
}

// Particle background effect (optional)
function initializeParticles() {
  // Simple particle effect for hero section
  const hero = document.querySelector('.hero-section');
  if (hero) {
      for (let i = 0; i < 50; i++) {
          createParticle(hero);
      }
  }
}

function createParticle(container) {
  const particle = document.createElement('div');
  particle.className = 'particle';
  particle.style.cssText = `
      position: absolute;
      width: 2px;
      height: 2px;
      background: rgba(255,255,255,0.5);
      border-radius: 50%;
      animation: float ${Math.random() * 3 + 2}s infinite linear;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
  `;
  container.appendChild(particle);
}

// Add CSS for particles animation
const particleStyles = `
  @keyframes float {
      0% { transform: translateY(0px) rotate(0deg); opacity: 1; }
      100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
  }
  .particle {
      pointer-events: none;
  }
`;

// Inject particle styles
const styleSheet = document.createElement('style');
styleSheet.textContent = particleStyles;
document.head.appendChild(styleSheet);

// Performance monitoring
function initializePerformanceMonitoring() {
  // Log page load time
  window.addEventListener('load', function() {
      const loadTime = performance.now();
      console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
  });
}

// Initialize all features
initializePerformanceMonitoring();