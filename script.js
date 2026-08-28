/* =========================
   MOBILE MENU
========================= */

const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

menuBtn.addEventListener("click", () => {
  nav.classList.toggle("active");

  menuBtn.textContent =
    nav.classList.contains("active") ? "✕" : "☰";
});


document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("active");
    menuBtn.textContent = "☰";
  });
});


/* =========================
   ANIMATED STATISTICS
========================= */

const counters = document.querySelectorAll(".stat h2");

const counterObserver = new IntersectionObserver(
  entries => {

    entries.forEach(entry => {

      if (!entry.isIntersecting) return;

      const counter = entry.target;
      const target = Number(counter.dataset.target);

      let current = 0;

      const updateCounter = () => {

        const increment = Math.max(
          1,
          Math.ceil(target / 70)
        );

        current += increment;

        if (current >= target) {
          counter.textContent = target + "+";
          return;
        }

        counter.textContent = current;

        requestAnimationFrame(updateCounter);
      };

      updateCounter();

      counterObserver.unobserve(counter);
    });

  },
  {
    threshold: 0.5
  }
);

counters.forEach(counter => {
  counterObserver.observe(counter);
});


/* =========================
   PARTICLES
========================= */

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);

resizeCanvas();


function createParticles() {

  particles = [];

  const amount =
    window.innerWidth < 600 ? 35 : 70;

  for (let i = 0; i < amount; i++) {

    particles.push({

      x: Math.random() * canvas.width,

      y: Math.random() * canvas.height,

      size: Math.random() * 2 + .5,

      speedX:
        (Math.random() - .5) * .3,

      speedY:
        (Math.random() - .5) * .3,

      opacity:
        Math.random() * .5 + .1

    });
  }
}

createParticles();


function animateParticles() {

  ctx.clearRect(
    0,
    0,
    canvas.width,
    canvas.height
  );

  particles.forEach(p => {

    p.x += p.speedX;
    p.y += p.speedY;

    if (p.x < 0 || p.x > canvas.width) {
      p.speedX *= -1;
    }

    if (p.y < 0 || p.y > canvas.height) {
      p.speedY *= -1;
    }

    ctx.beginPath();

    ctx.arc(
      p.x,
      p.y,
      p.size,
      0,
      Math.PI * 2
    );

    ctx.fillStyle =
      `rgba(212,175,55,${p.opacity})`;

    ctx.fill();
  });

  requestAnimationFrame(animateParticles);
}

animateParticles();


/* =========================
   CONTACT FORM
========================= */

const contactForm =
  document.getElementById("contactForm");

contactForm.addEventListener("submit", function(event) {

  event.preventDefault();

  const name =
    this.querySelector("input[type='text']").value;

  alert(
    `Thank you ${name}! QBH Marketing Agency will contact you soon.`
  );

  this.reset();
});


/* =========================
   SCROLL REVEAL
========================= */

const revealElements = document.querySelectorAll(
  ".service-card, .portfolio-card, .about-content, .about-image, .contact-box"
);

const revealObserver = new IntersectionObserver(
  entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";

        revealObserver.unobserve(entry.target);
      }

    });

  },
  {
    threshold: 0.15
  }
);


revealElements.forEach(element => {

  element.style.opacity = "0";

  element.style.transform =
    "translateY(40px)";

  element.style.transition =
    "opacity .8s ease, transform .8s ease";

  revealObserver.observe(element);
});