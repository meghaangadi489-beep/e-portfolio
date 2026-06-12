/* ==========================================================================
   E-Portfolio interactive behavior - JavaScript
   Author: Megha Angadi
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. Top Scroll Progress Bar & Sticky Header & Scroll-To-Top Button ---
  const header = document.getElementById('header');
  const scrollProgress = document.getElementById('scrollProgress');
  const scrollTopBtn = document.getElementById('scrollTopBtn');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    
    // Scroll progress bar width update
    scrollProgress.style.width = `${scrollPercent}%`;

    // Sticky header class switch
    if (scrollTop > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll-to-top button visibility
    if (scrollTop > 500) {
      scrollTopBtn.style.opacity = '1';
      scrollTopBtn.style.pointerEvents = 'auto';
      scrollTopBtn.style.transform = 'translateY(0)';
    } else {
      scrollTopBtn.style.opacity = '0';
      scrollTopBtn.style.pointerEvents = 'none';
      scrollTopBtn.style.transform = 'translateY(10px)';
    }
  });


  // --- 2. Typing Animation ---
  const typingTextElement = document.getElementById('typing-text');
  const phrases = [
    'Engineering Student.',
    'Technology Enthusiast.',
    'Programming Explorer.',
    'AI & Prompt Designer.'
  ];
  let phraseIndex = 0;
  let characterIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
      // Deleting character
      typingTextElement.textContent = currentPhrase.substring(0, characterIndex - 1);
      characterIndex--;
    } else {
      // Adding character
      typingTextElement.textContent = currentPhrase.substring(0, characterIndex + 1);
      characterIndex++;
    }

    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && characterIndex === currentPhrase.length) {
      // Pause at full phrase
      speed = 2000;
      isDeleting = true;
    } else if (isDeleting && characterIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      speed = 500; // brief pause before starting new word
    }

    setTimeout(typeEffect, speed);
  }

  // Start the typing loop if element exists
  if (typingTextElement) {
    typeEffect();
  }


  // --- 3. Mobile Navigation Burger Menu ---
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const menuIcon = menuToggle.querySelector('i');
  const navLinks = document.querySelectorAll('.nav-link');

  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    const isOpen = navMenu.classList.contains('open');
    
    // Toggle burger icon state
    if (isOpen) {
      menuIcon.className = 'fa-solid fa-xmark';
    } else {
      menuIcon.className = 'fa-solid fa-bars-staggered';
    }
  });

  // Close mobile menu when nav link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      menuIcon.className = 'fa-solid fa-bars-staggered';
    });
  });


  // --- 4. Active Navigation Highlight on Scroll ---
  const sections = document.querySelectorAll('section[id]');

  function activeNavHighlight() {
    const scrollY = window.scrollY;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120; // offset header height
      const sectionId = current.getAttribute('id');
      const activeLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);

      if (activeLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          activeLink.classList.add('active');
        } else {
          activeLink.classList.remove('active');
        }
      }
    });
  }

  window.addEventListener('scroll', activeNavHighlight);


  // --- 5. Interactive Cursor Tracking for Skill Cards (Dynamic Glow Effect) ---
  const skillCards = document.querySelectorAll('.skill-card');

  skillCards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / card.clientWidth) * 100;
      const y = ((e.clientY - rect.top) / card.clientHeight) * 100;

      card.style.setProperty('--mouse-x', `${x}%`);
      card.style.setProperty('--mouse-y', `${y}%`);
    });
  });


  // --- 6. Contact Form Processing (Client Mockup Submission) ---
  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const formStatus = document.getElementById('formStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Show processing state
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending Message <i class="fa-solid fa-circle-notch fa-spin"></i>';
      formStatus.className = 'form-status';
      formStatus.textContent = '';

      // Simulate network request delays
      setTimeout(() => {
        // Mock success response
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane"></i>';
        formStatus.classList.add('success');
        formStatus.textContent = 'Message sent successfully! Thank you for reaching out.';
        
        // Reset inputs
        contactForm.reset();

        // Clear status after 5 seconds
        setTimeout(() => {
          formStatus.textContent = '';
          formStatus.className = 'form-status';
        }, 5000);
        
      }, 1500);
    });
  }

});
