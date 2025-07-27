document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu toggle
  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");

  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    menuBtn.innerHTML = navLinks.classList.contains("active")
      ? '<i class="fas fa-times"></i>'
      : '<i class="fas fa-bars"></i>';
  });

  // Initialize Swiper (only once!)
  const swiper = new Swiper(".swiper", {
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    effect: "slide",
    speed: 800,
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });

        // Close mobile menu if open
        if (navLinks.classList.contains("active")) {
          navLinks.classList.remove("active");
          menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
      }
    });
  });

  // Lightbox functionality
  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.innerHTML = `
        <div class="lightbox-content">
            <img src="" alt="">
            <span class="lightbox-close">&times;</span>
        </div>
    `;
  document.body.appendChild(lightbox);

  document
    .querySelectorAll(".gallery-image, .about-image-showcase img")
    .forEach((img) => {
      img.addEventListener("click", () => {
        const imgSrc = img.getAttribute("src");
        const imgAlt = img.getAttribute("alt");
        lightbox.querySelector("img").setAttribute("src", imgSrc);
        lightbox.querySelector("img").setAttribute("alt", imgAlt);
        lightbox.classList.add("active");
      });
    });

  lightbox.querySelector(".lightbox-close").addEventListener("click", () => {
    lightbox.classList.remove("active");
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove("active");
    }
  });

  // Form submission handling
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Ďakujeme za vašu správu! Čoskoro vás budeme kontaktovať.");
      this.reset();
    });
  }

  // Scroll animation for elements
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(
      ".service-card, .about-content, .contact-form"
    );
    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;
      if (elementPosition < screenPosition) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });
  };

  // Set initial state for animation
  document
    .querySelectorAll(".service-card, .about-content, .contact-form")
    .forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    });

  // Run animations
  animateOnScroll();
  window.addEventListener("scroll", animateOnScroll);
});

