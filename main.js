
document.addEventListener('DOMContentLoaded', () => {
  initTypewriter();
  initCounters();
  initMissionToggle();
  initScrollObserver();
  initMobileMenu();
  initNavbarScroll();
  initCarousel();
  initFormHandler();
  initStarfield();
});


function initTypewriter() {
  const text = "Expanding educational access for rural communities. We believe education is the foundation for long-term change.";
  const typeTarget = document.getElementById("typewriter");
  if (!typeTarget) return;

  let index = 0;
  const speed = 35;

  function type() {
    if (index < text.length) {
      typeTarget.textContent += text.charAt(index);
      index++;
      setTimeout(type, speed);
    } else {
      // Remove cursor blink effect after typing is done
      const cursor = document.querySelector('.cursor');
      if(cursor) cursor.style.display = 'none';
    }
  }
  
  // Delay start slightly
  setTimeout(type, 800);
}


function initCounters() {
  const counters = document.querySelectorAll(".number");
  const speed = 200; // Lower is slower

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = +counter.getAttribute("data-target");
        
        const updateCount = () => {
          const current = +counter.innerText;
          const increment = target / speed;

          if (current < target) {
            counter.innerText = Math.ceil(current + increment);
            setTimeout(updateCount, 20);
          } else {
            counter.innerText = target;
          }
        };
        
        updateCount();
        observer.unobserve(counter); // Only run once
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}


function initMissionToggle() {
  const btn = document.getElementById("missionBtn");
  const list = document.getElementById("values");

  if (btn && list) {
    btn.addEventListener("click", () => {
      list.classList.toggle("hidden");
      // Add a small timeout to allow display:block to apply before opacity transition
      if (!list.classList.contains("hidden")) {
        setTimeout(() => list.classList.add("visible"), 10);
        btn.textContent = "Hide Core Values";
      } else {
        list.classList.remove("visible");
        btn.textContent = "Reveal Core Values";
      }
    });
  }
}


function initScrollObserver() {
  const fadeElements = document.querySelectorAll('.fade-scroll');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

  fadeElements.forEach(el => observer.observe(el));
}


function initMobileMenu() {
  const toggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');
  const links = document.querySelectorAll('.nav-link');

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      // Simple animation for hamburger
      const bars = toggle.querySelectorAll('.bar');
      // (Optional: Add transform logic here for X shape)
    });

    // Close menu when a link is clicked
    links.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }
}


function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}


class Carousel {
  constructor() {
    this.track = document.getElementById('track');
    this.slides = Array.from(this.track.children);
    this.nextButton = document.getElementById('nextSlide');
    this.prevButton = document.getElementById('prevSlide');
    this.dotsNav = document.getElementById('carouselNav');
    this.dots = Array.from(this.dotsNav.children);
    
    this.slideWidth = this.slides[0].getBoundingClientRect().width;
    
    // Arrange slides next to each other
    this.slides.forEach((slide, index) => {
      slide.style.left = this.slideWidth * index + 'px';
    });

    this.addEventListeners();
  }

  moveToSlide(currentSlide, targetSlide) {
    this.track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
  }

  updateDots(currentDot, targetDot) {
    currentDot.classList.remove('current-slide');
    targetDot.classList.add('current-slide');
  }

  addEventListeners() {
    // Next Button
    this.nextButton.addEventListener('click', () => {
      const currentSlide = this.track.querySelector('.current-slide');
      let nextSlide = currentSlide.nextElementSibling;
      const currentDot = this.dotsNav.querySelector('.current-slide');
      let nextDot = currentDot.nextElementSibling;

      // Loop back to start
      if (!nextSlide) {
        nextSlide = this.slides[0];
        nextDot = this.dots[0];
      }

      this.moveToSlide(currentSlide, nextSlide);
      this.updateDots(currentDot, nextDot);
    });

    // Prev Button
    this.prevButton.addEventListener('click', () => {
      const currentSlide = this.track.querySelector('.current-slide');
      let prevSlide = currentSlide.previousElementSibling;
      const currentDot = this.dotsNav.querySelector('.current-slide');
      let prevDot = currentDot.previousElementSibling;

      // Loop to end
      if (!prevSlide) {
        prevSlide = this.slides[this.slides.length - 1];
        prevDot = this.dots[this.dots.length - 1];
      }

      this.moveToSlide(currentSlide, prevSlide);
      this.updateDots(currentDot, prevDot);
    });

    // Dots
    this.dotsNav.addEventListener('click', e => {
      const targetDot = e.target.closest('button');
      if (!targetDot) return;

      const currentSlide = this.track.querySelector('.current-slide');
      const currentDot = this.dotsNav.querySelector('.current-slide');
      const targetIndex = this.dots.findIndex(dot => dot === targetDot);
      const targetSlide = this.slides[targetIndex];

      this.moveToSlide(currentSlide, targetSlide);
      this.updateDots(currentDot, targetDot);
    });
    
    // Auto-play
    setInterval(() => {
      this.nextButton.click();
    }, 6000);
  }
}

function initCarousel() {
  if (document.getElementById('track')) {
    // Wait for layout to settle
    setTimeout(() => new Carousel(), 100);
  }
}


function initFormHandler() {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button');
      const originalText = btn.innerText;
      
      // Simulate loading
      btn.innerText = "Sending...";
      btn.disabled = true;

      // Simulate API call
      setTimeout(() => {
        btn.innerText = originalText;
        btn.disabled = false;
        status.innerText = "Message sent successfully! We'll be in touch.";
        status.className = "form-status success";
        form.reset();
        
        // Clear message after 5 seconds
        setTimeout(() => {
          status.innerText = "";
        }, 5000);
      }, 1500);
    });
  }
}


class Star {
  constructor(canvasWidth, canvasHeight) {
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    this.size = Math.random() * 2;
    this.speedX = Math.random() * 0.5 - 0.25;
    this.speedY = Math.random() * 0.5 - 0.25;
    this.brightness = Math.random();
  }

  update(width, height) {
    this.x += this.speedX;
    this.y += this.speedY;

    // Wrap around screen
    if (this.x < 0) this.x = width;
    if (this.x > width) this.x = 0;
    if (this.y < 0) this.y = height;
    if (this.y > height) this.y = 0;

    // Twinkle effect
    this.brightness += (Math.random() - 0.5) * 0.1;
    if (this.brightness > 1) this.brightness = 1;
    if (this.brightness < 0.2) this.brightness = 0.2;
  }

  draw(ctx) {
    ctx.fillStyle = `rgba(255, 255, 255, ${this.brightness})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function initStarfield() {
  const canvas = document.getElementById('starfield');
  const ctx = canvas.getContext('2d');
  
  let width = window.innerWidth;
  let height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;

  const stars = [];
  const starCount = 150; // Number of stars

  for (let i = 0; i < starCount; i++) {
    stars.push(new Star(width, height));
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    
    // Draw connecting lines for nearby stars (Constellation effect)
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = 'rgba(95, 168, 255, 0.15)'; // Blue tint
    
    for (let i = 0; i < stars.length; i++) {
      stars[i].update(width, height);
      stars[i].draw(ctx);
      
      // Connect to neighbors
      for (let j = i + 1; j < stars.length; j++) {
        const dx = stars[i].x - stars[j].x;
        const dy = stars[i].y - stars[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          ctx.beginPath();
          ctx.moveTo(stars[i].x, stars[i].y);
          ctx.lineTo(stars[j].x, stars[j].y);
          ctx.stroke();
        }
      }
    }
    
    requestAnimationFrame(animate);
  }

  animate();

  // Handle Resize
  window.addEventListener('resize', () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  });
}
