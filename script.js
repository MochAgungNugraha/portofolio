// Preloader Animation
window.addEventListener("load", function () {
  const preloader = document.querySelector(".preloader");
  const preloaderBar = document.querySelector(".preloader-bar");

  // Animate the progress bar
  gsap.to(preloaderBar, {
    width: "100%",
    duration: 2.5,
    ease: "power3.inOut",
  });

  // Hide preloader when done
  gsap.to(preloader, {
    opacity: 0,
    duration: 0.5,
    delay: 2.5,
    onComplete: function () {
      preloader.style.display = "none";

      // Start other animations after preloader
      initAnimations();
    },
  });
});

// Cyberpunk Cursor
const cursor = document.querySelector(".cursor");
const cursorFollower = document.querySelector(".cursor-follower");

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";

  gsap.to(cursorFollower, {
    x: e.clientX,
    y: e.clientY,
    duration: 0.5,
    ease: "power2.out",
  });
});

// Cursor effects on hover
document
  .querySelectorAll("a, button, .project-card, .contact-icon")
  .forEach((element) => {
    element.addEventListener("mouseenter", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1.5)";
      cursor.style.background = "var(--accent)";
      cursor.style.boxShadow = "0 0 15px var(--accent)";

      cursorFollower.style.width = "30px";
      cursorFollower.style.height = "30px";
      cursorFollower.style.borderColor = "var(--accent)";
      cursorFollower.style.boxShadow = "0 0 15px var(--accent)";
    });

    element.addEventListener("mouseleave", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1)";
      cursor.style.background = "var(--accent)";
      cursor.style.boxShadow = "0 0 10px var(--accent)";

      cursorFollower.style.width = "60px";
      cursorFollower.style.height = "60px";
      cursorFollower.style.borderColor = "var(--primary)";
      cursorFollower.style.boxShadow = "0 0 10px var(--primary)";
    });
  });

// Hexagon Grid Background
function createHexagonGrid() {
  const grid = document.getElementById("hexagonGrid");
  const width = window.innerWidth;
  const height = window.innerHeight;
  const hexSize = 100;
  const hexWidth = hexSize * 2;
  const hexHeight = Math.sqrt(3) * hexSize;

  const cols = Math.ceil(width / (hexWidth * 0.75)) + 1;
  const rows = Math.ceil(height / (hexHeight * 0.5)) + 1;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const hexagon = document.createElement("div");
      hexagon.className = "hexagon";

      const x = col * hexWidth * 0.75;
      const y = row * hexHeight * 0.5;

      // Offset every other column
      if (col % 2 === 1) {
        y += hexHeight * 0.25;
      }

      hexagon.style.left = `${x}px`;
      hexagon.style.top = `${y}px`;

      grid.appendChild(hexagon);
    }
  }

  // Animate hexagons
  gsap.to(".hexagon", {
    opacity: 0.5,
    duration: 2,
    stagger: {
      each: 0.02,
      from: "random",
    },
    ease: "power2.inOut",
  });
}

// Floating Particles
function createParticles() {
  const particlesContainer = document.getElementById("particles");
  const particleCount = 30;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";

    // Random properties
    const size = Math.random() * 10 + 5;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;

    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;
    particle.style.background =
      i % 2 === 0 ? "var(--primary)" : "var(--accent)";

    particlesContainer.appendChild(particle);

    // Animate particle
    gsap.to(particle, {
      x: gsap.utils.random(-100, 100),
      y: gsap.utils.random(-100, 100),
      duration: duration,
      delay: delay,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }
}

// Hamburger Menu
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", function () {
  this.classList.toggle("active");
  navLinks.classList.toggle("active");
});

// Close mobile menu when clicking a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
  });
});

// Initialize Animations
function initAnimations() {
  gsap.registerPlugin(ScrollTrigger);

  // Create background elements
  createHexagonGrid();
  createParticles();

  // Hero section animation
  gsap.from(".hero-content h2", {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  });

  gsap.from(".hero-content h1", {
    y: 50,
    opacity: 0,
    duration: 1,
    delay: 0.3,
    ease: "power3.out",
  });

  gsap.from(".hero-content p, .cta-button", {
    y: 30,
    opacity: 0,
    duration: 1,
    delay: 0.6,
    ease: "power3.out",
  });

  gsap.from(".hero-image", {
    x: 100,
    opacity: 0,
    duration: 1,
    delay: 0.9,
    ease: "power3.out",
  });

  gsap.from(".social-icons a", {
    y: 20,
    opacity: 0,
    duration: 0.5,
    stagger: 0.1,
    delay: 1.2,
    ease: "power3.out",
  });

  // Section animations
  gsap.utils.toArray(".section").forEach((section) => {
    gsap.from(section, {
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        toggleActions: "play none none none",
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    gsap.from(
      section.querySelectorAll(
        "h2, h3, p, .skill-item, .project-card, .contact-item, .form-group"
      ),
      {
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      }
    );
  });

  // Project card hover animations
  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const angleX = (y - centerY) / 20;
      const angleY = (centerX - x) / 20;

      gsap.to(card, {
        rotationX: angleX,
        rotationY: angleY,
        transformPerspective: 1000,
        ease: "power2.out",
        duration: 0.5,
      });
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        rotationX: 0,
        rotationY: 0,
        ease: "power2.out",
        duration: 0.5,
      });
    });
  });

  // Form submission
  document
    .getElementById("contactForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      const submitBtn = this.querySelector(".submit-btn");
      const originalText = submitBtn.textContent;

      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;

      // Simulate form submission
      setTimeout(() => {
        submitBtn.textContent = "Message Sent!";
        gsap.to(submitBtn, {
          background: "var(--accent)",
          duration: 0.3,
        });

        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          gsap.to(submitBtn, {
            background:
              "linear-gradient(45deg, var(--primary), var(--secondary))",
            duration: 0.3,
          });
          this.reset();
        }, 2000);
      }, 1500);
    });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });
}
